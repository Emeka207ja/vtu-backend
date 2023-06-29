import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Electric } from './entity/electric.entity';
import { ProfileService } from 'src/profile/profile.service';
import { subElectricDto } from './dto/subelectric.dto';

@Injectable()
export class ElectricityService {
    constructor(
        @InjectRepository(Electric) private readonly electricRepository: Repository<Electric>,
        private readonly profileService :ProfileService
    ) { }
    
    async electricSub(id: string, details:subElectricDto) {
        const user = await this.profileService._find(id)
        const {amount} = details
        await this.profileService.debitAccount(id, amount)
        const electric = this.electricRepository.create(details)
        electric.profile = user;
        await this.electricRepository.save(electric);
        return electric.id
    }

    async getAllElectricSub(id: string) {
        
        const qBuilder = this.electricRepository.createQueryBuilder("elect")
        const electric = qBuilder
            .leftJoinAndSelect("elect.profile","profile")
            .where("profile.id = :id", { id })
            .getMany()

        return electric;
    }
}
