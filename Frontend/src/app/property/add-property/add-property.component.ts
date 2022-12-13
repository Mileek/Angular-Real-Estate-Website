import { IPropertyBase } from './../../model/IPropertyBase';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addProprtyForm: NgForm; //wykorzystuje się żeby nie trzeba było przekazywać Form jako parametr akcji, np w onSubmit(Form: NgForm)
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartament', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  propertyView: IPropertyBase = {
    id: null,
    Name: null,
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null,
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    console.log('Udało się zapisać formę !');
    console.log('SellRent' + this.addProprtyForm.value.BasicInfo.SellRent);
    console.log(this.addProprtyForm);
  }
  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
