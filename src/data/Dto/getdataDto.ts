import { IsString, IsNotEmpty } from "class-validator";

export class dataParam{
    @IsString()
    @IsNotEmpty()
    network: string;
}