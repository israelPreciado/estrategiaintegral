import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomRoutingModule } from './custom-routing.module'; // importar la configuración de rutas

import { HomeComponent } from './components/home/components/home.component';
import { ClientesComponent } from './components/clientes/components/clientes.component';
import { FormClienteComponent } from './components/clientes/components/form-cliente/form-cliente.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { AvancesComponent } from './components/avances-proyecto/avances.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormProyectoComponent } from './components/proyectos/form-proyecto.component';
import { LoginComponent } from './components/login/login.component';
import { ProyectoUsuariosCoponent } from './components/proyecto_usuarios/proyecto-usuarios.component';
import { AccessGuard } from '../services/guard.service';
import { EICommonService } from './services/common.service';
import { FileUploadComponent } from './components/avances-proyecto/file-uploader/file-upload.component';
import { ListadoClientes } from './components/listado-clientes/listado-clientes.component';

@NgModule({
    declarations: [
        LoginComponent,
        HomeComponent,
        ClientesComponent,
        FormClienteComponent,
        ProyectosComponent, 
        ProyectoUsuariosCoponent,
        FormProyectoComponent,       
        AvancesComponent,
        FileUploadComponent,
        ListadoClientes,
        UsuariosComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CommonModule,
        CustomRoutingModule       
    ],
    /* En caso de que queramos usar los componentes fuera del modulo, no es necesario agregarlos */
    exports: [        
        HomeComponent,
        LoginComponent  
    ],
    /* Cargaríamos servicios de manera global */
    providers: [AccessGuard, EICommonService]
})
export class CustomModule { }