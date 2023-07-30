import { IsString, IsNumber,IsNotEmpty } from "class-validator";

export class dataDto{
    @IsString()
    @IsNotEmpty()
    plan_id: string
    
    @IsString()
    @IsNotEmpty()
    network: string
    
    @IsString()
    @IsNotEmpty()
    size: string
    
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsNumber()
    @IsNotEmpty()
    price:number
}