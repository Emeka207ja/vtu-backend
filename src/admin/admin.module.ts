import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ProfileModule,
    AuthModule
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
