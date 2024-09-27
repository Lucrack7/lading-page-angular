import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Welcome} from '../../app/pages/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private urlBase: string = 'https://fakestoreapi.com/products';

  getProducts():Observable<Welcome[]>{
    return this._http.get<Welcome[]>(this.urlBase);
  }

  getProduct(id: number):Observable<Welcome>{
    return this._http.get<Welcome>(`${this.urlBase}/${id}`);
  }
}
