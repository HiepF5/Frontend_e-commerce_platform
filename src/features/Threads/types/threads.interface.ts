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
  postRole: 'KHACHHANG' | 'ADMIN' | 'STAFF';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  content: string;
  location?: string;
  hashTags: string[];
  author: string;
  avatar: string;
  timestamp: string;
  reactions: Reaction[];
  comments: Comment[];
  image?: string;
}
export interface ICreatePostJsonRequest {
  post_json: ICreatePostJson;
  file: File | null;
}
export interface ICreatePostJson {
  id?: number;
  postRole: 'KHACHHANG' | 'ADMIN' | 'STAFF';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  content: string;
  location?: string;
  hashTags: string[];
}
export interface IPostResponse {
  post_id: number;
  is_shared: boolean;
  post_role: 'KHACHHANG' | 'ADMIN' | 'STAFF';
  post_avatar: string;
  post_name: string;
  content: string;
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  media_url: string | null;
  location: string;
  hash_tag: string[];
  active: boolean;
  shared_count: number;
  is_my_like: boolean | null;
  like_count: number;
  comment_count: number;
  shared_post: ISharedPost | null;
  created_at: string;
}
export interface ISharedPost {
  shared_post_id: number;
  post_role: 'KHACHHANG' | 'ADMIN' | 'STAFF';
  shared_post_avatar: string;
  shared_post_name: string;
  content: string;
  media_url: string | null;
  hash_tag: string[];
  created_at: string;
}
export interface ISharePostRequest {
  sharedId: number;
  postRole: 'KHACHHANG' | 'ADMIN' | 'STAFF';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  content: string;
  location?: string;
}