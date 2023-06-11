import schema, { ENUM_DOCUMENT_TYPE } from 'src/common/consts/schema';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity(schema.document)
export class Document extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'docu_user_id' })
    public docu_user_id: number;

    // ### Info column
    @Column({ type: 'varchar', enum: ENUM_DOCUMENT_TYPE })
    public docu_type: ENUM_DOCUMENT_TYPE;

    @Column({ type: 'varchar', nullable: false })
    public docu_name: string;

    @Column({ type: 'varchar', default: '' })
    public docu_no: string;

    @Column({ type: 'varchar', default: '' })
    public docu_desc: string;

    @Column({ type: 'varchar', default: '' })
    public docu_remark: string;

    @Column({ type: 'varchar', nullable: false })
    public docu_media_name: string;

    @Column({ type: 'varchar', nullable: false })
    public docu_media_key: string;

    @Column({ type: 'varchar', nullable: false })
    public docu_media_type: string;

    @Column({ type: 'varchar' })
    public docu_media_size: string;
}