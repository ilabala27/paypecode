import { SetMetadata } from '@nestjs/common';

// ### Use GrantGuard decorator to get access to route without authentication or authorization

export const IS_PUBLIC_KEY = 'isPublicRoute';
export const JWTGrantGuard = () => SetMetadata(IS_PUBLIC_KEY, true);