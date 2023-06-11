import schema from 'src/common/consts/schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, } from 'typeorm';
import { User } from 'src/module/user/entities/user.entity';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import { BankAccount } from '../bank_account.entity';


@Entity(schema.bank_account.bank_account_user_mapper)
export class BankAccountUserMapper extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @OneToOne((type) => BankAccount, (bankAccount: BankAccount) => bankAccount._id)
    @JoinColumn({ name: 'bank_acco_id' })
    public bank_acco_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'user_id' })
    public user_id: number;
}