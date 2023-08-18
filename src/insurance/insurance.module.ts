import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicleEntitity } from './entity/vehicleInsure.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';
import { homeEntitity } from './entity/homeInsure.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([vehicleEntitity,homeEntitity]),
    ProfileModule,
    DataModule
  ],
  providers: [InsuranceService],
  controllers: [InsuranceController]
})
export class InsuranceModule {}
