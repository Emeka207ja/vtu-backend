import { IsString, IsNumber } from "class-validator";

export class homeInsureDto{
    @IsString()
    product_name: string;

    @IsString()
    requestId: string;

    @IsNumber()
    total_amount: number;
}