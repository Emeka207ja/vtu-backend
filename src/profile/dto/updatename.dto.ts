import { IsString, IsNotEmpty } from "class-validator";

export class updatenameDto{
    @IsString()
    @IsNotEmpty()
    name:string
}