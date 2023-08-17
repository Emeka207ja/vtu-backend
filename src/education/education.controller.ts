import { Controller,Body,Post,Get,Req,UseGuards } from '@nestjs/common';
import { reqUser } from 'src/type/Req';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { EducationService } from './education.service';
import { waecSubDto } from './dto/waceSubDto';

@Controller('api/v1/education')
export class EducationController {
    constructor(
        private readonly educationService:EducationService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async waecSub(@Req() req: Request & reqUser, @Body() detail:waecSubDto) {
        return await this.educationService.waecSub(req.user.id,detail)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserWaecSubs(@Req() req: Request & reqUser) {
        return await this.educationService.getUserWaecSubs(req.user.id)
    }
}
