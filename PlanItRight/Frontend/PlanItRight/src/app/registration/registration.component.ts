import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule,FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  constructor(private router : Router  , private authService : AuthService){}

  registrationError : string | null = null;
  registrationData={
  fullname:'',
  username:  '',
  email:  '',
  password:  '',
  phone:''
  }

  isAuthenticated: boolean = false;

  registration() {
    console.log(this.registrationData);
  
    // Call the authService to register the user
    this.authService.register(this.registrationData).subscribe(
      () => {
        // On successful registration, navigate to the events page
        console.log("Registration successful");
        localStorage.setItem('username', this.registrationData.username);
        this.isAuthenticated = true;
        this.router.navigate(['events']);
      },
      error => {
        // Handle registration failure and show an error message
        console.error('Registration failed:', error);
        this.registrationError = 'Username or Email  Already Exists';
      }
    );
  }
  
}
