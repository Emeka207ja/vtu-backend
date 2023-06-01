import { Entity, Column, Index,OneToOne,JoinColumn } from "typeorm";
import { IsString,IsPhoneNumber,IsEmail,IsEnum, IsBoolean } from "class-validator";
import { BaseTable } from "src/base/baseTable";
import { Auth } from "src/auth/entity/auth.entity";



export enum Gender{
    Male = "male",
    Female = "female",
    Other = "other"
}
@Entity()
export class Profile extends BaseTable {
    @Column({
        type:"varchar",default:null
    })
    @IsEmail()
    @Index()
    email: string;

    @Column({
        type:"text",default:null
    })
    @IsString()
    firstname: string;

    @Column({type:"text", default: null})
    @IsString()
    lastname: string;

    @Column({type:"text", default: null})
    @IsString()
    username: string;

    @Column({
        type: "text", default: null
    })
    @IsPhoneNumber()
    @Index()
    phone: string;

    @Column({type:"enum",enum:Gender,default:null})
    @IsEnum(Gender)
    gender: Gender;

    @Column({type:"boolean",default:false})
    @IsBoolean()
    verified: boolean;

    @Column({ type: "text", default: null })
    @IsString()
    image: string;

    
    @OneToOne(()=>Auth, (auth)=>auth.profile)
    @JoinColumn()
    auth:Auth
}
