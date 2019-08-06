import { Subject } from 'rxjs';
import { Especialidad } from './../_model/especialidad';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  url: string = `${environment.HOST_URL}/especialidades`;
  especialidadesCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();
  
  constructor(private http:HttpClient) { }
  listar(){
    return this.http.get<Especialidad[]>(this.url);
  }
  registrar(especialidad:Especialidad){
    return this.http.post(`${this.url}`, especialidad);
  }
  modificar(especialidad:Especialidad){
    return this.http.put(`${this.url}`, especialidad);
  }
  eliminar(idEspecialidad: number){
    return this.http.delete(`${this.url}/${idEspecialidad}`)
  }
  listarxId(idEspecialidad: number){
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}}`)
  }
}
