import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Fund } from './entity/create-fund';
import { fundDto } from 'src/profile/dto/fund.dto';
import { AuthService } from 'src/auth/auth.service';
import { isquad } from './dto/iSquad';

import { testFundDto } from './dto/testFundDto';

@Injectable()
export class FundService {
    constructor(
        @InjectRepository(Fund) private readonly fundRepository:Repository<Fund>,
        private readonly profileService:ProfileService,
        private readonly authService:AuthService
    ) { }
    
    async createFunding(id: string,transaction:fundDto) {
        const user = await this.profileService._find(id)

        const funding = this.fundRepository.create(transaction)
        funding.profile = user;
        this.profileService.updateBalance(id,funding.amount)
        await this.fundRepository.save(funding)
        console.log(funding)
        return funding.amount
    }

    async getAllFunding(id: string) {
        const funds = await this.fundRepository.find({
            where:{profile:{id}}
        })
        return funds
    }

   
}
