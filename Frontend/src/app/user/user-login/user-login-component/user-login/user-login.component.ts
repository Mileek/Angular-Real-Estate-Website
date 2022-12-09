import { AlertifyService } from './../../../../services/alertify.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChildActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private altertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value); //F2 zamienia każde wystąpienie zmiennej
    if (token) {
      localStorage.setItem('token', token.userName);
      this.altertify.success('Login Successful');
      this.router.navigate(['/']);
    } else this.altertify.error('Login not Successful');
  }
}
