import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/components/home.component';
import { ClientesComponent } from './components/clientes/components/clientes.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FormClienteComponent } from './components/clientes/components/form-cliente/form-cliente.component';
import { AvancesComponent } from './components/avances-proyecto/avances.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormProyectoComponent } from './components/proyectos/form-proyecto.component';
import { LoginComponent } from './components/login/login.component';
import { ProyectoUsuariosCoponent } from './components/proyecto_usuarios/proyecto-usuarios.component';
import { AccessGuard } from '../services/guard.service';

const customRoutes: Routes = [
    {
        path: 'inicio',
        component: HomeComponent,
        children: [   
            { path: '', redirectTo: 'clientes', pathMatch: 'full'},         
            { path: 'clientes', component: ClientesComponent, canActivate: [AccessGuard] },
            { path: 'form-cliente', component: FormClienteComponent, canActivate: [AccessGuard] },
            { path: 'proyectos', component: ProyectosComponent, canActivate: [AccessGuard] },  
            { path: 'proyecto-usuarios', component: ProyectoUsuariosCoponent, canActivate: [AccessGuard] },
            { path: 'form-proyecto', component: FormProyectoComponent, canActivate: [AccessGuard] },          
            { path: 'avances', component: AvancesComponent, canActivate: [AccessGuard] },
            { path: 'usuarios', component: UsuariosComponent, canActivate: [AccessGuard] }            
        ]
    },
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(customRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomRoutingModule {}