import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './componentes/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesplegableComponent } from './componentes/desplegable/desplegable.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'; // Importar el módulo MatDialogModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import the MatProgressSpinnerModule


import { AppComponent } from './app.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EditarUsuarioDialogComponent } from './componentes/editar-usuario-dialog/editar-usuario-dialog.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductoFormDialogComponentComponent } from './componentes/producto-form-dialog-component/producto-form-dialog-component.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, DesplegableComponent, UsuariosComponent, EditarUsuarioDialogComponent, RegistroComponent,LoginComponent, ProductosComponent, ProductoFormDialogComponentComponent, DashboardComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    CommonModule, 
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [UsuariosComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
