import { Module } from '@nestjs/common';
import { ElectricityService } from './electricity.service';
import { ElectricityController } from './electricity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Electric } from './entity/electric.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Electric]),
    ProfileModule
  ],
  providers: [ElectricityService],
  controllers: [ElectricityController]
})
export class ElectricityModule {}
