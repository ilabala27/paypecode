import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import schema, { ENUM_WALLET_CURRENCY, ENUM_WALLET_TRANSACTION_STATUS, ENUM_WALLET_TRANSACTION_TYPE } from "src/common/consts/schema";

@Entity(schema.cr_wallet_transaction)
export class CrWalletTransaction {
    // ### Basic columns
    @Column({ type: 'varchar', nullable: false })
    public cwtr_transacted_user_id: string;

    @Column({ type: 'varchar', nullable: false, default: '' })
    public cwtr_session_id: string;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_user_id: string;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_wallet_id: string;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_transaction_id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public cwtr_id: string;

    // ### Usecase columns
    @Column({ type: 'varchar', nullable: false, default: 'INR' })
    public cwtr_currency: ENUM_WALLET_CURRENCY;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_type: ENUM_WALLET_TRANSACTION_TYPE;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_status: ENUM_WALLET_TRANSACTION_STATUS;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_short_description: string;

    @Column({ type: 'varchar', nullable: false })
    public cwtr_description: string;

    @Column({ type: 'numeric', nullable: false, precision: 32, scale: 8, default: 0 })
    public cwtr_actual_credit: number;

    @Column({ type: 'numeric', nullable: false, precision: 32, scale: 8, default: 0 })
    public cwtr_before_credit: number;

    @Column({ type: 'numeric', nullable: false, precision: 32, scale: 8, default: 0 })
    public cwtr_after_credit: number;

    @Column({ type: 'numeric', nullable: false, precision: 32, scale: 8, default: 0 })
    public cwtr_current_credit: number;

    @Column({ type: 'numeric', nullable: false, precision: 32, scale: 8, default: 0 })
    public cwtr_transaction_amount: number;

    // ### Opertaional columns
    @PrimaryGeneratedColumn()
    public _id!: number;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    public cwtr_created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: false })
    public cwtr_updated_at!: Date;

    @VersionColumn({ nullable: false })
    public cwtr_data_version!: number;

    @Column({ type: 'varchar', nullable: false, default: '' })
    public cwtr_remark: string;

    @Column({ type: 'varchar', nullable: false, default: '' })
    public cwtr_note: string;
}
