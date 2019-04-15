import { TestBed, async } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('service should be created', () => {
    const service = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });
});
