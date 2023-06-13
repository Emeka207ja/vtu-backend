import { Controller, UseGuards, Post, Get, Req,Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { airtimePurchaseDto } from './dto/buy-airtime.dto';
import { AirtimeService } from './airtime.service';

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
}
