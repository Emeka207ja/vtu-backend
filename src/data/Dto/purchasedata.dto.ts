import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class dataPurchaseDto{
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}