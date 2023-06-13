import { BadRequestException, Injectable } from '@nestjs/common';
import { Airtime } from './entity/airtime.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { airtimePurchaseDto } from './dto/buy-airtime.dto';

@Injectable()
export class AirtimeService {
    constructor(
        @InjectRepository(Airtime) private readonly airtimeRepository: Repository<Airtime>,
        private readonly profileService:ProfileService
    ) { }
    
    async createAirtimePurchase(id: string, details: airtimePurchaseDto) {
        const { amount } = details
        if (amount <= 0) {
            throw new BadRequestException("invalid amount")
        }
        const user = await this.profileService._find(id)
        const airtime = this.airtimeRepository.create(details);
        airtime.profile = user
        await this.profileService.debitAccount(id, amount);
        await this.profileService.updatePoint(id,amount)
        await this.airtimeRepository.save(airtime)
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
