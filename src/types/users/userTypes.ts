export type User = {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  userUuid: string;
  address: Address[];
};

export type Coordinates = {
  latitude: string;
  longitude: string;
};

export type Address = {
  addressId: string;
  addressLine1: string;
  addressLine2?: string;
  pinCode: string;
  landMark?: string;
  coordinates?: Coordinates;
  isDefault: boolean;
};

export type AddressInput = {
  addressLine1: string;
  addressLine2?: string;
  pinCode: string;
  landMark?: string;
  coordinates?: Coordinates;
  isDefault: boolean;
};

export type AddUserInput = {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address: AddUserInput[];
};
