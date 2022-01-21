export interface Plans {
  id?: number
  planCategory: string,
  planType: string,
  weekly_price: string,
  monthly_price: string,
  image: any,
  action: any,
  date: string,
  meals: object[]
}
