import { BadRequestException, Injectable } from '@nestjs/common';
import { Airtime } from './entity/airtime.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { airtimePurchaseDto } from './dto/buy-airtime.dto';
import { EmailService } from 'src/data/email.service';
import { purchaseEmail } from 'src/data/interface/ipurchaseemail';


@Injectable()
export class AirtimeService {
    constructor(
        @InjectRepository(Airtime) private readonly airtimeRepository: Repository<Airtime>,
        private readonly profileService: ProfileService,
        private readonly emailService:EmailService
    ) { }
    
    async createAirtimePurchase(id: string, details: airtimePurchaseDto) {
        const { Amount,phone } = details
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
            price:Amount
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

}
