import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any>(`${this.api}/sales`);
  }

  adicionar(sales: any): Observable<any> {
    return this.http.post<any>(`${this.api}/sales`, sales);
  }

  listarClientes(): Observable<any> {
    return this.http.get<any>(`${this.api}/clients`);
  }

  listarProdutos(): Observable<any>{
    return this.http.get<any>(`${this.api}/products`);
  }  
}
