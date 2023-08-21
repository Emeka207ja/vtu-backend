 /* tslint:disable-next-line */
import { Entity, Column,ManyToOne } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import { BaseTable } from "src/base/baseTable";
import { Profile } from "src/profile/entity/profile.entitity";

 
@Entity()

export class postPaidEntity extends BaseTable{
   @Column()
    @IsString()
    requestId: string;

    @Column({default:""})
    @IsString()
    product_name: string;

    @Column({default:""})
    @IsString()
    purchased_code: string;

    @Column()
    @IsNumber()
    amount: number;

    @ManyToOne(() => Profile, (profile) => profile.postpaidElectric)
    profile:Profile
}