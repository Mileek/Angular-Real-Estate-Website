import { HousingService } from './services/housing.service';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes =[
  {path:'', component: PropertyListComponent},
  {path:'rent-property', component: PropertyListComponent},
  {path:'add-property', component: AddPropertyComponent},
  {path:'property-detail/:id', component: PropertyDetailComponent},
  {path:'**', component: PropertyListComponent} //wrong URL component, który nie istnieje XD
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, //Po zaimportowaniu, można bez problemu kożystać z Form w html, bo to dodaje nam dodatkowe funkcje specyficzne dla Angular'a
    RouterModule.forRoot(appRoutes)
  ],
  //Rejestracja provicera, które tutaj nazywają się serwisami
  providers: [
    HousingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
