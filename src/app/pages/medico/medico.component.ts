import { Medico } from './../../_model/medico';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MedicoService } from 'src/app/_service/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  dataSource: MatTableDataSource<Medico>
  displayedColumns: string[] =  ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  constructor(private service: MedicoService, private snackBar: MatSnackBar, private dialog:MatDialog) { }
  @ViewChild(MatSort)
  sort:MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {
    this.service.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, "INFORMACION", {
        duration: 2000
      })
    });
    this.service.medicoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.service.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eliminar(idMedico: number){
    this.service.eliminar(idMedico).subscribe(() =>{
      this.service.listar().subscribe(data =>{
        this.service.medicoCambio.next(data);
      })
      this.service.mensajeCambio.next("SE ELIMINÓ");
    });
  }
  openDialog(medico?: Medico){
      let med = medico != null ? medico: new Medico();
      this.dialog.open(MedicoDialogoComponent, {
      width: "400px",
      data: med
    })
  }

}

