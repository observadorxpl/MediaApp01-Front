import { Paciente } from './../../../_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup;
  edicion: boolean ;
  id: number;
  paciente : Paciente;
  constructor(private route: ActivatedRoute, private service: PacienteService, private router: Router) {
   }
  
  ngOnInit() {
    this.paciente = new Paciente();
    this.form = new FormGroup({
     'id' : new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos' : new FormControl(''),
      'dni' : new FormControl(''),
      'telefono' : new FormControl(''),
      'direccion' : new FormControl(''),
      'email' : new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
    });
    this.initForm();
  }
  initForm(){
    if(this.edicion){
      this.service.listarxId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'direccion': new FormControl(data.direccion),
          'email': new FormControl(data.email)
        });
      });
    }
  }

  operar(){
    this.paciente.idPaciente = this.form.value['id'];
    this.paciente.nombres = this.form.value['nombres'];
    this.paciente.apellidos = this.form.value['apellidos'];
    this.paciente.dni = this.form.value['dni'];
    this.paciente.telefono = this.form.value['telefono'];
    this.paciente.direccion = this.form.value['direccion'];
    this.paciente.email = this.form.value['email'];
    if(this.edicion){
      this.service.modificar(this.paciente).subscribe(() =>{
        this.service.listar().subscribe(data => {
          this.service.pacienteCambio.next(data);
        })
      });
      this.service.mensajeCambio.next("Se modificó");
    }else{
      this.service.registrar(this.paciente).subscribe(() =>{
        this.service.listar().subscribe(data =>{
          this.service.pacienteCambio.next(data);
        })
      });
      this.service.mensajeCambio.next("Se registró");
    }
    this.router.navigate(['paciente']);
  }

}
