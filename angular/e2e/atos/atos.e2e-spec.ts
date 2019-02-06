import { AtosPage } from './atos.po';
import {browser, by, element, protractor} from 'protractor';

describe('Home', () => {
  let page: AtosPage;

  beforeEach(() => {
    page = new AtosPage();
  });

  // Check if Home-Page is loaded
  it('should load Home-Page ', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Verbindung zur Cassandra Datenbank über Container');
  });

  // Check if search and enter fields are working
  it('should add/get a test entry', () => {
    page.navigateTo();
    page.addEntry();
    page.checkAlert();
    page.getEntry();
    page.checkAlert();
  });

  // Check if navbar to Feedback is working
  it('feedback page opens', () => {
    page.navigateToFeedback();
    expect(page.getParagraphText()).toEqual('Feedback');
  });


});
