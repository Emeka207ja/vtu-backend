import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { postPaidEntity } from './entity/postpaid.entity';
import { ProfileService } from 'src/profile/profile.service';
import { subElectricDto } from './dto/subelectric.dto';
import { prepaidEntity } from './entity/prepaid.entity';
import { prepaidDto } from './dto/prepaidDto';
import { EmailService } from 'src/data/email.service';
import { postpaidDto } from './dto/postpaidDto';

@Injectable()
export class ElectricityService {
    constructor(
        @InjectRepository(postPaidEntity) private readonly postpaidRepository: Repository<postPaidEntity>,
        @InjectRepository(prepaidEntity) private readonly prepaidRepository: Repository<prepaidEntity>,
        private readonly emailService:EmailService,
        private readonly profileService :ProfileService
    ) { }
    


    async prepaidSub(id: string, details: prepaidDto) {
        const user = await this.profileService._find(id)
        const { amount } = details
        await this.profileService.debitAccount(id, amount)
        const Prepaid = this.prepaidRepository.create(details)
        Prepaid.profile = user;
        await this.prepaidRepository.save(Prepaid)

        const { email, name } = user
        const tempMail = "asiwebrightemeka@gmail.com"
        await this.emailService.sendElectricityPurchaseMail(email,"prepaid subscription",name,details)
        return Prepaid.id;
    }

    async postpaidSub(id: string, details: postpaidDto) {
        const user = await this.profileService._find(id);
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount } = details
        await this.profileService.debitAccount(id, amount)
        const postpaid = this.postpaidRepository.create(details)
        postpaid.profile = user;
        await this.postpaidRepository.save(postpaid)

        const { email, name } = user
        const tempMail = "asiwebrightemeka@gmail.com"
        await this.emailService.sendElectricityPurchaseMail(email,"postpaid subscription",name,details)
        return postpaid.id;
    }

    async getAllPrepaidSub(id: string) {
        const user = await this.profileService._find(id)
        const idx = user.id;
        const qBuilder = await this.prepaidRepository.createQueryBuilder("pre")
        const prepaid = qBuilder
            .leftJoinAndSelect("pre.profile", "profile")
            .where("profile.id = :idx", { idx })
            .getMany()
        return prepaid;
    }

    async getAllPostpaidSub(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const idx = user.id;
        const qBuilder = await this.postpaidRepository.createQueryBuilder("pre")
        const postpaid = qBuilder
            .leftJoinAndSelect("pre.profile", "profile")
            .where("profile.id = :idx", { idx })
            .getMany()
        return postpaid;
    }
}
