import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string = `${environment.HOST_URL}/menus`;
  menuCambio = new Subject<Menu[]>();
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Menu[]>(this.url);
  }
  listarPorUsuario(nombreUsuario: string){
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombreUsuario);
  }
}
