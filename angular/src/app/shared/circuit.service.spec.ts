import { TestBed, async } from '@angular/core/testing';

import { CircuitService } from './circuit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CircuitService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CircuitService],
      imports: [
        HttpClientTestingModule,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: CircuitService = TestBed.get(CircuitService);
    expect(service).toBeTruthy();
  });
});
