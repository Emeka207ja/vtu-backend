import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { smileEntity } from './entity/smileEntity';
import { ProfileService } from 'src/profile/profile.service';
import { subSmileDto } from './dto/smileSubDto';
import { spectranetEntity } from './entity/spectranetEntity';

@Injectable()
export class SmileService {
    constructor(
        @InjectRepository(smileEntity) private readonly smileRepository: Repository<smileEntity>,
        @InjectRepository( spectranetEntity) private readonly spectranetRepository: Repository< spectranetEntity>,
        private readonly profileService:ProfileService,
    ) { }
    
    async subSmile(id: string, details: subSmileDto) {
        const user = await this.profileService._find(id)
        const { amount } = details
        await this.profileService.debitAccount(id, amount)
        const smile = this.smileRepository.create(details);
        smile.profile = user;
        await this.smileRepository.save(smile);
        return smile.id
    }
    async getAllSmileSub(id: string) {
        const user = await this.profileService._find(id);
        const idx = user.id
        const qBuilder = await this.smileRepository.createQueryBuilder("sm")
        const smileSub = qBuilder
            .leftJoinAndSelect("sm.profile", "profile")
            .where("profile.id = :idx", { idx })
            .getMany()
        return smileSub;
    }
}
