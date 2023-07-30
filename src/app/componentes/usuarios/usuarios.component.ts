import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from './../../sevicios/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioDialogComponent } from '../editar-usuario-dialog/editar-usuario-dialog.component';


interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  contrasena: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'usuario', 'contrasena','acciones'];
  usuarios: any[] | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private usuariosService: UsuariosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>([]);
    this.dataSource.paginator = this.paginator;
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuariosService.getAllUsuarios().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }


  abrirFormularioActualizar(usuario: any): void {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      data: usuario, // Pasamos los datos del usuario al formulario emergente
    });

    dialogRef.afterClosed().subscribe(() => {
      // Realiza alguna acción después de que se cierra el formulario (opcional)
      // Por ejemplo, puedes recargar la lista de usuarios
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(): void {
    // Llama al servicio para cargar la lista de usuarios desde tu API o donde sea que los obtengas
    this.usuariosService.getAllUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  eliminarUsuario(id: number) {
    // Muestra una confirmación antes de eliminar el usuario (opcional)
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmacion) {
      // Llama al servicio para eliminar el usuario por su ID
      this.usuariosService.eliminarUsuario(id).subscribe(
        () => {
          // Eliminación exitosa, actualiza la tabla de usuarios
          this.getUsuarios();
        },
        (error) => {
          // Manejo de errores en caso de que ocurra un problema durante la eliminación
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }
}