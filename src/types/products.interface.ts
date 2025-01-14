export interface IProduct {
  length: number;
  productId: number;
  productCode: string;
  productTitle: string;
  productSlug: string;
  imageUrl: string | null;
  breadcrumbs: string[] | null;
  minPrice: number;
  maxPrice: number;
  rating: number;
  soldCount: number;
  brandId: number;
  category: string;
  brand: string;
  specs?: ProductSpecs
  installment?: boolean
  hasVideo?: boolean
  isFavorite?: boolean
  isBestseller?: boolean
  fastShipping?: boolean
  likes?: number
}
interface ProductSpecs {
  chip?: string
  battery?: string
  camera?: string
}