import { AtosPage } from './atos.po';

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

  // --------------------------------------------------------------------------------------------
  // at the moment kinda useless, because there is no check if data is send or received correctly
  // --------------------------------------------------------------------------------------------
  it('should add entry and get one result back', () => {
    page.navigateTo();
    page.addEntry();
    page.getEntry();
  });

  // Check if navbar to Feedback is working
  it('feedback page opens',() => {
    page.navigateToFeedback();
    expect(page.getParagraphText()).toEqual('Feedback');
  });


});
