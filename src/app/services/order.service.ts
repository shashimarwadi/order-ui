import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  backend_service_host = "localhost";
  //backend_service_host = "mycoolapp-svc";

  private ORDER_CREATE_URL = "http://"+ this.backend_service_host +":8081/order";
  //private ORDER_CREATE_URL = "/order";
  
  placeOrder(orderJSON : any) {

    let options = new RequestOptions({
      headers: new Headers({
            'Content-Type': 'application/json'
          })
      });


      return this.http.post(this.ORDER_CREATE_URL, orderJSON, options)
      .pipe(
        catchError(this.handleError)
      )
    }

  // === Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


}
