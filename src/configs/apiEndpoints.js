export const FETCH_ALL_ROLES_ENDPOINT = 'fetch-all-roles';
export const FETCH_ALL_PRODUCTS_ENDPOINT = 'fetch-all-products';
export const JOIN_HMS_ROOM_ENDPOINT = (roomId) => `room/token/${roomId}`;
export const FETCH_ROOM_LIST = (pageNum, perPage = 10) => `room/list?page=${pageNum}&perPage=${perPage}`;
export const LOGIN_ENPOINT = 'auth/login';
export const REGISTER_ENDPOINT = 'auth/signup'
export const CREATE_ROOM_AUTH_ENDPOINT = `room/permitted`;
export const CREATE_ROOM_ENDPOINT = 'room/create';
export const USER_VALIDATION_ENDPOINT = `auth/validate/`;
export const VERIFY_OTP_ENDPOINT = `auth/verify-otp`;
export const SEND_OTP_ENDPOINT = `auth/send-otp`;
export const FETCH_USER_ENDPOINT = (email) => `user/${email}`;
export const UPDATE_USER_ENDPOINT =  (userId) => `user/${userId}`;
export const UPDATE_ROLE_ENDPOINT = (email) => `auth/update-role/${email}`
export const UPDATE_PROFILE_IMAGE_ENDPOINT = (userId)=> `user/upload-image/${userId}`;

