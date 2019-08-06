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


const routes: Routes = [
  {path: 'paciente', component: PacienteComponent, children:[
    {path: 'nuevo', component: PacienteEdicionComponent},
    {path: 'edicion/:id', component: PacienteEdicionComponent}
  ]},
  {path: 'medico', component: MedicoComponent, children: [
    {path: 'nuevo', component: MedicoEdicionComponent},
    {path: 'edicion/:id', component: MedicoEdicionComponent}
  ]},
  {path: 'especialidad', component: EspecialidadComponent},
  {path: 'examen', component: ExamenComponent, children:[
    {path: 'edicion/:id', component: ExamenEdicionComponent}
  ]},
  {path:'consulta', component: ConsultaComponent},
  {path: 'consulta-especial', component: EspecialComponent},
  {path: 'reporte', component: ReporteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
