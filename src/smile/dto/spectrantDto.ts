import { IsNumber, IsString } from "class-validator"

export class spectranetDto{

    @IsString()
    requestId: string;
    
    @IsNumber()
    amount: number
    
    @IsString()
    phone: string

    @IsString()
    purchased_code: string
        
    @IsString()
    product_name: string
}