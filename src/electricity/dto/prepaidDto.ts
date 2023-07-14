import { IsNumber, IsString } from "class-validator";

export class prepaidDto{
    
    @IsString()
    response_description: string;

   
    @IsString()
    requestId: string;

    
    @IsString()
    date: string;

    
    @IsString()
    timezone: string;

    
    @IsString()
    utilityName: string;
    
    @IsString()
    mainToken: string

    @IsString()
    purchased_code:string

    
    @IsString()
    exchangeReference: string;

    
    @IsNumber()
    amount: number;

}