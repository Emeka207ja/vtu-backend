import { Entity, Column,ManyToOne } from "typeorm";
import { BaseTable } from "src/base/baseTable";
import { Profile } from "src/profile/entity/profile.entitity";
import { IsString,IsNumber } from "class-validator";

@Entity()

export class Cable extends BaseTable{
    @Column()
    @IsString()
    smartcard: string;
    
    @Column()
    @IsString()
    variation_id: string;
    
    @Column()
    @IsString()
    phone: string;
    
    @Column()
    @IsString()
    plan: string;
    
    @Column()
    @IsString()
    service_id: string;

    @Column()
    @IsNumber()
    amount: number;

    @ManyToOne(() => Profile, (profile) => profile.cable)
    profile:Profile
}