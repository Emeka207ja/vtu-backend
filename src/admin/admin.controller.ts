import { Controller, Post, Get, UseGuards ,Body} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { AdminService } from './admin.service';
import { searchUserDto } from './dto/searchuser.dto';
import {fundUpdateDto} from "./dto/fundingUpdate.dto"


@Controller('api/v1/admin')
export class AdminController {
    constructor(
        private readonly adminService:AdminService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post("/search_user")
    async searchUser(@Body() detail:searchUserDto) {
        return this.adminService.adminSearchUser(detail)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/total_count")
    async getUserCount() {
        return this.adminService.adminGetUsersCount()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/total_users")
    async getAllUsers() {
        return this.adminService.adminGetAllUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/daily_signups")
    async getDailySignup() {
        return this.adminService.adminGetDailySignups()
    }

    @UseGuards(JwtAuthGuard)
    @Post("/update_fund")
    async FundUpdate(@Body() detail:fundUpdateDto) {
        return this.adminService.adminUpdateFunding(detail)
    }
}
