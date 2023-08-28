import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class dataPurchaseDto{
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    requestId: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
    
}