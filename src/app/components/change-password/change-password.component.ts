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
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
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
export class ChangePasswordComponent {
  email = "";
  password = "";

  constructor(private GestorService: GestorService, private router: Router) { }

  cambio() {
    if (!this.email || !this.password ) {
      alert("Por favor, llene todos los campos.");
      return;
    }

    this.GestorService.changePassword(this.email, this.password).subscribe(
      response => {
        console.log("Contraseña Cambiada exitosamente", response);
        alert("Todo correcto, CONTRASEÑA CAMBIADA");
        this.router.navigate(['login']);
      },
      error => {
        console.error('Error de cambio de contraseña', error);
        const errorMessage = error.error.message ;
        alert("ERROR: " + errorMessage);
      }
    );
  }
}
