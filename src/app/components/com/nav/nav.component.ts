import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { GestorService } from '../../../../services/gestor.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports:[
    RouterModule,
  ]
})
export class NavComponent {
constructor(private gestorService: GestorService, private router: Router) {}
  
    logout() {
      this.gestorService.logout().subscribe({
        next: () => {
          alert('Sesión cerrada correctamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          alert('Error al cerrar sesión: ' + error.error.message);
        }
      });
    }
}
