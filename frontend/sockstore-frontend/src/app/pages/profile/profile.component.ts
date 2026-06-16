import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ProfileService } from '../../services/profile.service';

import { User } from '../../models/user';

import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent
implements OnInit {

  user!: User;

  constructor(
    private profileService: ProfileService,
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
  
      this.profileService
        .getProfile()
        .subscribe({
  
          next: (data) => {
  
            this.user = data;
  
          },
  
          error: (err) => {
  
            console.log(err);
  
          }
  
        });
  
    }
  
  }

  saveProfile() {

    console.log('Botón presionado');

    this.profileService
      .updateProfile(this.user)
      .subscribe(() => {

        alert(
          '✅ Perfil actualizado'
        );

      });

  }

}