import { IsString ,IsNumber} from "class-validator";

export class subElectricDto{
    @IsString()
    meter_number: string;

    @IsString()
    phone: string

    @IsNumber()
    amount: number;

    @IsNumber()
    order_id: number;
    
}