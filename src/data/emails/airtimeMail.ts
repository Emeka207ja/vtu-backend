import { purchaseEmail } from "../interface/ipurchaseemail"

export const airtimeMail = ( subject: string,detail:purchaseEmail) => { 
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
          
          <p>dear ${detail.name}</p>
          <p> you purchased ${subject === "airtime purchase"? "airtime":"data"}  of &#8358; ${detail.price} to ${detail.phone}</p>
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
    `
}