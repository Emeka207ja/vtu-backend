import { BaseTable } from "src/base/baseTable";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { IsString, IsNumber,IsOptional } from "class-validator";

@Entity()
export class smileEntity extends BaseTable{
    @Column({type:"varchar"})
    @IsString()
    requestId: string
    
    @Column({type:"numeric"})
    @IsNumber()
    amount: number
    
    @Column({type:"varchar"})
    @IsString()
    phone: string;

    
    @ManyToOne(() => Profile, (profile) => profile.smile)
    profile:Profile
}