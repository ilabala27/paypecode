import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import fetch from 'cross-fetch';
import { isNil } from 'lodash';
import { IS_PUBLIC_KEY } from '../grant/default.grant';
import { ConfigService } from '@nestjs/config';
import { UNAUTHORIZED_REQUEST } from 'src/common/methods/handler.methods';
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

        if (isPublic) return true;

        const request: any = context.switchToHttp().getRequest<Request>();
        const { authorization, idtoken } = request.headers;

        let token = '';
        if (Array.isArray(authorization)) token = authorization[0];
        else token = authorization;

        const tokenArray = token?.split(' ', 2) ?? []
        if (tokenArray?.length != 2 || tokenArray[0]?.toLowerCase() !== 'bearer')
            UNAUTHORIZED_REQUEST(`Invalid bearer token`)
        else
            return await this.validateAccessToken(request, tokenArray[1], idtoken);
    }

    private async validateAccessToken(request: any, accessToken: string, idToken: string): Promise<any> {
        let pems = {};
        if (isNil(accessToken)) {
            UNAUTHORIZED_REQUEST(`Invalid bearer token`)
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

            // # Decode tokens
            const decodedAccessToken = jwt.decode(accessToken, { complete: true });
            const decodedIdToken: any = await jwt.decode(idToken, { complete: true });
            if (!decodedAccessToken || !decodedIdToken) {
                UNAUTHORIZED_REQUEST(`Invalid bearer token`)
            }

            // # Verify Access token
            const kid = decodedAccessToken.header.kid;
            const pem = pems[kid];
            if (!pem) {
                UNAUTHORIZED_REQUEST(`Invalid bearer token`);
            }

            jwt.verify(accessToken, pem, function (err) {
                if (err) UNAUTHORIZED_REQUEST(err.message)
            });

            // console.log(">> Access token", decodedAccessToken.payload)
            // console.log(">> Id token", decodedIdToken.payload)
            request.body.user = decodedIdToken.payload
            return true;
        } catch (err) {
            UNAUTHORIZED_REQUEST(err.message)
        }
    }
}