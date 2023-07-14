 /* tslint:disable-next-line */
import { Entity, Column,ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import { BaseTable } from "src/base/baseTable";
import { Profile } from "src/profile/entity/profile.entitity";

 
@Entity()

export class Electric extends BaseTable{
    @Column()
    @IsString()
    meter_number: string;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsNumber()
    order_id: number;

    @Column()
    @IsString()
    phone: string;

    @Column({default:""})
    @IsString()
    mainToken: string;

    @Column({default:""})
    @IsString()
    bonusToken: string;

    @ManyToOne(() => Profile, (profile) => profile.electric)
    profile:Profile
}