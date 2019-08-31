import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesListComponent } from './profiles-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { sortTypes } from 'src/app/models/sortEnum';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProfileScreeningService } from 'src/app/services/profile-screening.service';

describe('ProfilesListComponent', () => {
  let component: ProfilesListComponent;
  let fixture: ComponentFixture<ProfilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ProfileScreeningService],
      declarations: [ ProfilesListComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilesListComponent);
    component = fixture.componentInstance;
    component.initList();    
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init list scroll observables', () => {
    const initListSpy = spyOn(component, 'initList');
    component.ngAfterViewInit();
    expect(initListSpy).toHaveBeenCalled();
  })

  it('#sortData() should get sorted data as the type sent', () => {
    const nextSpy = spyOn(component.sortObs, 'next')

    component.sortType = sortTypes[sortTypes.name];
    component.sortData(component.sortType);
    expect(nextSpy).toHaveBeenCalledWith('name')
  })


});
