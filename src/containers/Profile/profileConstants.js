import { LANGUAGES_SPOKEN, USER_ROLES } from "../../configs/constants";
import { capitalize } from "lodash";
import { LANGUAGES_OFFERED } from './../../configs/constants';

export const rolesOptions = USER_ROLES.map((role) => ({
  label: capitalize(role),
  value: role,
  key: role,
}));

export const languagesSpokenOptions = LANGUAGES_SPOKEN.map((value) => ({
  label: value,
  value,
  key: value,
}));

export const languagesOfferedOptions = LANGUAGES_OFFERED.map((value) => ({
  label: value,
  value,
  key: value,
}));

