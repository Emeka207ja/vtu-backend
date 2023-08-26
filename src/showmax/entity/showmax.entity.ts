import { BaseTable } from "src/base/baseTable";
import { Column, Entity, ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import { Profile } from "src/profile/entity/profile.entitity";

@Entity()
export class showMaxEntity extends BaseTable {
    @Column()
    @IsString()
    requestId: string
    
    @Column()
    @IsString()
    product_name: string
    
    @Column()
    @IsString()
    phone: string
    
    @Column()
    @IsString()
    purchased_code: string
    
    @Column()
    @IsNumber()
    amount: number
    
    @ManyToOne(() => Profile, (profile) => profile.showmax)
    profile:Profile
}