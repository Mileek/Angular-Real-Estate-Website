import { UserService } from './services/user.service';
import { UserLoginComponent } from './user/user-login/user-login-component/user-login/user-login.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user/user-login/user-register/user-register/user-register.component';

const appRoutes: Routes =[
  {path:'', component: PropertyListComponent},
  {path:'rent-property', component: PropertyListComponent},
  {path:'add-property', component: AddPropertyComponent},
  {path:'user/login', component: UserLoginComponent},
  {path:'user/register', component: UserRegisterComponent},
  {path:'property-detail/:id', component: PropertyDetailComponent},
  {path:'**', component: PropertyListComponent} //wrong URL component, który nie istnieje i gdzie ma odesłać XD
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, //Po zaimportowaniu, można bez problemu kożystać z Form w html, bo to dodaje nam dodatkowe funkcje specyficzne dla Angular'a
    ReactiveFormsModule, //Import tego powoduje że w projekcie możemy używać reakcyjnych formularzy
    RouterModule.forRoot(appRoutes)
  ],
  //Rejestracja provicera, które tutaj nazywają się serwisami
  providers: [
    HousingService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
