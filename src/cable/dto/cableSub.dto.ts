import { IsString,IsNumber } from "class-validator";

export class CableDto{
    @IsString()
    smartcard: string
    
    @IsString()
    variation_id: string
    
    @IsString()
    phone: string
    
    @IsString()
    plan: string
    
    @IsString()
    service_id: string
    
    @IsNumber()
    amount:number
}