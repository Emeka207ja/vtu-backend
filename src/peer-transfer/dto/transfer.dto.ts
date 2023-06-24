import { IsString, IsNumber } from "class-validator";

export class PeerTransferDto{
    @IsNumber()
    amount: number;

    @IsString()
    recieverName:string
}