import { Controller,Post,Patch,Get,Param,UseGuards,Body } from '@nestjs/common';
import { DataService } from './data.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { dataDto } from './Dto/dataDto';
import { updatedataDto } from './Dto/updatedataDto';
import { dataParam } from './Dto/getdataDto';

@Controller('api/v1/data')
export class DataController {
    constructor(
        private readonly dataService:DataService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async addData(@Body()details: dataDto) {
        return await this.dataService.addDataService(details)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update/:id")
    async updateData(@Param("id") id:string, @Body()details: updatedataDto) {
        return await this.dataService.updateDataService(id,details)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllData() {
        return await this.dataService.getAllData()
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getData( @Param("id") id:string) {
        return await this.dataService.getDataByNetwork(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/selected/:id")
    async getDataById( @Param("id") id:string) {
        return await this.dataService.getDataById(id)
    }

}
