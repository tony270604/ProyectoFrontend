import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ComidaService } from '../../../../services/comida.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class EditComponent implements OnInit {
  isOpening = false;
  isHiding = false;
  name = "";
  price = "";
  des = "";
  img: File | null = null; // Inicializa como null o File
  codCom: string | null = null; // Para almacenar el cod_com


  constructor(public modalService: ModalService, public comidaService: ComidaService) { }

  openModalEdit(): void {
    this.isOpening = true;
    this.modalService.showModal('edit');
    setTimeout(() => {
      this.isOpening = false;
    }, 400);
  }

  closeModal(): void {
    this.isHiding = true;
    setTimeout(() => {
      this.isHiding = false;
      this.modalService.hideModal('edit');
    }, 400);
  }

  eliminarcampos() {
    this.name = "";
    this.price = "";
    this.des = "";
    this.img = null; (document.getElementById('inputGroupFile02') as HTMLInputElement).value = "";
  }

  // Obtener el archivo de imagen
  onFileSelected(event: any) {
    this.img = event.target.files[0];
  }

  ngOnInit(): void {
    // Obtener la comida desde el servicio al abrir el modal
    this.comidaService.getComida().subscribe(comida => {
      if (comida) {
        this.name = comida.nom_com || '';
        this.price = comida.precio_com;
        this.des = comida.des_com || '';
      }
    });
  }

  editar() {
    const number = parseFloat(this.price);
    if (!this.price || isNaN(number) || number < 0 || !/^\d+(\.\d{1,2})?$/.test(this.price)) {
      alert("Por favor, ingrese un precio válido con hasta dos decimales.");
      return;
    }

    this.comidaService.getComida().subscribe(comida => {
      const cod_com = comida.cod_com;

      // Si la imagen está vacía, asignar undefined
      const imageToSend = this.img ? this.img : undefined;

      this.comidaService.editFood(cod_com, this.name, number, this.des, imageToSend).subscribe(
        response => {
          console.log("Se ha editado exitosamente", response);
          alert("Todo correcto, COMIDA editada EXITOSAMENTE");
          this.eliminarcampos();
          this.closeModal();
        },
        error => {
          console.error('Error al editar', error);
          const errorMessage = error.error.message;
          alert("ERROR: " + errorMessage);
        }
      );
    });
  }
}
