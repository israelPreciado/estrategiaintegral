import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomRoutingModule } from './custom-routing.module'; // importar la configuración de rutas

//Begin Material 
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, MatDialogModule, MatExpansionModule } from "@angular/material";
//End Material

import { HomeComponent } from './components/home/components/home.component';
import { ClientesComponent } from './components/clientes/components/clientes.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PruebaModalComponent } from './components/prueba-modal/prueba-modal.component';

@NgModule({
    declarations: [
        HomeComponent,
        ClientesComponent,
        ProyectosComponent,
        PruebaModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CommonModule,
        CustomRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,        
        MatDialogModule,        
        MatExpansionModule
    ],
    /* En caso de que queramos usar los componentes fuera del modulo, no es necesario agregarlos */
    exports: [        
        HomeComponent    
    ],
    /* Cargaríamos servicios de manera global */
    providers: []
})
export class CustomModule { }