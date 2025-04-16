import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URLbase = 'http://localhost:4000/api/productos/';
  constructor(private _htpp: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this._htpp.get<Producto[]>(this.URLbase);
  }

  getProducto(id: string): Observable<Producto> {
    return this._htpp.get<Producto>(`${this.URLbase}${id}`);
  }

  deleteProdcuto(id: string | undefined): Observable<Producto> {
    return this._htpp.delete<Producto>(`${this.URLbase}${id}`)
  }

  postProducto(produ: Producto): Observable<Producto> {
    return this._htpp.post<Producto>(this.URLbase, produ);
  }

  editarProducto(id: string, producto: Producto): Observable<Producto> {
    return this._htpp.put<Producto>(`${this.URLbase}${id}`, producto);
  }
}
