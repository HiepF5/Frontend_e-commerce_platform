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
