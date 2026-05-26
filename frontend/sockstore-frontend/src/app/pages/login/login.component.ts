import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService.login(this.loginData)
      .subscribe({

        next: (response) => {

          this.authService.saveToken(
            response.token
          );

          alert('Login correcto');

          this.router.navigate(['/admin']);

        },

        error: (error) => {

          console.error(error);

          alert('Credenciales inválidas');

        }

      });

  }

  //if (login.Email == "admin@test.com" &&
  //login.Password == "123456")

}