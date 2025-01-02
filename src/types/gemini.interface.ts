// src/types/chat.interface.ts

// Interface cho yêu cầu gửi tin nhắn
export interface IChatTextRequest {
  message: string;
}

// Interface cho phản hồi từ chat text
export interface IChatTextResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    index: number;
  }>;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion: string;
}
export interface IChatImageRequest {
  message: string;
  file?: File;
}
// Interface cho các đánh giá an toàn
export interface ISafetyRating {
  category: string;
  probability: string;
}

// Interface cho nội dung của phản hồi hình ảnh
export interface IContent {
  parts: Array<{ text: string }>;
  role: string;
}

// Interface cho các ứng viên trong phản hồi hình ảnh
export interface ICandidate {
  content: IContent;
  finishReason: string;
  index: number;
  safetyRatings: ISafetyRating[];
}

// Interface cho thông tin sử dụng
export interface IUsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

// Interface cho phản hồi từ chat image
export interface IChatImageResponse {
  candidates: ICandidate[];
  usageMetadata: IUsageMetadata;
  modelVersion: string;
}
// Path: src/types/gemini.interface.ts
//Interface cho yêu cầu Gemini Chat Text
export interface PromptListData {
  modifiedAt: string | null; // Thời gian chỉnh sửa, có thể null
  id: number; // ID của prompt
  promptName: string; // Tên của prompt
  promptText: string; // Nội dung chi tiết của prompt
  isActive?: boolean; // Thêm trường này
}
export interface ChatWithPromptFormData {
  prompt_name: string; // Tên của prompt
  message: string; // Tin nhắn
}
export interface UpdatePromptFormData {
  prompt_name: string; // Tên của prompt
  new_prompt_name: string; // Tin nhắn
  prompt_text: string; // ID của prompt
}
export interface CreatePromptFormData {
  prompt_name: string; // Tên của prompt
  prompt_text: string; // Tin nhắn
}
export interface DeletePromptFormData {
  prompt_name: string; // ID của prompt
}
export interface AnalysisPromptFormData {
  product_id: string; // ID của prompt
}