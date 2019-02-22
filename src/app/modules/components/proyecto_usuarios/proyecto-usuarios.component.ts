import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request.service';
import { ProyectoUsuario } from '../../models/proyecto-usuario';

@Component({
  selector: 'proyecto-usuarios',
  templateUrl: './proyecto-usuarios.component.html',
  providers: [RequestService]
})
export class ProyectoUsuariosCoponent implements OnInit {    
    private TAG: string = "AvancesComponent";
    title = 'Usuarios del proyecto';   
    private proyectoUsuarioId: number = 0; 
    public clienteId: number = 0;
    public proyectoId: number = 0;
    private usuarioId: number = 0;
    public nombreCliente: string = "Cliente";
    private eliminar = false;
    private mostrarUsuario: boolean = false;
    public proyectosUsuarios = Array<ProyectoUsuario>();
    public spinner: boolean = false;

    constructor(private requestService: RequestService, private route: ActivatedRoute) {}

    ngOnInit() {        
        if (this.route.snapshot.queryParams["cid"]) {
            if (parseInt(this.route.snapshot.queryParams["cid"]) > 0) {
                this.clienteId = this.route.snapshot.queryParams["cid"];
            }
        }
        if (this.route.snapshot.queryParams["pid"]) {
            if (parseInt(this.route.snapshot.queryParams["pid"]) > 0) {
                this.proyectoId = this.route.snapshot.queryParams["pid"];
            }
        }
        if (this.route.snapshot.queryParams["nombre"]) {
            if (this.route.snapshot.queryParams["nombre"] != "") {
                this.nombreCliente = this.route.snapshot.queryParams["nombre"];
            }
        }
        if (this.route.snapshot.queryParams["proyecto"]) {
            if (this.route.snapshot.queryParams["proyecto"] != "") {
                this.title = this.route.snapshot.queryParams["proyecto"];
            }
        }

        this.getData();
    }

    getData() {
        this.spinner = true;
        let data = [
          {"pid": this.proyectoId}
        ];
        this.requestService.getRequest("listado-proyectos-usuarios", data).subscribe(
            result => {
                //console.log(this.TAG, result);
                this.proyectosUsuarios = result;  
                this.spinner = false;                     
            },
            error => {
                console.log(this.TAG, "request-error:" + error);
                this.spinner = false;
            }
        );
    }

    onPreEliminar(proyectoUsuarioId: number, usuarioId: number) {
        this.proyectoUsuarioId = proyectoUsuarioId;
        this.usuarioId = usuarioId;
        this.eliminar = true;
        this.mostrarUsuario = true;
    }

    onCancelar() {
        this.mostrarUsuario = false;
        this.usuarioId = 0;
    }

    onEliminar() {
        this.spinner = true;
        let data = [
            {"pid": this.proyectoId},
            {"uid": this.usuarioId},
            {"s": 0}
        ];
        this.requestService.getRequest("proyecto-usuarios", data).subscribe(
            result => {
                console.log(this.TAG, result);
                this.spinner = false;
                if (result.error) {
                    alert(result.error);
                } else {
                    this.getData();
                }                                       
            },
            error => {
                console.log(this.TAG, "request-error:" + error);
                this.spinner = false;
            }
        );
    }
}

