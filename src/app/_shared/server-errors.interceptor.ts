import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
// Clase que implementa otra, interceptador Http
// Esta clase debe ser registrada en app.module como provider
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }
    // Se sobreescribe el metodo intercept
    // Se evalua la peticion (request), pipe realizar una operacion reactiva. retry sirve para realizar la operacion 
    // de reintentos de peticion al servicio REST. tap en angular 5 se conocia como 'do', 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.REINTENTOS)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    // ¿La peticion http tiene algun bloque de error?, lanza la excepcion y entra al catchError
                    if (event.body && event.body.error === true && event.body.errorMessage) { 
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open(err.mensaje, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {
                    //console.log(err.message);
                    this.snackBar.open(err.message, 'ERROR 401', { duration: 5000 });
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 5000 });
                }
                // Si no hay algun error, se retorna un Observable vacio (EMPTY)
                return EMPTY;
            }));
    }
}