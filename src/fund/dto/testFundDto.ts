import { IsString, IsNumber} from "class-validator";

export class testFundDto{
    @IsString()
    username: string;
    
    @IsNumber()
    amount:number
}