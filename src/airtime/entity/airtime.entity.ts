import { Entity, Column, ManyToOne } from "typeorm"
import { IsString,  IsNumber } from "class-validator"
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
    @IsString()
    phone: string;

    @Column()
    @IsNumber()
    Amount: number;

    @Column()
    @IsNumber()
    order_id: number;

    @ManyToOne(()=>Profile,(profile)=>profile.airtime)
    profile:Profile
}