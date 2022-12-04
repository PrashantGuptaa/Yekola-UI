import {
  EMPTY_FIELD_ERROR,
  PASSWORD_LENGTH_ERROR,
  RE_PASSWORD_ERROR,
  ROLES_ERROR,
} from "../configs/constants";

export const passwordPolicy = (password) => {
  if (password.length <= 8) {
    return PASSWORD_LENGTH_ERROR;
  }
  return "";
};

export const userNamePolicy = (userName) => {
  if (!userName) {
    return EMPTY_FIELD_ERROR;
  }

  return "";
};

export const rePasswordPolicy = (password, rePassword) => {
  if (password !== rePassword) {
    return RE_PASSWORD_ERROR;
  }
  return "";
};

export const rolesPolicy = (roles) => {
  if (!roles.length) {
    return ROLES_ERROR;
  }
  return "";
};
