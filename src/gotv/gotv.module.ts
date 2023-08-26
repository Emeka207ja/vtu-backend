import { Module } from '@nestjs/common';
import { GotvService } from './gotv.service';
import { GotvController } from './gotv.controller';
import { GotvEntity } from './entity/gotv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GotvEntity]),
    ProfileModule,
    DataModule
  ],
  providers: [GotvService],
  controllers: [GotvController]
})
export class GotvModule {}
