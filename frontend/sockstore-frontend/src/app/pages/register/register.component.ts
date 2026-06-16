import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email = '';

  password = '';

  constructor(private authService: AuthService, private router: Router) 
  {}

  register(){
    this.authService.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Usuario registrado');

        this.router.navigate(
          ['/login']
        );
      },
      error: (error) => {
        console.log(error);
        alert('Error al registrar el usuario');
      }
    });
  }
}
