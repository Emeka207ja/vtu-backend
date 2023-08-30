import { IsString, IsNotEmpty } from "class-validator";

export class usernameDto{
    @IsString()
    @IsNotEmpty()
    username:string
}