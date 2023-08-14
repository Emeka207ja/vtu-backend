import { Controller, Get, Patch, Body, Req, UseGuards,HttpCode,Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { changePinDto } from './dto/changePin.dto';
import { ProfileService } from './profile.service';
import { updateProfileDto } from './dto/updateProfile.dto'; 
import { reqUser } from 'src/type/Req';
import { pinDto } from './entity/pin.dto';
import { updatenameDto } from './dto/updatename.dto';
import { iKora,ikoraDynamic } from './interface/ikorawebhook';
import { koraIdDto } from './dto/koraid.dto';
import { koraHookResponse } from './dto/korahookresponse';
import { koraid } from './entity/koraid.entity';
import { monifyDto } from './dto/monifyDto';
import { iMonnify } from './interface/imonnify';

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

    @UseGuards(JwtAuthGuard)
    @Patch("/change_pin")
    async changePin(@Body() details: changePinDto, @Req() req: Request & reqUser) {
        return await this.profileService.changePin(req.user.id, details);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update_name")
    async updateName(@Body() details: updatenameDto, @Req() req: Request & reqUser) {
        return await this.profileService.updateName(req.user.id, details);
    }

    @Post("/webhook")
    @HttpCode(200)
    async koraPayWebHook(@Body() data: iKora) {
        return await this.profileService.koraPayWebhook(data)
    }

    @Post("/dynamicaccount/webhook")
    @HttpCode(200)
    async korahook(@Body() data:ikoraDynamic) {
        return await this.profileService.koraDynamicAccountWebhook(data)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/storekoraid")
    async storeKoraId(@Body() data: koraid, @Req() req: Request & reqUser) {
        
        return await this.profileService.storeKoraId(req.user.id,data)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/monify/saveaccount")
    async storeMonifyAccount(@Body() data:monifyDto, @Req() req: Request & reqUser) {
        
        return await this.profileService.storeMonifyAccount(req.user.id,data)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/monify")
    async getMonnifyAcct( @Req() req: Request & reqUser) {
        
        return await this.profileService.getMonnifyAcct(req.user.id)
    }

    @Post("/monify/webhook")
    async creditMonnify( @Body() detail:iMonnify) {
        
        return await this.profileService.creditMonnify(detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/korareference")
    async getAllKoraId( @Req() req: Request & reqUser) {
        return await this.profileService.getAllKoraId(req.user.id)
    }
}
