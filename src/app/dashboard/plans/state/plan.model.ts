import { Image } from "src/app/shared/models/image-model";

export interface Plan {
  id?: number
  planCategory: string,
  planType: string,
  perMealPrice: string,
  description: string,
  isPublished: boolean,
  image?: Image,
  imageId?: string
}
