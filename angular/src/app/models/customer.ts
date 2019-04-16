export interface Customer {
  id: string;
  salutation: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  nationality: string;
  address: {
    country: string;
    postalcode: string;
    city: string;
    street: string;
  };
  contactform: string[];
}
