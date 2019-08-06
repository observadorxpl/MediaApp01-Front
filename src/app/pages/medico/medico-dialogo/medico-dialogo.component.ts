import { MedicoService } from './../../../_service/medico.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Medico } from 'src/app/_model/medico';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {
  medico: Medico;
  constructor(public dialogRef: MatDialogRef<MedicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico, private service: MedicoService) { }

  ngOnInit() {
    console.log(this.data);
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.CMP = this.data.CMP
  }
  cancelar(){
    this.dialogRef.close();
  }
  operar(){
    if(this.medico != null && this.medico.idMedico > 0){
      this.service.modificar(this.medico).subscribe(data => {
        this.service.listar().subscribe(medicos =>{
          this.service.medicoCambio.next(medicos);
          this.service.mensajeCambio.next("Se modifico el medico: " + this.data.nombres + " " + this.data.apellidos);
        });
      });
    }
    else{
        this.service.registrar(this.medico).subscribe(data =>{
          this.service.listar().subscribe(medicos =>{
            this.service.medicoCambio.next(medicos);
            this.service.mensajeCambio.next("Se inserto el medico: " + this.data.nombres + " " + this.data.apellidos);
          });
        })
    }
    this.dialogRef.close();
  }
}
