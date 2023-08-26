import { IsString, IsNumber } from "class-validator";

export class showmaxDto{
    @IsString()
    requestId: string
    
    @IsString()
    product_name: string
    
    @IsString()
    phone: string
    
    @IsString()
    purchased_code: string
    
    @IsNumber()
    amount: number
}