import { Component } from '@angular/core';
import { GestorService } from '../../../services/gestor.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private GestorService: GestorService, private router: Router) {}

  ingresar(){
    if (!this.email || !this.password) {
      alert("Por favor, llene todos los campos.");
      return; 
    }
    this.GestorService.validateLogin(this.email,this.password).subscribe(
      response=>{
        console.log('Login exitoso', response);
        alert('Credenciales correctas'); 
        this.router.navigate(['inicio']); 
      },
      error=>{
        console.error('Error de inicio de sesión', error);
        alert('Credenciales incorrectas'); 
      }
    );
  }
}
