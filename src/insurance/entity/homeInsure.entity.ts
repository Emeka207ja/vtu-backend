import { Profile } from "src/profile/entity/profile.entitity";
import { BaseTable } from "src/base/baseTable";
import { Entity, Column, ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";

@Entity()

export class homeEntitity extends BaseTable{
    @Column({type:"varchar"})
    @IsString()
    product_name: string;

    @Column({type:"varchar"})
    @IsString()
    requestId: string;

    @Column({type:"numeric"})
    @IsNumber()
    total_amount: number;

    @ManyToOne(() => Profile, (profile) => profile.home)
    profile:Profile
}