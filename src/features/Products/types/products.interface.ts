
export interface IProductData {
    productId: number;
    title: string;
    productSlug: string;
    description: string;
    breadcrumbs: IBreadcrumb[];
    minPrice: number;
    maxPrice: number;
    listImg: string[];
    productBrand: IProductBrand;
    productCategory: IProductCategory;
    shopCode: string;
    rating: number;
    countComments: number;
    productVariant: IProductVariant[];
    favoritesCount: number;
    productAttribute: null | any;
}

export interface IBreadcrumb {
    id: number;
    category: string;
}

export interface IProductBrand {
    id: number;
    brand: string;
}

export interface IProductCategory {
    id: number;
    category: string;
}

export interface IProductVariant {
    variantId: number;
    attribute: IAttribute[];
    status: string;
    soldCount: number;
    stockCount: number;
    description: string;
    sellPrice: number;
}

export interface IAttribute {
    name: string;
    value: string;
}
export interface ProductRecommend {
  id: number;
  title: string;
  description: string | null;
  minPrice: number;
  maxPrice: number;
  brand: string;
  category: string;
  attribute: string; // Hoặc thay thế bằng: AttributeDocument[] nếu xử lý được attribute đúng là danh sách
  rating: number;
  reviewCount: number;
  soldCount: number;
  stockCount: number;
}
export interface ProductRequest {
  shopCode: string;       // Mã cửa hàng
  title: string | null;    // Tiêu đề sản phẩm, có thể là null
  brandId: number | null;  // ID của thương hiệu, có thể là null
  category: string | null; // Danh mục sản phẩm, có thể là null
  shopCategoryId: number | null; // ID danh mục cửa hàng, có thể là null
  pageNumber: number;      // Số trang
  pageSize: number;        // Số lượng sản phẩm trên mỗi trang
}
