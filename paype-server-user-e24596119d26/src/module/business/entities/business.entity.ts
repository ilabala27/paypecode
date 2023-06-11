import schema from 'src/common/consts/schema';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity(schema.business)
export class Business extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @OneToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'busi_user_id' })
    public busi_user_id: number;

    // ### Info column
    @Column({ type: 'varchar', default: '' })
    public busi_image: string;

    @Column({ type: 'varchar' })
    public busi_name: string;

    @Column({ type: 'varchar', default: '' })
    public busi_email: string;

    @Column({ type: 'varchar', default: '' })
    public busi_telephone_no: string;

    @Column({ type: 'varchar', default: '' })
    public busi_msme: string;

    @Column({ type: 'varchar', default: '' })
    public busi_ssai: string;
}