import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn()
    public _id!: number;

    @Column({ type: 'boolean', default: true })
    public is_active: boolean;

    @Column({ type: 'boolean', default: true })
    public is_visible: boolean;

    @Column({ type: 'boolean', default: false })
    public is_deleted: boolean;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    public created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: false })
    public updated_at!: Date;

    @VersionColumn({ nullable: false })
    public data_version!: number

    @Column({ type: 'varchar', default: '' })
    public remark: string;

    @Column({ type: 'varchar', default: '' })
    public note: string;
}