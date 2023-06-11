import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import { UserService } from '../user/user.service';
import { LogoutDto, SignInByAwsResponseDto, SignUpAndOnboardUserDto, UserAttributes } from './dto/aws-auth.dto';
import { toLowerCaseAndReplace } from 'src/common/methods/string.methods';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AwsAuthEvent } from './event/aws-auth.event';
import InterService from 'src/common/inter-service';

@Injectable()
export class AwsAuthService extends AwsAuthEvent {
  constructor(
    @Inject(ConfigService)
    public readonly config: ConfigService,
    @Inject(forwardRef(() => UserService))
    public userService: UserService,
    public eventEmitter: EventEmitter2,
  ) {
    super(userService)
    this.reverseRef(this)
  }

  private AWS_REGION: string = this.config.get<string>('AWS_REGION')
  private AWS_CLIENT_ID: string = this.config.get<string>('AWS_CLIENT_ID')
  private AWS_CLIENT_SECRET: string = this.config.get<string>('AWS_CLIENT_SECRET')
  private AWS_USER_POOL_ID: string = this.config.get<string>('AWS_USER_POOL_ID')
  private AWS_AMPLIFY_ISS: string = this.config.get<string>('AWS_AMPLIFY_ISS')
  private AWSCognito(): AWS.CognitoIdentityServiceProvider {
    AWS.config.update({
      region: this.AWS_REGION,
      accessKeyId: this.AWS_CLIENT_ID,
      secretAccessKey: this.AWS_CLIENT_SECRET,
    });
    return new AWS.CognitoIdentityServiceProvider({ region: this.AWS_REGION });
  }

  private async getUserStatus(Username) {
    try {
      const user = await this.getUsersByQuery(`phone_number ^= \"${Username}\"`)

      if (user.Users.length != 1)
        return {
          account_exist: false,
          account_verified: false,
          account_Status: "Something went wrong, Kindly reach admin",
          ...(user?.Users[0] ?? {})
        }

      switch (user?.Users[0]?.UserStatus) {
        case 'UNCONFIRMED':
          return {
            account_exist: true,
            account_verified: false,
            account_Status: "Already account created but not yet verified",
            ...(user?.Users[0] ?? {})
          }
        case "FORCE_CHANGE_PASSWORD":
          return {
            account_exist: true,
            account_verified: false,
            account_Status: "Already account created but user still not yet done passwrod reset",
            ...(user?.Users[0] ?? {})
          }
        default:
          return {
            account_exist: true,
            account_verified: true,
            account_Status: "Already account exist",
            ...(user?.Users[0] ?? {})
          }
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async useOnboardingQuota(userId: string, headers: any) {
    try {
      const body = { onqu_user_id: userId }
      return await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'services',
          method: 'patch',
          endpoint: `/onboarding-quota/use-quota`,
          headers: { "authorization": headers.authorization },
          body
        })
      ])
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async signUpByUser(Username, Password) {
    try {
      const { account_exist, account_verified, ...rest } = await this.getUserStatus(Username)
      if (account_exist || account_verified)
        return { account_exist, account_verified, ...rest }

      // ### Create if user not exist
      const params = {
        ClientId: this.AWS_CLIENT_ID
        , Username
        , Password
      };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.signUp(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async signUpByUserAndVerify(Username, ConfirmationCode) {
    try {
      const params = {
        ClientId: this.AWS_CLIENT_ID
        , Username
        , ConfirmationCode
      };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.confirmSignUp(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ### FOR CREATING USER: As per admin configuration user name can be either mobile number with extension or email id
  public async signUpAndOnboardUser(signUpAndOnboardUserDto: SignUpAndOnboardUserDto, headers: any) {
    try {
      const { username, tempPassword, ...user } = signUpAndOnboardUserDto
      const { account_exist, account_verified, ...rest } = await this.getUserStatus(username)
      if (account_exist || account_verified)
        return { account_exist, account_verified, ...rest }

      const serviceQuota = await this.useOnboardingQuota(user.user_created_by_nano, headers)

      const cond = serviceQuota[0] ?? ''
      if (cond != "success")
        throw new HttpException('Something went wrong with your service quota', HttpStatus.BAD_REQUEST);

      // ### Create if user not exist
      const params = {
        UserPoolId: this.AWS_USER_POOL_ID
        , Username: username
        , TemporaryPassword: tempPassword
        , DesiredDeliveryMediums: ["SMS"]
      };
      const COGNITO_CLIENT = this.AWSCognito();
      const awsUser: any = await COGNITO_CLIENT.adminCreateUser(params).promise()

      // if user account already exist or user is not created 
      // then 'Username' wont be avail in response so return respose as it is
      if (!awsUser?.User?.Username)
        throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);

      // if user created in aws then further process to create user in system
      user.user_aws_id = awsUser.User.Username
      const onboardedUser = await this.userService.create(user, headers);

      return {
        success: 'user account created successfully',
        user: onboardedUser,
        awsUser
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async forceChangePassword(USERNAME, NEW_PASSWORD, Session) {
    try {
      const params = {
        UserPoolId: this.AWS_USER_POOL_ID
        , ClientId: this.AWS_CLIENT_ID
        , ChallengeName: "NEW_PASSWORD_REQUIRED"
        , ChallengeResponses: { USERNAME, NEW_PASSWORD }
        , Session
      };
      const COGNITO_CLIENT = this.AWSCognito();
      const aws = await COGNITO_CLIENT.adminRespondToAuthChallenge(params).promise()
      if (aws?.ChallengeName != undefined) {
        throw new HttpException(aws, HttpStatus.BAD_REQUEST);
      }
      return { success: true }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async signInByAws(USERNAME, PASSWORD) {
    try {
      const params = {
        ClientId: this.AWS_CLIENT_ID
        , AuthFlow: "USER_PASSWORD_AUTH"
        , AuthParameters: {
          USER_PASSWORD_AUTH: "ALLOW_USER_PASSWORD_AUTH",
          USERNAME,
          PASSWORD,
        }
      };
      const COGNITO_CLIENT = this.AWSCognito();
      const aws = await COGNITO_CLIENT.initiateAuth(params).promise()
      return aws
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async signInByAwsResponse(aws: SignInByAwsResponseDto) {
    try {
      const { metaInfo, ChallengeName, challengeParam, attributes } = aws
      const { phone_number } = attributes ? attributes : challengeParam?.userAttributes ?? {}

      // Validate
      if (ChallengeName)
        throw new HttpException(`Kindly complete ${ChallengeName} process`, HttpStatus.BAD_REQUEST);
      if (!phone_number)
        throw new HttpException(`Something went wrong`, HttpStatus.BAD_REQUEST);
      const user = await this.userService.findOneByMobile(phone_number?.replace('+91', ''))
      if (!user?.user_is_account_verified)
        throw new HttpException(`Account initiated and ${toLowerCaseAndReplace(user?.user_registration_status, '_', ' ')} is in progress`, HttpStatus.BAD_REQUEST);

      // Grant access for login
      const updatedUser = { ...user, user_session_id: nanoid(24) }
      this.eventEmitter.emit('aws-auth.login', { user: updatedUser, metaInfo });

      return await {
        success: 'Loggedin successfully',
        user: updatedUser,
        aws
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async signOut(logoutDto: LogoutDto) {
    try {
      const { token } = logoutDto
      const params = {
        AccessToken: token
      };
      const COGNITO_CLIENT = this.AWSCognito();
      await COGNITO_CLIENT.globalSignOut(params).promise()
      return { success: true }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async changePassword(PreviousPassword, ProposedPassword, AccessToken) {
    try {
      const params = {
        PreviousPassword
        , ProposedPassword
        , AccessToken
      }
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.changePassword(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async forgotPassword(Username) {
    try {
      const params = {
        ClientId: this.AWS_CLIENT_ID
        , Username
      };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.forgotPassword(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async forgotPasswordAndVerify(Username, Password, ConfirmationCode) {
    try {
      const params = {
        ClientId: this.AWS_CLIENT_ID
        , Username
        , Password
        , ConfirmationCode
      };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.confirmForgotPassword(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserAttributes(AccessToken: string, UserAttributes: UserAttributes[] | any) {
    try {
      const params = { AccessToken: AccessToken.replace('Bearer ', ''), UserAttributes };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.updateUserAttributes(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserAttributesByAdmin(Username: string, UserAttributes: UserAttributes[] | any) {
    try {
      const params = {
        UserPoolId: this.AWS_USER_POOL_ID,
        Username,
        UserAttributes
      };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.adminUpdateUserAttributes(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUserByToken(AccessToken: string) {
    try {
      const params = { AccessToken: AccessToken.replace('Bearer ', '') };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.getUser(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUsersByQuery(query: string) {
    try {
      const params = {
        UserPoolId: this.AWS_USER_POOL_ID
        , Filter: query
      };
      const COGNITO_CLIENT = this.AWSCognito();
      return await COGNITO_CLIENT.listUsers(params).promise()
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}