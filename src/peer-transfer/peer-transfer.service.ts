import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Peer } from './entity/peer.entity';
import { ProfileService } from 'src/profile/profile.service';
import { PeerTransferDto } from './dto/transfer.dto';
import { userDto } from './dto/confirmUser.dto';

@Injectable()
export class PeerTransferService {
    constructor(
        @InjectRepository(Peer) private readonly peerRepository: Repository<Peer>,
        private readonly profileService:ProfileService
    ) { }
    
    async P2P(id: string, details: PeerTransferDto) {
        const {recieverName,amount} = details
        const sender = await this.profileService._find(id)
        const receiver = await this.profileService.findUserByName(recieverName);

        await this.profileService.updateP2P(recieverName, id, amount)
        const p2psender = this.peerRepository.create(details);
        p2psender.type = "debit"
        p2psender.sender = sender;
        p2psender.receiver = receiver
        const p2preceiver = this.peerRepository.create(details);
        p2preceiver.type = "credit"
        p2preceiver.sender = sender;
        p2preceiver.receiver = receiver
        await this.peerRepository.save([p2psender,p2preceiver])
        return p2psender.id;
    }

    async findAll() {
        const p2p = await this.peerRepository.find({
            relations: { sender: true, receiver: true},
            
        })
        return p2p;
    }

    // async fetchP2P(id: string, name: string) {
    //     console.log(name)
    //     const user = await this.profileService._find(id)
    //     const history = await this.sentFunds(id)
    //     return history;
    //     // const history = await this.profileService.getUserTransfer(user.id)
    //     // const debit = history.filter(item => item.type === "debit")
    //     // return debit
    // }
    async receivedFunds(id: string) {
        const user = await this.profileService._find(id)
        const qBuilder = this.peerRepository.createQueryBuilder("peer")
        const history = qBuilder
            .leftJoinAndSelect("peer.receiver","receiver")
            .where("receiver.id = :id", { id })
            .andWhere("peer.type = :type",{type:"credit"})
            .getMany()
        return history
    }
    async sentFunds(id: string) {
        const user = await this.profileService._find(id)
        const qBuilder = this.peerRepository.createQueryBuilder("peer")
        const history = qBuilder
            .leftJoinAndSelect("peer.sender","sender")
            .where("sender.id = :id", { id })
            .andWhere("peer.type = :type",{type:"debit"})
            .getMany()
        return history
    }

    async confirmUser(details:userDto){
        const {username} = details
      const user =  await this.profileService.findUserByName(username)
      return user;
    }
}
