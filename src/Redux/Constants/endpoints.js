const endPoints = {
  // auth
  LOGIN: 'tokens',
  COUPLES_SIGN_UP: 'users/couple-register',
  BULK_COUPLES_SIGN_UP: 'users/bulk-couple-register',
  VENDOR_SIGN_UP: 'users/vendor-register',
  ADMIN_VENDOR_SIGN_UP: 'users/admin-vendor-register',
  USER_SIGN_UP: 'register',
  FORGOT_PASSWORD: 'users/forgot-password',

  // dashboard
  GET_DASHBOARD_DETAILS: 'v1/events/current-event',
  SAVE_CURRENT_EVENT: 'v1/events/save-event',
  DELETE_EVENT_PREFERENCE: 'v1/events/remove-preference',

  // profile
  GET_USER_PROFILE: 'personal',
  UPDATE_USER_PROFILE: 'personal',
  CHANGE_PASSWORD: 'personal/change-password',
  DELETE_ACCOUNT: 'delete-account',
  POST_FCM_TOKEN: 'personal/device-token',
  DELETE_VENDOR_ACCOUNT: 'personal/delete-vendor-account',
  DELETE_COUPLE_ACCOUNT: 'personal/delete-couple-account',
  COUPLES: 'personal/couples',
  CONTACT_US: 'personal/contact-us',
  SEND_EMAIL: 'personal/send-email',

  // category
  GET_CATEGORIES: 'v1/categories',
  GET_CATEGORIES_PREFERENCES: 'v1/categorypreferences',
  VENDORS: 'v1/vendors',
  NOAUTH_VENDOR_DETAIL : 'v1/vendors/detail',
  ADD_VENDORS_PREFRENCES: 'v1/events/add-vendor-preference',
  REVIEWS: 'reviews/noauth',

  // event
  EVENTS: 'v1/events',

  // deals
  DEALS: 'v1/deals',
  ADD_DEAL: 'v1/events/add-deal',

  // packages
  PACKAGES: 'v1/packages',
  ADD_PACKAGE: 'v1/events/add-package',

  // chats
  CHAT: 'v1/chats',
  MARK_MESSAGES_READ: 'mark-read',
  SEND_MESSAGE: 'v1/chats/send',
  CREATE_ROOM_FOR_VENDOR_PREFERENCE: 'v1/chats/vendor-preference/create',
  CREATE_ROOM_FOR_DEAL: 'v1/chats/deal/create',
  ADD_REVIEW: 'v1/events/event-detail/review',
  ADMIN_ADD_REVIEW: 'v1/vendors/review',

  // preferences
  PREFERENCE: 'v1/vendors/mypreference',
  GET_UNIQUE_VISITOR_COUNT: 'api/v1/vendors/uniquevisitors',

  // leads
  GET_ALL_TIME_LEADS: 'v1/leads',
  GET_NEW_LEADS: 'v1/leads/new-leads',


  //membership
  MEMBERSHIP_TYPE: 'v1/membershiptypes',
  EXTEND_TRIAL:'v1/payments/extend-free-trial',

  //notifications
  GET_NOTIFICATIONS : 'v1/appnotifications',

  //blog
  BLOGS:'v1/blogs',
};

export default Object.freeze(endPoints);