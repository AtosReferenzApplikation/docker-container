import {TestBed, async, inject} from '@angular/core/testing';
import { AtosComponent } from './atos.component';
import {HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AtosComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AtosComponent
      ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AtosComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Verbindung zur Cassandra Datenbank über Container'`, async(() => {
    const fixture = TestBed.createComponent(AtosComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Verbindung zur Cassandra Datenbank über Container');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AtosComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Verbindung zur Cassandra Datenbank über Container');
  }));

  it('Expect to send correct data',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        // We call the service
        const fixture = TestBed.createComponent(AtosComponent);
        fixture.componentInstance.insertEntryHttp('/api/spring/enterEntry?value=', 'Entry')
          .subscribe((data: any) => {
            expect(data).toBe('Neuer Eintrag \'Entry\' wurde gespeichert.');
          });
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne('/api/spring/enterEntry?value=Entry');
        expect(req.request.method).toEqual('GET');
        // Then we set the fake data to be returned by the mock
        req.flush('Neuer Eintrag \'Entry\' wurde gespeichert.');
      })
  );

  it('Expect to send correct data',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        // We call the service
        const fixture = TestBed.createComponent(AtosComponent);
        fixture.componentInstance.getEntriesHttp('/api/spring/searchEntries?entry=', 'Entry')
          .subscribe((data: any) => {
            expect(data).toBe('Gefundene Einträge zu jkl: 1');
          });
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne('/api/spring/searchEntries?entry=Entry');
        expect(req.request.method).toEqual('GET');
        // Then we set the fake data to be returned by the mock
        req.flush('Gefundene Einträge zu jkl: 1');
      })
  );

});
