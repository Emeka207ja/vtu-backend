import { Controller,Post,UseGuards,Body,Req,Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { FundService } from './fund.service';
import { fundDto } from 'src/profile/dto/fund.dto';

@Controller('api/v1/fund')
   
export class FundController {
    constructor(
         private readonly fundService:FundService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createFunding(@Body() fund: fundDto, @Req() req: Request & reqUser) {
        return await this.fundService.createFunding(req.user.id,fund)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllFunding(@Req() req: Request & reqUser) {
        return await this.fundService.getAllFunding(req.user.id)
    }
}
