import { IsString, IsNumber } from "class-validator";

export class startimesDto{
    @IsString()
    phone: string
    
    @IsString()
    requestId: string
    
    @IsNumber()
    amount: number
}