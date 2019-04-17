import { Customer } from '../models/customer';

export const SAMPLE_CUSTOMERS: Customer[] = [

  {
    id: 'b5592638-269d-49a7-b531-e97b97a03251', salutation: 'Herr', name: 'Peter', surname: 'Meier',
    email: 'peter.meier99@gmx.de', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '90762', city: 'Fürth', street: 'Lange Str. 7'
    }, contactform: ['E-Mail', 'Telefon', 'Post']
  },
  {
    id: '02', salutation: 'Frau', name: 'Sabine', surname: 'Blau',
    email: 'sabine.blau26@mailinator.com', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '08523', city: 'Plauen', street: 'Bergstraße 36'
    }, contactform: ['E-Mail', 'Telefon', 'Post']
  },
  {
    id: '03', salutation: 'Herr', name: 'Hubert', surname: 'Schmidt',
    email: 'huber.schmidt45@mailinator.com', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '33609', city: 'Bielefeld', street: 'Hakenort 45'
    }, contactform: ['E-Mail', 'Telefon']
  },
  {
    id: '04', salutation: 'Herr/Frau', name: 'Alexa', surname: 'Bezos',
    email: 'alexa.bezos02@mailinator.com', phone: '+4915233742229', nationality: 'deutsch', address: {
      country: 'Deutschland', postalcode: '18565', city: 'Insel Hiddensee', street: 'Kirchweg 39'
    }, contactform: ['E-Mail', 'Telefon']
  },
];
