export interface Reaction {
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  count: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

export interface Post {
  id: string;
  postRole: 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  content: string;
  location?: string;
  hashTag: string[];
  author: string;
  avatar: string;
  timestamp: string;
  reactions: Reaction[];
  comments: Comment[];
  image?: string;
}
export interface ICreatePostJsonRequest {
  post_json: ICreatePostJson;
  files: File[] | null;
}
export interface ICreatePostJson {
  id?: number;
  postRole: 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  content: string;
  location?: string;
  hashTag: string[];
}
export interface IPostResponse {
  post_id: number;
  is_shared: boolean;
  post_role: 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG';
  post_avatar: string;
  post_name: string;
  user_code: string;
  content: string;
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  media_url: string[] | null;
  location: string;
  hash_tag: string[];
  active: boolean;
  my_reaction: 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY' | 'NONE' | null;
  is_my_like: boolean | null;
  like_count: number;
  comment_count: number;
  shared_count: number;
  shared_post: ISharedPost | null;
  created_at: string; // Mô tả dạng: "23 tháng 12 lúc 01:36"
}
export interface ISharedPost {
  shared_post_id: number;
  post_role: 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG';
  shared_post_avatar: string;
  shared_post_name: string;
  content: string;
  media_url: string[] | null;
  hash_tag: string[];
  created_at: string;
}

export interface ISharePostRequest {
  sharedId: number;
  postRole: 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  content: string;
  location?: string;
}

// Request interfaces
export interface GetNewPostsRequest {
  hashTag?: string | null;
  my_user_code?: string | null;
  page_number: number;
  page_size: number;
}

export interface GetMyPostsRequest {
  hash_tag?: string | null; 
  page_number: number;
  page_size: number;
}

export interface GetUserPostsRequest {
  user_code_other: string;
  hash_tag?: string | null;
  page_number: number;
  page_size: number;
}

export interface ICommentResponse {
  commentId: number;
  userCode: string;
  shopCode: string | null;
  userAvatar: string;
  username: string;
  role: 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG';
  content: string;
  mediaUrl: string | null;
  lever: number;
  createdAt: string;
  children: ICommentResponse[] | null;
}

export interface ICommentRequest {
  post_id: number;
  content: string;
  parent_id?: number;
}