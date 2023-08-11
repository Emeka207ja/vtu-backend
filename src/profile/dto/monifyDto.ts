import { IsString } from "class-validator";

export class monifyDto{
    @IsString()
    bankCode: string;
    @IsString()
    bankName: string;
    @IsString()
    accountNumber: string;
    @IsString()
    accountName: string
    @IsString()
    accountReference: string
}