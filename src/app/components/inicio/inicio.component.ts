import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../../../services/comida.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../com/nav/nav.component';
import { FooterComponent } from '../com/footer/footer.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BtnInicioComponent } from '../btn-inicio/btn-inicio.component';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  imports: [
    RouterModule,
    NavComponent,
    FooterComponent,
    CommonModule,
    BtnInicioComponent,
  ],
})
export class InicioComponent implements OnInit {
  listarComida: any[] = [];
  //Para mandar el codigo a los modales
  selectedComida: string | null = null; // Ahora es un string

  constructor(
    private comidaService: ComidaService,
    private modalService: ModalService
  ) {}

  //PAra listar todos los platos
  ngOnInit(): void {
    this.listarcomida();
  }

  //Abre el modal para añadir una comida
  openModalNew(): void {
    this.modalService.showModal('new');
  }

  //Metodo de listar Comida
  // listarcomida(): void {
  //   this.comidaService.listarcomida().subscribe(
  //     (data: any[]) => {
  //       console.log('Datos recibidos:', data);
  //       this.listarComida = data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista', error);
  //     }
  //   );
  // }
  listarcomida(nom_com?: string, categoria?: string): void {
    this.comidaService.listarcomida(nom_com, categoria).subscribe(
      (data: any[]) => {
        console.log('Datos recibidos:', data);
        this.listarComida = data;
      },
      (error) => {
        console.error('Error al obtener la lista', error);
      }
    );
  }

  // onBuscarComida(valor: string): void {
  //   this.listarcomida(valor);
  // }
  onBuscarComida(nombre: string): void {
    if (nombre) {
      this.listarcomida(nombre);
    } else {
      console.warn('Por favor ingresa un nombre o categoría para buscar.');
    }
  }

  //PAra pasar el cod_com a edit.component
  onEditarComida(comida: any): void {
    this.selectedComida = comida; // Guardar el cod_com seleccionado
    console.log(
      'Código de comida seleccionado para editar:',
      this.selectedComida
    );
    // Establecer el cod_com en el servicio
    this.comidaService.setComida(this.selectedComida);
  }
}
