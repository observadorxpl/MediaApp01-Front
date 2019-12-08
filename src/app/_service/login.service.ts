import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = `${environment.HOST_URL}/oauth/token`;
  constructor(private http: HttpClient, private route: Router) { }

  login(username: string, password: string){
    let body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' +environment.TOKEN_AUTH_PASSWORD))
      //headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });   
  }
  ////////////////////////////////////////// BUG ////////////////////////////////////
  estaLogeado(){
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    /*
    if(token!==null){
      let tk = JSON.parse(token);
      const decodedToken = helper.decodeToken(tk.access_token);
      console.log(decodedToken);
  }*/
    return token!=null;
  }
  cerrarSesion(){
    let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    console.log(token);
    this.http.get(`${environment.HOST_URL}/usuarios-token/anular/${token}`).subscribe(()=>{
      console.log("eliminando token");
      sessionStorage.removeItem(environment.TOKEN_NAME);
      this.route.navigate(['login']);
    });
  }
  cerrarSesion404(){
    let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    console.log(token);
    this.http.get(`${environment.HOST_URL}/usuarios-token/anular/${token}`).subscribe(()=>{
      console.log("eliminando token");
      sessionStorage.removeItem(environment.TOKEN_NAME);
    });
  }
  enviarCorreo(correo: String){
    return this.http.post<number>(`${environment.HOST_URL}/login/enviarCorreo`, correo, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }
}
