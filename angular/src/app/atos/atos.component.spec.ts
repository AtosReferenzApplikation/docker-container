import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtosComponent } from './atos.component';

describe('AtosComponent', () => {
  let component: AtosComponent;
  let fixture: ComponentFixture<AtosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
