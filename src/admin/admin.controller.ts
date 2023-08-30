import { Controller, Post, Get, UseGuards ,Body} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { AdminService } from './admin.service';
import { searchUserDto } from './dto/searchuser.dto';
import {fundUpdateDto} from "./dto/fundingUpdate.dto"
import { Roles } from 'src/profile/decorators/roles.decorator';
import { Role } from 'src/auth/entity/auth.entity';

@Controller('api/v1/admin')
export class AdminController {
    constructor(
        private readonly adminService:AdminService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Post("/search_user")
    async searchUser(@Body() detail:searchUserDto) {
        return this.adminService.adminSearchUser(detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/total_count")
    @Roles(Role.ADMIN)
    async getUserCount() {
        return this.adminService.adminGetUsersCount()
    }

    @UseGuards(JwtAuthGuard)
     @Roles(Role.ADMIN)
    @Get("/total_users")
    async getAllUsers() {
        return this.adminService.adminGetAllUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/daily_signups")
    @Roles(Role.ADMIN)
    async getDailySignup() {
        return this.adminService.adminGetDailySignups()
    }

    @UseGuards(JwtAuthGuard)
    @Post("/update_fund")
    async FundUpdate(@Body() detail:fundUpdateDto) {
        return this.adminService.adminUpdateFunding(detail)
    }
}
