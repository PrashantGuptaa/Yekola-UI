export const LOGIN_ENPOINT = 'login';
export const REGISTER_ENDPOINT = 'register'
export const FETCH_ALL_ROLES_ENDPOINT = 'fetch-all-roles';
export const FETCH_ALL_PRODUCTS_ENDPOINT = 'fetch-all-products';
export const CREATE_ROOM_ENDPOINT = 'create-rooms';
export const FETCH_ROOM_LIST = (productName) => `list-rooms/${productName}`;
export const JOIN_HMS_ROOM_ENDPOINT = (roomId) => `fetch-app-token/${roomId}`;
export const CREATE_ROOM_AUTH_ENDPOINT = `create-room-auth`;
export const USER_VALIDATION_ENDPOINT = `user/validation/`;
