import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './ticket-editing-interface.service';

interface User {
  id: number;
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  housingType: string,
  secteurActivite: string,
  companySize: string,
}

@Component({
  selector: 'app-ticket-editing-interface',
  templateUrl: './ticket-editing-interface.component.html',
  styleUrls: ['./ticket-editing-interface.component.css']
})
export class TicketEditingInterfaceComponent implements OnInit {
  form!: FormGroup;
  userId: number;
  successMessage: string = ''; // Propriété pour stocker le message de succès
 


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
    this.userId = 0;
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Access the 'id' parameter from the URL
    });

    this.userService.getUserDetails(this.userId).subscribe(
      (response) => {
      this.form = this.formBuilder.group({
        firstName: [response.firstName, Validators.required],
        lastName: [response.lastName, Validators.required],
        email: [response.email, [Validators.required, Validators.email]],
        phoneNumber: [response.phoneNumber, Validators.required],
        housingType: [response.housingType, Validators.required],
        secteurActivite: [response.secteurActivite, Validators.required],
        companySize: [response.companySize, Validators.required],
      });
    })
  }

  ngOnInit() {
    // Fetch the ticket details from the backend or assign dummy data
    const id = this.route.snapshot.params['id'];
  }

  onSubmit(): void {
    // if (this.form.invalid) {
    //   return;
    // }

    const formData = this.form.value;

    // Envoi des données d'inscription au service
    this.userService.updateUserDetails(this.userId, this.form.value)
    .subscribe(
      (response) => {
        this.successMessage = 'Mise à jour effectuée !';
        // Gérer la réponse du backend, par exemple afficher un message de succès
        console.log('Mise à jour effectuée !');
      },
      (error) => {
        
        // Gérer les erreurs, par exemple afficher un message d'erreur
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }

  showDetails(): void {
    
    alert('Votre Mise à jour a été effectuée ! ');
    window.location.href = "/user-editing-interface" 
  }
}
