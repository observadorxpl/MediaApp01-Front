import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-not404',
  templateUrl: './not404.component.html',
  styleUrls: ['./not404.component.css']
})
export class Not404Component implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.cerrarSesion404();
  }

}
