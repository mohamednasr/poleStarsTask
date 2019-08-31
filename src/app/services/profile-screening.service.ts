import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { appConfig } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileScreeningService {

  constructor(private http: HttpClient) { }

  getAllProfiles(limit = appConfig.pageLimit, offset = 0, sortBy = null, filterByName = '', filterBySeverity = '') {
    let params = new HttpParams();
    if (limit >= 0)
      params = params.append('limit', limit.toString());
    if (offset >= 0)
      params = params.append('offset', offset.toString());
    if (sortBy != null)
      params = params.append('sortBy', sortBy);

    if (filterByName != '') {
      params = params.append('nameFilter', filterByName);
    }

    if (filterBySeverity != '') {
      params = params.append('severityFilter', filterBySeverity);
    }
    return this.http.get(appConfig.APIBase + appConfig.Screening_profilesAPI, { params });
  }

  getprofileById(id){
    return this.http.get(appConfig.APIBase + appConfig.Screening_profilesAPI + id)
  }

  getCompanyBlackList(id){
    return this.http.get(appConfig.APIBase + appConfig.Company_blacklistsAPI + id);
  }
  
  getPortBlackList(id){
    return this.http.get(appConfig.APIBase + appConfig.Port_blacklistsAPI + id);
  }
  
  getCountryBlackList(id){
    return this.http.get(appConfig.APIBase + appConfig.Country_blacklistsAPI + id);
  }
  
  getShipBlackList(id){
    return this.http.get(appConfig.APIBase + appConfig.Ship_blacklistsAPI + id);
  }
}
