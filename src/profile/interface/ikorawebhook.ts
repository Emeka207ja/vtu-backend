// {
//   "event": "charge.success",
//   "data": {
//     "reference": "KPY-PAY-4l5O8mxmgX2kijp",
//     "currency": "NGN",
//     "amount": 1000,
//     "fee": 15,
//     "status": "success",
//     "virtual_bank_account_details": {
//       "payer_bank_account": {
//         "account_name": "Ope Praise",
//         "account_number": "******1001",
//         "bank_name": "First Bank Nigeria"
//       },
//       "virtual_bank_account": {
//         "account_name": "Afro Jon",
//         "account_number": "7657789765",
//         "account_reference": "{{your_account_reference}}",
//         "bank_name": "Wema Bank"
//       }
//     },
//     "transaction_date": "2021-09-08T12:06:28.309Z"
//   }
// }


export interface iKora{
    event: string;
    data:iData

}

interface iData{
    reference: string;
    currency: string;
    amount: number,
    fee: number;
    status: string;
    virtual_bank_account_details: iDetails;
    transaction_date:string
    
}

interface iDetails{
    payer_bank_account: iAccount;
    virtual_bank_account:ivirtualAccount
}

interface iAccount{
    account_name: string;
    account_number: string;
    account_reference: string;
    bank_name:string
}

interface ivirtualAccount extends iAccount{
    account_reference:string
}