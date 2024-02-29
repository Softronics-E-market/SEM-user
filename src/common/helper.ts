export default class HelperService {
  public validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  public validatePhone = (phone: string) => phone.length === 10;

  public validatePinCode = (pinCode: string) => pinCode.length === 5;
}
