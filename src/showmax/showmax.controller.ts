import { Controller,Post,Get,UseGuards,Req,Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { ShowmaxService } from './showmax.service';
import { showmaxDto } from './dto/showmax.dto';

@Controller('api/v1/showmax')
export class ShowmaxController {
    constructor(
        private readonly showmaxService:ShowmaxService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async subShowmax(@Req() req: Request & reqUser, @Body() detail: showmaxDto) {
        return await this.showmaxService.subShowmax(req.user.id,detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserShowmaxSub(@Req() req: Request & reqUser) {
        return await this.showmaxService.getUserShowmaxSub(req.user.id)
    }
}
