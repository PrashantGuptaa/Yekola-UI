import { EMPTY_FIELD_ERROR, PASSWORD_LENGTH_ERROR } from './../configs/constants';

export const passwordPolicy = (password) => {
    if (password !== null && password.length <= 8) {
        return PASSWORD_LENGTH_ERROR;
    }
    return '';
  }

 export const userNamePolicy = (userName) => {
    console.log("F-7", userName)
    if (userName !== null && !userName) {
        return EMPTY_FIELD_ERROR;
    }

    return '';
  }