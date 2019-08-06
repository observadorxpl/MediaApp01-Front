import { Examen } from './../../_model/examen';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamenService } from 'src/app/_service/examen.service';
import { ExamenDialogoComponent } from './examen-dialogo/examen-dialogo.component';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  displayedColumns: string[] = ['idExamen', 'nombre', 'descripcion', 'acciones']
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatSort)
  matSort: MatSort;
  @ViewChild(MatPaginator)
  matPaginator: MatPaginator;
  constructor(private service: ExamenService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, "INFORMACION", {
        duration: 2000
      })
    });
    this.service.examenCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.matPaginator;
    });

    this.service.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.matPaginator;
      //console.log(data);
    })
  }
  eliminar(idPaciente: number){
    this.service.eliminar(idPaciente).subscribe(()=>{
      this.service.listar().subscribe(data =>{
        this.service.examenCambio.next(data);
        this.service.mensajeCambio.next("SE ELIMINO");
      });
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(examen?: Examen){
    let exam = examen != null ? examen: new Examen();
    this.dialog.open(ExamenDialogoComponent, {
      width: "400px",
      data: exam
    })
  }
}
