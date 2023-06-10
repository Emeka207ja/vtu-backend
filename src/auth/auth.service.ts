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

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
        private jwtService: JwtService,
        private readonly profileService:ProfileService,
    ) { }

    async signup(userDto: signupDto): Promise<string> { 
        console.log(process.env.JWT_SECRET)
        const { email, username, password } = userDto;
        
        await this._verifyEmail(email);

        await this._verifyUsername(username);
         const user: Auth = this.authRepository.create({ email, username, password });
           const profile = await this.profileService.createProfile({ email, username });
           user.profile = profile;

          await this.authRepository.save(user);

           return user.id;
    };

    async login(loginDetails: loginDto): Promise<Token> { 
        const {username,password} = loginDetails
        const user: Auth = await this._verifyUser(username, password);

        const jwtPayload: payload = {
            id: user.id,
            role:user.role
        }
        return {
            accessToken: await this.jwtService.signAsync(jwtPayload)
        }
    }
    
    async _verifyUser(username: string, password: string) { 
       
           const user: Auth = await this.authRepository.findOneBy({ username });
           const passwordMatch: boolean = await user.verifyPassword(password,user.password);
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
    
}
