import { IsString, IsNumber } from "class-validator";

export class vtDataDto{
    @IsString()
   serviceID: string;

    @IsString()
    phone: string;

    @IsNumber()
    amount: number;

    @IsString()
    request_id: string;
}