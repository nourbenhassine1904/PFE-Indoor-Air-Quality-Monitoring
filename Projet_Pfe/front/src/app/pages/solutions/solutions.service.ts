import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  private apiUrl = 'http://127.0.0.1:5000/predict'; // Remplacez cette URL par l'URL de votre API Flask

  constructor(private http: HttpClient) { }

  predict(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}