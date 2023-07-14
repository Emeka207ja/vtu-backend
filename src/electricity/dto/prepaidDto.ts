import { IsNumber, IsString } from "class-validator";

export class prepaidDto{
  
    @IsString()
    requestId: string;

    
    @IsString()
    date: string;
    
    @IsString()
    utilityName: string;
    
    @IsString()
    mainToken: string

    @IsString()
    purchased_code:string


    
    @IsNumber()
    amount: number;

}