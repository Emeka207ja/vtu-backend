import { BaseTable } from "src/base/baseTable";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { IsString, IsNumber, IsArray } from "class-validator";
import { cards } from "../dto/spectrantDto";

@Entity()
export class spectranetEntity extends BaseTable{
    @Column()
    @IsString()
    requestId: string
    
    @Column()
    @IsNumber()
    amount: number
    
    @Column()
    @IsString()
    phone: string

    @Column()
    @IsString()
    purchased_code: string

    @Column({type:"jsonb"})
    // @IsArray()
    card: cards[]
    
    @ManyToOne(() => Profile, (profile) => profile.spectranet)
    profile:Profile
}