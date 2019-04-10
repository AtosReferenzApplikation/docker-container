export interface Customer {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: {
    postalcode: string;
    city: string;
    street: string;
  }
}
