import { BaseTable } from "src/base/baseTable";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { IsString, IsNumber, IsArray } from "class-validator";


@Entity()
export class spectranetEntity extends BaseTable{
    @Column()
    @IsString()
    requestId: string
    
    @Column()
    @IsNumber()
    amount: number
    
    @Column()
    @IsString()
    phone: string

    @Column()
    @IsString()
    purchased_code: string
    @Column()
        
    @IsString()
    product_name: string

    
    @ManyToOne(() => Profile, (profile) => profile.spectranet)
    profile:Profile
}