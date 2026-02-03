import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  

 
  
  currentuser:any;
    current : any;

    // authenticated = false;

    // constructor(private http: HttpClient,
    //   private router: Router) {
    // }

    ngOnInit(): void {
      this.currentuser=(localStorage.getItem('name'));
      this.current=(localStorage.getItem('email'));

    }

    showNotifications: boolean = false;

  openNotifications() {
    this.showNotifications = !this.showNotifications;
  }

    constructor(public authService: authService) { }
 
      logout() {
        // Code pour effectuer la déconnexion de l'utilisateur, par exemple :
        // Effacer les données de session ou de stockage local
        // Rediriger vers la page de connexion
        window.sessionStorage.clear();
        //this.router.navigate(['/login']);
        window.location.href = "/login";
      }
      

    


}

