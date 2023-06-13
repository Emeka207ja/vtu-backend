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
        const airtime = this.airtimeRepository.create(details);
        await this.profileService.debitAccount(id, amount);
        await this.profileService.updatePoint(id,amount)
        await this.airtimeRepository.save(airtime)
        return airtime.id
    }
}
