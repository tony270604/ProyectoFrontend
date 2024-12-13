import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

import { NavComponent } from '../com/nav/nav.component'
import { FooterComponent } from '../com/footer/footer.component'
import { BoletaService } from '../../../services/boleta.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro-pedido',
  standalone: true,  
  templateUrl: './registro-pedido.component.html',
  styleUrl: './registro-pedido.component.css',
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavComponent,
    FooterComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
})
export class RegistroPedidoComponent{
    pedidoForm: FormGroup;

  constructor(private fb: FormBuilder, private boletaService: BoletaService) {
    this.pedidoForm = this.fb.group({
        dni_cli: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        nom_cli: ['', Validators.required],
        correo_cli: ['', [Validators.required, Validators.email]],
        hora: ['', Validators.required], // Validación requerida
        fec_bol: ['', Validators.required], // Validación requerida
        cod_ges: ['', Validators.required], // Validación requerida
        metodo_pago: ['', Validators.required], // Validación requerida
        detalles: this.fb.array([
          this.createDetalle()
        ]),
      });
  }

  get detalles(): FormArray {
    return this.pedidoForm.get('detalles') as FormArray;
  }

  createDetalle(): FormGroup {
    return this.fb.group({
      cod_com: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      comentario: [''],
    });
  }

  addDetalle(): void {
    this.detalles.push(this.createDetalle());
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      const formData = this.pedidoForm.value;

      // Convertir la fecha al formato correcto
      const fecha = new Date(formData.fec_bol);
      const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;

      // Reemplazar la fecha en formData
      formData.fec_bol = fechaFormateada;

      console.log('Datos enviados:', formData); // Debug
      this.boletaService.registrarPedido(formData).subscribe({
        next: (response) => {
          console.log('Pedido registrado:', response);
            this.limpiarFormulario();
        },
        error: (error) => {
          console.error('Error al registrar el pedido:', error);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  limpiarFormulario(): void {
    this.pedidoForm.reset(); // Reinicia el formulario
    // Si quieres valores iniciales, puedes pasarlos como argumento:
    this.pedidoForm.patchValue({
      detalles: [this.createDetalle()]
    });
    // Restablecer la lista de detalles:
    while (this.detalles.length !== 1) {
      this.detalles.removeAt(0);
    }
  }
  
}