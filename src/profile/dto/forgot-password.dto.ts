import { IsString,IsEmail,IsNotEmpty } from "class-validator"

export class ForgotPasswordDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string
}