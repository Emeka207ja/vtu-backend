// import { waecSubDto } from "src/education/dto/waceSubDto";
import { vehicleInsureDto } from "src/insurance/dto/createvehicle.dto";
export const vehicleSubmail = (subject: string, name: string,detail:vehicleInsureDto) => {
    return `
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
          <p> you purchased a ${subject}  of &#8358; ${detail.amount}; </p>
          <p> product name: ${detail.product_name}  </p>
          <p> transaction query id : ${detail.requestId}  </p>
           <p> certificate URL : <a href=${detail.certUrl}> cerificate link</a> </p>
            <p> click on the link above to print your vehicle insurance certificate  </p>
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