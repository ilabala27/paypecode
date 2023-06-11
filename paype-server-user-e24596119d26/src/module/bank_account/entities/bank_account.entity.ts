import schema from "src/common/consts/schema";
import { BaseEntity } from "src/common/entity/base/base.entity";
import { Column, Entity, } from "typeorm";

@Entity(schema.bank_account.bank_account)
export class BankAccount extends BaseEntity {
    // ### Info column
    @Column({ type: 'varchar', nullable: false })
    public bank_acco_type: string;

    @Column({ type: 'varchar', nullable: false })
    public bank_acco_name: string;

    @Column({ type: 'varchar', nullable: false })
    public bank_acco_branch: string;

    @Column({ type: 'varchar', nullable: false })
    public bank_acco_ifsc: string;

    @Column({ type: 'varchar', nullable: false })
    public bank_acco_account_name: string;

    @Column({ type: 'varchar', nullable: false })
    public bank_acco_account_no: string;
}
