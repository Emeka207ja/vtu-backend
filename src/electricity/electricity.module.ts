import { Module } from '@nestjs/common';
import { ElectricityService } from './electricity.service';
import { ElectricityController } from './electricity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Electric } from './entity/electric.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { prepaidEntity } from './entity/prepaidElectric';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Electric,prepaidEntity]),
    ProfileModule,
    DataModule
  ],
  providers: [ElectricityService],
  controllers: [ElectricityController]
})
export class ElectricityModule {}
