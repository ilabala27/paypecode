import schema from 'src/common/consts/schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, } from 'typeorm';
import { Address } from '../address.entity';
import { Business } from 'src/module/business/entities/business.entity';
import { BaseEntity } from 'src/common/entity/base/base.entity';


@Entity(schema.address.address_business_mapper)
export class AddressBusinessMapper extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @OneToOne((type) => Address, (address: Address) => address._id)
    @JoinColumn({ name: 'addr_id' })
    public addr_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => Business, (business: Business) => business._id)
    @JoinColumn({ name: 'busi_id' })
    public busi_id: number;
}