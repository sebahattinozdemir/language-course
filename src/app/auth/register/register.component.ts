import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.email, this.password).subscribe(user => {
      console.log('Registration successful', user);
    });
  }
}
