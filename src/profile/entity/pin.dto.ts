import { IsNumber } from "class-validator";

export class pinDto{
    @IsNumber()
    pin: number
    
    @IsNumber()
    confirm_pin:number
}