import { Controller, Post, Get, Req, UseGuards, Body,Param } from '@nestjs/common';
import { PeerTransferService } from './peer-transfer.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { PeerTransferDto } from './dto/transfer.dto';
import { userDto } from './dto/confirmUser.dto';

@Controller('api/v1/peer')
export class PeerTransferController {
    constructor(
        private readonly peerService:PeerTransferService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async p2p(@Req() req: Request & reqUser, @Body() details: PeerTransferDto) {
        return await this.peerService.P2P(req.user.id,details)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/all")
    async getAll() {
        return await this.peerService.findAll()
    }
    // @UseGuards(JwtAuthGuard)
    // @Get(":name")
    // async fetchP2P(@Req() req: Request & reqUser, @Param("name") name:string) {
    //     // return await this.peerService.fetchP2P(req.user.id,name)
    // }
    @UseGuards(JwtAuthGuard)
    @Get("/credit")
    async receivedFunds(@Req() req: Request & reqUser) {
        return await this.peerService.receivedFunds(req.user.id)
    }
    @UseGuards(JwtAuthGuard)
    @Get("/debit")
    async sentFunds(@Req() req: Request & reqUser) {
        return await this.peerService.sentFunds(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/confirm_user")
    async confirmUser(@Body() value:userDto) {
        
        return await this.peerService.confirmUser(value)
    }
}
