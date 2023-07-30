import { IsString, IsNumber,IsOptional,IsNotEmpty } from "class-validator";

export class updatedataDto{
    @IsString()
    @IsOptional()
    plan_id?: string
    
    @IsString()
    @IsOptional()
    network?: string
    
    @IsString()
    @IsOptional()
    size?: string
    
    @IsString()
    @IsOptional()
    name?: string
    @IsNumber()
    @IsOptional()
    price?: number
}