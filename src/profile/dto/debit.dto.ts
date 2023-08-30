import { IsString, IsNumber, IsEnum } from "class-validator";
export class debitDto{
    
    @IsString()
    requestId: string

    @IsString()
    service: string

    @IsNumber()
    amount: number;
}