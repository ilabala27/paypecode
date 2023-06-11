
import schema, { addr_type } from 'src/common/consts/schema';
import serverConst from 'src/common/consts/server.const';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, } from 'typeorm';

@Entity(schema.country)
export class Country extends BaseEntity {
    // ### Info column
    @Column({ type: 'varchar', length: 255 })
    public coun_name: string;
}

@Entity(schema.state)
export class State extends BaseEntity {
    // ### Info column
    @Column({ type: 'varchar', length: 255 })
    public stat_name: string;
}

@Entity(schema.district)
export class District extends BaseEntity {
    // ### Info column
    @Column({ type: 'varchar', length: 255 })
    public dist_name: string;
}

@Entity(schema.postal_code)
export class PostalCode extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => Country, (country: Country) => country._id)
    @JoinColumn({ name: 'post_coun_id' })
    public post_coun_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => State, (state: State) => state._id)
    @JoinColumn({ name: 'post_stat_id' })
    public post_stat_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => District, (district: District) => district._id)
    @JoinColumn({ name: 'post_dist_id' })
    public post_dist_id: number;

    // ### Info column
    @Column({ type: 'varchar', length: 255 })
    public post_code: number;

    @Column({ type: 'varchar', length: 255 })
    public post_area: string;
}

@Entity(schema.address.address)
export class Address extends BaseEntity {
    // ### Relationship column
    @Column({ type: 'varchar', nullable: false })
    @ManyToOne((type) => PostalCode, (postalCode: PostalCode) => postalCode._id)
    @JoinColumn({ name: 'addr_post_id' })
    public addr_post_id: number;

    // ### Info column
    @Column({ type: 'varchar', enum: addr_type, length: 255 })
    public addr_type: string;

    @Column({ type: 'varchar', length: 255 })
    public addr_line1: string;

    @Column({ type: 'varchar', length: 255 })
    public addr_line2: string;

    @Column({ type: 'varchar', length: 255 })
    public addr_landmark: string;

    @Column({ type: 'varchar' })
    public addr_lat: string;

    @Column({ type: 'varchar' })
    public addr_long: string;
}
