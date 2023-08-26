import { BaseTable } from "src/base/baseTable";
import { Entity, ManyToOne, Column } from "typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { IsString, IsNumber } from "class-validator";

@Entity()
export class DstvEntity extends BaseTable{
    @Column()
    @IsString()
    phone: string
    
    @Column()
    @IsString()
    requestId: string
    
    @Column()
    @IsNumber()
    amount: number
    
    @ManyToOne(() => Profile, (profile) => profile.dstv)
    profile:Profile
}