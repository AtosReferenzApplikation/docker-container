import { TestBed, async } from '@angular/core/testing';

import { CircuitService } from './circuit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CircuitService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CircuitService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('service should be created', () => {
    const service: CircuitService = TestBed.get(CircuitService);
    expect(service).toBeTruthy();
  });
});
