import { BadRequestException, Injectable,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entity/auth.entity';
import { Role } from './entity/auth.entity';
import { signupDto } from './dto/signupDto';
import { payload } from './interface/jwtSignPayload';
import { JwtService } from '@nestjs/jwt';
import { Token } from './interface/jwtToken';
import { ProfileService } from 'src/profile/profile.service';
import { loginDto } from './dto/loginDto';
import { referralDto } from './dto/referral.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
        private jwtService: JwtService,
        private readonly profileService:ProfileService,
    ) { }

    async signup(userDto: signupDto): Promise<string> { 
       
        const { email, username, password,name,phone } = userDto;
        
        await this._verifyEmail(email);

        await this._verifyUsername(username);
       
        if (userDto.referral) {
            const referralId = await this.decodeToken(userDto.referral)
            await this.profileService.updateUserReferral(referralId)
            const user: Auth = this.authRepository.create({ email, username, password,phone });
            const profile = await this.profileService.createProfile({ email, username, referralId,name,phone});
            user.profile = profile;
            await this.authRepository.save(user);
            return user.id;
        }

         const user: Auth = this.authRepository.create({ email, username, password,phone });
        const profile = await this.profileService.createProfile({ email, username,name,phone});
         
           user.profile = profile;

          await this.authRepository.save(user);

           return user.id;
    };

    async login(loginDetails: loginDto): Promise<String> { 
        const {username,password} = loginDetails
        const user: Auth = await this._verifyUser(username, password);

        const jwtPayload: payload = {
            id: user.id,
            role:user.role
        }
        return await this.jwtService.signAsync(jwtPayload)
    }
    
    async _verifyUser(username: string, password: string) { 
       
           const user: Auth = await this.authRepository.findOneBy({ username });
           if(!user){
                throw new NotFoundException("invalid username or password")
           }
           const passwordMatch: boolean = await user.verifyPassword(password,user.password);
           if(!passwordMatch){
                throw new BadRequestException("invalid password or username")
           }
           if (user && passwordMatch) return user;
   
    }

    async _verifyEmail(email: string) {
       const emailExist = await this.authRepository.findOneBy({ email });
            if (emailExist) throw new BadRequestException("email not available");
    }

    async _verifyUsername(username: string) {
       const usernameExist = await this.authRepository.findOneBy({ username })
           if (usernameExist) throw new BadRequestException("username taken");
    }

    async _find(id: string): Promise<Auth|Error> {
        const user = await this.authRepository.findOneBy({ id })
        if(!user) throw new NotFoundException("user not found")
            return user;
    }

    async sendHeader() {
        return {
            api_key: process.env.API_KEY,
            secret_key:process.env.SECRET_KEY
        }
    }
    async sendAuthDetails() {
        return {
            username: process.env.VTU_USERNAME,
            password:process.env.VTU_PASSWORD
        }
    }

    async sendBvnAcctDetails() {
        return {
            bvn: process.env.BVN,
            acctnum: process.env.ACCT,
            secret_key : process.env.SQUADKEY
        }
    }

    async generateReferralLink(details: referralDto) {
        const {username} = details
        const user = await this.authRepository.findOneBy({username})
        if (!user) {
            throw new NotFoundException("user not found")
        }
        
        const jwtPayload: payload = {
            id: user.id,
            role:user.role
        }
        const token = await this.jwtService.signAsync(jwtPayload)
        const link = `http://easy-buy-psi.vercel.app/signup?referral=${token}`
        return link;

    }

    async decodeToken(token:string) {
        const user = await this.jwtService.verify(token) as payload
        if (!user) {
            throw new NotFoundException("user does not exist") 
        }
        return user.id
    }

    async getAllUsers() {
        const qBuilder = await this.authRepository.createQueryBuilder("user");
        const users = qBuilder
            .getMany()
        return users;
    }
    async getUserCount() {
        const qBuilder = await this.authRepository.createQueryBuilder("user");
        const count = qBuilder
            .getCount()
        return count;
    }

    async getDailySignup() {

        const today = new Date()
        const twentyFourHoursAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        
        const qBuilder= await this.authRepository.createQueryBuilder("user");

        const daily = qBuilder
            .where("user.created_at >= :twentyFourHoursAgo", { twentyFourHoursAgo })
            .getMany()
        return daily;
    }
    
}
