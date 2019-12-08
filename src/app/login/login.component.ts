import { Component, OnInit } from '@angular/core';
import 'src/assets/login-animation.js';
import { LoginService } from '../_service/login.service';
import { environment } from 'src/environments/environment';
import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/typings/dir-document-token';
import { Router } from '@angular/router';
import { MenuService } from '../_service/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  clave: string;

  mensaje: string;
  error: string;
  constructor(private service: LoginService, private menuService: MenuService, private router: Router) { }
  ngAfterViewInit() {
    (window as any).initialize();
  }
  ngOnInit() {
  }
  iniciarSesion() {
    const helper = new JwtHelperService();
    this.service.login(this.usuario, this.clave).subscribe(data => {
      let token = JSON.stringify(data);
      sessionStorage.setItem(environment.TOKEN_NAME, token);
      //document.cookie = token
      let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
      let decodedToken = helper.decodeToken(tk.access_token);
      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        console.log(data);
        this.menuService.menuCambio.next(data);
        this.router.navigate(['/examen']);
      });
    });
  }
/*

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      if (data) {
        const helper = new JwtHelperService();

        let token = JSON.stringify(data);
        sessionStorage.setItem(environment.TOKEN_NAME, token);

        let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
        const decodedToken = helper.decodeToken(tk.access_token);
        //console.log(decodedToken);

        this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this.menuService.menuCambio.next(data);
        });
        this.router.navigate(['paciente']);        
      }
    });
  }*/
}
