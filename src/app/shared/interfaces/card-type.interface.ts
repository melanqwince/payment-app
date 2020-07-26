export enum CardTypeAvaible {
  VISA = 'Visa',
  MASTERCARD = 'MasterCard',
  AMEX = 'Amex'
}

export interface CardType {
  id: string,
  value: string
}