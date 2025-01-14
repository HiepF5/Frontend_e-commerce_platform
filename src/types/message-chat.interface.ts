// types.ts'

export interface IChatCreateRequest {
  user_code: string
  shop_code: string
}
export interface IChatStoryRequest {
  chat_id: number;
  page_number: number;
  page_size: number;
}
export interface IChatListRequest {
  userCode: string | null;
  shopCode: string | null;
  pageNumber: number;
  pageSize: number;
}
export interface IChatListResponse {
  data: IChatItem[];
  totalAmount: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
}
//
export interface IMessage {
  id: number;
  is_shop_sender: boolean;
  reply_to: number;
  reply_message: string | null;
  content: string;
  image_Url: string | null;
  is_read: boolean;
  created_at: string;
}

export interface IChatDetail {
  chat_id: number;
  user_code: string;
  shop_code: string;
  story_avatar: string;
  story_name: string;
  unread_message_count: number;
  active: boolean;
  list_message: IMessage[];
}
export interface IChatItem {
  chat_id: number;
  online: boolean;
  user_code: string;
  shop_code: string;
  story_avatar: string;
  story_name: string;
  last_message: string | null;
  send_last_at: string | null;
  unread_message_count: number;
  active: boolean;
}