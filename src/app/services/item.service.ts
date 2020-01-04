import {Injectable} from '@angular/core';
//import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  backend_service_host = "localhost";
//  private ADD_ITEM_URL = "/item/additem";
  private ADD_ITEM_URL = "http://"+ this.backend_service_host +":8081/item/additem";  
//  private GET_ITEM_URL = "/item/getItem?itemID=";
  private GET_ITEM_URL = "http://"+ this.backend_service_host +":8081/item/getItem?itemID=";
  private GET_ALL_ITEM_WITHOUT_IMAGE_URL = "http://"+ this.backend_service_host +":8081/item/allWithoutImage";


  constructor(private http: HttpClient) { }

  // === Get given items from database
  getItems(itemID: any) {
    return this.http.get(this.GET_ITEM_URL+itemID, {}) 
    .pipe (
      catchError(this.handleError)
    );
  }

  // === Get all items from database
  getItemsWithoutImage() {
    return this.http.get(this.GET_ALL_ITEM_WITHOUT_IMAGE_URL, {}) 
    .pipe (
      catchError(this.handleError)
    );
  }


  // === Add item into database
  addItem(itemData: any, imageName: any) {

    const itemDataFD = new FormData();
    if(imageName) {
      itemDataFD.append('imageFile', imageName, imageName.name)
    }
    else {
      itemDataFD.append('imageFile', new Blob(), "no-name")
    }
    itemDataFD.append('itemData', itemData)

    return this.http.post(this.ADD_ITEM_URL, itemDataFD)
      .pipe(
        // retry(1),
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
