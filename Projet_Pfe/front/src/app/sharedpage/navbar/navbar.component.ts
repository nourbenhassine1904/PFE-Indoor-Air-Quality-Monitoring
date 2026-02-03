import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

    constructor(public authService: authService) { }
    logout() {
      this.authService.logout()

    }

  }

