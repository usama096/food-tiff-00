import {Product } from "../../products/models/products";

export interface Plan {
  id?: number
  planCategory: string,
  planType: string,
  perMealPrice: string,
  isPublished: boolean,
  description: string,
  imageId?: string,
}
