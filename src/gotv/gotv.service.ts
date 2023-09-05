
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { GotvEntity } from './entity/gotv.entity';
import { EmailService } from 'src/data/email.service';
import { gotvDto } from './dto/gotv.dto';

@Injectable()
export class GotvService {
    constructor(
         @InjectRepository(GotvEntity) private readonly gotvRepository: Repository<GotvEntity>,
        private readonly profileService: ProfileService,
        private readonly emailService:EmailService
    ) { }
    
     async subGotv(id: string, detail:gotvDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount,requestId } = detail;
        // await this.profileService.debitAccount(id, amount)
        const gotv = this.gotvRepository.create(detail);
        gotv.profile = user
         await this.gotvRepository.save(gotv);
         await this.profileService.findAndUpdateDebit(id,requestId)
         
        //mailing service
        const subject = "gotv subscription";
        const tempMAil = "asiwebrightemeka@gmail.com"
        const { name, email } = user
        await this.emailService.sendDstvSubMail(email,subject,name,detail)
        return gotv.id
    }

     async getGotvSub(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const qBuilder = this.gotvRepository.createQueryBuilder("gotv");
        const gotv = qBuilder
            .leftJoinAndSelect("gotv.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return gotv
    }
}
