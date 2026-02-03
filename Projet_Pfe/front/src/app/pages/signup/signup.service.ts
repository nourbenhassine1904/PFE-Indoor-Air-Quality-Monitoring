import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/register'; // URL de votre backend pour l'inscription
  private apiUrlGetListPacks = 'http://localhost:8080/api/v1/pack'; // URL de votre backend pour récupérer la liste des packs

  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any> {
    console.log(formData);
    return this.http.post<any>(this.apiUrl, formData);
  }

  getListPack(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetListPacks);
  }
}
