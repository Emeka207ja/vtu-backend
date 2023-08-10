import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import { join } from 'path';
import { ExpressHandlebars } from 'express-handlebars';
import { purchaseEmail } from './interface/ipurchaseemail';
import { prepaidDto } from 'src/electricity/dto/prepaidDto';

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
            .social{
              display:flex;
              align-items:center;
              justify-content: space-around;
            }
          </style>
      </head>
      <body>
          <h1> ${subject}</h1>
          
          <p>dear ${detail.name}</p>
          <p> you purchased airtime  of &#8358; ${detail.price} to ${detail.phone}</p>
          <p>thanks for using Allpoint service, we appreciate big time.</p>
          <p>do well to follow our social media channels</p>
          <p>and drop your honest reviews</p>
          <p>we are committed to serving you better cheers!</p>
          <div class="social">
            <div>
              <a href="">
                <img width="48" height="48" src="https://img.icons8.com/color/48/twitter--v1.png" alt="twitter--v1"/>
              </a>
            </div>
            <div>
              <a href="">
                <img width="48" height="48" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/>
              </a>
            </div>
          </div>
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
    async sendElectricityPurchaseMail(to: string, subject: string, name:string,detail:prepaidDto) {
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
            .social{
              display:flex;
              align-items:center;
              justify-content: space-around;
            }
          </style>
      </head>
      <body>
          <h1> ${subject}</h1>
          
          <p>dear ${name}</p>
          <p> you purchased prepaid metre subscription  of &#8358; ${detail.amount} </p>
          <p> your token :  ${detail.purchased_code} </p>
          <p> utility name:   ${detail.utilityName} </p>
          <p>thanks for using allpointvtu, we appreciate big time!</p>
          <p>do well to follow our social media channels</p>
          <p>and drop your honest reviews</p>
          <p>we are committed to serving you better cheers!</p>
          <div class="social">
            <div>
              <a href="">
                <img width="48" height="48" src="https://img.icons8.com/color/48/twitter--v1.png" alt="twitter--v1"/>
              </a>
            </div>
            <div>
              <a href="">
                <img width="48" height="48" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/>
              </a>
            </div>
          </div>
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
}
