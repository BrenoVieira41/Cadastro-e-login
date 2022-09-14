import { subYears } from 'date-fns';
import * as EmailValidator from 'email-validator';

class UtilsService {

  public appError(message: string, statusCode: number = 400) {
    return {
      message: `${message}`,
      statusCode: statusCode
    };
  }

  public validateBetween(value: number, min: number, max: number) {
    if ((value < min) || (value > max)) {
      return false;
    } else {
      return true;
    }
  }

  public requestStringNotFound(fields: string) {
    if (!fields || fields === '') {
      return false;
    } else {
      return true;
    }
  }

  public regexToString(string: string) {
    const regexToString = /[!@#$%.^&*()_+\-=[\]{};':"\\|<>/?¨\d]/gim;
    return regexToString.test(string);
  }

  public regexToEmail(string: string) {
    const regexToString = /[!@#$%.^&*()_+\-=[\]{};':"\\|<>/?¨\d]/gim;
    return regexToString.test(string);
  }

  public validateEmail(email: string) {
    return EmailValidator.validate(email);
  }

  public validatePhone(phone: string) {
    const validateNumbers = !!phone.match(/^[0-9]+$/);

    if (!validateNumbers) {
      return false;
    } else {
      return (phone.length === 11);
    }
  }

  public validateBornDate(bornDate: Date) {
    if (bornDate > subYears(new Date(), 18)) {
      return false;
    } else {
      return true;
    }
  }

  public validatePassword(password: string) {
    const Uppercase = /^(?=(?:.*?[A-Z]){1})/;
    const Symbol = /^(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})/;

    if (password.length < 6) return false;
    if (!Uppercase.test(password)) return false;
    if (!Symbol.test(password)) return false;

    return true;
  }
}

export default new UtilsService();
