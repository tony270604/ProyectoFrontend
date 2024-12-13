import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GestorService } from '../../../services/gestor.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  imports:[
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
  ]
})
export class RegistroComponent {
  name = "";
  email = "";
  password = "";
  number = "";

  constructor(private GestorService: GestorService, private router: Router) { }

  registrar() {
    if (!this.name || !this.email || !this.password || !this.number) {
      alert("Por favor, llene todos los campos.");
      return; 
    }

    this.GestorService.record(this.name, this.number, this.email, this.password).subscribe(
      response => {
        console.log("Registro exitoso", response);
        alert("Todo correcto, REGISTRO EXITOSO");
        this.router.navigate(['login']);
      },
      error => {
        console.error('Error de registro', error);
        const errorMessage = error.error.message;
        alert("ERROR: " + errorMessage);
      }
    );
  }

}
