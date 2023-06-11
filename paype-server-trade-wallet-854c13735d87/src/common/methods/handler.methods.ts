import { HttpException, HttpStatus } from "@nestjs/common";

interface IProps {
    message?: string
}

export const BAD_REQUEST = (props?: IProps) => {
    throw new HttpException({ message: props?.message ?? "Something went wrong, Contact Admin" }, HttpStatus.BAD_REQUEST);
}

export const NOT_FOUND = (props?: IProps) => {
    throw new HttpException({ message: props?.message ?? "No data exist" }, HttpStatus.NOT_FOUND);
}