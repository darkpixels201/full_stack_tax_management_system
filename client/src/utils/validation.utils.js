import * as yup from 'yup';
import { reverseObjKeys, trimObjValues } from './common.utils';

export const Regex = {
  // // Password length must be atleast 8, with one uppercase letter, one lowercase letter,one special character and one number
  // Password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  // Password length must be atleast 6 characters
  Password: /^.{6,}$/,
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // only characters or spaces are allowed
  Name: /^[a-z ]+$/gi,
  PhoneNo: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  OnlyNumber: /^[0-9]*$/
}

export const isValidName = (name) => {
  return /^[a-z ]+$/gi.test(name);
};
export const isValidUsername = (text) => {
  return /^[a-z0-9]+$/gi.test(text);
};

export const isValidNumber = (text) => {
  return /^[0-9 ]+$/gi.test(text);
};

export const isValidPassport = (text) => {
  return /^[0-9a-z]+$/gi.test(text);
};

export const isValidPhone = (phone) => {
  return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
};

// Password length must be atleast 8, with one uppercase letter, one lowercase letter,one special character and one number
export const isValidPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  );
};
export const isImageUrl = (url) => {
  return /[\/.](gif|jpg|jpeg|tiff|png)$/i.test(url)
}

export const isVideoUrl = (url) => {
  return /.(webm|avi|wvm|mov|mp4|m4p|m4v|3gp|flv)$/i.test(url)
}

export const isDocUrl = (url = '') => {
  if (
    url.endsWith("docx") ||
    url.endsWith("doc")
  ) {
    return true
  }
  return false
}

export const isPDFUrl = (url = '') => {
  if (url.endsWith("pdf")) {
    return true
  }
  return false
}

export const removeSpaces = (text) => {
  return text.replace(/\s/g, '')
}

export const _isValidate = (schema, values,) => {
  trimObjValues(values)
  let _schema = yup.object().shape(reverseObjKeys(schema))
  try {
    _schema.validateSync(values)
    return ''
  } catch (err) {
    console.log("_isValidate-error", err?.message)
    return err?.message
  }
};