import { Controller, Post, Get, Req, UseGuards,Body } from '@nestjs/common';
import { StartimesService } from './startimes.service';
import { startimesDto } from './dto/startimes.dto';
import { reqUser } from 'src/type/Req';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

@Controller('api/v1/startimes')
export class StartimesController {
    constructor(
        private readonly startimesService:StartimesService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async subStartimes(@Req() req: Request & reqUser, @Body() detail: startimesDto) {
        return await this.startimesService.subStartimes(req.user.id,detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserStartimesSub(@Req() req: Request & reqUser) {
        return await this.startimesService.getUserStartimesSub(req.user.id)
    }
}
