import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Peer } from './entity/peer.entity';
import { ProfileService } from 'src/profile/profile.service';
import { PeerTransferDto } from './dto/transfer.dto';

@Injectable()
export class PeerTransferService {
    constructor(
        @InjectRepository(Peer) private readonly peerRepository: Repository<Peer>,
        private readonly profileService:ProfileService
    ) { }
    
    async P2P(id: string, details: PeerTransferDto) {
        const {username,amount} = details
        // const sender = await this.profileService._find(id)
        // const receiver = await this.profileService.findUserByName(username);

        await this.profileService.updateP2P(username, id, amount)
        
        const p2p = this.peerRepository.create(details);
        await this.peerRepository.save(p2p)
        return p2p.id;
    }

   
}
