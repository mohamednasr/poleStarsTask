import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http'
import { of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { sortTypes } from '../models/sortEnum'
import { dataSet } from '../models/datatSet';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  //intercept any http request
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return of(null).pipe(mergeMap(() => {
      if ((request.url.search('screening_profiles')) && request.method === 'GET') {
        // if id provided
        if (request.url.search(/['screening_profiles/']+[a-zA-Z\d -]{36}/) > 0) {
          let id = request.url.split("screening_profiles/")[1];
          let result = this.getProfileById(id)
          if(!result){
            return of(new HttpResponse({
              status: 404,
              body: {result: undefined}
            })) 
          }
          else{
            return of(new HttpResponse({
              status: 200,
              body: {result: result}
            }))
          }
        }
        //if getting all data
        else {
          let limit = request.params.get('limit');
          let offset = request.params.get('offset');
          let sortBy = request.params.get('sortBy');
          let nameFilter = request.params.get('nameFilter');
          let severityFilter = request.params.get('severityFilter');
          return of(new HttpResponse({
            status: 200,
            body: {result: this.getProfiles(limit, offset, sortBy, nameFilter, severityFilter)}
          }))
        }
      }
      
      return next.handle(request);
    }))
  }

  getProfiles(limit, offset, sort, nameFilter, severityFilter) {
    let result = dataSet;
    switch(sort){
      case sortTypes[sortTypes.name]:
        result = result.sort( (a,b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case sortTypes[sortTypes.created]:
        result = result.sort( (a,b) => {
          return new Date(a.created) >= new Date(b.created) ? 1 : -1;
        });
        break;
      case sortTypes[sortTypes.modified]:
        result = result.sort( (a,b) => {
          return new Date(a.modified) >= new Date(b.modified) ? 1 : -1;
        });
        break;
    }
    if(nameFilter !=null && severityFilter!= null){
      result = result.filter(r => r.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0 && r.country_check_severity.toLowerCase() == severityFilter.toLowerCase() )
    }
    else if(nameFilter !=null && severityFilter== null){
      result = result.filter(r => r.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0 )
    }
    else if(nameFilter == null && severityFilter != null){
      result = result.filter(r => r.country_check_severity.toLowerCase() == severityFilter.toLowerCase() )
    }
    let from = (+offset);
    let to = (+limit) + (+offset);
    result = result.slice(from, to);
    return result
  }

  getProfileById(id: string){
    return dataSet.find( r => r.id.toLowerCase() == id.toLowerCase() )
  }
}

export let InterceptorProvider = {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
};
