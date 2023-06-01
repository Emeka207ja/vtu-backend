import { IsString, IsOptional,IsEnum,IsPhoneNumber } from "class-validator";
import { Gender } from "../entity/profile.entitity";

export class updateProfileDto{
    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsString()
    @IsOptional()
    @IsEnum(Gender)
    gender:Gender
    
     @IsPhoneNumber()
    @IsOptional()
    phone:string
}