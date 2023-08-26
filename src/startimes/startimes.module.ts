import { Module } from '@nestjs/common';
import { StartimesService } from './startimes.service';
import { StartimesController } from './startimes.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from 'src/data/data.module';
import { StartimesEntity } from './entity/startimes.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([StartimesEntity]),
    ProfileModule,
    DataModule
  ],
  providers: [StartimesService],
  controllers: [StartimesController]
})
export class StartimesModule {}
