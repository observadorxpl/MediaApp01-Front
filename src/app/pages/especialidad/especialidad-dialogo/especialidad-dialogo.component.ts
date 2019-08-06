import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-especialidad-dialogo',
  templateUrl: './especialidad-dialogo.component.html',
  styleUrls: ['./especialidad-dialogo.component.css']
})
export class EspecialidadDialogoComponent implements OnInit {
  especialidad: Especialidad;
  constructor(public dialogRef: MatDialogRef<EspecialidadDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Especialidad, private service: EspecialidadService) { }

  ngOnInit() {
    this.especialidad = new Especialidad();
    this.especialidad.idEspecialidad = this.data.idEspecialidad;
    this.especialidad.nombre = this.data.nombre;
    console.log(this.data);
  }
  cancelar(){
    this.dialogRef.close();
  }
  operar(){
    if(this.especialidad != null && this.especialidad.idEspecialidad > 0){
      this.service.modificar(this.especialidad).subscribe(()=>{
        this.service.listar().subscribe(data =>{
          this.service.especialidadesCambio.next(data);
          this.service.mensajeCambio.next("SE ACTUALIZO");
        });
      });
    }
    else{
      this.service.registrar(this.especialidad).subscribe(()=>{
        this.service.listar().subscribe(data =>{
          this.service.especialidadesCambio.next(data);
          this.service.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
  this.dialogRef.close();
  }

}
