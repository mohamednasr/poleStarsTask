import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSummaryComponent } from './profile-summary.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileScreeningService } from 'src/app/services/profile-screening.service';

describe('ProfileSummaryComponent', () => {
  let component: ProfileSummaryComponent;
  let fixture: ComponentFixture<ProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ProfileScreeningService],
      declarations: [ ProfileSummaryComponent ],
      imports: [RouterTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSummaryComponent);
    component = fixture.componentInstance;
    component.profile = {name: 'test 1', id:'1234', country_check_severity: '60-OK', created: new Date(), modified: new Date() };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {

    expect(fixture.elementRef.nativeElement.querySelector('h5')).toBeTruthy();
  })

  it('badge should have class success', () => {
    expect(fixture.elementRef.nativeElement.querySelector('.badge')).toHaveClass('badge-success');
  })

});
