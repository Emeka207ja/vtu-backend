import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { EmailService } from 'src/data/email.service';
import { DstvEntity } from './entity/dstv.entity';
import { dstvDto } from './dto/dstv.dto';

@Injectable()
export class DstvService {
    constructor(
        @InjectRepository(DstvEntity) private readonly dstvRepository: Repository<DstvEntity>,
        private readonly profileService: ProfileService,
        private readonly emailService:EmailService
    ) { }
    async subDstv(id: string, detail: dstvDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount,requestId } = detail;
        // await this.profileService.debitAccount(id, amount)
        const dstv = this.dstvRepository.create(detail);
        dstv.profile = user
        await this.profileService.findAndUpdateDebit(id,requestId)
        await this.dstvRepository.save(dstv);

        //mailing service
        const subject = "dstv subscription";
        const tempMAil = "asiwebrightemeka@gmail.com"
        const { name, email } = user
        await this.emailService.sendDstvSubMail(email,subject,name,detail)
        return dstv.id
    }

     async getUserDstvSub(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const qBuilder = this.dstvRepository.createQueryBuilder("dstv");
        const dstv = qBuilder
            .leftJoinAndSelect("dstv.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return dstv
    }
}
