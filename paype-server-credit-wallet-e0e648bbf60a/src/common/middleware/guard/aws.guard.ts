import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import fetch from 'cross-fetch';
import { isNil } from 'lodash';
import { IS_PUBLIC_KEY } from '../grant/default.grant';
import { ConfigService } from '@nestjs/config';
const jwkToPem = require('jwk-to-pem')


@Injectable()
export class AWSGuard implements CanActivate {
    constructor(
        @Inject(ConfigService)
        private readonly config: ConfigService,
        private reflector: Reflector
    ) { }

    private AWS_AMPLIFY_ISS: string = this.config.get<string>('AWS_AMPLIFY_ISS')

    async canActivate(context: ExecutionContext): Promise<any> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request: any = context.switchToHttp().getRequest<Request>();
        const { authorization } = request.headers;
        let token = '';
        if (Array.isArray(authorization)) {
            token = authorization[0];
        } else {
            token = authorization;
        }
        const tokenArray = token?.split(' ', 2) ?? []
        if (tokenArray.length != 2)
            throw new UnauthorizedException(`Invalid bearer token`);
        else if (tokenArray[0].toLowerCase() !== 'bearer')
            throw new UnauthorizedException(`bearer missing`);
        else
            return await this.validateAccessToken(tokenArray[1]);
    }

    private async validateAccessToken(authorizationToken: string): Promise<any> {
        let pems = {};
        let payloadData;
        if (isNil(authorizationToken)) {
            throw new Error('User must be logged in');
        }
        try {
            const res: any = await fetch(this.AWS_AMPLIFY_ISS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            });
            const publicKeys = await res.json();
            const keys = publicKeys['keys'];
            for (let i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                const key_id = keys[i].kid;
                const modulus = keys[i].n;
                const exponent = keys[i].e;
                const key_type = keys[i].kty;
                const jwk = { kty: key_type, n: modulus, e: exponent };
                const pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }

            const decodedJwt = jwt.decode(authorizationToken, { complete: true });
            if (!decodedJwt) {
                throw new Error('Not a valid JWT token');
            }


            const kid = decodedJwt.header.kid;
            const pem = pems[kid];
            if (!pem) {
                throw new Error('Invalid token');
            }

            jwt.verify(authorizationToken, pem, function (err, payload) {
                if (err) {
                    // if(err.message == "jwt expired"){}
                    throw new Error(err.message);
                }
                payloadData = payload;
            });

            return payloadData;
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}