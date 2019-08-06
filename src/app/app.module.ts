import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
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
import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';

// Forma de como obetener el token
// sessionStorage, localStorage
export function tokenGetter() {
  //return localStorage.getItem("access_token");
  //return sessionStorage.getItem(TOKEN_NAME)
  return "";
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
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:9797"],//Lista de donde se van a pasar los tokens 
        blacklistedRoutes: ["example.com/examplebadroute/"] // Lista que no necesitan tokens
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
