import { IsNumber, IsString } from "class-validator";

export class postpaidDto{
    @IsString()
    requestId: string;
    @IsString()
    product_name: string;
    @IsString()
    purchased_code: string;
    @IsNumber()
    amount: number;
}