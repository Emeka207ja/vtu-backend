import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './entity/profile.entitity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile])
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports:[ProfileService]
})
export class ProfileModule {}
