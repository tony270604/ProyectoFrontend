import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class BoletaService {

  private backendUrl = environment.backendUrl + '/api/boleta';

  constructor(private http: HttpClient) {}


  listarBoletas(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/listarBoletas`);
  }

  registrarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/registrarPedido`, pedido);
  }

  inhabilitarBoleta(numBol: string): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/inhabilitarBoleta/${numBol}`, {});
  }

  generarReportePDF(): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/generarReportePDF`, { responseType: 'blob' });
  }
}
