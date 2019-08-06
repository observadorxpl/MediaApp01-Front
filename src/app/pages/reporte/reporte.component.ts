import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  chart: any;
  tipo: string = 'line';
  pdfSrc: string = '';
  labelFile: string;

  /// Files seleccionados
  selectedFiles: FileList;
  // File actual a subir
  currentFileUpload: File;

  imagenData: any;
  imagenEstado: boolean = false;
                                                                                        //bypass security trust Resource URL
  constructor(private service: ConsultaService, private matSnackBar: MatSnackBar, private disanitazier: DomSanitizer) { }

  ngOnInit() {
    this.dibujar();
    this.service.leerArchivo(1).subscribe(data=>{
      console.log(data);
      this.imagenData = data;
      this.convertir(data);
    });
  }
  dibujar() {
    this.service.listarResumen().subscribe(data => {
      console.log(data);

      let cantidades = data.map(res => res.cantidad);
      let fechas = data.map(res => res.fecha);

      console.log(cantidades);
      console.log(fechas);

      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [{
            label: '# de Ventas',
            data: cantidades,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  }

  cambiar(tipo: string) {
    this.tipo = tipo;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }
  generarReporte() {
    this.service.generarReporte().subscribe(data =>{
      let reader = new FileReader();
      reader.onload = (e: any) => {
        //console.log(e.target.result);
        this.pdfSrc = e.target.result;
      }
      reader.readAsArrayBuffer(data);
    });
  }
  descargarReporte() {
    this.service.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'consultasxFecha.pdf';
      a.click();
    });
  }

  selectFile(e: any){
    console.log(e.target.files[0].name);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
    }
    upload(){
      this.currentFileUpload = this.selectedFiles.item(0);
      this.service.guardarArchivo(this.currentFileUpload).subscribe(data =>{
        if (data === "1"){
          this.matSnackBar.open("ARCHIVO SUBIDO CON EXITO", "INFO", {
            duration: 2000
          });
        }else{
          this.matSnackBar.open("ALGO OCURRIO CON EL ARCHIVO", "ERROR", {
            duration: 2000
          });
        }
      });
    }
    accionImagen(accion: string){
      if(accion === "M"){
        this.imagenEstado = true;
      }
      else{
        this.imagenEstado = false;
      }
    }
    convertir(data: any){
      let reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () =>{
        let x = reader.result;
        console.log(x);
        this.setear(x);
      }
    }
    setear(data: any){
      this.imagenData = this.disanitazier.bypassSecurityTrustResourceUrl(data);
    }
}
