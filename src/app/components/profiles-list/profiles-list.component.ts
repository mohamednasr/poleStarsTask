import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ProfileScreeningService } from 'src/app/services/profile-screening.service';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { sortTypes } from 'src/app/models/sortEnum';
import { Observable, fromEvent, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, scan, filter, startWith, switchMap, map } from 'rxjs/operators';
import { appConfig } from 'src/app/config/config';
@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements AfterViewInit, OnDestroy {
  profiles: any[] = []

  scrollObs: Observable<any>;
  searchObjObs = new Subject<any>();
  sortObs = new Subject<any>();

  isScroll: boolean = false;
  @ViewChild('profilesList') profilesListElRef: ElementRef;
  searchObj: any = {
    name: '',
    countrySeverity: ''
  };
  sortType: string;

  PageLimit: number = appConfig.pageLimit;
  pageOffset: number = 0;

  sortTypes: any[] = [
    { value: undefined, name: 'None' },
    { value: sortTypes[sortTypes.name], name: 'Name' },
    { value: sortTypes[sortTypes.created], name: 'Create at' },
    { value: sortTypes[sortTypes.modified], name: 'Modified at' },
  ]

  constructor(private profilesServices: ProfileScreeningService) {
  }

  ngAfterViewInit() {
    this.initList()
  }

  // make a scroll on demand so user get data as he scroll down
  initList() {
    this.scrollObs = fromEvent(this.profilesListElRef.nativeElement, 'scroll');

    //observable to get when scrolling down and wait until stop scrolling
    this.scrollObs.pipe(debounceTime(400)).pipe(distinctUntilChanged())
      .pipe(scan((accumilator: any, scrollElem) => {
        //check if user is scrolling down
        if (scrollElem.target && scrollElem.target.children.length > 0 && scrollElem.target.scrollTop > 0) {
          accumilator.Current = scrollElem.target.scrollTop;
          if (!accumilator.max || scrollElem.target.scrollTop > accumilator.max)
            accumilator.max = scrollElem.target.scrollTop;
        }
        else {
          accumilator.Current = 0;
          accumilator.max = 1;
        }
        return accumilator;
      })).pipe(filter(n => n.Current >= n.max)).subscribe(res => {

        this.isScroll = true;
        if (this.pageOffset == 0) {
          this.pageOffset == this.PageLimit;
        }
      });

      //get when user change sort type
    this.sortObs.pipe(debounceTime(100)).pipe(distinctUntilChanged())
        .subscribe(res => {
          this.profilesListElRef.nativeElement.scrollTop = 0;
          this.isScroll = false;
          this.pageOffset = 0;
          this.profiles = [];
        })

        //get when user change filters
        this.searchObjObs.pipe(debounceTime(100)).pipe(distinctUntilChanged())
        .subscribe(res => {
          this.profilesListElRef.nativeElement.scrollTop = 0;
          this.isScroll = false;
          this.pageOffset = 0;
          this.profiles = [];
        })

        //combine all to start getting data
    combineLatest(this.scrollObs.pipe(startWith(new Event('scroll'))),
      this.searchObjObs.pipe(startWith(null)),
      this.sortObs.pipe(startWith(null)))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(scan((accumilator: any, scrollElem) => {
        // check again to be sure of scrolling direction
        if (scrollElem[0].target && scrollElem[0].target.children.length > 0 && scrollElem[0].target.scrollTop > 0) {
          accumilator.Current = scrollElem[0].target.scrollTop;
          if (!accumilator.max || scrollElem[0].target.scrollTop > accumilator.max)
            accumilator.max = scrollElem[0].target.scrollTop;
        }
        else {
          accumilator.Current = 0;
          accumilator.max = 0;
        }
        accumilator.Events = scrollElem;
        return accumilator;
      }, {}))
      .pipe(filter(n => n.Current >= n.max))
      .pipe(switchMap(final => this.profilesServices.getAllProfiles(this.PageLimit, this.pageOffset, this.sortType, this.searchObj.name, this.searchObj.countrySeverity)))
      .pipe(map((res: any) => {
        if (this.isScroll) {
          if (res.result != null && res.result.length) {
            this.profiles.push(...res.result);
          }
        }
        else {
          this.profiles = res.result;
          this.isScroll = true;
        }
        this.pageOffset = this.pageOffset + this.PageLimit;
      })).subscribe()

  }

  sortData(sortType) {
    this.sortType = sortType;
    this.sortObs.next(sortType);
  }
  filter(filters){
    this.searchObj = filters;
    this.searchObjObs.next(this.searchObj);
  }
  ngOnDestroy(){
    this.searchObjObs.unsubscribe();
    this.sortObs.unsubscribe();
  }
}
