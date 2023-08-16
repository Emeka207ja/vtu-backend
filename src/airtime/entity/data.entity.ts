import { BaseTable } from "src/base/baseTable";
import { Entity, Column, ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import { Profile } from "src/profile/entity/profile.entitity";


@Entity()
export class vtData extends BaseTable{
    @Column({type:"varchar"})
    @IsString()
    request_id: string
    
    @Column({type:"varchar"})
    @IsString()
    serviceID: string
    
    @Column({type:"varchar"})
    @IsString()
    phone: string
    
    @Column({type:"int"})
    @IsNumber()
    amount: number
    
    @ManyToOne(() => Profile, (profile) => profile.vtdata)
    profile:Profile
}