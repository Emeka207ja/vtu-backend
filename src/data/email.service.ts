import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import { join } from 'path';
import { ExpressHandlebars } from 'express-handlebars';
import { purchaseEmail } from './interface/ipurchaseemail';

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
}
