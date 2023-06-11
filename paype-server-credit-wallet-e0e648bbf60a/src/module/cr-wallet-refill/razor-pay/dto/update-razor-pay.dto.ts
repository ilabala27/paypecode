import { PartialType } from '@nestjs/mapped-types';
import { CreateRazorPayDto } from './create-razor-pay.dto';

export class UpdateRazorPayDto extends PartialType(CreateRazorPayDto) {}
