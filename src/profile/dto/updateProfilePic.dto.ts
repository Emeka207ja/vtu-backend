import { IsString, IsNotEmpty } from "class-validator";

export class updateProfilePicDto{
    @IsString()
    @IsNotEmpty()
    image:string
}