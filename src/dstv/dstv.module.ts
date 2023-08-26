import { Module } from '@nestjs/common';
import { DstvService } from './dstv.service';
import { DstvController } from './dstv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';
import { DstvEntity } from './entity/dstv.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DstvEntity]),
    ProfileModule,
    DataModule
  ],
  providers: [DstvService],
  controllers: [DstvController]
})
export class DstvModule {}
