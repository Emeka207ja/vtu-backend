import { IsString, IsNumber, IsPhoneNumber } from "class-validator";

export class airtimePurchaseDto{
    @IsString()
    network: string;

    @IsPhoneNumber()
    phone: string;

    @IsNumber()
    Amount: number;

    @IsString()
    order_id: string;
}