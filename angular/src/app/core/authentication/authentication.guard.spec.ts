import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationGuard],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
  });

  it('should ...', inject([AuthenticationGuard], (guard: AuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
