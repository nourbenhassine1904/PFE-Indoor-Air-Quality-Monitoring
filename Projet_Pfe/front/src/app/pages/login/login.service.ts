
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth'; // Remplacez ceci par l'URL réelle de votre backend

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { email, password, role});
  }
}
