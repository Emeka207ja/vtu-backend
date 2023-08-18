import { IsString, IsNumber } from "class-validator";

export class vehicleInsureDto{
    @IsString()
    product_name: string;

    @IsString()
    requestId: string;

    @IsString()
    certUrl: string;

    @IsNumber()
    amount: number;
}