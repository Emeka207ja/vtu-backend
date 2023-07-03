import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

import { ProfileService } from './profile.service';
import { updateProfileDto } from './dto/updateProfile.dto'; 
import { reqUser } from 'src/type/Req';
import { pinDto } from './entity/pin.dto';

@Controller('api/v1/profile')
export class ProfileController {
    constructor(
        private readonly profileService:ProfileService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfile(@Req() req: Request & reqUser) {
        return await this.profileService.getProfile(req.user.id);
    }
    
    
    @UseGuards(JwtAuthGuard)
    @Get("/redeem_point")
    async reedemPoint(@Req() req: Request & reqUser) {
        return await this.profileService.reedemPoint(req.user.id);
     }
     
    @UseGuards(JwtAuthGuard)
    @Get("/claim_referral")
    async claimReferral(@Req() req: Request & reqUser) {
        return await this.profileService.claimReferral(req.user.id);
     }
     
    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateProfile(@Body() profileDto: updateProfileDto, @Req() req: Request & reqUser) {
        return await this.profileService.updateProfile(req.user.id, profileDto);
    }
    @UseGuards(JwtAuthGuard)
    @Patch("/update_pin")
    async updatePin(@Body() details: pinDto, @Req() req: Request & reqUser) {
        return await this.profileService.updatePin(req.user.id, details);
    }
}
