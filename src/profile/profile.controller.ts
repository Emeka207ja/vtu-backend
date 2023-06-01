import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

import { ProfileService } from './profile.service';
import { updateProfileDto } from './dto/updateProfile.dto'; 
import { reqUser } from 'src/type/Req';

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
    @Patch()
    async updateProfile(@Body() profileDto: updateProfileDto, @Req() req: Request & reqUser) {
        return await this.profileService.updateProfile(req.user.id, profileDto);
    }
}
