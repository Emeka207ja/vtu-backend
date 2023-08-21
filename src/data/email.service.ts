import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import { join } from 'path';
import { ExpressHandlebars } from 'express-handlebars';
import { purchaseEmail } from './interface/ipurchaseemail';
import { prepaidDto } from 'src/electricity/dto/prepaidDto';
import { waecSubmail } from './emails/waecSubEmail';
import { waecSubDto } from 'src/education/dto/waceSubDto';
import { vehicleSubmail } from './emails/vehicleMail';
import { vehicleInsureDto } from 'src/insurance/dto/createvehicle.dto';
import { homeInsureDto } from 'src/insurance/dto/createHome.dto';
import { homeSubmail } from './emails/homeMail';
import { electricityMail } from './emails/electricityMail';
import { airtimeMail } from './emails/airtimeMail';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

    async sendMail(to: string, subject: string,detail:purchaseEmail) {
       const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>${subject}</title>
            <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            h1 {
              color: #007BFF;
            }
            p {
              color: #333;
            }
          </style>
      </head>
      <body>
          <h1> ${subject}</h1>
          
          <p>dear ${detail.name}</p>
          <p> you purchased data  of &#8358; ${detail.price} to ${detail.phone}</p>
          <p>thanks for using allpointvtu, we are committed to serving you better</p>
      </body>
      </html>
    `;
   
    await this.transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html
    });
    } 
    async sendAirtimePurchaseMail(to: string, subject: string,detail:purchaseEmail) {
       const html = airtimeMail(subject,detail);
   
    await this.transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html
    });
    } 
    async sendElectricityPurchaseMail(to: string, subject: string, name:string,detail:prepaidDto) {
      const html = electricityMail(subject,name,detail);
   
    await this.transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html
    });
    } 
  async sendWaecMail(to: string, subject: string, name:string,detail:waecSubDto) {
      const html = waecSubmail(subject,name,detail)
   
    await this.transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html
    });
  } 

  async sendVehicleInsureMail(to: string, subject: string, name:string,detail:vehicleInsureDto) {
      const html = vehicleSubmail(subject,name,detail)
   
    await this.transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html
    });
  } 

  async sendHomeInsureMail(to: string, subject: string, name:string,detail:homeInsureDto) {
      const html = homeSubmail(subject,name,detail)
   
    await this.transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html
    });
  } 
}
