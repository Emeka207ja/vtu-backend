import { Entity, Column, Index,OneToOne,JoinColumn,OneToMany } from "typeorm";
import { IsString,IsPhoneNumber,IsEmail,IsEnum, IsBoolean,IsNumber, IsOptional} from "class-validator";
import { BaseTable } from "src/base/baseTable";
import { Auth, Role } from "src/auth/entity/auth.entity";
import { Fund } from "src/fund/entity/create-fund";
import { Peer } from "src/peer-transfer/entity/peer.entity";
import { Airtime } from "src/airtime/entity/airtime.entity";
import { Cable } from "../../cable/entity/Cable.entity";
import { postPaidEntity } from "src/electricity/entity/postpaid.entity";
import { prepaidEntity } from "src/electricity/entity/prepaid.entity";
import { smileEntity } from "src/smile/entity/smile.entity";
import { spectranetEntity } from "src/smile/entity/spectranet.entity";
import { koraid } from "./koraid.entity";
import { monifyAccountEntity } from "./monifyAcount.entity";
import { vtData } from "src/airtime/entity/data.entity";
import { waecEntity } from "src/education/entity/waec.entity";
import { vehicleEntitity } from "src/insurance/entity/vehicleInsure.entity";
import { homeEntitity } from "src/insurance/entity/homeInsure.entity";
import { showMaxEntity } from "src/showmax/entity/showmax.entity";
import { DstvEntity } from "src/dstv/entity/dstv.entity";
import { GotvEntity } from "src/gotv/entity/gotv.entity";
import { StartimesEntity } from "src/startimes/entity/startimes.entity";
import { debitAccountEntity } from "./debit.entity";

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

    @Column({type:"text",default:null})
    @IsString()
    name: string;

    @Column({ default: 0})
    @IsNumber()
    balance: number;

    @Column({ default: 0})
    @IsNumber()
    point: number;

    @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
    @IsEnum(Role)
    @IsOptional()
    roles: Role[];

    @Column({type:"text", default: null})
    @IsString()
    username: string;

    @Column({type:"varchar",default:"08137663855"})
    @IsString()
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

    @Column({type:"bool",default:"false"})
    @IsOptional()
    @IsBoolean()
    isMonified: boolean

   
    
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

    @OneToMany(() => postPaidEntity, (electric) => electric.profile)
    postpaidElectric: postPaidEntity[]

    @OneToMany(() => prepaidEntity, (PrepaidEntity) => PrepaidEntity.profile)
    prepaid: prepaidEntity[]

    @OneToMany(() => smileEntity, (smile) => smile.profile)
    smile: smileEntity[]

    @OneToMany(() => spectranetEntity, (spectranet) => spectranet.profile)
    spectranet: spectranetEntity[]


    @OneToMany(() => koraid, (kora) => kora.profile)
    koraid:koraid[]
    
    @OneToMany(() => monifyAccountEntity, (monify) => monify.profile)
    monify:monifyAccountEntity[]
    
    
    @OneToMany(() => vtData, (vtdata) => vtdata.profile)
    vtdata: vtData[]
    
    @OneToMany(() => waecEntity, (waec) => waec.profile)
    waec: waecEntity[]
    
    @OneToMany(() => vehicleEntitity, (vehicle) => vehicle.profile)
    vehicle:vehicleEntitity[]
    
    @OneToMany(() => homeEntitity, (home) => home.profile)
    home: homeEntitity[]
    
    @OneToMany(() => showMaxEntity, (showmax) => showmax.profile)
    showmax: showMaxEntity[]
    
    @OneToMany(() => DstvEntity, (dstv) => dstv.profile)
    dstv: DstvEntity[]
    
    @OneToMany(() => GotvEntity, (gotv) => gotv.profile)
    gotv: GotvEntity[]
    
    @OneToMany(() => StartimesEntity, (startimes) => startimes.profile)
    startimes:StartimesEntity[]
    
    @OneToMany(() => debitAccountEntity, (debitAcct) => debitAcct.profile)
    debitAcct:debitAccountEntity[]
    
}
