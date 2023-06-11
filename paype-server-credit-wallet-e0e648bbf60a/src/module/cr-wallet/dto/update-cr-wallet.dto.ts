import { PartialType } from '@nestjs/mapped-types';
import { CreateCrWalletDto } from './create-cr-wallet.dto';

export class UpdateCrWalletDto extends PartialType(CreateCrWalletDto) { }
