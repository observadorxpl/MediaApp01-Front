import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog} from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { EspecialidadDialogoComponent } from './especialidad-dialogo/especialidad-dialogo.component';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator
  @ViewChild(MatSort)
  sort: MatSort
  constructor(private service: EspecialidadService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.especialidadesCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
    this.service.especialidadesCambio.subscribe();
    this.service.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, "INFORMACION", {
        duration: 2000
      })
    });

    this.service.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eliminar(idEspecialidad: number){
    this.service.eliminar(idEspecialidad).subscribe();
  }
  openDialog(especialidad?: Especialidad){
    let esp = especialidad != null ? especialidad :new Especialidad();
    this.dialog.open(EspecialidadDialogoComponent, {
      width: "400px",
      data: esp
    })
  }
}
