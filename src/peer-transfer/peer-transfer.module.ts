import { Module } from '@nestjs/common';
import { PeerTransferController } from './peer-transfer.controller';
import { PeerTransferService } from './peer-transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peer } from './entity/peer.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Peer]),
    ProfileModule
  ],
  controllers: [PeerTransferController],
  providers: [PeerTransferService]
})
export class PeerTransferModule {}
