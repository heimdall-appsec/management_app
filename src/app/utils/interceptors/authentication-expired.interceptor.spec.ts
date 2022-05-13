import { TestBed } from '@angular/core/testing';

import { AuthenticationExpiredInterceptor } from './authentication-expired.interceptor';

describe('AuthenticationExpiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticationExpiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticationExpiredInterceptor = TestBed.inject(AuthenticationExpiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
