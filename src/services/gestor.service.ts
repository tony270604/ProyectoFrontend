import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class GestorService {
  private backendUrl = environment.backendUrl;

    constructor(private http: HttpClient) { }

    validateLogin(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post(`${this.backendUrl}/validateLogin`, body).pipe(
          map((response: any) => {
            localStorage.setItem('token', response.token); // Guardar el token en localStorage
            return response;
          })
        );
      }

      logout(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post(`${this.backendUrl}/logout`, {}, { headers }).pipe(
          map(response => {
            localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
            return response;
          })
        );
      }


      isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
      }
    record(name: string, number: string, email: string, password: string): Observable<any> {
        return this.http.post(`${this.backendUrl}/record`, { name, number, email, password });
    }

    changePassword(email: string, password: string): Observable<any> {
        return this.http.post(`${this.backendUrl}/changePassword`, { email, password });
    }
    
}