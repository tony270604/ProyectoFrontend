import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../../services/boleta.service';
import { RouterModule } from '@angular/router';

import { NavComponent } from '../com/nav/nav.component'
import { FooterComponent } from '../com/footer/footer.component'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boletas',
  standalone: true,
  
  templateUrl: './boletas.component.html',
  styleUrl: './boletas.component.css',
  imports:[
    RouterModule,
    NavComponent,
    FooterComponent,
    CommonModule,
  ]
})
export class BoletasComponent implements OnInit {
  boletas: any[] = [];
  errorMessage: string = '';

  constructor(private boletaService: BoletaService) { }

  ngOnInit(): void {
    this.cargarBoletas();
  }

  cargarBoletas(): void {
    this.boletaService.listarBoletas().subscribe(
      response => {
        if (response.error) {
          this.errorMessage = response.message;
        } else {
          this.boletas = response.body;
        }
      },
      error => {
        console.error('Error al cargar las boletas:', error);
        this.errorMessage = 'Error al cargar las boletas';
      }
    );
  }

  inhabilitarBoleta(numBol: string): void {
    if (confirm('¿Estás seguro de que deseas inhabilitar esta boleta?')) {
      this.boletaService.inhabilitarBoleta(numBol).subscribe(
        response => {
          alert(`La boleta con el número ${numBol} ha sido inhabilitada exitosamente.`);
  
          this.cargarBoletas();
        },
        error => {
          console.error('Error al inhabilitar la boleta:', error);
          alert('Error al inhabilitar la boleta');
        }
      );
    }
  }
  

  generarReporte(): void {
    this.boletaService.generarReportePDF().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_ventas.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al generar el reporte PDF:', error);
        alert('Error al generar el reporte PDF');
      }
    );
  }
}
