import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/com/nav/nav.component';
import { FooterComponent } from './components/com/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BtnInicioComponent } from './components/btn-inicio/btn-inicio.component';
import { NewComponent } from './components/modal/new/new.component';
import { EditComponent } from './components/modal/edit/edit.component';
import { RegistroPedidoComponent } from './components/registro-pedido/registro-pedido.component';
import { BoletasComponent } from './components/boletas/boletas.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginComponent,
    AppRoutingModule,
    RegistroComponent,
    ChangePasswordComponent,
    InicioComponent,
    FooterComponent,
    NavComponent,
    BtnInicioComponent,
    NewComponent,
    EditComponent,
    RegistroPedidoComponent,
    BoletasComponent,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
