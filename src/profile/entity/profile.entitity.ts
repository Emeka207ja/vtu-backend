import { Entity, Column, Index,OneToOne,JoinColumn,OneToMany } from "typeorm";
import { IsString,IsPhoneNumber,IsEmail,IsEnum, IsBoolean,IsNumber, IsOptional} from "class-validator";
import { BaseTable } from "src/base/baseTable";
import { Auth } from "src/auth/entity/auth.entity";
import { Fund } from "src/fund/entity/create-fund";
import { Peer } from "src/peer-transfer/entity/peer.entity";
import { Airtime } from "src/airtime/entity/airtime.entity";
import { Cable } from "../../cable/entity/Cable.entity";
import { Electric } from "src/electricity/entity/electric.entity";


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

    @Column({type:"text",default:null, unique:true})
    @IsString()
    name: string;

    @Column({ default: 0})
    @IsNumber()
    balance: number;

    @Column({ default: 0})
    @IsNumber()
    point: number;

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

    @Column({type:"int",default:1111})
    @IsNumber()
    pin: number;

    @Column({type:"boolean",default:false})
    @IsBoolean()
    defaultPinChanged: boolean;

    @Column({ type: "text", default: null })
    @IsString()
    image: string;

    @Column({type:"bool",default:"false"})
    @IsOptional()
    @IsBoolean()
    isReferred: boolean

    @Column({type:"bool",default:"false"})
    @IsOptional()
    @IsBoolean()
    isFunded: boolean

   
    
    @Column({type:"text",default:null})
    @IsOptional()
    @IsString()
    ReferredBy: string
    
    @Column({type:"integer",default:0})
    @IsOptional()
    @IsNumber()
    ReferralCount: number
    
    @Column({type:"integer",default:0})
    @IsOptional()
    @IsNumber()
    TotalReferred:number

    
    @OneToOne(() => Auth, (auth) => auth.profile)
    @JoinColumn()
    auth: Auth;

    @OneToMany(() => Fund, (fund) => fund.profile)
    fund: Fund[]

    @OneToMany(() => Peer, (peer) => peer.sender)
    p2p: Peer[]

    @OneToMany(() => Airtime, (airtime) => airtime.profile)
    airtime: Airtime[]

    @OneToMany(() => Cable, (cable) => cable.profile)
    cable: Cable[]

    @OneToMany(() => Electric, (electric) => electric.profile)
    electric: Electric[]
    
}
