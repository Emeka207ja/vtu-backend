import { Controller, UseGuards, Post, Get, Req,Body,Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { airtimePurchaseDto } from './dto/buy-airtime.dto';
import { AirtimeService } from './airtime.service';
import { vtDataDto } from './entity/vtdata.dto';

@Controller('api/v1/airtime')
export class AirtimeController {
    constructor(
        private readonly airtimeService:AirtimeService
    ) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    async createAirtimePurchase(@Req() req: Request & reqUser, @Body() airtimeDetails: airtimePurchaseDto) {
        return await this.airtimeService.createAirtimePurchase(req.user.id,airtimeDetails)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAllAirtimePurchase(@Req() req: Request & reqUser) {
        return await this.airtimeService.fetchAllAirtimePurchase(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/vtdata")
    async storeDataSub(@Req() req: Request & reqUser,@Body() detail:vtDataDto) {
        return await this.airtimeService.storeDataSub(req.user.id,detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/vtdata")
    async getUserVtData(@Req() req: Request & reqUser) {
        return await this.airtimeService.getUserVtData(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteAirtimeHistor(@Req() req: Request & reqUser) {
        return await this.airtimeService.deleteAirtimeHistory(req.user.id)
    }
}
