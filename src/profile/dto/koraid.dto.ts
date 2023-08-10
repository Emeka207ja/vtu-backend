import { IsString,IsNotEmpty } from "class-validator";

export class koraIdDto{
    @IsString()
    @IsNotEmpty()
    reference:string
}