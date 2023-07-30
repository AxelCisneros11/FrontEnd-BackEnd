import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  nombre: string;
  marca: string;
  sabor: number;
  precio: string;
  existencias: string;
  desechable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProdcutosService {


  private apiUrl = 'https://api-vape-pyvfd.ondigitalocean.app/api/'; // URL de la API

  constructor(private http: HttpClient) { }

  getAllVapes(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}vapes`);
  }

  obtenerVape(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}vapes/${id}`);
  }

  editarVape(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}vapes/${id}`, datos);
  }

  eliminarVape(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}vapes/${id}`);
  }
   // Método para registrar un Vape
   registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}vapes`, user);
  }
}
