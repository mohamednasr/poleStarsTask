import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { severity } from 'src/app/models/severityEnum';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  searchForm: FormGroup = this.formBuilder.group({
    name: [''],
    countrySeverity: ['']
  })

  SeveritiesList:any[] = [
    {value: '', name: "ALL"},
    {value: severity['UNKNOWN'], name: severity["UNKNOWN"]},
    {value: severity['OK'], name: severity["OK"]},
    {value: severity["WARNING"], name: severity["WARNING"]},
    {value: severity["CRITICAL"], name: severity["CRITICAL"]},
  ]

  @Output() filterBy: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  filter(){
    this.filterBy.emit(this.searchForm.value);
  }

  clear(){
    this.searchForm.reset();
    this.filterBy.emit(this.searchForm.value)
  }
}
