import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export class loginDto{
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
export class ResetPasswordDto{
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}