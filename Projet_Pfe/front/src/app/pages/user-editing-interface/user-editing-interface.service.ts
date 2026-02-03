import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEditingInterfaceService {

    private apiUrl = 'http://localhost:8080/api/v1/user/client'; // URL de votre API

    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+sessionStorage.getItem('token')
      })
    };
    
    getActifUsers(): Observable<any> {
      // Utilisez l'URL appropriée pour récupérer la liste des utilisateurs
      return this.http.get<any>(`${this.apiUrl}/actif`, this.httpOptions);
    }

    getInactifUsers(): Observable<any> {
      // Utilisez l'URL appropriée pour récupérer la liste des utilisateurs
      return this.http.get<any>(`${this.apiUrl}/inactif`, this.httpOptions);
    }
  
    getUserDetails(id: number): Observable<any> {
      // Utilisez l'URL appropriée pour récupérer les détails de l'utilisateur avec l'ID spécifié
      return this.http.get<any>(`${this.apiUrl}/users/${id}`, this.httpOptions);
    }

    accepterInscription(userId: number): Observable<any> {
        // Envoyer une requête HTTP PUT pour mettre à jour l'état actif de l'utilisateur dans la base de données
        return this.http.patch<any>(`${this.apiUrl}/activate/${userId}`, this.httpOptions, );
    }    
  
    // Ajoutez d'autres méthodes si nécessaire, par exemple pour mettre à jour, créer ou supprimer des données d'utilisateur
  }
