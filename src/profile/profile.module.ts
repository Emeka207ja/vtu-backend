import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './entity/profile.entitity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { koraid } from './entity/koraid.entity';
import { monifyAccountEntity } from './entity/monifyAcount.entity';
import { debitAccountEntity } from './entity/debit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile,koraid,monifyAccountEntity,debitAccountEntity])
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports:[ProfileService]
})
export class ProfileModule {}
