import { IsString, IsNumber,IsNotEmpty } from "class-validator";


export class fundUpdateDto{
    @IsString()
    @IsNotEmpty()
    username: string
    
    @IsNumber()
    @IsNotEmpty()
    amount:number
}