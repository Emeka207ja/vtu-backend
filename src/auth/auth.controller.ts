import { Controller } from '@nestjs/common';
import { Body, Post, Get,HttpCode,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/loginDto';
import { LocalAuthGuard } from './guard/local-guard';

@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    @Post("/signup")
    @HttpCode(201)  
    async signUp(@Body() signupDetails: signupDto) {
        return await this.authService.signup(signupDetails)
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Body() loginDetails: loginDto) {
        return await this.authService.login(loginDetails);
    }
}
