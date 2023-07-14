import { IsString, IsNumber } from "class-validator";

export class subSmileDto{

    @IsString()
    requestId: string
    
    @IsNumber()
    amount: number
    
    @IsString()
    phone: string
}