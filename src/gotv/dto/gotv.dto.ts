import { IsString, IsNumber } from "class-validator";

export class gotvDto{
    @IsString()
    phone: string
    
    @IsString()
    requestId: string
    
    @IsNumber()
    amount: number
}