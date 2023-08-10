import { IsNumber, IsString } from "class-validator";

export class koraHookResponse{
    @IsString()
    event: string

    @IsNumber()
    amount:number
    
    @IsString()
    fee: string
    
    @IsString()
    currency: string
    
    @IsString()
    status: string
    
    @IsString()
    reference:string
}
