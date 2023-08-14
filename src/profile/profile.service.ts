import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { Profile } from './entity/profile.entitity';
import { createProfileDto } from './dto/createProfile.dto';
import { assign } from "lodash"
import { updateProfileDto } from './dto/updateProfile.dto';
import { pinDto } from './entity/pin.dto';
import { changePinDto } from './dto/changePin.dto';
import { updatenameDto } from './dto/updatename.dto';
import { userDto } from 'src/peer-transfer/dto/confirmUser.dto';
import { iKora,ikoraDynamic } from './interface/ikorawebhook';
import { koraid } from './entity/koraid.entity';
import { koraIdDto } from './dto/koraid.dto';
import { koraHookResponse } from './dto/korahookresponse';
import { monifyDto } from './dto/monifyDto';
import { monifyAccountEntity } from './entity/monifyAcount.entity';
import { iMonnify } from './interface/imonnify';


@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
        @InjectRepository(koraid) private readonly korarepository:Repository<koraid>,
        @InjectRepository(monifyAccountEntity) private readonly monnifyRepository:Repository<monifyAccountEntity>
    ) { }
    
    async createProfile(profileDto: createProfileDto): Promise<Profile> {
        const {phone} = profileDto
       
        if (profileDto.referralId) {
            const profile = this.profileRepository.create(profileDto)
            const referal = await this._find(profileDto.referralId)
            profile.ReferredBy = referal.username;
            profile.isReferred = true;
            profile.phone = phone
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

    async updateName(id: string, details: updatenameDto) { 
        const user = await this._find(id)
        const { name } = details;
        user.name = name;
        await this.profileRepository.save(user);
        return user.id
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
        profile.balance += amount;
        profile.isFunded = true;
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
        user.ReferralCount += 1;
        user.TotalReferred += 1;
        await this.profileRepository.save(user)
    }

    async findUserByName(name: string) {
        const user = await this.profileRepository.findOne({
            where:{username:name}
        })
        
        if (!user) throw new NotFoundException("user not found");
        return user;
    }
    
    async getUserByFullname(name: string) {
        const user = this.profileRepository.findOneBy({ name })
        if (!user) {
            throw new NotFoundException("user not found")
        }
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
            throw new BadRequestException("insufficient funds")
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

    async claimReferral(id: string) {
        const user = await this._find(id);
        console.log(user)
        //use user.ReferralCount to award referral bonus, and user.totalReferred to monitor total referred by a user.
        if(user.ReferralCount<5){
            throw new BadRequestException("referral count less than 5");
        }
        const qBuilder = this.profileRepository.createQueryBuilder("profile");
        
        const referredAndFunded = qBuilder
            .where("profile.isFunded = :isFunded", { isFunded: true })
            .andWhere("profile.isReferred = :isReferred",{isReferred:true})
            .andWhere("profile.ReferredBy = :ReferredBy", { ReferredBy: user.username })
            .getCount()
        
        if (await referredAndFunded <= 4) {
            throw new BadRequestException("not all your referrals have funded");
        }
        user.balance += 5;
        user.ReferralCount -= 5;
        await this.profileRepository.save(user)
        return user.id;
    }

    async getUserTransfer(id: string) {
        const user = await this.profileRepository.findOne({
            where: { id: id },
            relations:{p2p:true}
        })
        return user.p2p
    }


    // Search a user by username

    async searchUserByUsername(username: string) {
        const qBuilder = await this.profileRepository.createQueryBuilder("user")
        const user = qBuilder
            .where("user.username = :username", { username })
            .getOne()
        // if (!user) {
        //     throw new NotFoundException("user does not exist")
        // }
        return user

    }

    async manualFundingUpdate(username: string, amount: number) {
        const user = await this.searchUserByUsername(username)
        if (!user) {
            throw new NotFoundException("user does not exist")
        }
        user.balance += amount;
        await this.profileRepository.save(user)
        return user.id
    }

    // Update transfer Pin

    async updatePin(id: string,details:pinDto) {
        const user = await this._find(id)
        const { pin, confirm_pin } = details
        if (pin !== confirm_pin) {
            throw new BadRequestException("pin must be same with confirm pin")
        }
        if (pin === 1111) {
            throw new BadRequestException("can't use default pin, choose another pin")
        }
        user.pin = pin;
        user.defaultPinChanged = true
        await this.profileRepository.save(user)
        return user.id
    }

    async changePin(id: string, details: changePinDto) {
        const user = await this._find(id);
        const { newPin, oldPin } = details;
        if (user.pin !== oldPin) {
            throw new BadRequestException("Invalid Pin format")
        }
        user.pin = newPin;
        await this.profileRepository.save(user);
        return user.id;
    }

    
    async koraPayWebhook(data:iKora) {
        const name = data.data.virtual_bank_account_details.virtual_bank_account.account_name
       
        if (!name) {
            throw new BadRequestException("no virtual_account name")
        }
        
        const user = await this.profileRepository.findOneBy({ name })
        if (!user) {
            throw new NotFoundException("user not found")
        }

        const amount = data.data.amount;
        user.balance+= amount
        await this.profileRepository.save(user)
        return user.id
    }

    async storeKoraId(id: string, details: koraIdDto) {
       
        const user = await this._find(id);
        const kora = this.korarepository.create(details);
        kora.profile = user;
        await this.korarepository.save(kora)
        return kora.id
    }

    async koraDynamicAccountWebhook(details: ikoraDynamic) {
        const { payment_reference } = details.data;
        const reference = payment_reference
        const kora = await this.korarepository.findOneBy({reference})
        if (!kora) {
            throw new NotFoundException("transaction reference not found on database")
        }
        if (details.data.status !== "success") {
            throw new BadRequestException("failed transaction")
        }
        const refex = kora.reference;
        const qBuilder = this.korarepository.createQueryBuilder("kora")
        const user = qBuilder
            .leftJoinAndSelect("kora.profile", "profile")
            .where("kora.reference = :refex", {  refex })
            .getOne()
        const profile = (await user).profile
        profile.balance += details.data.amount;
        await this.profileRepository.save(profile)
        return kora.id
    }

    async getAllKoraId(id: string) {
        const qBuilder = this.korarepository.createQueryBuilder("kora");
        const kora = qBuilder
            .leftJoinAndSelect("kora.profile", "profile")
            .where("profile.id = :id",{id:id})
            .getMany()
        return kora
    }

    async storeMonifyAccount(id: string, detail: monifyDto) {
        const user = await this._find(id);
        if (user.isMonified) {
            return 10;
        }
        const monify = await this.monnifyRepository.create(detail)
        monify.profile = user;
        await this.monnifyRepository.save(monify)
        user.isMonified = true;
        await this.profileRepository.save(user);
        return monify.id
    }

    async getMonnifyAcct(id: string) {
        const user = await this._find(id);
        const idx = user.id;

        const qBuilder = this.monnifyRepository.createQueryBuilder("monify");
        const acctDetails = qBuilder
            .leftJoinAndSelect("monify.profile", "profile")
            .where("profile.id = :idx", { idx })
            .getOne()
        console.log(acctDetails)
        return acctDetails
    }

    async creditMonnify(detail: iMonnify) {
        if (detail.eventType !== "SUCCESSFUL_TRANSACTION") {
            throw new BadRequestException("invalid transaction")
        }
        const {reference} = detail.eventData.product

        const qBuilder = this.monnifyRepository.createQueryBuilder("monify");
        const user = qBuilder
            .leftJoinAndSelect("monify.profile", "profile")
            .where("monify.accountReference = :reference", { reference })
            .getOne()
        if (!(await user)) {
            throw new NotFoundException("user not found")
        }
        const profile = (await user).profile
        
        const { amountPaid } = detail.eventData
        profile.balance += amountPaid
        await this.profileRepository.save(profile)
        return (await user).id
        
    }


    // async creditMonnify(detail: iMonnify) {
    //     const {name} = detail.eventData.customer
    //     const user = await this.getUserByFullname(name)
    //     if (!user) {
    //         throw new NotFoundException("user not found");
    //     }
    //     const { amountPaid } = detail.eventData;
    //     user.balance + = amountPaid;

    // }

}
