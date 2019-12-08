import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MenuService } from './menu.service';
import { Menu } from '../_model/menu';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Esta clase fue generada como un service (ng generate service)
export class GuardService implements CanActivate {
  constructor(private loginService: LoginService, private menuService: MenuService, private router: Router) { }
  //Implementar metodo canActivate(  ruta_principal, pagina_donde_te_encuentras(esta actual de la peticion)  ) 
  //Ademas este metodo espera retornar boolean o un observable que dentro tenga boolean, o una promesa que tenga un boolean
  //Por ultimo se debe configurar el archivo de routing para proteger las rutas

  //
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    if (!this.loginService.estaLogeado()) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    }
    else {
      let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
      const decodedToken = helper.decodeToken(token.access_token);
      //Si el token no ha expirado
      if (!helper.isTokenExpired(token.access_token)) {
        return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
          this.menuService.menuCambio.next(data);
          let url = state.url;
          console.log(url);
          let flag = 0;
          for (let m of data) {
            if (m.url === url) {
              flag = 1;
              break;
            }
          }
          if (flag === 1) {
            return true;
          } else {
            this.router.navigate(['not401']);
            return false;
          }
        }));
      }else{
        //Si el token ya ha expirado
        sessionStorage.removeItem(environment.TOKEN_NAME);
        this.router.navigate(['login']);
        return false;
      }
    }
  }

}
