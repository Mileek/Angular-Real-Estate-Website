import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedInUser: string;
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {}
  loggedIn() {
    this.loggedInUser = localStorage.getItem('token') ?? ''; //Non-null assertion ! < at the end, or just ?? wchich checks for nulls
    return this.loggedInUser;
  }

  onLogOut() {
    localStorage.removeItem('token');
    this.alertify.success('You are logged out !');
  }
}
