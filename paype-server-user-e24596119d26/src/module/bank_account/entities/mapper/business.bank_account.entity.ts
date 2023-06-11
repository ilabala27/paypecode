import schema from 'src/common/consts/schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, } from 'typeorm';
import { Business } from 'src/module/business/entities/business.entity';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import { BankAccount } from '../bank_account.entity';


@Entity(schema.bank_account.bank_account_business_mapper)
export class BankAccountBusinessMapper extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @OneToOne((type) => BankAccount, (bankAccount: BankAccount) => bankAccount._id)
    @JoinColumn({ name: 'bank_acco_id' })
    public bank_acco_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => Business, (business: Business) => business._id)
    @JoinColumn({ name: 'busi_id' })
    public busi_id: number;
}