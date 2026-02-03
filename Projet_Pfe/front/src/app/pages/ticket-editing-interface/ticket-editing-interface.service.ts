// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user/client'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+sessionStorage.getItem('token')
    })
  };

  getUserDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`, this.httpOptions);
  }

  updateUserDetails(userId: number, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update/${userId}`, userData, this.httpOptions);
  }
}
