import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { ComidaService } from '../../../services/comida.service';

@Component({
  selector: 'app-btn-inicio',
  standalone: true,
  templateUrl: './btn-inicio.component.html',
  styleUrl: './btn-inicio.component.css',
  imports:[
    RouterModule,
  ]
})
export class BtnInicioComponent {


  @Input() comida: any; // Recibe el objeto comida desde la tabla
  @Output() editarComida = new EventEmitter<any>(); 
  constructor(private modalService: ModalService, private comidaService:ComidaService ) {}

  openModal(): void {
    this.editarComida.emit(this.comida); 
    this.modalService.showModal('edit');
  }

  deleteFood(){
    if (this.comida && this.comida.cod_com) {
      console.log('Código de comida ELIMINAR:', this.comida.cod_com); 
      this.comidaService.deleteFood(this.comida.cod_com).subscribe(
        response => {
          console.log("Registro exitoso", response);
          alert("Todo correcto, COMIDA ELIMINADA EXITOSAMENTE");
        },
        error => {
          console.error('Error de al ELIMINAR', error);
          const errorMessage = error.error.message;
          alert("ERROR: " + errorMessage);
        }
      );
    }  
  }

}
