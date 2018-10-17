import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielfeldComponent } from './spielfeld.component';

describe('SpielfeldComponent', () => {
  let component: SpielfeldComponent;
  let fixture: ComponentFixture<SpielfeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpielfeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpielfeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
