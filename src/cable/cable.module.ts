import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CableService } from './cable.service';
import { CableController } from './cable.controller';
import { Cable } from './entity/Cable.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cable]),
    ProfileModule
  ],
  providers: [CableService],
  controllers: [CableController]
})
export class CableModule {}
