import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataEntity } from './Entity/dataEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([dataEntity])
  ],
  providers: [DataService],
  controllers: [DataController]
})
export class DataModule {}
