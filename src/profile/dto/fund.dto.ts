import { IsString,IsNumber } from "class-validator";

export class fundDto{
    @IsNumber()
    amount: number;

    @IsNumber()
    transaction_id: number;
    
    @IsString()
    status:string
}