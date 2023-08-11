import { BaseTable } from "src/base/baseTable";
import { Entity, Column, ManyToOne } from "typeorm";
import { Profile } from "./profile.entitity";
import { IsString } from "class-validator";

@Entity()

export class monifyAccountEntity extends BaseTable{
    @Column()
    @IsString()
    bankCode: string;
     
    @Column()
    @IsString()
    bankName: string;

    @Column()
    @IsString()
    accountNumber: string;

    @Column()
    @IsString()
    accountName: string

    @Column()
    @IsString()
    accountReference: string
    
    @ManyToOne(() => Profile, (profile) => profile.monify)
    profile:Profile
}