import { TestBed } from '@angular/core/testing';

import { InterceptorService, InterceptorProvider } from './interceptor.service';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[InterceptorProvider, InterceptorService]
  }));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });

  it('#getProfiles to get first 5 profiles', () => {
    let service: InterceptorService = TestBed.get(InterceptorService);

    let result = service.getProfiles(5,0,null,null,null);
    expect(result.length).toEqual(5);
  })

  
  it('#getProfiles to get first 5 profiles sorted by name', () => {
    let service: InterceptorService = TestBed.get(InterceptorService);

    let result = service.getProfiles(5,0,'name',null,null);
    expect(result.length).toEqual(5);
    expect(result[0].name).toEqual('Arundhati Bhattacharya  Screening Profile');
  })
});
