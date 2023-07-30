import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private isAuthenticated = false;
  private currentUser: any;
  private users:any;

  usuariosLoggueados:string= "usuario";

  private apiUrl = 'https://api-vape-pyvfd.ondigitalocean.app/api/'; // URL de la API

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuarios`);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}usuarios/${id}`);
  }

  editarUsuario(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}usuarios/${id}`, datos);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}usuarios/${id}`);
  }
   // Método para registrar un usuario
   registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}usuarios`, user);
  }
   // Método para iniciar sesión
   login(usuario: string, contrasena: string): boolean {
    
      this.getAllUsuarios().subscribe((data: any) => {
        this.users.data = data;
      });
    
    const user = this.users.find(this.users.usuario === usuario && this.users.contrasena === contrasena);
    if (user) {
      this.isAuthenticated = true;
      this.currentUser = {
        username: usuario
        // Puedes agregar más información sobre el usuario si lo deseas
      };
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  get currentUserData(): any {
    return this.currentUser;
  }
}