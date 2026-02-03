import { Component, Input, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
imports:[RouterModule]

interface User {
  id: number;
  role: string;
  nom: string;
  prenom: string;
  email: string;
  numero: string;
}

interface Abonnement {
  ida: number;
  type: string;
  dateexp: string;
  statut: string;
}

interface installation {
  idi: number;
  nomapp: string;
  piece: string;
  etat: string;
  batterie: string;
  dernieremise: string;
}

interface donnees {
  idd: number;
  polluant: string;
  unite: string;
  
}

@Component({
  selector: 'app-user-profile',
  templateUrl:'./user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  constructor(private router: Router) { 
    if(sessionStorage.getItem("user")){
      let userData = JSON.parse(sessionStorage.getItem('user')!);
      var role = sessionStorage.getItem("role");
      this.user = {
        id: userData?.id,
        role: role!,
        nom: userData?.lastName,
        prenom: userData?.firstName,
        email: userData?.email,
        numero: userData?.phoneNumber
      };

      this.abonnement = {
        ida: userData?.pack?.id,
        type: userData?.pack?.packtName,
        dateexp: new Date(userData?.activationDate).toLocaleString('en-US') ,
        statut: userData?.activationDate ? "Actif" : "Inactif"
      }
    }
  }
  ngOnInit() {}
  editMode: boolean[] = []; // Add an array to track the edit mode for each user


  

  saveUserChanges(user: User, index: number) {
    // Implement the logic to save the updated user information
    // You can send an API request to the backend to update the user data
    // Once the update is successful, you can update the user object in the users array

    // Example:
    // this.userService.updateUser(user).subscribe(updatedUser => {
    //   this.users[index] = updatedUser;
    //   this.editMode[index] = false;
    // });
  }

  user: User = {
    id: 0,
    role: '',
    nom: '',
    prenom: '',
    email: '',
    numero: ''
  }

  abonnement: Abonnement = {
    ida: 0,
    type: '',
    dateexp: '',
    statut: ''
  };
 

  @Input() installation: null | undefined;

  installations: installation[] = [
    {
      idi: 202,
      nomapp: 'NETATMO SMART INDOOR AIR QUALITY MONITOR',
      piece: 'Salon',
      etat: 'en ligne',
      batterie: '80%',
      dernieremise: '23/03/2024'
    },
    {
      idi: 115,
      nomapp: 'WAVE MINI',
      piece: 'Bureau',
      etat: 'hors ligne',
      batterie: '0%',
      dernieremise: '12/01/2024'
    },

  ];



  @Input() donnees: null | undefined;

  donneess: donnees[] = [
    {
      idd: 1,
      polluant: 'CO2',
      unite: 'ppm'
    },
    {
      idd: 2,
      polluant: 'Pression',
      unite: 'hPa'
    },
    {
      idd: 3,
      polluant: 'Humidité',
      unite: '%'
      
    },
    {
      idd: 4,
      polluant: 'Température',
      unite: '°C'
    },
    {
      idd: 5,
      polluant: 'O3',
      unite: ' μg/m3'
    },
    {
      idd: 6,
      polluant: 'NO2',
      unite: ' μg/m3'
    },

  ];


  

}
