export interface iMonnify{
  eventType: string,
  eventData: {
    product: {
      reference: string,
      type: string
    },
    transactionReference: string
    paymentReference: string
    paidOn: string,
    paymentDescription: string,
    metaData: {},
    paymentSourceInformation: [
      {
        bankCode: string,
        amountPaid: number,
        accountName: string,
        sessionId: string,
        accountNumber: string
      }
    ],
    destinationAccountInformation: {
      bankCode: string,
      bankName: string,
      accountNumber: string
    },
    amountPaid: number,
    totalPayable: number,
    cardDetails: {},
    paymentMethod: string,
    currency: string,
    settlementAmount: string,
    paymentStatus: string,
    customer: {
      name: string,
      email: string
    }
  }
}