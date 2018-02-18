import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/components/home.component';
import { ClientesComponent } from './components/clientes/components/clientes.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';

const customRoutes: Routes = [
    {
        path: 'inicio',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'clientes', pathMatch: 'full'},
            { path: 'clientes', component: ClientesComponent },
            { path: 'proyectos', component: ProyectosComponent }
        ]
    }
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