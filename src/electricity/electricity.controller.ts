import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common';
import { subElectricDto } from './dto/subelectric.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { ElectricityService } from './electricity.service';
import { prepaidDto } from './dto/prepaidDto';

@Controller('api/v1/electricity')
export class ElectricityController {
    constructor(
        private readonly electricService:ElectricityService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async electricSub(@Req() req: Request & reqUser, @Body() details: subElectricDto) {
        return await this.electricService.electricSub(req.user.id,details)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post("/prepaid")
    async prepaidSub(@Req() req: Request & reqUser, @Body() details: prepaidDto) {
        return await this.electricService.prepaidSub(req.user.id,details)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllElectricSub(@Req() req: Request & reqUser) {
        return await this.electricService.getAllElectricSub(req.user.id)
    }
    @UseGuards(JwtAuthGuard)
    @Get("prepaid")
    async getAllPrepaidSub(@Req() req: Request & reqUser) {
        return await this.electricService.getAllPrepaidSub(req.user.id)
    }
}
