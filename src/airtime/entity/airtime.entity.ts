import { Entity, Column, ManyToOne } from "typeorm"
import { IsString, IsPhoneNumber, IsNumber } from "class-validator"
import { BaseTable } from "src/base/baseTable"
import { Profile } from "src/profile/entity/profile.entitity"

@Entity()
export class Airtime extends BaseTable{
    @Column()
    @IsString()
    network: string;

    // @Column()
    // @IsString()
    // data_plan: string;

    @Column()
    @IsPhoneNumber()
    phone: string;

    @Column()
    @IsNumber()
    Amount: number;

    @Column()
    @IsString()
    order_id: string;

    @ManyToOne(()=>Profile,(profile)=>profile.airtime)
    profile:Profile
}