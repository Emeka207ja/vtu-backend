import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entity/profile.entitity';
import { createProfileDto } from './dto/createProfile.dto';
import { assign } from "lodash"
import { updateProfileDto } from './dto/updateProfile.dto';
import { userInfo } from 'os';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) private readonly profileRepository:Repository<Profile>,
    ) { }
    
    async createProfile(profileDto: createProfileDto): Promise<Profile> {

       
        if (profileDto.referralId) {
            const profile = this.profileRepository.create(profileDto)
            const referal = await this._find(profileDto.referralId)
            profile.ReferredBy = referal.username;
            profile.isReferred = true;
            await this.profileRepository.save(profile)
            return profile;
        }
        
        const profile = this.profileRepository.create(profileDto)
        await this.profileRepository.save(profile)
        return profile;
        
    }
    
    async getProfile(id: string): Promise<Profile>{
        const profile = await this.profileRepository.findOne({
            where: { id },
            relations:{auth:true}
        });
        delete profile.auth.password;
        return profile;
    }
    async updateProfile(authId: string,updateDto:updateProfileDto): Promise<Profile> { 
        const profile = await this._find(authId);
        delete profile.email;
        delete profile.username;
        delete profile.verified;
        assign(profile, updateDto);
        await this.profileRepository.save(profile);
        return profile;
    }

    async updateBalance(id: string, amount: number) {
         if (amount <= 0) {
            throw new BadRequestException("invalid amount")
        }
        const profile = await this._find(id);
        profile.balance += amount
        await this.profileRepository.save(profile)
     }
    
    async updateProfilePic() { }
    
    async _find(id: string) {
        const user = await this.profileRepository.findOneBy({ id });
        if (!user) throw new NotFoundException("user not found");
        return user;
    }

    async updateUserReferral(id: string) {
        const user = await this._find(id)
        user.ReferralCount += 1
        await this.profileRepository.save(user)
    }

    async findUserByName(name: string) {
        const user = await this.profileRepository.findOne({
            where:{username:name}
        })
        
        if (!user) throw new NotFoundException("user not found");
        return user;
    }

    async updateP2P(name: string, id: string, amount: number) {
        if (amount <= 0) {
            throw new BadRequestException("invalid amount")
        }
        const sender = await this._find(id)
        const receiver = await this.findUserByName(name)
        
        if (sender.balance < amount) {
            throw new BadRequestException("insufficient account")
        }

        sender.balance -= amount;
        receiver.balance += amount;
        await this.profileRepository.save(sender);
        await this.profileRepository.save(receiver)
    }

    async updatePoint(id: string, Amount: number) {
        if (Amount <= 0) {
            throw new BadRequestException("invalid Amount")
        }
        const user = await this.profileRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException("user not found");
        }
        

        switch (true) {
            case Amount<=500 && Amount>0:
                user.point += 1;
                await this.profileRepository.save(user)
                break;
            case Amount > 0 && Amount > 500 && Amount <= 1500:
                user.point += 3;
                await this.profileRepository.save(user)
                break
            case Amount > 0 && Amount >= 1501:
                user.point += 5;
                await this.profileRepository.save(user)
                break
        
            default:
                break;
        }
    }

    async debitAccount(id: string, Amount: number) {
        if (Amount <= 0) {
            throw new BadRequestException("invalid Amount");
        }
        const user = await this._find(id);
        if (Amount > user.balance) {
            throw new BadRequestException("can not complete this purchase")
        }
        user.balance -= Amount;
        await this.profileRepository.save(user)
    }

    async reedemPoint(id: string) {
        const user = await this._find(id);
        const debitable = 100
        if (user.point < debitable) {
            throw new BadRequestException("insufficient point")
        }
        user.point -= debitable;
        user.balance += 5;
        await this.profileRepository.save(user);
        return user.id
    }
}
