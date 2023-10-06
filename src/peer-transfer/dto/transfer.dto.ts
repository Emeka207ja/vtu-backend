import { IsString, IsNumber,IsPositive } from "class-validator";

export class PeerTransferDto{
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    recieverName:string
}