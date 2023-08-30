import { BaseTable } from "src/base/baseTable";
import { Entity, Column,ManyToOne } from "typeorm";
import { IsString, IsNumber, IsBoolean,IsEnum } from "class-validator";
import { Profile } from "./profile.entitity";


export enum debitState {
    PENDING = "pending",
    SUCCESS = "success",
    REFUND = "refunded"
}

@Entity()
export class debitAccountEntity extends BaseTable{
    @Column()
    @IsString()
    requestId: string
    
    @Column()
    @IsString()
    service: string
    
    @Column()
    @IsNumber()
    amount: number;

    @Column({type:"enum", enum:debitState, default:debitState.PENDING})
    @IsEnum(debitState)
    success: debitState;

    @ManyToOne(() => Profile, (profile) => profile.debitAcct)
    profile:Profile

}