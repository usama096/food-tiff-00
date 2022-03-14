import { Image } from "src/app/shared/models/image-model";

export interface Product {
  id?: number,
  name: string,
  description: string,
  imageId?: string,
  price: number,
  shortDescription: string,
  prodType: string,
  category: string,
  ingredients: string,
  allergyInfo: string,
  calories: number
  weight: string,
  isAvailable: boolean,
  sku: string,
  image?:Image
}


export interface ProductResolved {
  products: Product | null;
  error?: any;
}
