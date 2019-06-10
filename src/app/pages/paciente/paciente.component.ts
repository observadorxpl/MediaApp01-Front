import { Paciente } from './../../_model/paciente';

import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  displayedColumns: String[] = ['idPaciente', 'nombres', 'apellidos', 'dni','direccion', 'telefono', 'email', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;
  constructor(private pacienteService: PacienteService, private matSnackBar: MatSnackBar) { }
  @ViewChild(MatSort) 
  sort:MatSort;
  @ViewChild(MatPaginator)
  paginator:MatPaginator;
  ngOnInit() {
    this.pacienteService.pacienteCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    });

    this.pacienteService.mensajeCambio.subscribe(data =>{
      this.matSnackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
    
    this.pacienteService.listar().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(idPaciente: number){
    this.pacienteService.eliminar(idPaciente).subscribe(()=>{
      this.pacienteService.listar().subscribe(data =>{
        this.pacienteService.pacienteCambio.next(data);
      })
    });
    this.pacienteService.mensajeCambio.next("Se eliminó");
  }

}
