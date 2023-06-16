import { IsString } from "class-validator";
export class referralDto{ 
    @IsString()
    username:string
}