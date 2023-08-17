import { BaseTable } from "src/base/baseTable";
import { Entity, Column, ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import { Profile } from "src/profile/entity/profile.entitity";

@Entity()
export class waecEntity extends BaseTable{
    @Column({type:"varchar"})
    @IsString()
    product_name: string
    
    @Column({type:"varchar"})
    @IsString()
    requestId: string
    
    @Column({type:"varchar"})
    @IsString()
    purchased_code: string
    
    @Column({type:"numeric"})
    @IsNumber()
    amount: number
    
    @ManyToOne(() => Profile, (profile) => profile.waec)
    profile:Profile
}