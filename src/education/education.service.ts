import { Injectable, NotFoundException } from '@nestjs/common';
import { waecEntity } from './entity/waec.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { waecSubDto } from './dto/waceSubDto';
import { EmailService } from 'src/data/email.service';

@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(waecEntity) private readonly educationRepository: Repository<waecEntity>,
        private readonly profileService:ProfileService,
        private readonly emailService:EmailService,
    ) { }
    
    async waecSub(id: string, detail: waecSubDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const { amount } = detail
        await this.profileService.debitAccount(id, amount);
        const waec = this.educationRepository.create(detail);
        waec.profile = user;
        await this.educationRepository.save(waec);

        //email sevice goes in here

        const subject = "waec pin"
        const {name} = user
        this.emailService.sendWaecMail("asiwebrightemeka@gmail.com", subject, name, detail)
        //end of mail service

        return waec.id;
    }

    async getUserWaecSubs(id: string) {
        const user = await this.profileService._find(id);
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const qBuilder = this.educationRepository.createQueryBuilder("waec")
        const waec = qBuilder
            .leftJoinAndSelect("waec.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return waec
    }
}
