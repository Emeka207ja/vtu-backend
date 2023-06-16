import { IsString, IsNotEmpty, IsEmail,IsOptional} from "class-validator"

export class signupDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    referral?: string;

}