import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

  constructor(private router: Router, private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Property>
  {
    const propId = route.params['id']

    return this.housingService.getProperty(+propId).pipe(
      catchError(error =>
      {
        this.router.navigate(["/"]);
        return throwError(error);
      })
    );
  }
}
