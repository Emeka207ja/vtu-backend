

export interface isquad{
    Event: string;
    TransactionRef: string;
  Body:ibody
}
interface ibody {
    amount: number
    transaction_ref: string
    gateway_ref: string
    transaction_status: string
    email:string
    currency: string
    transaction_type: string
    merchant_amount: string
    created_at: string
    customer_mobile:string
    meta: imeta
    is_recurring: boolean
}
  
interface imeta{
      plan: string
    }