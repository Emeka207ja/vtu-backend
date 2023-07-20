import { IsNotEmpty, IsEmail, IsString,IsOptional } from "class-validator";

export class createProfileDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    referralId?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    phone: string;
}