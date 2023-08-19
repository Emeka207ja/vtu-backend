import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { vehicleEntitity } from './entity/vehicleInsure.entity';
import { vehicleInsureDto } from './dto/createvehicle.dto';
import { ProfileService } from 'src/profile/profile.service';
import { homeEntitity } from './entity/homeInsure.entity';
import { homeInsureDto } from './dto/createHome.dto';
import { EmailService } from 'src/data/email.service';

@Injectable()
export class InsuranceService {
    constructor(
        @InjectRepository(vehicleEntitity) private readonly vehicleRepository: Repository<vehicleEntitity>,
        @InjectRepository(homeEntitity) private readonly homeRepository: Repository<homeEntitity>,
        private readonly profileService:ProfileService,
        private readonly emailService:EmailService,
    ) { }
    
    async createVehicleInsurance(id: string, detail: vehicleInsureDto) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        
        const { amount } = detail
        await this.profileService.debitAccount(id, amount);
        const vehicle = this.vehicleRepository.create(detail);
        vehicle.profile = user
        await this.vehicleRepository.save(vehicle);

        // email service
        const { name, email } = user;
        const subject = "Vehicle Insurance"
        const tempMail = "asiwebrightemeka@gmail.com"
        await this.emailService.sendVehicleInsureMail(email,subject,name,detail)
        return vehicle.id;
    }

    async getVehicleInsurance(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const qBuilder = this.vehicleRepository.createQueryBuilder("vehicle");
        const vehicle = qBuilder
            .leftJoinAndSelect("vehicle.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return vehicle;
    }

    async createHomeInsurance(id: string, detail: homeInsureDto) {
        const user = await this.profileService._find(id);
        if (!user) {
            throw new NotFoundException("user not found")
        }
        
        const { total_amount,product_name } = detail;
        await this.profileService.debitAccount(id, total_amount);
        const home = this.homeRepository.create(detail)
        home.profile = user
        await this.homeRepository.save(home);

        // email service
        const { name, email } = user
        const subject = product_name
        const tempMail = "asiwebrightemeka@gmail.com"
        await this.emailService.sendHomeInsureMail(email,subject,name,detail)
        return home.id;
    }

     async getHomeInsurance(id: string) {
        const user = await this.profileService._find(id)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const qBuilder = this.homeRepository.createQueryBuilder("home");
        const home = qBuilder
            .leftJoinAndSelect("home.profile", "profile")
            .where("profile.id = :id", { id })
            .getMany()
        return home;
    }
}
