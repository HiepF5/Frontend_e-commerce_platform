const enum EPATHS {
  ServiceAccount = '/guest/users',
  ServiceUsers = '/all/users',
  ServiceAddress = '/customer/address',
  ServiceGhn = '/guest/ghn',
  ServiceGemini = '/guest/gemini',
}
export const API_ENDPOINTS_ACCOUNT = {
  ApiLogin: `${EPATHS.ServiceAccount}/login`,
  ApiRegister: `${EPATHS.ServiceAccount}/register`,
  ApiCheckRegister: `${EPATHS.ServiceAccount}/check-register`,
  ApiForgotPassword: `${EPATHS.ServiceAccount}/forgot-password`,
  ApiCheckForgot: `${EPATHS.ServiceAccount}/check-forgot`,
};
export const API_ENDPOINTS_USERS = {
  ApiChangePassword: `${EPATHS.ServiceUsers}/change-password`,
  ApiChangeInfo: `${EPATHS.ServiceUsers}/change-info`,
  ApiChangeAvatar: `${EPATHS.ServiceUsers}/change-avatar`,
  ApiGetUserDetail: `${EPATHS.ServiceUsers}/detail`,
};
export const API_ENDPOINTS_ADDRESS = {
  ApiGetAllAddress: `${EPATHS.ServiceAddress}/get-all`,
  ApiCreateAddress: `${EPATHS.ServiceAddress}/create`,
  ApiUpdateAddress: `${EPATHS.ServiceAddress}/update`,
  ApiDeleteAddress: `${EPATHS.ServiceAddress}/delete`,
};
export const API_ENDPOINTS_GHN = {
  ApiGetProvince: `${EPATHS.ServiceGhn}/province`,
  ApiGetDistrict: `${EPATHS.ServiceGhn}/district`,
  ApiGetWard: `${EPATHS.ServiceGhn}/ward`,
};
export const API_ENDPOINTS_CHATBOT = {
  ApiChatBotText: `${EPATHS.ServiceGemini}/chat-text`,
  ApiChatBotImage: `${EPATHS.ServiceGemini}/chat-image`,
  ApiChatBotPrompt: `${EPATHS.ServiceGemini}/get-prompt`,
  ApiCreatePrompt: `${EPATHS.ServiceGemini}/create-prompt`,
  ApiUpdatePrompt: `${EPATHS.ServiceGemini}/update-prompt`,
  ApiDeletePrompt: `${EPATHS.ServiceGemini}/delete-prompt`,
  ApiAnalysisPrompt: `${EPATHS.ServiceGemini}/product-analysis`,
  ApiReviewWithPrompt: `${EPATHS.ServiceGemini}/product-review`,
  ApiChatWithPrompt: `${EPATHS.ServiceGemini}/prompt-text`,

};
export const API_ENDPOINTS_SHOP = {
  ApiCreateSubscribe: 'customer/shop/subscribe',
  ApiGetShopDetail: 'customer/shop/get-detail',
  ApiUpdateShop: 'owner/shop/update',
  ApiRemoveShop: 'owner/shop/remove',
  ApiRestoreShop: 'owner/shop/restore',
  ApiLockShop: 'admin/shop/lock',
  ApiFollowShop: 'customer/shop/follow-shop',
  ApiGetShopByShopCode: 'guest/shop/get-detail-by-code',
  ApiCheckShopFollow:'/customer/shop/check-follow'  
};
export const API_ENDPOINTS_SHOPREVIEW = {
  ApiGetReviewByPage: 'guest/shop/page-review',
  ApiCreateReview: 'customer/shop/create-review',
  ApiUpdateReview: 'customer/shop/update-review',
  ApiDeleteReview: 'customer/shop/delete-review',
  ApiMyReview: 'customer/shop/my-review',
  ApiAdminDeleteReview: 'admin/shop/delete-review',
  ApiOwnerReplyReview: 'owner/shop/reply-review',
};
export const API_ENDPOINTS_THREAD = {
  ApiGetMyListThread: 'all/post/my-post',
  ApiCreateThread: 'all/post/create',
  ApiUpdateThread: 'all/post/update',
  ApiDeleteThread: 'all/post/delete',
  ApiSharedThread: 'all/post/shared',
  ApiGetUserListThread: 'all/post/user-post',
  ApiUserReactionThread: 'all/post/reaction',
  ApiAdminActiveThread: 'admin/post/active',
  ApiGetListThread: 'guest/post/new',
  ApiReactionThread: 'all/post/reaction',
}
export const API_ENDPOINTS_THREAD_COMMENT = {
  ApiGetCommentThread: 'guest/post/get-comment',
  ApiCreateCommentThread: 'all/post/create-comment',
  ApiUpdateCommentThread: 'all/post/update-comment',
  ApiDeleteCommentThread: 'all/post/delete-comment',
}


