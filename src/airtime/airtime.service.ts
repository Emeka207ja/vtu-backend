import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Airtime } from './entity/airtime.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { airtimePurchaseDto } from './dto/buy-airtime.dto';
import { EmailService } from 'src/data/email.service';
import { purchaseEmail } from 'src/data/interface/ipurchaseemail';
import { vtData } from './entity/data.entity';
import { vtDataDto } from './entity/vtdata.dto';


@Injectable()
export class AirtimeService {
    constructor(
        @InjectRepository(Airtime) private readonly airtimeRepository: Repository<Airtime>,
        @InjectRepository(vtData) private readonly vtDataRepository: Repository<vtData>,
        private readonly profileService: ProfileService,
        private readonly emailService:EmailService,
    ) { }
    
    async createAirtimePurchase(id: string, details: airtimePurchaseDto) {
        const { Amount,phone,order_id } = details
        if (Amount <= 0) {
            throw new BadRequestException("invalid Amount")
        }
        const user = await this.profileService._find(id)
        const airtime = this.airtimeRepository.create(details);
        airtime.profile = user
        await this.profileService.debitAccount(id, Amount);
        await this.profileService.updatePoint(id,Amount)
        await this.airtimeRepository.save(airtime)

        const {email,name} = user
        const payload: purchaseEmail = {
            name,
            phone,
            price: Amount,
            requestId:order_id
        }
        await this.emailService.sendAirtimePurchaseMail(email,"airtime purchase",payload)
        return airtime.id
    }

    async fetchAllAirtimePurchase(id: string) {
        console.log(id)
        const allAirtime = await this.airtimeRepository.find({
            where:{profile:{id}}
        })
        return allAirtime;
    }

    async deleteAirtimeHistory(id: string) {
        const Qbuilder = this.airtimeRepository.createQueryBuilder("airtime")
            .leftJoin("airtime.profile", "profile")
             .where("profile = :id",{id})
            
           
        // await this.airtimeRepository.remove()
       
    }

    async storeDataSub(id: string, detail: vtDataDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user does not exist")
        }
        const { amount,request_id } = detail
        await this.profileService.debitAccount(id, amount)
        const vtdata = this.vtDataRepository.create(detail)
        vtdata.profile = user;
        await this.vtDataRepository.save(vtdata)

        //email service
        const { name,email } = user
        const {phone} = detail
        const payload: purchaseEmail = {
            name,
            phone,
            price: amount,
            requestId:request_id
        }
        await this.emailService.sendAirtimePurchaseMail(email, "data purchase", payload)
        
        //end of mail service
        return vtdata.id
    }

    async getUserVtData(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user does not exist")
        }
        const qBuilder = this.vtDataRepository.createQueryBuilder("vt");
        const data = qBuilder
            .leftJoinAndSelect("vt.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return data
    }

}
