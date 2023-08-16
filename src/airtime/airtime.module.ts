import { Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airtime } from './entity/airtime.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';
import { vtData } from './entity/data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Airtime,vtData]),
    ProfileModule,
    DataModule
  ],
  controllers: [AirtimeController],
  providers: [AirtimeService]
})
export class AirtimeModule {}
