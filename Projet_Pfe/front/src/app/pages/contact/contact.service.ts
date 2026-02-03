import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/v1/contact'; // URL de votre backend pour l'inscription

  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
