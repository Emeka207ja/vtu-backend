import { Profile } from "src/profile/entity/profile.entitity";
import { BaseTable } from "src/base/baseTable";
import { Entity, Column, ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";

@Entity()

export class vehicleEntitity extends BaseTable{
    @Column({type:"varchar"})
    @IsString()
    product_name: string;

    @Column({type:"varchar"})
    @IsString()
    requestId: string;

    @Column({type:"varchar"})
    @IsString()
    certUrl: string;

    @Column({type:"numeric"})
    @IsNumber()
    amount: number;

    @ManyToOne(() => Profile, (profile) => profile.vehicle)
    profile:Profile
}