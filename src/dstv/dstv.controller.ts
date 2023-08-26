import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { DstvService } from './dstv.service';
import { dstvDto } from './dto/dstv.dto';
import { reqUser } from 'src/type/Req';

@Controller('api/v1/dstv')
export class DstvController {
    constructor(
        private readonly dstvService:DstvService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async subDstv(@Req() req: Request & reqUser, @Body() detail: dstvDto) {
        return await this.dstvService.subDstv(req.user.id,detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserDstvSub(@Req() req: Request & reqUser) {
        return await this.dstvService.getUserDstvSub(req.user.id)
    }
}
