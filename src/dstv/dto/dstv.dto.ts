import { IsString, IsNumber } from "class-validator";

export class dstvDto{
    @IsString()
    phone: string
    
    @IsString()
    requestId: string
    
    @IsNumber()
    amount: number
}