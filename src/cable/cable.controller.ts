import { Controller, Post, UseGuards,Req,Body,Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CableDto } from './dto/cableSub.dto';
import { CableService } from './cable.service';
import { reqUser } from 'src/type/Req';

@Controller('api/v1/cable')
export class CableController {
    constructor(
        private readonly cableService:CableService,
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async saveCableSub(@Body() details: CableDto, @Req() req: Request & reqUser) {
        return await this.cableService.saveCableSub(req.user.id,details)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllSub(@Req() req: Request & reqUser) {
        return await this.cableService.getAllSub(req.user.id)
    }
}
