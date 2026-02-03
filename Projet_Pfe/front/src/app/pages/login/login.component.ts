// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })


// export class LoginComponent implements OnInit {
//   selectedRole: string = ""; // Variable pour stocker le rôle sélectionné
//   showContent: boolean = true; // Variable de contrôle pour afficher ou masquer le contenu

//   isLoggedIn: boolean = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Logique d'initialisation du composant
//   }

//   onSubmit(role: string) {
//     // Vérifiez le rôle sélectionné et redirigez l'utilisateur vers la bonne navbar
//     if (role === 'admin') {
//       this.isLoggedIn = true;
//       this.router.navigate(['/admin-navbar']);
//     } else if (role === 'client') {
//       this.isLoggedIn = true;
//       this.router.navigate(['/logged-in-navbar']);
//     }
//   }
 

//   goToSignUp() {

//     this.isLoggedIn = true;
//     // Rediriger vers la page de sign up
//     this.router.navigate(['/signup']);
//   }

  

  
// }
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms'; // Importez FormBuilder et FormGroup
// import { AuthService } from './login.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   email: string = '';
//   password: string = '';
//   role: string = 'Administrateur'; // Définir une valeur par défaut pour le rôle
//   errorMessage: string = '';
//   isLoggedIn: boolean = false;
//   form: FormGroup ; // Déclarez la variable form de type FormGroup

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {}

//   onSubmit(role: string) {
//     // Vérifiez le rôle sélectionné et authentifiez l'utilisateur en conséquence
//     if (role === 'admin' || role === 'client') {
//       // Authentification de l'utilisateur avec le rôle sélectionné
//       this.authService.authenticate(this.email, this.password, role)
//         .subscribe(
//           (response) => {
//             // Vérifiez si la réponse du backend contient un token ou une indication de connexion réussie
//             if (response && response.token) {
//               // Authentification réussie, naviguer vers la page appropriée
//               if (role === 'admin') {
//                 this.router.navigate(['/admin-navbar']);
//               } else if (role === 'client') {
//                 this.router.navigate(['/logged-in-navbar']);
//               }
//             } else {
//               // Authentification échouée, afficher un message d'erreur
//               this.errorMessage = 'Invalid username or password';
//             }
//           },
//           (error) => {
//             // Erreur lors de l'appel au backend, afficher un message d'erreur
//             console.error('Error:', error);
//             this.errorMessage = 'Error during login';
//           }
//         );
//     } else {
//       // Cas où le rôle n'est ni 'admin' ni 'client', afficher un message d'erreur
//       this.errorMessage = 'Invalid role selected';
//     }
//   }
  

//   goToSignUp() {
//     this.router.navigate(['/signup']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './login.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  showContent: boolean = true; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['admin'] // Par défaut, le rôle est défini sur "admin"
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  onSubmit(): void {
    console.log('Le formulaire a été soumis.');
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    const role = formData.role;

    this.authService.authenticate(formData.email, formData.password, role)
      .subscribe(
        (response) => {
          if (response && response.access_token) {
            const token = this.getDecodedAccessToken(response.access_token);
            console.log(response.user.pack);
            sessionStorage.setItem('token', response.access_token);
            sessionStorage.setItem('role', token.role);
            sessionStorage.setItem('actif', token.actif);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            if (token.role === 'ADMIN') {
              //this.router.navigate(['/admin-navbar']);
              window.location.href = "/admin-navbar";
            } else if (token.role === 'CLIENT') {
              //this.router.navigate(['/logged-in-navbar']);
              window.location.href = "/logged-in-navbar";
            }
          } else {
            this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
          }
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Erreur lors de la connexion.';
        }
      );
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
