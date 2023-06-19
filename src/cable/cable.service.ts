import { Injectable,BadRequestException } from '@nestjs/common';
import { Cable } from './entity/Cable.entity';
import { CableDto } from './dto/cableSub.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entity/profile.entitity';

@Injectable()
export class CableService {
    constructor(
        @InjectRepository(Cable) private readonly cableRepository: Repository<Cable>,
        private readonly profileService:ProfileService
    ){}

    async saveCableSub(id: string, details: CableDto) {
        const user = await this.profileService._find(id)
        if (user.balance < details.amount) {
            throw new BadRequestException("insufficient amount")
        }
        const sub = this.cableRepository.create(details)
        sub.profile = user;
        await this.profileService.debitAccount(id, details.amount);
        await this.cableRepository.save(sub);
        return sub.id
        
    }

    async getAllSub(idx: string) {
        const user = await this.profileService._find(idx)
        const sub = this.cableRepository.find({
            where: { profile: { id: user.id } }
        })
        return sub
    }
}
