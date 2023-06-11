import schema, { ENUM_DEFAULT_STATUS } from "src/common/consts/schema";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity(schema.razor_pay)
export class RazorPay {
    @PrimaryGeneratedColumn()
    public _id!: number;

    // ### Opertaional columns
    @Column({ type: 'varchar', default: '' })
    public rapa_remark: string;

    @Column({ type: 'varchar', default: '' })
    public rapa_note: string;

    @Column({ type: 'boolean', default: true })
    public rapa_is_active: Boolean;

    @Column({ type: 'boolean', default: false })
    public rapa_is_deleted: Boolean;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    public rapa_created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: false })
    public rapa_updated_at!: Date;

    @VersionColumn({ nullable: false })
    public rapa_data_version!: number;

    // ### Meta columns
    @Column({ type: 'varchar', nullable: false })
    public rapa_transacted_user_id: string;

    @Column({ type: 'varchar', nullable: false })
    public rapa_session_id: string;

    @Column({ type: 'varchar', nullable: false })
    public rapa_user_id: string;

    @Column({ type: 'varchar', nullable: false })
    public rapa_user_wallet_id: string;

    @Column({ type: 'varchar', nullable: false, default: ENUM_DEFAULT_STATUS.CREATED })
    public rapa_status: ENUM_DEFAULT_STATUS;

    @Column({ type: 'varchar', nullable: false })
    public rapa_short_description: string;

    @Column({ type: 'varchar', nullable: false })
    public rapa_description: string;

    // Deposit info
    @Column({ type: 'varchar', nullable: false, unique: true })
    public rapa_id: string;

    @Column({ type: 'varchar', nullable: true })
    public rapa_ref_no: string;

    @Column({ type: 'numeric', precision: 32, scale: 8, default: 0 })
    public rapa_transaction_amount: number;
}