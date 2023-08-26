import { Controller,Post,Get,UseGuards,Req,Body } from '@nestjs/common';
import { GotvService } from './gotv.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { gotvDto } from './dto/gotv.dto';

@Controller('api/v1/gotv')
export class GotvController {
    constructor(
        private readonly gotvService:GotvService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async subGotv(@Req() req: Request & reqUser, @Body() detail: gotvDto) {
        return await this.gotvService.subGotv(req.user.id,detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getGotvSub(@Req() req: Request & reqUser) {
        return await this.gotvService.getGotvSub(req.user.id)
    }
}
