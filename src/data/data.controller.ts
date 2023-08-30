import { Controller,Post,Patch,Get,Param,UseGuards,Body,Req } from '@nestjs/common';
import { DataService } from './data.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { dataDto } from './Dto/dataDto';
import { updatedataDto } from './Dto/updatedataDto';
import { dataParam } from './Dto/getdataDto';
import { dataPurchaseDto } from './Dto/purchasedata.dto';
import { reqUser } from 'src/type/Req';
import { Roles } from 'src/profile/decorators/roles.decorator';
import { Role } from 'src/auth/entity/auth.entity';

@Controller('api/v1/data')
export class DataController {
    constructor(
        private readonly dataService: DataService,
        
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async addData(@Body()details: dataDto) {
        return await this.dataService.addDataService(details)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post("/buydata")
    async purchaseData(@Body()details: dataPurchaseDto,@Req() req:Request&reqUser) {
        return await this.dataService.purchaseData(req.user.id,details)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update/:id")
    @Roles(Role.ADMIN)
    async updateData(@Param("id") id:string, @Body()details: updatedataDto) {
        return await this.dataService.updateDataService(id,details)
    }
    
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Get()
    async getAllData() {
        // this.emailService.sendMail("allpointgroups@gmail.com", " integration");
        return await this.dataService.getAllData()
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @Roles(Role.ADMIN)
    async getData( @Param("id") id:string) {
        return await this.dataService.getDataByNetwork(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/selected/:id")
    @Roles(Role.ADMIN)
    async getDataById( @Param("id") id:string) {
        return await this.dataService.getDataById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/failed/:service")
    @Roles(Role.ADMIN)
    async getFailedTransactions( @Param("service") service:string,@Req() req:Request&reqUser) {
        return await this.dataService.getFailedTransactions(req.user.id,service)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/refund/:requestId/:username")
    @Roles(Role.ADMIN)
    async refund( @Param("requestId") requestId:string, @Param("username") username:string) {
        return await this.dataService.refund(username,requestId)
    }



}
