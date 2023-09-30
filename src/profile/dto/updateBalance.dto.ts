import { IsString, IsNotEmpty, IsNumber, IsPositive,IsEnum ,NotContains} from "class-validator";

export enum balanceUpdateType{
    ADDITION= "add",
    SUBSTRACTION = "minus"
}
export class updateBalanceDto{
    @IsString()
    @IsNotEmpty()
    @NotContains(" ")
    @IsEnum(balanceUpdateType)
    type: balanceUpdateType;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    amount:number
}

export class getuserDto{
    @IsString()
    @IsNotEmpty()
    @NotContains(" ")
    name:string
}