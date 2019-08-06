import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen-dialogo',
  templateUrl: './examen-dialogo.component.html',
  styleUrls: ['./examen-dialogo.component.css']
})
export class ExamenDialogoComponent implements OnInit {
  examen: Examen;
  constructor(public dialogRef: MatDialogRef<ExamenDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Examen, private service: ExamenService) { }

  ngOnInit() {
    this.examen = new Examen();
    this.examen.idExamen = this.data.idExamen;
    this.examen.nombre = this.data.nombre;
    this.examen.descripcion = this.data.descripcion;
  }
  cancelar(){
    this.dialogRef.close();
  }
  operar(){
    if(this.examen != null && this.examen.idExamen > 0){
      this.service.modificar(this.examen).subscribe(data =>{
        this.service.listar().subscribe(examenes =>{
          this.service.examenCambio.next(examenes);
          this.service.mensajeCambio.next("SE MODIFICO: " + data.nombre);
        });
      });
    }
    else{
      this.service.registrar(this.examen).subscribe(data => {
        this.service.listar().subscribe(examenes => {
          this.service.examenCambio.next(examenes);
          this.service.mensajeCambio.next("SE MODIFICO: " + data.nombre);
        });
      });
    }
    this.dialogRef.close();
  }

}
