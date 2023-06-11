import schema, { ENUM_REGISTRATION_STATUS, ENUM_USER_TYPE } from 'src/common/consts/schema';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert, AfterInsert, OneToOne, CreateDateColumn } from 'typeorm';


@Entity(schema.user)
export class User extends BaseEntity {
    // ### Status column
    @Column({ type: 'varchar', nullable: false, default: "INITIATED", enum: ENUM_REGISTRATION_STATUS })
    public user_registration_status: ENUM_REGISTRATION_STATUS;

    @Column({ type: 'boolean', nullable: false, default: false })
    public user_is_profile_updated: boolean;

    @Column({ type: 'boolean', nullable: false, default: false })
    public user_is_kyc_verified: boolean;

    @Column({ type: 'timestamptz', default: null })
    public user_is_kyc_verified_at: Date;

    @Column({ type: 'boolean', nullable: false, default: false })
    public user_is_account_verified: boolean;

    @Column({ type: 'timestamptz', default: null })
    public user_is_account_verified_at: Date;

    @Column({ type: 'timestamptz', default: null })
    public user_last_user_logged_in: Date;

    @Column({ type: 'boolean', nullable: false, default: false })
    public user_is_blocked: boolean;

    // ### Info column
    @Column({ type: 'varchar', nullable: false, unique: true })
    public user_aws_id: string;

    @Column({ type: 'varchar', nullable: false, enum: ENUM_USER_TYPE })
    public user_type: ENUM_USER_TYPE;

    @Column({ type: 'varchar', nullable: false })
    public user_role: string;

    @Column({ type: 'varchar', default: '' })
    public user_available_services: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public user_id: string;

    @Column({ type: 'varchar', nullable: true, default: '' })
    public user_fcm: string;

    @Column({ type: 'varchar', nullable: true, default: '' })
    public user_session_id: string;

    @Column({ type: 'varchar', nullable: false })
    public user_mobile_ex: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public user_mobile_no: string;

    @Column({ type: 'varchar', default: '' })
    public user_image: string;

    @Column({ type: 'varchar', default: '' })
    public user_name: string;

    @Column({ type: 'varchar', default: '' })
    public user_email: string;

    @Column({ type: 'varchar', default: '' })
    public user_contact_no: string;

    @Column({ type: 'boolean', default: false, select: false })
    public user_is_password_exist: boolean;

    @Column({ type: 'varchar', default: '', select: false })
    public user_password: string;

    @Column({ type: 'varchar', default: '' })
    public user_created_by_chain: string;

    @Column({ type: 'varchar', default: null })
    public user_org: string;

    @Column({ type: 'varchar', default: null })
    public user_super_distributor: string;

    @Column({ type: 'varchar', default: null })
    public user_distributor: string;

    @Column({ type: 'varchar', default: null })
    @ManyToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'user_created_by' })
    public user_created_by: number;

    @Column({ type: 'varchar', default: null })
    public user_created_by_nano: string;

    @Column({ type: 'varchar', default: null })
    @ManyToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'user_kyc_verified_by' })
    public user_kyc_verified_by: number;

    @Column({ type: 'varchar', default: null })
    @ManyToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'user_account_verified_by' })
    public user_account_verified_by: number;

}