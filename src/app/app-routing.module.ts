import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/com/nav/nav.component';
import { FooterComponent } from './components/com/footer/footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditComponent } from './components/modal/edit/edit.component';
import { NewComponent } from './components/modal/new/new.component';
import { RegistroPedidoComponent } from './components/registro-pedido/registro-pedido.component';
import { BoletasComponent } from './components/boletas/boletas.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'registro-pedido', component: RegistroPedidoComponent },
  { path: 'boletas', component: BoletasComponent},

  {path: 'com',
    children: [
      {path: 'nav', component: NavComponent},
      {path: 'footer', component: FooterComponent},
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
