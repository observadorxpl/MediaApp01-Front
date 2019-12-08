import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoEdicionComponent } from './pages/medico/medico-edicion/medico-edicion.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { Not401Component } from './pages/not401/not401.component';
import { Not404Component } from './pages/not404/not404.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';


const routes: Routes = [
  {path: 'paciente', component: PacienteComponent, children:[
    {path: 'nuevo', component: PacienteEdicionComponent},
    {path: 'edicion/:id', component: PacienteEdicionComponent}
  ], canActivate: [GuardService]},

  {path: 'medico', component: MedicoComponent, children: [
    {path: 'nuevo', component: MedicoEdicionComponent},
    {path: 'edicion/:id', component: MedicoEdicionComponent}
  ], canActivate: [GuardService]},
  {path: 'especialidad', component: EspecialidadComponent},
  {path: 'examen', component: ExamenComponent, children:[
    {path: 'edicion/:id', component: ExamenEdicionComponent}
  ], canActivate: [GuardService]},
  {path:'consulta', component: ConsultaComponent, canActivate: [GuardService]},
  {path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService]},
  {path: 'reporte', component: ReporteComponent, canActivate:[GuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'recuperar', component: RecuperarComponent},
  {path: 'not401', component: Not401Component},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: Not404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
