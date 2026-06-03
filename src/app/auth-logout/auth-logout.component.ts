import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrl: './auth-logout.component.scss'
})
export class AuthLogoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('error en log out' ,error)
      this.router.navigate(['/login']);
    }

  }

} 
