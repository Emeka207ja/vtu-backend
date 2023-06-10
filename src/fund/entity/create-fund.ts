import { Entity, Column,ManyToOne } from "typeorm";
import { IsString, IsNumber,IsNotEmpty } from "class-validator";
import { BaseTable } from "src/base/baseTable";
import { Profile } from "src/profile/entity/profile.entitity";

@Entity()
export class Fund extends BaseTable{
    @Column()
    @IsNumber()
    amount: number
    
    @Column()
    @IsNumber()
    transaction_id: number
    
    @Column()
    @IsString()
    status: string;

    @ManyToOne(() => Profile, (profile) => profile.fund)
    profile:Profile
}

