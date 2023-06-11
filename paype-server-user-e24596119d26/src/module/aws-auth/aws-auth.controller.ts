import { Controller, Get, Post, Body, Put, HttpException, HttpStatus, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTGrantGuard } from 'src/common/middleware/grant/default.grant';
import { AwsAuthService } from './aws-auth.service';
import {
  SignUpByUserDto, SignUpByUserAndVerifyDto, SignUpAndOnboardUserDto, ForceChangePasswordDto, SignInByAwsResponseDto, LogoutDto,
  ChangePasswordDto, ForgotPasswordDto, ForgotPasswordAndVerifyDto, UpdateUserAttributes, GetUsersQueryDto, SignInByAwsDto,
} from './dto/aws-auth.dto';

@ApiTags('auth-auth')
@Controller('aws-auth')
export class AwsAuthController {
  constructor(
    private readonly awsAuthService: AwsAuthService,
  ) { }

  @JWTGrantGuard()
  @Post('user-signup')
  public async signUpByUser(@Body() signUpByUserDto: SignUpByUserDto) {
    const { username, password } = signUpByUserDto
    return await this.awsAuthService.signUpByUser(username, password);
  }

  @JWTGrantGuard()
  @Post('user-signup/verify')
  public async signUpByUserAndVerify(@Body() signUpByUserAndVerifyDto: SignUpByUserAndVerifyDto) {
    const { username, code } = signUpByUserAndVerifyDto;
    return await this.awsAuthService.signUpByUserAndVerify(username, code);
  }

  @Post('user-signup/onboard')
  public async signUpAndOnboardUser(@Headers() headers, @Body() signUpAndOnboardUserDto: SignUpAndOnboardUserDto) {
    try {
      return await this.awsAuthService.signUpAndOnboardUser(signUpAndOnboardUserDto, { authorization: headers.authorization });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @JWTGrantGuard()
  @Post('force-change-password')
  public async forceChangePassword(@Body() forceChangePasswordDto: ForceChangePasswordDto) {
    const { username, proposed, session } = forceChangePasswordDto
    return await this.awsAuthService.forceChangePassword(username, proposed, session);
  }

  @JWTGrantGuard()
  @Post('signin-aws')
  public async signInByAws(@Body() signInByAwsDto: SignInByAwsDto) {
    const { username, password } = signInByAwsDto
    return await this.awsAuthService.signInByAws(username, password);
  }

  @JWTGrantGuard()
  @Post('signin')
  public async signInByAwsResponse(@Body() signInByAwsResponseDto: SignInByAwsResponseDto) {
    return await this.awsAuthService.signInByAwsResponse(signInByAwsResponseDto);
  }

  @JWTGrantGuard()
  @Post('signout')
  public async signOut(@Body() logoutDto: LogoutDto) {
    return await this.awsAuthService.signOut(logoutDto);
  }

  @Post('change-password')
  public async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const { previous, proposed, token } = changePasswordDto
    return await this.awsAuthService.changePassword(previous, proposed, token);
  }

  @JWTGrantGuard()
  @Post('forget-password')
  public async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { username } = forgotPasswordDto
    return await this.awsAuthService.forgotPassword(username);
  }

  @JWTGrantGuard()
  @Post('forget-password/verify')
  public async forgotPasswordAndVerify(@Body() forgotPasswordAndVerify: ForgotPasswordAndVerifyDto) {
    const { username, password, code } = forgotPasswordAndVerify
    return await this.awsAuthService.forgotPasswordAndVerify(username, password, code);
  }

  @Put('update-user')
  public async updateUserAttributes(@Headers() headers, @Body() updateUserAttributes: UpdateUserAttributes) {
    const { userAttributes } = updateUserAttributes
    return await this.awsAuthService.updateUserAttributes(headers.authorization, userAttributes);
  }

  @Get('get-users')
  public async getUsers(@Query() getUsersQueryDto: GetUsersQueryDto) {
    const { token, mobileNo } = getUsersQueryDto
    if (token)
      return await this.awsAuthService.getUserByToken(token);
    return await this.awsAuthService.getUsersByQuery(`phone_number ^= \"${mobileNo}\"`);
  }

}