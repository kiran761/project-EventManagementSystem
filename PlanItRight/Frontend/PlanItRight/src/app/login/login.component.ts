import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected to 'styleUrls' for array
})
export class LoginComponent {
  // , { queryParams: { username: this.loginData.username } }
 
  loginData = { email: '', password: '' };
  loginError: string | null = null;
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
 
  login() {
    this.authService.login(this.loginData).subscribe(
      () => {
        // Navigate to the dashboard after successful login
        console.log("HIi")
        localStorage.setItem('email', this.loginData.email);
        this.isAuthenticated = true;
        this.router.navigate(['events']);
      },
      error => {
        console.error('Login failed:', error);
        this.loginError = 'Invalid username or password';
      }
    );
  }
}