import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Paciente } from 'src/app/_model/paciente';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Examen } from 'src/app/_model/examen';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { MedicoService } from 'src/app/_service/medico.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { MatSnackBar } from '@angular/material';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsultaListExamenDTO } from 'src/app/_model/ConsultaListExamen';
import { Consulta } from 'src/app/_model/Consulta';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {
  form: FormGroup;

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];

  detalle: DetalleConsulta[] = [];
  examenesSeleccionado: Examen[] = [];

  pacienteSeleccionado: Paciente;
  especialidadSeleccionada: Especialidad;
  medicoSeleccionado: Medico;
  examenSeleccionado: Examen;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  minFecha: Date = new Date();

  diagnostico: string;
  tratamiento: string;

  mensaje: string;

  filteredOptions: Observable<any[]>;
  filteredMedicos: Observable<any[]>;
  filteredExamenes: Observable<any[]>;

  myControlPaciente: FormControl = new FormControl();
  myMedicoControl: FormControl = new FormControl();
  myExamenControl: FormControl = new FormControl();

  consultaListaExamenDTO: ConsultaListExamenDTO;

  constructor(private builder: FormBuilder, private cservice: ConsultaService, private pservice: PacienteService, private eservice: EspecialidadService, private mservice: MedicoService, private exservice: ExamenService, private matSnackbar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.builder.group({
      'paciente': this.myControlPaciente,
      'especialidad': new FormControl(),
      'medico': this.myMedicoControl,
      'fecha': new FormControl,
      'diagnostico': new FormControl,
      'tratamiento': new FormControl,
      'examen': this.myExamenControl
    });

    this.listarPacientes();
    this.listarEspecialidades();
    this.listarMedicos();
    this.listarExamenes();

    this.filteredOptions = this.myControlPaciente.valueChanges
      .pipe(map(valEscrito => this.filter(valEscrito))
      );

    this.filteredMedicos = this.myMedicoControl.valueChanges
      .pipe(map(valEscrito => this.filterMedico(valEscrito))
      );

    this.filteredExamenes = this.myExamenControl.valueChanges
      .pipe(
        map(valorEscrito => this.filterExamen(valorEscrito))
      );
  }
  filterExamen(valorEscrito: any) {
    if (valorEscrito != null && valorEscrito.idExamen > 0) {
      return this.examenes.filter(ex => ex.nombre.toLowerCase().includes(valorEscrito.nombre.toLowerCase()));
    }
    return this.examenes.filter(ex => ex.nombre.toLowerCase().includes(valorEscrito.toLowerCase()));
  }
  filter(valEscrito: any) {
    if (valEscrito != null && valEscrito.idPaciente > 0) {
      return this.pacientes.filter(pac => pac.nombres.toLowerCase().includes(valEscrito.nombres.toLowerCase()) ||
        pac.apellidos.toLowerCase().includes(valEscrito.apellidos.toLowerCase()));
    }
    return this.pacientes.filter(pac => pac.nombres.toLowerCase().includes(valEscrito.toLowerCase()) ||
      pac.apellidos.toLowerCase().includes(valEscrito.toLowerCase()));

  }
  filterMedico(valEscrito: any) {
    if (valEscrito != null && valEscrito.idMedico > 0) {
      return this.medicos.filter(med => med.nombres.toLowerCase().includes(valEscrito.nombres.toLowerCase()));
    }
    return this.medicos.filter(med => med.nombres.toLowerCase().includes(valEscrito.toLowerCase()));
  }

  seleccionarPaciente(event: any) {
    console.log(event.option.value);
    this.pacienteSeleccionado = event.option.value;
  }

  displayExamenFn(valEscrito: any) {
    return valEscrito ? `${valEscrito.nombre}` : valEscrito;
  }
  displayFn(valEscrito: any) {
    return valEscrito ? `${valEscrito.nombres} ${valEscrito.apellidos}` : valEscrito;
  }

  displayMedicoFn(valEscrito: any) {
    return valEscrito ? `${valEscrito.nombres} ${valEscrito.apellidos}` : valEscrito;
  }
  listarPacientes() {
    this.pservice.listar().subscribe(data => {
      this.pacientes = data;
      console.log(this.pacientes);
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

  agregarDetalle() {
    console.log(this.diagnostico);
    if(this.diagnostico === undefined || this.tratamiento === undefined || this.diagnostico === '' || this.tratamiento ===''){
      this.mensaje = "Debe agregar un detalle a la consulta";
      this.matSnackbar.open(this.mensaje, "AVISO", {
        duration: 2000
      });
    }else{
      let det: DetalleConsulta = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalle.push(det);
    }
  }

  removerDetalle(index: number) {
    this.detalle.splice(index, 1);
  }
  agregarExamen() {
    console.log(this.form.value['examen']);
  if(! (this.form.value['examen'] === null)){
    this.examenesSeleccionado.push(this.form.value['examen']);
    //console.log(this.examenesSeleccionado);
  }
  }

  removerExamen(index: number) {
    this.examenesSeleccionado.splice(index, 1);
  }
  botonRegistar() {
    return (this.detalle.length === 0 || this.especialidadSeleccionada == null || this.form.value['medico'] === null || this.pacienteSeleccionado === null );
  }
  registrarEspecial(){
    if(!this.fechaSeleccionada){
      console.log("false fecha")
    }
    if( this.detalle.length !== 0  &&this.detalle.length !== 0 && this.especialidadSeleccionada !== null && this.form.value['medico'] !== null && this.pacienteSeleccionado !== null){
    let consulta: Consulta = new Consulta;
    consulta.paciente = this.pacienteSeleccionado;
    consulta.medico = this.form.value['medico'];
    consulta.especialidad = this.especialidadSeleccionada;
    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consulta.fecha = localISOTime;
    consulta.detalleConsulta = this.detalle;

    this.consultaListaExamenDTO = new ConsultaListExamenDTO();
    this.consultaListaExamenDTO.consulta = consulta;
    this.consultaListaExamenDTO.examenes = this.examenesSeleccionado;
    console.log(this.consultaListaExamenDTO);
    this.cservice.registrar(this.consultaListaExamenDTO).subscribe();
    }else{
      this.matSnackbar.open("INGRESE TODOS LOS CAMPOS", "AVISO", {
        duration: 2000
      });
    }
  }
}
