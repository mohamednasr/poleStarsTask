import { TestBed } from '@angular/core/testing';

import { ProfileScreeningService } from './profile-screening.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { appConfig } from '../config/config';

let _HttpClientTestingModule: HttpTestingController;

describe('ProfileScreeningService', () => {
  beforeEach(() =>{TestBed.configureTestingModule({
    providers: [ProfileScreeningService],
    imports: [HttpClientTestingModule]
  });
  _HttpClientTestingModule = TestBed.get(HttpTestingController);
});

  it('should be created', () => {
    const service: ProfileScreeningService = TestBed.get(ProfileScreeningService);
    expect(service).toBeTruthy();
  });

  it("#getAllProfiles should be called with limit 8", () => {
    let service: ProfileScreeningService = TestBed.get(ProfileScreeningService);
    service.getAllProfiles().subscribe();
    const request = _HttpClientTestingModule.expectOne(req => {
      return req.url === appConfig.APIBase+appConfig.Screening_profilesAPI 
    }, 'URL');

    expect(request.request.params.get('limit')).toEqual('8')
  })

  it("#getCountryBlackList should be called with limit 8", () => {
    let service: ProfileScreeningService = TestBed.get(ProfileScreeningService);
    service.getCountryBlackList('12345').subscribe();
    const request = _HttpClientTestingModule.expectOne(req => {
      return req.url === appConfig.APIBase+appConfig.Country_blacklistsAPI + '12345'
    }, 'URL');

    expect(request.request.url).toEqual(appConfig.APIBase+appConfig.Country_blacklistsAPI + '12345')
  })
});
