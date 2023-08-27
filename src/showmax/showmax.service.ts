import { Injectable, NotFoundException } from '@nestjs/common';
import { showMaxEntity } from './entity/showmax.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { EmailService } from 'src/data/email.service';
import { showmaxDto } from './dto/showmax.dto';

@Injectable()
export class ShowmaxService {
    constructor(
        @InjectRepository(showMaxEntity) private readonly showmaxRepository: Repository<showMaxEntity>,
        private readonly profileService: ProfileService,
        private readonly emailService:EmailService
    ) { }
    
    async subShowmax(id: string, detail: showmaxDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const { amount } = detail;
        await this.profileService.debitAccount(id, amount);
        const showmax = this.showmaxRepository.create(detail);
        showmax.profile = user;
        await this.showmaxRepository.save(showmax);

        //mailing service
        const subject = "showmax subscription";
        const tempMAil = "asiwebrightemeka@gmail.com"
        const { name, email } = user
        await this.emailService.sendShowmaxSubMail(email,subject,name,detail)
        return showmax.id
    }

    async getUserShowmaxSub(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const qBuilder = this.showmaxRepository.createQueryBuilder("showmax");
        const showmax = qBuilder
            .leftJoinAndSelect("showmax.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return showmax
    }
}
