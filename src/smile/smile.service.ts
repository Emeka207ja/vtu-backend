import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { smileEntity } from './entity/smile.entity';
import { ProfileService } from 'src/profile/profile.service';
import { subSmileDto } from './dto/smileSubDto';
import { spectranetEntity } from './entity/spectranet.entity';
import { spectranetDto } from './dto/spectrantDto';
import { EmailService } from 'src/data/email.service';

@Injectable()
export class SmileService {
    constructor(
        @InjectRepository(smileEntity) private readonly smileRepository: Repository<smileEntity>,
        @InjectRepository( spectranetEntity) private readonly spectranetRepository: Repository< spectranetEntity>,
        private readonly profileService:ProfileService,
        private readonly emailService:EmailService,
    ) { }
    
    async subSmile(id: string, details: subSmileDto) {
      
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount } = details
        await this.profileService.debitAccount(id, amount)
        const smile = this.smileRepository.create(details);
        smile.profile = user;
        
        await this.smileRepository.save(smile);
        //email service
        const subject = "smile subscription"
        const tempMail = "asiwebrightemeka@gmail.com";
        const { name, email } = user
        await this.emailService.sendSmileSubMail(email, subject, name, details)
        
        return smile.id
    }
    async subSpectranet(id: string, details: spectranetDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount } = details
        await this.profileService.debitAccount(id, amount)
        const spectranet = this.spectranetRepository.create(details);
        spectranet.profile = user;
        await this.spectranetRepository.save(spectranet);
        //email service
        const subject = "spectranet subscription"
        const tempMail = "asiwebrightemeka@gmail.com";
        const { name, email } = user
        await this.emailService.sendSpectranetSubMail(email, subject, name, details)
        
        return spectranet.id
    }

    async getAllSmileSub(id: string) {
        const user = await this.profileService._find(id);
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const idx = user.id
        const qBuilder = await this.smileRepository.createQueryBuilder("sm")
        const smileSub = qBuilder
            .leftJoinAndSelect("sm.profile", "profile")
            .where("profile.id = :idx", { idx })
            .getMany()
        return smileSub;
    }
    async getAllSpectranetSub(id: string) {
        const user = await this.profileService._find(id);
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const idx = user.id
        const qBuilder = await this.spectranetRepository.createQueryBuilder("sm")
        const specSub = qBuilder
            .leftJoinAndSelect("sm.profile", "profile")
            .where("profile.id = :idx", { idx })
            .getMany()
        return specSub;
    }
}
