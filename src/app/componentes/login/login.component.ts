import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from './../../sevicios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  contrasena: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  passwordErrorMessage: string = '';
  emailErrorMessage: string = '';
  contrasena: string = '';
  usuario: string = '';
  
  constructor(private usuariosService: UsuariosService,private http: HttpClient, private router: Router){}
  
  onSubmit() {
    if (this.validInputs()) {
      this.router.navigate(['/dashboard']);
      this.usuariosService.usuariosLoggueados=this.usuario;
      this.http
        .post('https://api-vape-pyvfd.ondigitalocean.app/api/usuarios', {
          usuario: this.usuario,
          contrasena: this.contrasena,
        })
        .subscribe(
          (response: any) => {
            if (response?.status === 1) {
              localStorage.setItem('user', response.user.name);
              localStorage.setItem('user_id', response.user.id);
              this.router.navigate(['/dashboard']);
            } else {
              alert('Usuario no encontrado');
            }
          },
          (error) => {
            console.error(error);
            // Handle the HTTP request error here
          }
        );
    }
  }

  validInputs() {
    let hasErrors = false;
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    if (this.usuario === '') {
      this.emailErrorMessage = 'El usuario es requerido';
      hasErrors = true;
    }

    if (this.contrasena === '') {
      this.passwordErrorMessage = 'La contraseña es requerida';
      hasErrors = true;
    }

    if (hasErrors) return false;

    //Check if email is valid
   

    //Password length must be greater than 6
    if (this.contrasena.length < 6) {
      this.passwordErrorMessage =
        'La contraseña debe tener al menos 6 caracteres';
      hasErrors = true;
    }

    if (hasErrors) return false;

    return true;
  }
}
