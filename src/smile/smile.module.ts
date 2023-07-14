import { Module } from '@nestjs/common';
import { SmileService } from './smile.service';
import { SmileController } from './smile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { smileEntity } from './entity/smileEntity';
import { ProfileModule } from 'src/profile/profile.module';
import { spectranetEntity } from './entity/spectranetEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([smileEntity,spectranetEntity]),
    ProfileModule
  ],
  providers: [SmileService],
  controllers: [SmileController]
})
export class SmileModule {}
