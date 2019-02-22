import { FeedbackPage } from './feedback.po';
import { browser, by, element } from 'protractor';


describe('Feedback', () => {
  let page: FeedbackPage;

  beforeEach(() => {
    page = new FeedbackPage();
  });

  // Check if Feedback-Page is loaded
  it('should load Home-Page ', () => {
    page.navigateToFeedback();
    expect(page.getParagraphText()).toEqual('Feedback');
  });

  // Check if textfield appears after star-rating, submit and check if it is approved
  it('feedback page opens and elements are dynamically', () => {
    page.navigateToFeedback();
    page.setStarRating();
    expect(element(page.getTextField).isDisplayed()).toBe(true);
    page.submitFeedback();
    expect(element(page.getThanks).isDisplayed()).toBe(true);
  });
});
