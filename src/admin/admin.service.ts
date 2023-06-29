import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { AuthService } from 'src/auth/auth.service';
import { searchUserDto } from './dto/searchuser.dto';
import { fundUpdateDto } from './dto/fundingUpdate.dto';

@Injectable()
export class AdminService {
    constructor(
        private readonly profileService:ProfileService,
        private readonly authService:AuthService,
    ) { }
    
    async adminSearchUser(detail: searchUserDto) {
        const { username } = detail
        if (!username) {
            throw new BadGatewayException("bad request")
        }
        const user = await this.profileService.searchUserByUsername(username)
        if (!user) {
            throw new NotFoundException("user does not exist")
        }
        return user;
    }

    async adminUpdateFunding(details: fundUpdateDto) {
        const { amount, username } = details
        const userId = await this.profileService.manualFundingUpdate(username, amount)
        return userId
    }

    async adminGetAllUsers() {
        const users = await this.authService.getAllUsers()
        return users;
    }

    async adminGetUsersCount() {
        const count = await this.authService.getUserCount()
        return count;
    }

    async adminGetDailySignups() {
        const daily = await this.authService.getDailySignup()
        return daily;
    }
}
