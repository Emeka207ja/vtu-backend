import { BaseTable } from "src/base/baseTable";
import { Column, ManyToOne,Entity } from "typeorm";
import { IsString,IsNumber } from "class-validator";
import { Profile } from "src/profile/entity/profile.entitity";


@Entity()
export class prepaidEntity extends BaseTable{

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

    @ManyToOne(() => Profile, (profile) => profile.prepaid)
    profile:Profile

}