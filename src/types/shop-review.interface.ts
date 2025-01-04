// src/types/shopReview.interface.ts

export interface IGetReviewByPageRequest {
  shopCode: string;
  rating?: number;
  sort?: number;
  pageNumber: number;
}

export interface IReview {
  [x: string]: any;
  id: number;
  userCode: string;
  username: string;
  userAvatar: string;
  rating: number;
  comment: string;
  isReply: boolean;
  reply: string | null;
  active: boolean;
  createAt : string;
  modifiedAt: string;
}
export interface ICreateReviewRequest {
  shopCode: string;
  rating?: number;
  comment: string;
}