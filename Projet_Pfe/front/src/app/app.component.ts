import { Component } from '@angular/core';
import { authService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hydatis:Survaillance et amélioration de la qualité d\'air à l\'interieur';

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: authService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if(this.isLoggedIn){
      let role = window.sessionStorage.getItem('role');
      if(role === 'ADMIN'){
        this.isAdmin = true;
      }
    }

    /*let role = window.sessionStorage.getItem('role');
    if(role){
      this.isLoggedIn = true;
      if(role === 'ADMIN'){
        this.isAdmin = true
      }
    } else {
      this.isLoggedIn = false;
    }*/
    /*this.isAdmin = true;
    
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.authService);*/
  }

  login() {
    this.authService.login();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
  }


  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
  }


}
