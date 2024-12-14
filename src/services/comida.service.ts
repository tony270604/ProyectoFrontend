import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  private apiUrl = 'https://proyectobackendfinal.onrender.com/api/comida';

  constructor(private http: HttpClient) {}

  // listarcomida(nom_com?: string): Observable<any[]> {
  //   const params = nom_com ? { params: { nom_com } } : {};
  //   return this.http.get<any[]>(`${this.apiUrl}/listarcomida`, params);
  // }
  listarcomida(nom_com?: string, categoria?: string): Observable<any[]> {
    let params = {};
    if (nom_com) {
      params = { ...params, nom_com };
    }
    if (categoria) {
      params = { ...params, categoria };
    }

    return this.http.get<any[]>(`${this.apiUrl}/listarcomida`, { params });
  }

  addFood(
    name: string,
    price: number,
    des: string,
    img: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('des', des);
    formData.append('img', img);

    return this.http.post(`${this.apiUrl}/addFood`, formData);
  }

  editFood(
    cod_com: string,
    name: string,
    price: number,
    des: string,
    img?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('cod_com', cod_com); // Asegúrate de agregar cod_com al formData
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('des', des);
    // Solo añadir la imagen si existe
    if (img) {
      formData.append('img', img);
    }

    return this.http.post(`${this.apiUrl}/editFood`, formData);
  }

  deleteFood(cod_com: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/deleteFood`, { cod_com });
  }

  private comidaSubject = new BehaviorSubject<any>(null);

  setComida(comida: any): void {
    this.comidaSubject.next(comida);
  }
  getComida() {
    return this.comidaSubject.asObservable();
  }
}
