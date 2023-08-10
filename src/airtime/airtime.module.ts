import { Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airtime } from './entity/airtime.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Airtime]),
    ProfileModule,
    DataModule
  ],
  controllers: [AirtimeController],
  providers: [AirtimeService]
})
export class AirtimeModule {}
