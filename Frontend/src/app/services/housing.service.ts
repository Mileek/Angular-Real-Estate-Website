import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { IPropertyBase } from '../model/IPropertyBase';
import { Property } from '../model/property';
import { IProperty } from '../model/IProperty';
//Provider
@Injectable({
  providedIn: 'root',
})
export class HousingService
{
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<string[]>
  {
    return this.http.get<string[]>('http://localhost:5151/api/city');
  }

  getProperty(id: number)
  {
    return this.getAllProperties().pipe(
      map((propertiesArray) =>
      {
        return propertiesArray.find(p => p.Id === id) as Property;
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]>
  {
    return this.http.get('data/properties.json').pipe(
      map(data =>
      {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties)
        {
          for (const id in localProperties)
          {
            if (SellRent)
            {
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent)
              {
                propertiesArray.push(localProperties[id]);
              }
            } else
            {
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data)
        {
          if (SellRent)
          {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent)
            {
              propertiesArray.push(data[id]);
            }
          } else
          {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );

    return this.http.get<Property[]>('data/properties.json');
  }
  addProperty(property: Property)
  {
    let newProp = [property];
    //Dodaj nową właściwość do tablicy jeśli właściwość newProp już istnieje w localStorage
    if (localStorage.getItem('newProp'))
    {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID()
  {
    if (localStorage.getItem('PID'))
    {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else
    {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
