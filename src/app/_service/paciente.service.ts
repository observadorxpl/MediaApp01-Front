import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';

  
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url: string = `${environment.HOST_URL}/pacientes`;
  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();
  
  constructor(private http:HttpClient) { 
  }
  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`)
  }
  listar(){
    return this.http.get<Paciente[]>(this.url);
  }

  listarxId(idPaciente: number){
    return this.http.get<Paciente>(`${this.url}/${idPaciente}`)
  }
  registrar(paciente: Paciente){
    return this.http.post<Paciente>(`${this.url}`, paciente);
  }
  modificar(paciente: Paciente){
    return this.http.put<Paciente>(`${this.url}`, paciente);
  }
  
  eliminar(idPaciente: number){
    return this.http.delete(`${this.url}/${idPaciente}`);
  }
  
}
