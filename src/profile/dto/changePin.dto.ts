import { IsNumber, IsNotEmpty } from "class-validator";

export class changePinDto{
    @IsNumber()
    @IsNotEmpty()
    newPin: number;

    @IsNumber()
    @IsNotEmpty()
    oldPin: number;


}