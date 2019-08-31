import { Component, OnInit } from '@angular/core';
import { ProfileScreeningService } from 'src/app/services/profile-screening.service';
import { ActivatedRoute } from '@angular/router';
import { severity } from 'src/app/models/severityEnum';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  profileDetails: any;

  severityTypesEnum = severity

  constructor(private profilesServices: ProfileScreeningService, private routerActive: ActivatedRoute) {
    this.profilesServices.getprofileById(routerActive.snapshot.params.id).subscribe( (res: any) => {
      if(res.result){
        this.profileDetails = res.result;
      }
    });
  }

  ngOnInit() {
  }
  
  companyBlackList(id){
    this.profilesServices.getCompanyBlackList(id).subscribe((res:any) => {
      console.log(res);
    });
  }

  portBlackList(id){
    this.profilesServices.getPortBlackList(id).subscribe((res:any) => {
      console.log(res);
    });
  }

  countryBlackList(id){
    this.profilesServices.getCountryBlackList(id).subscribe((res:any) => {
      console.log(res);
    });
  }

  shipBlackList(id){
    this.profilesServices.getShipBlackList(id).subscribe((res:any) => {
      console.log(res);
    });
  }
}
