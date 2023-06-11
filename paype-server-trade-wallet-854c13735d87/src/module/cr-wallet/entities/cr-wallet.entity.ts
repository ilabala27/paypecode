import schema, { ENUM_WALLET_CURRENCY } from "src/common/consts/schema";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity(schema.cr_wallet)
export class CrWallet {
    // Status column
    @Column({ type: 'boolean', default: false })
    public crwa_is_active: boolean;

    @Column({ type: 'timestamptz', nullable: true, default: null })
    public crwa_is_actived_at: Date;

    @Column({ type: 'boolean', default: false })
    public crwa_is_deleted: boolean;

    @Column({ type: 'timestamptz', nullable: true, default: null })
    public crwa_is_deleted_at: Date;

    @Column({ type: 'boolean', default: false })
    public crwa_is_blocked: boolean;

    @Column({ type: 'timestamptz', nullable: true, default: null })
    public crwa_is_blocked_at: Date;

    // ### Wallet columns
    @Column({ type: 'varchar', nullable: false, unique: true })
    public crwa_user_id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public crwa_id: string;

    @Column({ type: 'varchar', nullable: false })
    public crwa_currency: ENUM_WALLET_CURRENCY;

    @Column({ type: 'boolean', default: false })
    public crwa_is_wallet_credit_enabled: boolean;

    @Column({ type: 'numeric', precision: 32, scale: 8, default: 0 })
    public crwa_wallet_credit: number;

    @Column({ type: 'boolean', default: false })
    public crwa_is_blocked_credit_enabled: boolean;

    @Column({ type: 'numeric', precision: 32, scale: 8, default: 0 })
    public crwa_blocked_credit: number;

    // ### Opertaional columns
    @PrimaryGeneratedColumn()
    public _id!: number;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    public crwa_created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: false })
    public crwa_updated_at!: Date;

    @VersionColumn({ nullable: false })
    public crwa_data_version!: number;

    @Column({ type: 'varchar', default: '' })
    public crwa_remark: string;

    @Column({ type: 'varchar', default: '' })
    public crwa_note: string;
}