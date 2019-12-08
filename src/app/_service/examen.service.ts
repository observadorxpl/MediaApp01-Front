import { Examen } from './../_model/examen';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  url: string = `${environment.HOST_URL}/examenes`
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();
  
  constructor(private http: HttpClient) { }
  
  
  listar(){
    return this.http.get<Examen[]>(this.url);
  }
  listarxId(idExamen: number){
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }
  registrar(examen: Examen){
    return this.http.post<Examen>(this.url, examen);
  }
  modificar(examen: Examen){
    return this.http.put<Examen>(this.url, examen);
  }
  eliminar(idExamen: number){
    return this.http.delete(`${this.url}/${idExamen}`);
  }
}
