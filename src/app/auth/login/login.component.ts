import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        console.log('Login successful', user);
        user.token ? localStorage.setItem('userToken', user.token) : '' 
        localStorage.setItem('userEmail', user.email); 
        this.router.navigate(['/courses']);
      } else {
        console.log('Login failed');
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}
