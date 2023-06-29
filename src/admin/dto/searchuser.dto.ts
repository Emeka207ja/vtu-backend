import { IsString,IsNotEmpty } from "class-validator";

export class searchUserDto{
    @IsString()
    @IsNotEmpty()
    username:string
}