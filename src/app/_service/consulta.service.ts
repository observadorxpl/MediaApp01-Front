import { ConsultaListExamenDTO } from './../_model/ConsultaListExamen';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url: string = `${environment.HOST_URL}/consultas`
  constructor(private http: HttpClient) { }

  listar(){
    
  }
  registrar(dto: ConsultaListExamenDTO){
    console.log("service");
    return this.http.post(this.url, dto);
  }

  listarResumen(){
    return this.http.get<any>(`${this.url}/resumen-consulta`);
  }
  generarReporte(){
    return this.http.get(`${this.url}/generar-reporte`,{
      responseType: 'blob'
    });
  }
  guardarArchivo(file: File){
    let form: FormData = new FormData();
    form.append("file", file);
    return this.http.post(`${this.url}/guardarArchivo`, form,{
      responseType: 'text'
    });
  }

  leerArchivo(idArchivo: number){
    return this.http.get(`${this.url}/leerArchivo/${idArchivo}`,{
      responseType: 'blob'
    })
  }
}
