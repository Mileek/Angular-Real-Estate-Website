import { IProperty } from './../property/IProperty';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { useAnimation } from '@angular/animations';
//Provider
@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http: HttpClient) { }

getAllProperties(SellRent: number): Observable<IProperty[]>{
  return this.http.get('data/properties.json').pipe(
    map(data=>{
      const propertiesArray: Array<IProperty>=[];
      for(const id in data){
        if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
        propertiesArray.push(data[id]);
      }
      }
      return propertiesArray;
      })
  );
}

}