import { Entity, Column, Index, BeforeInsert,OneToOne } from "typeorm"
import * as bcrypt from "bcrypt"

import { IsString,IsEmail,IsEnum,IsOptional, IsBoolean } from "class-validator"
import { BaseTable } from "src/base/baseTable"

import { Profile } from "src/profile/entity/profile.entitity"

export enum Role{
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class Auth extends BaseTable
{
    @Column({
        type:"varchar",unique:true
    })
    @Index()
    @IsString()
    username: string;

    @Column({type:"text"})
    @IsString()
    password: string;

    @Column({type:"text",default:null})
    @IsString()
    name: string;

    @Column({type:"varchar",default:"08137663855"})
    @IsString()
    phone: string;

    @Column({
        type:"varchar",unique:true
    })
    @Index()
    @IsEmail()
    email: string;

    @Column({
        type: "enum", enum:Role ,array:true, default:[Role.USER]
    })
    @IsEnum(Role)
    @IsOptional()
    role: Role[];

    @OneToOne(()=>Profile,(profile)=>profile.auth)
    profile:Profile
    

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async verifyPassword(password: string,hash:string): Promise<boolean> {
        
        const compare = await bcrypt.compare(password, hash);
        return compare;
    }

    @BeforeInsert()
    async encryptPassword() {
        this.username = this.username.toLowerCase();
        if (this.password) this.password = await this.hashPassword(this.password);
    }
}