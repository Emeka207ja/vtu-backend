import { BaseTable } from "src/base/baseTable";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { IsString, IsNumber } from "class-validator";

@Entity()
export class smileEntity extends BaseTable{
    @Column()
    @IsString()
    requestId: string
    
    @Column()
    @IsNumber()
    amount: number
    
    @Column()
    @IsString()
    phone: string
    
    @ManyToOne(() => Profile, (profile) => profile.smile)
    profile:Profile
}