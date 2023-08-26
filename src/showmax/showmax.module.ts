import { Module } from '@nestjs/common';
import { ShowmaxService } from './showmax.service';
import { ShowmaxController } from './showmax.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { showMaxEntity } from './entity/showmax.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([showMaxEntity]),
    ProfileModule,
    DataModule
],
  providers: [ShowmaxService],
  controllers: [ShowmaxController]
})
export class ShowmaxModule {}
