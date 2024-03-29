import { IsNumber, IsString } from "class-validator";

export class prepaidDto{
    @IsString()
    requestId: string;
    @IsString()
    product_name: string;
    @IsString()
    purchased_code: string;
    @IsNumber()
    amount: number;
}