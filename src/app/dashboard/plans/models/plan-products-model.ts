import { Product } from "../../products/models/products";

export interface PlanProducts {
  id: number,
  planId: number,
  productId: number,
  servingDate: string,
  isPublished: boolean,
  product?: Product
}
