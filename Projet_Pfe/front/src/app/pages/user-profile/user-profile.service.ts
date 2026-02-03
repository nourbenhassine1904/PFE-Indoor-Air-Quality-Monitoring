import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private baseUrl = 'http://localhost:4200'; // Remplacez cette URL par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer les informations de l'utilisateur
  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/auth/${userId}`);
  }

  // Récupérer les informations d'abonnement de l'utilisateur
  getUserSubscription(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/auth/${userId}`);
  }

  

//    Récupérer les données de l'utilisateur
  getUserData(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/auth/${userId}/data`);
  }
  }
