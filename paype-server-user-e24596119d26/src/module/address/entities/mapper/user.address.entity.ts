import schema from 'src/common/consts/schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, } from 'typeorm';
import { Address } from '../address.entity';
import { User } from 'src/module/user/entities/user.entity';
import { BaseEntity } from 'src/common/entity/base/base.entity';


@Entity(schema.address.address_user_mapper)
export class AddressUserMapper extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @OneToOne((type) => Address, (address: Address) => address._id)
    @JoinColumn({ name: 'addr_id' })
    public addr_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => User, (user: User) => user._id)
    @JoinColumn({ name: 'user_id' })
    public user_id: number;
}