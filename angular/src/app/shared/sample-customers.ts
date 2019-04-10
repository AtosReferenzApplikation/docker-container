import { Customer } from '../models/customer';

export const SAMPLE_CUSTOMERS: Customer[] = [

  {
    id: '01', name: 'Peter', surname: 'Meier', email: 'peter.meier99@gmx.de', phone: '+4915233742229', address: {
      postalcode: '90762', city: 'Fürth', street: 'Lange Str. 7'
    }
  },
  {
    id: '02', name: 'Sabine', surname: 'Blau', email: 'peter.meier99@gmx.de', phone: '+4915233742229', address: {
      postalcode: '08523', city: 'Plauen', street: 'Bergstraße 36'
    }
  },
  {
    id: '03', name: 'Hubert', surname: 'Schmidt', email: 'peter.meier99@gmx.de', phone: '+4915233742229', address: {
      postalcode: '33609', city: 'Bielefeld', street: 'Hakenort 45'
    }
  },
  {
    id: '04', name: 'Alexa', surname: 'Bezos', email: 'peter.meier99@gmx.de', phone: '+4915233742229', address: {
      postalcode: '18565', city: 'Insel Hiddensee', street: 'Kirchweg 39'
    }
  },
]