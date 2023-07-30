import { BaseTable } from "src/base/baseTable";
import { Entity, Column } from "typeorm";
import { IsString,IsNumber } from "class-validator";

@Entity()

export class dataEntity extends BaseTable{
    @Column()
    @IsString()
    plan_id: string
    
    @Column()
    @IsString()
    network: string
    
    @Column()
    @IsString()
    size: string
    
    @Column()
    @IsString()
    name: string
    
    @Column({type:"int"})
    @IsNumber()
    price:number
}