import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiAppService } from './api-app.service';

describe('ApiAppService', () => {
  let service: ApiAppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiAppService],
    });

    service = TestBed.inject(ApiAppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request', () => {
    const userData = { username: 'test', password: 'password' };

    service.login(userData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://13.36.209.217/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);

    req.flush({ success: true });
  });

  it('should send a register user request', () => {
    const userData = { username: 'test', password: 'password' };

    service.registerUser(userData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://13.36.209.217/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);

    req.flush({ success: true });
  });
});
