import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { waecEntity } from './entity/waec.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([waecEntity]),
    ProfileModule,
    DataModule
  ],
  providers: [ EducationService],
  controllers: [EducationController]
})
export class EducationModule {}
