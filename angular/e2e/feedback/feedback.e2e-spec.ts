import { FeedbackPage } from './feedback.po';
import { browser, by, element } from 'protractor';
import * as file_system from 'file-system';
import * as csvModule from 'papaparse';

const strSomething = file_system.readFileSync('e2e\\csv-data.csv', 'utf8');
const csvValues = csvModule.parse(strSomething);

describe('Feedback', () => {
  let page: FeedbackPage;
  beforeEach(() => {
    page = new FeedbackPage();
  });

  for(let i=0; i<csvValues.data.length-1; i++) {
    it('should load Home-Page ', () => {
      page.navigateToFeedback();
      expect(page.getParagraphText()).toEqual('Feedback');
    });
    it('feedback page opens and elements are dynamically', () => {
      page.navigateToFeedback();
      expect(page.getParagraphText()).toEqual('Feedback');
      page.setStarRating();
      expect(element(page.getTextField).isDisplayed()).toBe(true);
      page.setRatingNumber(csvValues.data[i][0] - 1);
      element(by.id('reFeedbackText')).sendKeys(csvValues.data[i][1]);
      page.submitFeedback();
      expect(element(page.getThanks).isDisplayed()).toBe(true);
    });
  };
});
