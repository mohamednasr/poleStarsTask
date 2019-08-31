import { Component, OnInit, Input } from '@angular/core';
import { severity } from 'src/app/models/severityEnum';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {

  @Input() profile;
  severityTypesEnum = severity;

  constructor() { }

  ngOnInit() {
  }

}
