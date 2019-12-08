import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  email: string;
  mensaje: string;
  error: string;
  porcentaje: number = 0;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  enviar(){
    this.porcentaje = 70;
    this.loginService.enviarCorreo(this.email).subscribe(data =>{
      console.log(data);
      if(data === 1){
        this.mensaje = "Se enviaron las indicaciones al correo";
        console.log("se enviaron");
        this.error = null;
        this.porcentaje = 100;
      }else{
        this.error = "El usuario ingresado no existe";
        this.porcentaje = 0;
      }
    });
  }
}
