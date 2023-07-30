import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { UsuariosService } from './../../sevicios/usuarios.service';
@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.css']
})
export class EditarUsuarioDialogComponent {
  
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
      private usuarioService: UsuariosService
    ) {}

    onGuardarClick(): void {
      // Aquí implementa la lógica para enviar la solicitud de actualización
      this.usuarioService.editarUsuario(this.data.id, this.data).subscribe(() => {
        // Puedes mostrar un mensaje de éxito o realizar alguna otra acción luego de la actualización
        this.dialogRef.close();
      });
    }
  
    onCancelarClick(): void {
      this.dialogRef.close();
    }
}
