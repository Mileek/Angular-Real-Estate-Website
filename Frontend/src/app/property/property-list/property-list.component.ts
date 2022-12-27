import { ActivatedRoute } from '@angular/router';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/IPropertyBase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit
{
  //Konstruktor używa providera
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) { }
  SellRent = 1;
  Properties: Array<IPropertyBase> = [];
  Today = new Date();
  City = '';
  SortByParam = '';
  SearchCity = '';
  SortDirection = "asc";

  ngOnInit(): void
  {
    if (this.route.snapshot.url.toString())
    {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      (data) =>
      {
        this.Properties = data;
        console.log(data);
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }
  onCityFilter()
  {
    this.SearchCity = this.City;
  }
  onCityFilterClear()
  {
    this.SearchCity = "";
    this.City = "";
  }
  onSortDirection()
  {
    if (this.SortDirection === 'desc')
    {
      this.SortDirection = "asc";
    }
    else
    {
      this.SortDirection = "desc";
    }
  }
}
