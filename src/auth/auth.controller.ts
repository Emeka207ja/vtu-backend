import { Controller } from '@nestjs/common';
import { Body, Post, Get,HttpCode,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/loginDto';
import { LocalAuthGuard } from './guard/local-guard';
import { referralDto } from './dto/referral.dto';
import { ForgotPasswordDto } from 'src/profile/dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/loginDto';

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

    @Get("/vtu_auth")
    async sendAuthDetails() {
        return this.authService.sendAuthDetails()
    }

    @Get("/vtpass_header")
    async sendHeader() {
        return this.authService.sendHeader()
    }

    @Get("/squad_acct")
    async sendBvnAcctDetails() {
        return this.authService.sendBvnAcctDetails()
    }

    @Get("/geotop")
    async sendBeareToken() {
        return this.authService.sendBearerToken()
    }

    @Post("/referral")
    async generateReferrallink(@Body() user: referralDto) {
       
        return this.authService.generateReferralLink(user)
    }
    @Post("/forgotpassword")
    async sendForgotPasswordMail(@Body() email: ForgotPasswordDto) {
       
        return this.authService.sendForgotPasswordMail(email)
    }

    @Post("/resetpassword")
    async Resetpasword(@Body() detail: ResetPasswordDto) {
       
        return this.authService.resetPassword(detail)
    }
}
