import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrl: './auth-logout.component.scss'
})
export class AuthLogoutComponent implements OnInit {
  appService = inject(AppService);
  router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    try {
      this.appService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('error en log out' ,error)
      this.router.navigate(['/login']);
    }

  }

} 
