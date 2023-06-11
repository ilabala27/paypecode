import { HttpException, HttpStatus } from "@nestjs/common";


export const BAD_REQUEST = (message?: string) => {
    throw new HttpException(message ?? "Bad request", HttpStatus.BAD_REQUEST);
}

export const NOFOUND_REQUEST = (message?: string) => {
    throw new HttpException(message ?? "No data found", HttpStatus.NOT_FOUND);
}

export const UNAUTHORIZED_REQUEST = (message?: string) => {
    throw new HttpException(message ?? "Unauthorized access", HttpStatus.UNAUTHORIZED);
}