import { IsString, IsNumber } from "class-validator";


export class waecSubDto{
    @IsString()
    product_name: string
    
    @IsString()
    requestId: string
    
    @IsString()
    purchased_code: string

    @IsNumber()
    amount: number
}