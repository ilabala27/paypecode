import { PartialType } from '@nestjs/mapped-types';
import { CreateCrWalletTransactionDto } from './create-cr-wallet-transaction.dto';

export class UpdateCrWalletTransactionDto extends PartialType(CreateCrWalletTransactionDto) { }
