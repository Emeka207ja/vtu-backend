import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dataEntity } from './Entity/dataEntity';
import { dataDto } from './Dto/dataDto';
import { updatedataDto } from './Dto/updatedataDto';
import { networkData, inetwork } from './iData';
import { dataParam } from './Dto/getdataDto';
@Injectable()
export class DataService {
    constructor(
        @InjectRepository(dataEntity) private readonly dataRepository:Repository<dataEntity>
    ) { }
    
    async addDataService(details:dataDto) {
        const data = this.dataRepository.create(details)
        await this.dataRepository.save(data)
        return data.id
    }

    async updateDataService(id:string,details: updatedataDto) {
        const {network, price, name, plan_id, size } = details
        const data = await this.dataRepository.findOneBy({ id })
        if (!data) {
            throw new NotFoundException();
        }
        if (network) {
            data.network = network
        }
        if (price) {
            data.price = price
        }
        if (name) {
            data.name = name;
        }
        if (plan_id) {
            data.plan_id = plan_id
        }
        if (size) {
            data.size = size
        }
        await this.dataRepository.save(data)
        return data.id
    }

    async getDataByNetwork(network: string) {
        const isAvalable = networkData.find(item => item.name === network)
        if (!isAvalable) {
            throw new BadRequestException("wrong request format")
        }
        
        const qBuilder = this.dataRepository.createQueryBuilder("data")
        const data = qBuilder
            .where("data.network = :network", { network })
            .getMany()
        return data
    }

    async getAllData() {
        const data = await this.dataRepository.find({})
        return data;
    }
}
