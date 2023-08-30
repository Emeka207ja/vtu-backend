import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataEntity } from './Entity/dataEntity';
import { EmailService } from "./email.service"
import { ProfileModule } from 'src/profile/profile.module';
import { debitAccountEntity } from 'src/profile/entity/debit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([dataEntity,debitAccountEntity]),
    ProfileModule,
  ],
  providers: [DataService,EmailService],
  controllers: [DataController],
  exports:[EmailService]
})
export class DataModule {}
