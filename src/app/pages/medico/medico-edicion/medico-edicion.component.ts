import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Medico } from './../../../_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico-edicion',
  templateUrl: './medico-edicion.component.html',
  styleUrls: ['./medico-edicion.component.css']
})
export class MedicoEdicionComponent implements OnInit {
  form: FormGroup;
  medico: Medico;
  edicion: boolean;
  id: number;
  constructor(private service: MedicoService, private route: ActivatedRoute, private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.medico = new Medico();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(),
      'apellidos': new FormControl(),
      'cmp': new FormControl()
    });
    this.route.params.subscribe((param: Params) =>{
      this.id = param['id'];
      this.edicion = this.id != null;
    });
    this.initForm();
  }

  initForm(){
    if(this.edicion){
      this.service.listarxId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idMedico),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'cmp': new FormControl(data.CMP)
        });
      });
   }
  }
  operar(){
      this.medico.idMedico = this.form.value['id'];
      this.medico.nombres = this.form.value['nombres'];
      this.medico.apellidos = this.form.value['apellidos'];
      this.medico.CMP = this.form.value['cmp'];
    if(this.edicion){
      this.service.modificar(this.medico).subscribe(()=>{
        this.service.listar().subscribe(data => {
          this.service.medicoCambio.next(data);
        })
        this.service.mensajeCambio.next("SE MODIFICÓ");
      });
    }else{
      this.service.registrar(this.medico).subscribe(()=>{
        this.service.listar().subscribe(data=>{
          this.service.medicoCambio.next(data);
        });
        this.service.mensajeCambio.next("SE REGISTRÓ");
      });
    }
  }
}
