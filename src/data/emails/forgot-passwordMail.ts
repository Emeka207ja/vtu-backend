
import { dstvDto } from "src/dstv/dto/dstv.dto"
export const forgotPasswordMail = (subject:string, email:string,token:string,name:string) => {
    return  `
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
          <p>you requested for password reset </p>
          <p> click on the link below to reset your password </p>
          <p> https://allpoint.vercel.app/forgotpassword?token=${token} </p>
          <p>please ignore this mail if you did not initiate this process</p>
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
    `
}