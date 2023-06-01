import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import {ConfigModule} from "@nestjs/config"
import { Auth } from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'src/profile/profile.module';
import { LocalStrategy } from './strategy/local-strategy';
import { JwtStrategy } from './strategy/jwt-strategy';
import { JwtAuthGuard } from './guard/jwtGuard';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
       ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
     
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  
    ProfileModule,
    PassportModule
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy,JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService,JwtAuthGuard]
})
export class AuthModule {}
