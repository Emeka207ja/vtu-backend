import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {ConfigModule} from "@nestjs/config"
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeormConfig} from "./config/typeorm.config"
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { FundModule } from './fund/fund.module';
import { PeerTransferModule } from './peer-transfer/peer-transfer.module';
import { AirtimeModule } from './airtime/airtime.module';
import { CableModule } from './cable/cable.module';
import { ElectricityModule } from './electricity/electricity.module';
import { AdminModule } from './admin/admin.module';
import { SmileModule } from './smile/smile.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      
      cache: true,
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    AuthModule,
    ProfileModule,
    FundModule,
    PeerTransferModule,
    AirtimeModule,
    CableModule,
    ElectricityModule,
    AdminModule,
    SmileModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
})
export class AppModule {}
