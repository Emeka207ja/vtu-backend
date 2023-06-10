import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fund } from './entity/create-fund';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fund]),
    ProfileModule,
     AuthModule 
  ],
  providers: [FundService],
  controllers: [FundController]
})
export class FundModule {}
