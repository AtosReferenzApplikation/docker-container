import { browser, by, element } from 'protractor';

export class FeedbackPage {

  navigateTo() {
    return browser.get('/');
  }

  navigateToFeedback() {
    return browser.get('/fb');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  setStarRating() {
    element(by.className('star')).click();
  }

  getTextField() {
    return element(by.id('reFeedbackText')).getWebElement();
  }

  submitFeedback() {
    element(by.cssContainingText('button', 'Submit')).click();
  }

  getThanks() {
    return element(by.id('thanks')).getWebElement();
  }
}
