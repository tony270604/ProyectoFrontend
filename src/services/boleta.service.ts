import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoletaService {
  private apiUrl = 'http://localhost:5001/api/boleta'; // Cambia al puerto de tu backend

  constructor(private http: HttpClient) {}


  listarBoletas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listarBoletas`);
  }

  registrarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrarPedido`, pedido);
  }

  inhabilitarBoleta(numBol: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/inhabilitarBoleta/${numBol}`, {});
  }

  generarReportePDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generarReportePDF`, { responseType: 'blob' });
  }
}
