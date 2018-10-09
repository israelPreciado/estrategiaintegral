import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { Proyecto } from '../../models/proyecto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'proyectos',
    templateUrl: './proyectos.component.html',
    providers: [RequestService]
})
export class ProyectosComponent implements OnInit {
    private TAG: string = "ProyectosComponent";
    public proyectos = Array<Proyecto>();
    public isAdmin: boolean = false;
    private clienteId: number = 0;
    public proyectoId: number = 0;
    private nombreCliente: string = "Cliente";
    private eliminar = false;
    private mostrarUsuario: boolean = false;
    public spinner: boolean = false; 

    constructor(private requestService: RequestService, private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.route.snapshot.queryParams["cid"]) {
            if (parseInt(this.route.snapshot.queryParams["cid"]) > 0) {
                this.clienteId = this.route.snapshot.queryParams["cid"];
            }
        }
        if (this.route.snapshot.queryParams["nombre"]) {
            if (this.route.snapshot.queryParams["nombre"] != "") {
                this.nombreCliente = this.route.snapshot.queryParams["nombre"];
            }
        }
        if (localStorage.getItem("a")) {
            if (localStorage.getItem("a") == "1") { this.isAdmin = true; }
        }
        this.getData();
    }

    getData() {
        try {    
            this.spinner = true;        
            let data = [
                {"uid": localStorage.getItem("uid")},
                {"cid": this.clienteId}
            ];
            console.log('data', data);
            this.requestService.getRequest("listado-proyectos", data).subscribe(
                result => {
                    console.log(this.TAG, result);
                    this.proyectos = [];
                    for (let element of result) {
                        this.proyectos.push(new Proyecto(element.cliente_id, element.proyecto_id, element.nombre));
                    } 
                    this.spinner = false;           
                },
                error => {
                    console.log(this.TAG, "request-error:" + error);
                    this.spinner = false;
                }
            );
        } catch(error) {
            console.log(this.TAG, error);
        }
    }

    onPreEliminar(proyectoId: number) {
        this.proyectoId = proyectoId;
        this.eliminar = true;
        this.mostrarUsuario = true;
    }

    onCancelar() {
        this.mostrarUsuario = false;
        //this.usuarioId = 0;
    }

    onEliminar() {
        this.spinner = true;
        let data = [
            {"pid": this.proyectoId},            
            {"s": 0}
        ];
        this.requestService.getRequest("eliminar-proyecto", data).subscribe(
            result => {
                console.log(this.TAG, result);
                this.spinner = false;
                if (result.error) {
                    alert(result.error);
                } else {
                    this.mostrarUsuario = false;
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