import { Customer } from '../models/customer';

export const SAMPLE_CUSTOMERS: Customer[] = [

  {
    id: '01', salutation: 'Herr', name: 'Peter', surname: 'Meier',
    email: 'peter.meier99@gmx.de', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '90762', city: 'Fürth', street: 'Lange Str. 7'
    }, contactform: ['E-Mail', 'Telefon', 'Post']
  },
  {
    id: '02', salutation: 'Frau', name: 'Sabine', surname: 'Blau',
    email: 'peter.meier99@gmx.de', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '08523', city: 'Plauen', street: 'Bergstraße 36'
    }, contactform: ['E-Mail', 'Telefon', 'Post']
  },
  {
    id: '03', salutation: 'Herr', name: 'Hubert', surname: 'Schmidt',
    email: 'peter.meier99@gmx.de', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '33609', city: 'Bielefeld', street: 'Hakenort 45'
    }, contactform: ['E-Mail', 'Telefon']
  },
  {
    id: '04', salutation: 'Herr/Frau', name: 'Alexa', surname: 'Bezos',
    email: 'peter.meier99@gmx.de', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '18565', city: 'Insel Hiddensee', street: 'Kirchweg 39'
    }, contactform: ['E-Mail', 'Telefon']
  },
];
