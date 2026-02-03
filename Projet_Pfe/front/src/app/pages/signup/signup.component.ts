import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';

export interface Pack {
  id: number;
  title: string;
  // Ajoutez d'autres propriétés pertinentes
}

export interface SignUpData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  housingType: string,
  secteurActivite: string,
  companySize: string,
  pack:{id: number}
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  form!: FormGroup;
  listPack!: Pack[];
  signUpData!: SignUpData;

  successMessage: string = ''; // Propriété pour stocker le message de succès
  errorMessage: string = ''; // Propriété pour stocker le message d'erreur

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      housingType: ['', Validators.required],
      secteurActivite: ['', Validators.required],
      companySize: ['', Validators.required],
      packs:['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.listPack = [{id : 0, title : "-"}];

    this.signUpData = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      housingType: "",
      secteurActivite: "",
      companySize: "",
      pack:{id: 0}
    }
  }

  ngOnInit() {
    this.signupService.getListPack().subscribe(
      (response) => {
        response.forEach((element: { id: number; packtName: string; }) => {
          this.listPack.push({id : element.id, title: element.packtName});
        });
      }
    );
  }

  onSubmit(): void {
    // if (this.form.invalid) {
    //   return;
    // }

    const formData = this.form.value;
    console.log(formData);

    if(formData.password !== formData.confirmPassword){
      alert('Les mots de passe ne sont pas identiques');
      return;
    }

    this.signUpData.firstName = formData.firstName;
    this.signUpData.lastName = formData.lastName;
    this.signUpData.email = formData.email;
    this.signUpData.password = formData.password;
    this.signUpData.phoneNumber = formData.phoneNumber;
    this.signUpData.housingType = formData.housingType;
    this.signUpData.secteurActivite = formData.secteurActivite;
    this.signUpData.companySize = formData.companySize;
    this.signUpData.pack.id = formData.packs;

    // Envoi des données d'inscription au service
    this.signupService.register(this.signUpData)
    .subscribe(
      (response) => {
        this.successMessage = 'Inscription réussie !';
        // Gérer la réponse du backend, par exemple afficher un message de succès
        console.log('Inscription réussie !');
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'inscription : ' ;
        // Gérer les erreurs, par exemple afficher un message d'erreur
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }


  showDetails(): void {
    
    alert('Votre inscription est confirmée ! Un membre de notre équipe vous contactera sous peu pour la configuration de votre compte.'); 
  }
}
