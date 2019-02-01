import { TestBed, async } from '@angular/core/testing';
import { AtosComponent } from './atos.component';
import {HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

describe('AtosComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AtosComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule
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
});
