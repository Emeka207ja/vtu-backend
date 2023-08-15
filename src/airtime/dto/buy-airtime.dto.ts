import { IsString, IsNumber } from "class-validator";

export class airtimePurchaseDto{
    @IsString()
    network: string;

    @IsString()
    phone: string;

    @IsNumber()
    Amount: number;

    @IsString()
    order_id: string;
}