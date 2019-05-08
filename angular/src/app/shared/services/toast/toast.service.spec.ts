import { TestBed, async } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ToastService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });
});
