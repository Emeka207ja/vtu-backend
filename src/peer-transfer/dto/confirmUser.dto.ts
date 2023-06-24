import { IsString } from "class-validator"

export class userDto{
    @IsString()
    username:string
}