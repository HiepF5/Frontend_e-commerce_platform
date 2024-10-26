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
  ApiChatBotStory: `${EPATHS.ServiceGemini}/chat-story`,//??
};
export const API_ENDPOINTS_ORDER = {
  ApiGetAllOrder: '/customer/orders/get-all',
  ApiCreateOrder: '/customer/orders/create',
  ApiCancelOrder: '/customer/orders/cancel',
  ApiGetOrderDetail: '/customer/orders/detail',
  ApiGetOrderStatus: '/customer/orders/status',
};
export const API_ENDPOINTS_PRODUCT = {
  ApiGetAllProduct: '/all/products',
  ApiGetProductDetail: '/product/detail',
};
export const API_ENDPOINTS_CATEGORY = {
  ApiGetAllCategory: '/all/categories',
};
export const API_ENDPOINTS_REVIEW = {
  ApiGetAllReview: '/all/reviews',
  ApiCreateReview: '/customer/reviews/create',
  ApiUpdateReview: '/customer/reviews/update',
  ApiDeleteReview: '/customer/reviews/delete',
};
export const API_ENDPOINTS_BANNER = {
  ApiGetAllBanner: '/all/banners',
};
export const API_ENDPOINTS_SUBSCRIBE = {
  ApiCreateSubscribe: '/customer/subscribes/create',
};
export const API_ENDPOINTS_TESTIMONIAL = {
  ApiGetAllTestimonial: '/all/testimonials',
};
export const API_ENDPOINTS_POPUP = {
  ApiGetAllPopup: '/all/popups',
};
export const API_ENDPOINTS_THEME = {
  ApiGetAllTheme: '/all/themes',
};
export const API_ENDPOINTS_SETTING = {
  ApiGetAllSetting: '/all/settings',
};
export const API_ENDPOINTS_CONTACT = {
  ApiCreateContact: '/customer/contacts/create',
};
export const API_ENDPOINTS_FAQ = {
  ApiGetAllFAQ: '/all/faqs',
};
export const API_ENDPOINTS_SOCIAL = {
  ApiGetAllSocial: '/all/socials',
};
export const API_ENDPOINTS_NEWS = {
  ApiGetAllNews: '/all/news',
};
export const API_ENDPOINTS_EVENT = {
  ApiGetAllEvent: '/all/events',
};
export const API_ENDPOINTS_GALLERY = {
  ApiGetAllGallery: '/all/galleries',
};
export const API_ENDPOINTS_VIDEO = {
  ApiGetAllVideo: '/all/videos',
};
export const API_ENDPOINTS_PARTNER = {
  ApiGetAllPartner: '/all/partners',
};
export const API_ENDPOINTS_TEAM = {
  ApiGetAllTeam: '/all/teams',
};
export const API_ENDPOINTS_CAREER = {
  ApiGetAllCareer: '/all/careers',
};
export const API_ENDPOINTS_JOB = {
  ApiGetAllJob: '/all/jobs',
};
export const API_ENDPOINTS_APPLICATION = {
  ApiCreateApplication: '/customer/applications/create',
};
export const API_ENDPOINTS_CV = {
  ApiCreateCV: '/customer/cvs/create',
};
export const API_ENDPOINTS_RESUME = {
  ApiCreateResume: '/customer/resumes/create',
};
export const API_ENDPOINTS_EDUCATION = {
  ApiCreateEducation: '/customer/educations/create',
};
export const API_ENDPOINTS_EXPERIENCE = {
  ApiCreateExperience: '/customer/experiences/create',
};
export const API_ENDPOINTS_SKILL = {
  ApiCreateSkill: '/customer/skills/create',
};
export const API_ENDPOINTS_CERTIFICATE = {
  ApiCreateCertificate: '/customer/certificates/create',
};
export const API_ENDPOINTS_PROJECT = {
  ApiCreateProject: '/customer/projects/create',
};
export const API_ENDPOINTS_SERVICE = {
  ApiCreateService: '/customer/services/create',
};
export const API_ENDPOINTS_PORTFOLIO = {
  ApiCreatePortfolio: '/customer/portfolios/create',
};
export const API_ENDPOINTS_TEST = {
  ApiCreateTest: '/customer/tests/create',
};
export const API_ENDPOINTS_QUESTION = {
  ApiCreateQuestion: '/customer/questions/create',
};
export const API_ENDPOINTS_ANSWER = {
  ApiCreateAnswer: '/customer/answers/create',
};
export const API_ENDPOINTS_EXAM = {
  ApiCreateExam: '/customer/exams/create',
};
export const API_ENDPOINTS_RESULT = {
  ApiCreateResult: '/customer/results/create',
};
export const API_ENDPOINTS_SCORE = {
  ApiCreateScore: '/customer/scores/create',
};
export const API_ENDPOINTS_RANK = {
  ApiCreateRank: '/customer/ranks/create',
};
export const API_ENDPOINTS_CERTIFICATION = {
  ApiCreateCertification: '/customer/certifications/create',
};
export const API_ENDPOINTS_TRAINING = {
  ApiCreateTraining: '/customer/trainings/create',
};
export const API_ENDPOINTS_WORKSHOP = {
  ApiCreateWorkshop: '/customer/workshops/create',
};
export const API_ENDPOINTS_WEBINAR = {
  ApiCreateWebinar: '/customer/webinars/create',
};
export const API_ENDPOINTS_SEMINAR = {
  ApiCreateSeminar: '/customer/seminars/create',
};
export const API_ENDPOINTS_CONFERENCE = {
  ApiCreateConference: '/customer/conferences/create',
};
export const API_ENDPOINTS_MEETING = {
  ApiCreateMeeting: '/customer/meetings/create',
};
export const API_ENDPOINTS_EVENT_REGISTRATION = {
  ApiCreateEventRegistration: '/customer/event-registrations/create',
};
export const API_ENDPOINTS_GALLERY_IMAGE = {
  ApiCreateGalleryImage: '/customer/gallery-images/create',
};
export const API_ENDPOINTS_VIDEO_CLIP = {
  ApiCreateVideoClip: '/customer/video-clips/create',
};


