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
  categoryId: number | null;
}