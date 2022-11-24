import { IProperty } from './../IProperty';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  //Konstruktor używa providera
  constructor(private housingService: HousingService) {}

  Properties: Array<IProperty> = [];

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
      (data) => {
        this.Properties = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
