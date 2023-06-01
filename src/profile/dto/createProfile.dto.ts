import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class createProfileDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email:string
}