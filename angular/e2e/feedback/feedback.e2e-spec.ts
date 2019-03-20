import { FeedbackPage } from './feedback.po';
import { browser, by, element } from 'protractor';

// Variablen für CSV-Datei zu lesen
const file_system = require('fs');
const csvModule = require('papaparse');
const strSomething = file_system.readFileSync('e2e\\csv-data.csv', 'utf8');
const csvValues = csvModule.parse(strSomething, {
  //  header:true
  // delimeter:','
});

describe('Feedback', () => {
  let page: FeedbackPage;

  beforeEach(() => {
    page = new FeedbackPage();
  });

  for(let i=0; i<csvValues.data.length-1; i++) {
    let j = 0;
  // Check if Feedback-Page is loaded
  it('should load Home-Page ', () => {
    page.navigateToFeedback();
    expect(page.getParagraphText()).toEqual('Feedback');
  });

  // Check if textfield appears after star-rating, submit and check if it is approved
    it('feedback page opens and elements are dynamically', () => {
      page.navigateToFeedback();
      expect(page.getParagraphText()).toEqual('Feedback');
      page.setStarRating();
      expect(element(page.getTextField).isDisplayed()).toBe(true);
      element.all(by.css('.star')).get(csvValues.data[i][j] - 1).click(); //int
      j += 1;
      element(by.id('reFeedbackText')).sendKeys(csvValues.data[i][j]); //string ha
      page.submitFeedback();
      expect(element(page.getThanks).isDisplayed()).toBe(true);
    });
  };
});
