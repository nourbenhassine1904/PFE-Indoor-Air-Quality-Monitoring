import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserEditingInterfaceService } from './user-editing-interface.service';

interface User {
  id: number;
  role: string;
  nom: string;
  prenom: string;
  email: string;
  numero: string;
  activation: string;
}

interface uti {
  id: number;
  role: string;
  nom: string;
  prenom: string;
  email: string;
  numero: string;
  creation: string;
  
}

interface abonnement {
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
  seuil: string;
}

@Component({
  selector: 'app-user-editing-interface',
  templateUrl: './user-editing-interface.component.html',
  styleUrls: ['./user-editing-interface.component.css']
})
export class UserEditingInterfaceComponent implements OnInit{

  constructor(private router: Router, private userEditingInterfaceService: UserEditingInterfaceService) { 
    // get list actif clients
    this.userEditingInterfaceService.getActifUsers().subscribe(
      (response) => {
        response.forEach((element: {
          id: number; packtName: string; role: string; lastName: string; firstName: string;
          email: string; phoneNumber: string; activationDate: string;}) => {
          this.users.push({
            id : element.id, 
            role: element.role,
            nom: element.lastName,
            prenom: element.firstName,
            email: element.email,
            numero: element.phoneNumber,
            activation: new Date(element.activationDate).toLocaleString('en-US')
          });
        });
      }
    )

    // get list inactif clients
    this.userEditingInterfaceService.getInactifUsers().subscribe(
      (response) => {
        response.forEach((element: {
          id: number; packtName: string; role: string; lastName: string; firstName: string;
          email: string; phoneNumber: string; creationDate: string}) => {
          this.utis.push({
            id : element.id, 
            role: element.role,
            nom: element.lastName,
            prenom: element.firstName,
            email: element.email,
            numero: element.phoneNumber,
            creation:new Date(element.creationDate).toLocaleString('en-US')
            
          });
        });
      }
    )
  }



  navigateToDetails(userId: number) {


    
    this.router.navigate(['/ticket-editing-interface', userId]);
  }

  ngOnInit() {
    this.utis.forEach(() => {
      this.editMode.push(false);
    });
  }

  @Input() user: any;
  editMode: boolean[] = []; // Add an array to track the edit mode for each user
  users: User[] = [];

  @Input() uti: any;
  
  utis: uti[] = [];
 

 
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

  


  @Input() abonnement: any;

  abonnements: abonnement[] = [
    {
      ida: 1,
      type: 'Premium',
      dateexp: '01/01/2025',
      statut: 'Actif'
    },
    {
      ida: 2,
      type: 'Standard',
      dateexp: '01/01/2025',
      statut: 'Actif'
    },
    {
      ida: 3,
      type: 'Standard',
      dateexp: '01/01/2025',
      statut: 'Actif'
    },

  ];



  @Input() installation: any;

  installations: installation[] = [
    {
      idi: 1,
      nomapp: 'NETATMO SMART INDOOR AIR QUALITY MONITOR',
      piece: 'Salon',
      etat: 'en ligne',
      batterie: '80%',
      dernieremise: '23/03/2024'
    },
    {
      idi: 2,
      nomapp: 'WAVE MINI',
      piece: 'Bureau',
      etat: 'hors ligne',
      batterie: '0%',
      dernieremise: '12/01/2024'
    },
    {
      idi: 3,
      nomapp: 'WAVE MINI',
      piece: 'Bureau',
      etat: 'hors ligne',
      batterie: '0%',
      dernieremise: '12/01/2024'
    },

  ];


  

  @Input() donnees: any;

  donneess: donnees[] = [
    {
      idd: 10000,
      polluant: 'CO2',
      unite: 'ppm',
      seuil: '>1000'
    },
    {
      idd: 10001,
      polluant: 'Pression',
      unite: 'hPa',
      seuil: '>940'
    },
    {
      idd: 10010,
      polluant: 'Humidité',
      unite: '%',
      seuil: '>60'
    },
    {
      idd: 10011,
      polluant: 'Température',
      unite: '°C',
      seuil: '>40'
    },
    {
      idd: 10111,
      polluant: 'O3',
      unite: ' μg/m3',
      seuil: '>151'
    },
    {
      idd: 11111,
      polluant: 'NO2',
      unite: ' μg/m3',
      seuil: '>81'
    },

  ];


 


    accepterInscription(userId: number) {
      console.log(userId);
          this.userEditingInterfaceService.accepterInscription(userId)
          .subscribe(
            (response: any) => {
            console.log(response)
            location.reload();
            console.log('État actif mis à jour avec succès');
            // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
          });
  }

  refuserInscription(index: number) {
    // Logique pour refuser une demande d'inscription
  }


}
