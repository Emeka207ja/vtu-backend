import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common';
import { subElectricDto } from './dto/subelectric.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { ElectricityService } from './electricity.service';
import { prepaidDto } from './dto/prepaidDto';
import { postpaidDto } from './dto/postpaidDto';

@Controller('api/v1/electricity')
export class ElectricityController {
    constructor(
        private readonly electricService:ElectricityService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post("/prepaid")
    async prepaidSub(@Req() req: Request & reqUser, @Body() details: prepaidDto) {
        return await this.electricService.prepaidSub(req.user.id,details)
    }
    @UseGuards(JwtAuthGuard)
    @Post("/postpaid")
    async postpaidSub(@Req() req: Request & reqUser, @Body() details: postpaidDto) {
        return await this.electricService.postpaidSub(req.user.id,details)
    }

    @UseGuards(JwtAuthGuard)
    @Get("prepaid")
    async getAllPrepaidSub(@Req() req: Request & reqUser) {
        return await this.electricService.getAllPrepaidSub(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("postpaid")
    async getAllPostpaidSub(@Req() req: Request & reqUser) {
        return await this.electricService.getAllPostpaidSub(req.user.id)
    }
}
