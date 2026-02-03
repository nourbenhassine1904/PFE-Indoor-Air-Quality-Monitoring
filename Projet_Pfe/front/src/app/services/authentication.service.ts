import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authService {

  constructor() { }

  // Méthode pour gérer la connexion de l'utilisateur
  login(): void {
    // Implémentez ici votre logique de connexion
    // Cette méthode doit retourner true si l'authentification réussit, sinon false
    // Par exemple, vous pouvez vérifier les identifiants dans une base de données ou un service web
     // Remplacez cela par votre logique réelle
  }

  // Méthode pour vérifier si l'utilisateur est actuellement connecté
  isLoggedIn(): boolean {
    // Implémentez ici votre logique pour vérifier si l'utilisateur est connecté
    // Vous pouvez vérifier la présence d'un jeton d'authentification dans le stockage local, par exemple
    //return true; // Remplacez cela par votre logique réelle
    let role = window.sessionStorage.getItem('role');
    if(role){
      return  true;
    } 
    return false;
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    // Implémentez ici votre logique de déconnexion
    // Par exemple, vous pouvez supprimer le jeton d'authentification du stockage local
    window.sessionStorage.clear();
  }
}
