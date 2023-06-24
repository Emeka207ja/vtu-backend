import { Entity, Column, ManyToOne } from "typeorm";
import { BaseTable } from "src/base/baseTable";
import { IsString, IsNumber,IsEnum } from "class-validator";
import { Profile } from "src/profile/entity/profile.entitity";

  export enum Type{
      Debit = "debit",
      Credit = "credit"
    }
@Entity()
export class Peer extends BaseTable{
  
    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsString()
    recieverName: string;
  
    @Column()
    @IsString()
    type: string;

    @ManyToOne(()=>Profile,(profile)=>profile.p2p)
    sender: Profile
  
    @ManyToOne(()=>Profile,(profile)=>profile.p2p)
    receiver:Profile
}