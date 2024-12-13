import { Component } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ComidaService } from '../../../../services/comida.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


declare var bootstrap: any;
@Component({
  selector: 'app-new',
  standalone: true,
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class NewComponent {
  isOpening = false;
  isHiding = false;
  name = "";
  price = "";
  des = "";
  img: File | null = null; // Inicializa como null o File


  constructor(public modalService: ModalService, public comidaService: ComidaService) { }

  openModalNew(): void {
    this.isOpening = true;
    this.modalService.showModal('new');  // 'new' es el nombre del modal
    setTimeout(() => {
      this.isOpening = false;
    }, 400);
  }

  closeModal(): void {
    this.isHiding = true;
    setTimeout(() => {
      this.isHiding = false;
      this.modalService.hideModal('new');
    }, 400);
  }

  onFileSelected(event: any) {
    this.img = event.target.files[0]; // Obtener el archivo de imagen
  }

  eliminarcampos() { 
    this.name = ""; 
    this.price = ""; 
    this.des = ""; 
    this.img = null; (document.getElementById('inputGroupFile02') as HTMLInputElement).value = ""; 
  }

  agregar() {
    if (!this.name || !this.price || !this.des || !this.img) {
      alert("Por favor, llene todos los campos.");
      return;
    }

    const priceNumber = parseFloat(this.price);
    if (isNaN(priceNumber) || priceNumber < 0 || !/^\d+(\.\d{1,2})?$/.test(this.price)) {
      alert("Por favor, ingrese un precio válido con hasta dos decimales.");
      return;
    }

    this.comidaService.addFood(this.name, priceNumber, this.des, this.img).subscribe(
      response => {
        console.log("Registro exitoso", response);
        alert("Todo correcto, COMIDA REGISTRADA EXITOSAMENTE");
        this.eliminarcampos();
      },
      error => {
        console.error('Error de registro', error);
        const errorMessage = error.error.message;
        alert("ERROR: " + errorMessage);
      }
    );
  }
}
