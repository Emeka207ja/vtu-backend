import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { StartimesEntity } from './entity/startimes.entity';
import { EmailService } from 'src/data/email.service';
import { startimesDto } from './dto/startimes.dto';

@Injectable()
export class StartimesService {
    constructor(
        @InjectRepository(StartimesEntity) private readonly startimesRepository: Repository<StartimesEntity>,
        private readonly profileService: ProfileService,
        private readonly emailService:EmailService
    ) { }
    
      async subStartimes(id: string, detail: startimesDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount,requestId } = detail;
        // await this.profileService.debitAccount(id, amount)
        const startimes = this.startimesRepository.create(detail);
        startimes.profile = user
        await this.startimesRepository.save(startimes);
        await this.profileService.findAndUpdateDebit(id,requestId)
          
        //mailing service
        const subject = "startimes subscription";
        const tempMAil = "asiwebrightemeka@gmail.com"
        const { name, email } = user
        await this.emailService.sendDstvSubMail(email,subject,name,detail)
        return startimes.id
    }

     async getUserStartimesSub(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const qBuilder = this.startimesRepository.createQueryBuilder("star");
        const star = qBuilder
            .leftJoinAndSelect("star.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return star
    }
}
