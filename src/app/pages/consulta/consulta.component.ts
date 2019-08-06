import { Medico } from 'src/app/_model/medico';
import { MedicoService } from './../../_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Examen } from 'src/app/_model/examen';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { MatSnackBar } from '@angular/material';
import { ConsultaListExamenDTO } from 'src/app/_model/ConsultaListExamen';
import { Consulta } from 'src/app/_model/Consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];

  idExamenSeleccionado: number;
  idPacienteSeleccionado: number;
  idEspecialidadSeleccionada: number;
  idMedicoSeleccionado: number;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();
  minFecha: Date = new Date();
  diagnostico: string;
  tratamiento: string;
  detalle: DetalleConsulta[] = [];
  examenesSeleccionado: Examen[] = [];
  constructor(private cservice: ConsultaService, private pservice: PacienteService, private eservice: EspecialidadService, private mservice: MedicoService, private exservice: ExamenService, private matSnackbar: MatSnackBar) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecialidades();
    this.listarMedicos();
    this.listarExamenes();

  }

  listarPacientes() {
    this.pservice.listar().subscribe(data => {
      this.pacientes = data;
    });
  }
  listarEspecialidades() {
    this.eservice.listar().subscribe(data => {
      this.especialidades = data;
    });
  }
  listarMedicos() {
    this.mservice.listar().subscribe(data => {
      this.medicos = data;
    });
  }
  listarExamenes() {
    this.exservice.listar().subscribe(data => {
      this.examenes = data;
    });
  }
  agregar() {
    if (this.diagnostico != '' && this.tratamiento != '') {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalle.push(det);
      this.diagnostico = '';
      this.tratamiento = '';
    }else{
      this.matSnackbar.open("Debe agregar por lo menos 1 detalle de la consulta", "INFO",{
        duration: 2000
      })
    }
  }
  removerDetalle(index: number) {
    this.detalle.splice(index, 1);
  }
  agregarExamen() {
    if (this.idExamenSeleccionado > 0) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionado.length; i++) {
        if (this.idExamenSeleccionado === this.examenesSeleccionado[i].idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.matSnackbar.open("El examen ya se encuentra en la lista", "AVISO", {
          duration: 2000
        });
      } else {
        let examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.exservice.listarxId(this.idExamenSeleccionado).subscribe(data => {
          examen.nombre = data.nombre;
          examen.descripcion = data.descripcion;
          this.examenesSeleccionado.push(examen);
          console.log(this.examenesSeleccionado);
        });
      }
    }
  }
  removerExamen(index: number) {
    this.examenesSeleccionado.splice(index, 1);
  }
  botonRegistrarConsulta() {
    return (this.idPacienteSeleccionado === 0 || this.idEspecialidadSeleccionada === 0 || this.idMedicoSeleccionado === 0
      || this.detalle.length === 0);
  }
  registrarConsulta() {
    let conslistExamen = new ConsultaListExamenDTO();
    let con = new Consulta();
    let pac = new Paciente();
    let med = new Medico();
    let esp = new Especialidad();

    pac.idPaciente = this.idPacienteSeleccionado;
    med.idMedico = this.idMedicoSeleccionado;
    esp.idEspecialidad = this.idEspecialidadSeleccionada;
    con.paciente = pac;
    con.medico = med;
    con.especialidad = esp;
    con.detalleConsulta = this.detalle;
    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    con.fecha = localISOTime;
    // conslistExamen.consulta.paciente.idPaciente = this.idPacienteSeleccionado;
    //conslistExamen.consulta.medico.idMedico = this.idMedicoSeleccionado;
    //conslistExamen.consulta.especialidad.idEspecialidad = this.idEspecialidadSeleccionada;
    //conslistExamen.consulta.fecha = this.fechaSeleccionada;
    // conslistExamen.consulta.detalleConsulta = this.detalle;
    conslistExamen.consulta = con;
    conslistExamen.examenes = this.examenesSeleccionado;
    console.log(conslistExamen);
    this.cservice.registrar(conslistExamen).subscribe(() => {
      this.matSnackbar.open("SE REGISTRO LA CONSULTA EXITOSAMENTE", "INFO", {
        duration: 2000
      });
      setTimeout(() => { this.limpiarControles() }, 2000);
    });
  }
  limpiarControles() {
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionada = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.detalle = [];
    this.examenesSeleccionado = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }
}