// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}

  // onSubmit() {
  //   // ... vérifiez les informations d'identification et effectuez la logique de connexion ...

  //   // Si la connexion réussit, définissez loggedIn sur true
  //   this.isLoggedIn = true;

  //   // Redirigez l'utilisateur vers la page Contact
  //   this.router.navigate(['/dashboard']);
  // }

  //goToSignUp() {

  //  this.isLoggedIn = true;
    // Rediriger vers la page de sign up
  //  this.router.navigate(['/signup']);
 // }

 // goToTableList() {

 //   this.isLoggedIn = true;
    // Rediriger vers la page de dashboard
   // this.router.navigate(['/table-list']);
  //}
}




