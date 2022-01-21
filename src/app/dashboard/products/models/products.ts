export interface Products {
  id?: number,
  name: string ,
  description: string,
  image: string,
  price: number,
  shortDesc: string,
  productType: string,
  category: string,
  ingrediants: string[],
  allergyInfo: string,
  calories: number
  weight: string
}
export interface ProductsResolved {
  products: Products | null;
  error?: any;
}
