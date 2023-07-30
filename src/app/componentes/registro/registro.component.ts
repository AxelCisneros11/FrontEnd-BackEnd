import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/sevicios/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  datos={
  nombre:   '',
  apellido:   '',
  usuario:   '',
  contrasena:   '',
  };
  confirmarcontrasena: string = '';

  usuarioErrorMessage: string = '';
  passwordErrorMessage: string = '';
  confirmPasswordErrorMessage: string = '';
  nameErrorMessage: string = '';
  apellidoErrorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private usuarioService: UsuariosService) {}

  onSubmit() {
    this.usuarioService.registerUser(this.datos).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        // Puedes agregar una notificación o redirigir al usuario a otra página aquí.
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        // Puedes manejar el error aquí, mostrar un mensaje de error, etc.
      }
    );
  }

  validInputs(): boolean {
    let hasErrors = false;

    this.usuarioErrorMessage = '';
    this.passwordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
    this.nameErrorMessage = '';
    this.apellidoErrorMessage = '';

    if (this.datos.nombre === '') {
      this.nameErrorMessage = 'El nombre es requerido';
      hasErrors = true;
    }

    if (this.datos.apellido === '') {
      this.apellidoErrorMessage = 'El apellido es requerido';
      hasErrors = true;
    }

    if (this.datos.usuario === '') {
      this.usuarioErrorMessage = 'El usuario es requerido';
      hasErrors = true;
    }

    if (this.datos.contrasena === '') {
      this.passwordErrorMessage = 'La contraseña es requerida';
      hasErrors = true;
    }

    if (this.confirmarcontrasena === '') {
      this.confirmPasswordErrorMessage =
        'La confirmación de contraseña es requerida';
      hasErrors = true;
    }

    if (hasErrors) return false;

    if (this.datos.contrasena.length < 6) {
      this.passwordErrorMessage =
        'La contraseña debe tener al menos 6 caracteres';
      hasErrors = true;
    }

    if (this.datos.contrasena !== this.confirmarcontrasena) {
      this.confirmPasswordErrorMessage =
        'La confirmación de contraseña no coincide';
      hasErrors = true;
    }

    if (hasErrors) return false;

    return true;
  }
}