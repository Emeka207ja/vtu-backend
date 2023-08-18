import { Controller, Post, Get, UseGuards, Req,Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { reqUser } from 'src/type/Req';
import { InsuranceService } from './insurance.service';
import { vehicleInsureDto } from './dto/createvehicle.dto';
import { homeInsureDto } from './dto/createHome.dto';

@Controller('api/v1/insurance')
export class InsuranceController {
    constructor(
        private readonly insuranceService:InsuranceService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("/vehicle")
    async createVehicleInsurance(@Body() detail: vehicleInsureDto, @Req() req: Request & reqUser) {
        return await this.insuranceService.createVehicleInsurance(req.user.id,detail)
     }
    
    @UseGuards(JwtAuthGuard)
    @Post("/home")
    async createHomeInsurance(@Body() detail: homeInsureDto, @Req() req: Request & reqUser) {
        return await this.insuranceService.createHomeInsurance(req.user.id,detail)
     }
    
    @UseGuards(JwtAuthGuard)
    @Get("/vehicle")
    async getVehicleInsurance(@Req() req: Request & reqUser) { 
       return await this.insuranceService.getVehicleInsurance(req.user.id)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("/home")
    async getHomeInsurance(@Req() req: Request & reqUser) {
        return await this.insuranceService.getHomeInsurance(req.user.id)
    }
}
