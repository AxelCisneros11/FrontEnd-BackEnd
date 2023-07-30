import { HttpClient } from '@angular/common/http';
import { Component,OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProdcutosService } from 'src/app/sevicios/prodcutos.service';
import { ProductoFormDialogComponentComponent } from '../producto-form-dialog-component/producto-form-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


interface Product {
  id: number;
  nombre: string;
  marca: string;
  sabor: number;
  precio: string;
  existencias: string;
  desechable: boolean;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'marca',
    'sabor',
    'precio',
    'existencias',
    'desechable',
    'acciones'
  ];
  dataSource!: MatTableDataSource<Product> ;
  vapes: any[] | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private productosService: ProdcutosService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>([]);
    this.dataSource.paginator = this.paginator;
    this.getVapes();
  }


  getVapes(): void {
    this.productosService.getAllVapes().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  abrirFormularioActualizar(vape: any): void {
    const dialogRef = this.dialog.open(ProductoFormDialogComponentComponent, {
      data: vape, // Pasamos los datos del usuario al formulario emergente
    });

    dialogRef.afterClosed().subscribe(() => {
      // Realiza alguna acción después de que se cierra el formulario (opcional)
      // Por ejemplo, puedes recargar la lista de usuarios
      this.cargarVape();
    });
  }

  cargarVape(): void {
    // Llama al servicio para cargar la lista de usuarios desde tu API o donde sea que los obtengas
    this.productosService.getAllVapes().subscribe((vapes) => {
      this.vapes = vapes;
    });
  }

  eliminarvape(id: number) {
    // Muestra una confirmación antes de eliminar el usuario (opcional)
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmacion) {
      // Llama al servicio para eliminar el usuario por su ID
      this.productosService.eliminarVape(id).subscribe(
        () => {
          // Eliminación exitosa, actualiza la tabla de usuarios
          this.getVapes();
        },
        (error) => {
          // Manejo de errores en caso de que ocurra un problema durante la eliminación
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }
  openDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductoFormDialogComponentComponent, {
      width: '250px',
      data: product ? product : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.cargarVape(); // Reload the products after closing the dialog.
    });
  }

  addProduct() {
    this.openDialog();
  }
}