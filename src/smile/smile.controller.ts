import { Controller, Post, Get, UseGuards, Body, Req } from '@nestjs/common';
import { SmileService } from './smile.service';
import { reqUser } from 'src/type/Req';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { subSmileDto } from './dto/smileSubDto';
import { spectranetDto } from './dto/spectrantDto';

@Controller('api/v1/smile')
export class SmileController {
    constructor(
        private readonly smileService:SmileService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async subSmile(@Body() details: subSmileDto, @Req() req: Request & reqUser) {
        return await this.smileService.subSmile(req.user.id,details)
        
    }

    @UseGuards(JwtAuthGuard)
    @Post("/spectranet")
    async subSpectranet(@Body() details: spectranetDto, @Req() req: Request & reqUser) {
        return await this.smileService.subSpectranet(req.user.id,details)
        
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllSmileSub( @Req() req: Request & reqUser) {
        return await this.smileService.getAllSmileSub(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllSpectranetSub( @Req() req: Request & reqUser) {
        return await this.smileService.getAllSpectranetSub(req.user.id)
    }
}
