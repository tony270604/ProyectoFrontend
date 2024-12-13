import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports:[
    RouterModule,
  ]
})
export class FooterComponent {

}
