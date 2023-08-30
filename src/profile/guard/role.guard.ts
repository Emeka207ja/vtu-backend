import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/entity/auth.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()

export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly profileService: ProfileService,
        private readonly authService:AuthService
    ) { }

  async canActivate(context: ExecutionContext):Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

      if (!requiredRoles) return true;
      console.log(requiredRoles)

      const username:string= context.switchToHttp().getRequest().body?.username;
    //   console.log(context.switchToHttp().getRequest().rawHeaders)
      const test: string[] = context.switchToHttp().getRequest().rawHeaders
      const testToken:String = test.find(id => id.startsWith("Bearer"))
      
      const token:string = testToken.split(" ")[1]
      const userID = await this.authService.decodeToken(token)
      const user =await  this.profileService._find(userID)

      if (!user) return false;
      

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
