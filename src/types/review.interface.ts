import { PaginationResponse } from "./base.interface";

export interface ReviewData {
  review_id: number;
  user_avatar: string;
  username: string;
  rating: number;
  text_comment: string;
  image_comment: string | null;
  tag: string[];
  is_shop_reply: boolean;
  reply: string | null;
  like_count: number;
  createdAt: string;
}

export interface ReviewRating {
  review_count: number;
  rating: number;
  one_star_count: number;
  two_star_count: number;
  three_star_count: number;
  four_star_count: number;
  five_star_count: number;
}

export interface ReviewResponse {
  my_review: ReviewData | null;
  review_page: PaginationResponse<ReviewData>;
  review_rating: ReviewRating;
}

export interface CreateReviewRequest {
  productId: number;
  rating: number;
  textReview: string;
  tag: string;
}

export interface UpdateReviewRequest {
  reviewId: number;
  rating: number;
  textReview: string;
  tag: string;
}

export interface ReviewFormData {
  rating: number;
  textReview: string;
  tag: string;
  image?: File;
}

export interface GetReviewsParams {
  productId: number;
  rating: number | null;
  sort: string | null;
  pageNumber: number;
  pageSize: number;
}

export interface ReviewToCustomerProps {
  productId?: string;
  isShopOwner?: boolean;
} 