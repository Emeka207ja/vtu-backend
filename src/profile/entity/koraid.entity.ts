import { BaseTable } from "src/base/baseTable";
import { Entity, Column,ManyToOne} from "typeorm";
import { IsString } from "class-validator";
import { Profile } from "./profile.entitity";

@Entity()
export class koraid extends BaseTable{
    @Column({ type: "varchar" })
    @IsString()
    reference: string;

    @ManyToOne(()=>Profile,(profile)=>profile.koraid)
    profile:Profile
}