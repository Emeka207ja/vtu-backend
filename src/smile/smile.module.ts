import { Module } from '@nestjs/common';
import { SmileService } from './smile.service';
import { SmileController } from './smile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { smileEntity } from './entity/smile.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { spectranetEntity } from './entity/spectranet.entity';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([smileEntity,spectranetEntity]),
    ProfileModule,
    DataModule
  ],
  providers: [SmileService],
  controllers: [SmileController]
})
export class SmileModule {}
