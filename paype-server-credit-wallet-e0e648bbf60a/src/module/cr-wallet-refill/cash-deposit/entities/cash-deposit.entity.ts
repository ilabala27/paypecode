import schema, { ENUM_CASH_DEPOSIT_STATUS } from "src/common/consts/schema";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity(schema.cash_deposit)
export class CashDeposit {
    @PrimaryGeneratedColumn()
    public _id!: number;

    // ### Opertaional columns
    @Column({ type: 'varchar', default: '' })
    public cade_remark: string;

    @Column({ type: 'varchar', default: '' })
    public cade_note: string;

    @Column({ type: 'boolean', default: true })
    public cade_is_active: Boolean;

    @Column({ type: 'boolean', default: false })
    public cade_is_deleted: Boolean;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    public cade_created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: false })
    public cade_updated_at!: Date;

    @VersionColumn({ nullable: false })
    public cade_data_version!: number;

    @Column({ type: 'varchar', default: '' })
    public cade_status_updated_by: string;

    @Column({ type: 'timestamptz', default: null })
    public cade_status_updated_at: Date;

    // ### Cr Wallet Transaction columns
    @Column({ type: 'varchar', nullable: false })
    public cade_transacted_user_id: string;

    @Column({ type: 'varchar', nullable: false })
    public cade_session_id: string;

    @Column({ type: 'varchar', nullable: false, default: ENUM_CASH_DEPOSIT_STATUS.CREATED })
    public cade_status: ENUM_CASH_DEPOSIT_STATUS;

    @Column({ type: 'varchar', nullable: false })
    public cade_user_id: string;

    @Column({ type: 'varchar', nullable: false })
    public cade_user_wallet_id: string;

    @Column({ type: 'varchar', nullable: false })
    public cade_short_description: string;

    @Column({ type: 'varchar', nullable: false })
    public cade_description: string;

    // Deposit info
    @Column({ type: 'varchar', nullable: false, unique: true })
    public cade_id: string;

    @Column({ type: 'timestamptz', default: null })
    public cade_date: Date;

    @Column({ type: 'varchar', nullable: false })
    public cade_bank_id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public cade_ref_no: string;

    @Column({ type: 'numeric', precision: 32, scale: 8, default: 0 })
    public cade_transaction_amount: number;

    @Column({ type: 'varchar', default: '' })
    public cade_attachment: string;

    @Column({ type: 'varchar', default: '' })
    public cade_other: string;
}