import { Medico } from './../_model/medico';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  url: string = `${environment.HOST_URL}/medicos`;
  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) {}
  listar(){
    return this.http.get<Medico[]>(this.url);
  }
  listarxId(idMedico: number){
    return this.http.get<Medico>(`${this.url}/${idMedico}`);
  }
  registrar(medico: Medico){
    return this.http.post<Medico>(`${this.url}`, medico);
  }
  modificar(medico: Medico){
    return this.http.put<Medico>(`${this.url}`, medico);
  }
  eliminar(idMedico: number){
    return this.http.delete<Medico>(`${this.url}/${idMedico}`);
  }
}

