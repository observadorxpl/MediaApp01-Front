import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';
import { Menu } from './_model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menus: Menu[];
  title = 'mediaapp-frontend';
  constructor(public loginService: LoginService, private menuService: MenuService){
  }
  ngOnInit(){
    this.menuService.menuCambio.subscribe(data =>{
      this.menus = data;
    });
  }
}
