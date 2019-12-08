import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoEdicionComponent } from './pages/medico/medico-edicion/medico-edicion.component';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenDialogoComponent } from './pages/examen/examen-dialogo/examen-dialogo.component';
import { EspecialidadDialogoComponent } from './pages/especialidad/especialidad-dialogo/especialidad-dialogo.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JwtModule } from "@auth0/angular-jwt"; // Importacion auth0
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { Not401Component } from './pages/not401/not401.component';
import { Not404Component } from './pages/not404/not404.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';

// Forma de como obetener el token
// sessionStorage, localStorage
export function tokenGetter() {
  //return localStorage.getItem("access_token");
  //return sessionStorage.getItem(TOKEN_NAME)
  let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
  console.log(tk);
  let token = tk != null ? tk.access_token: ''
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    EspecialidadComponent,
    ExamenComponent,
    MedicoEdicionComponent,
    MedicoDialogoComponent,
    ExamenEdicionComponent,
    ExamenDialogoComponent,
    EspecialidadDialogoComponent,
    ConsultaComponent,
    EspecialComponent,
    ReporteComponent,
    LoginComponent,
    Not401Component,
    Not404Component,
    RecuperarComponent,
    
  ],
  entryComponents:[MedicoDialogoComponent, ExamenDialogoComponent, EspecialidadDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter, //funcion de como se va obtener el token
        whitelistedDomains: ["localhost:9797"],//Lista de donde se van a pasar los tokens 
        blacklistedRoutes: ["localhost:9797/login/enviarCorreo"] // Lista que no necesitan tokens
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorsInterceptor,
    multi: true // multi: true es para aceptar varias peticiones http
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
