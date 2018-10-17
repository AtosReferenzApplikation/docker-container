import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogikComponent } from './logik.component';

describe('LogikComponent', () => {
  let component: LogikComponent;
  let fixture: ComponentFixture<LogikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
