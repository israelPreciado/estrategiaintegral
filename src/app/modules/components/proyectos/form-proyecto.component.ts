import { Component, OnInit } from "@angular/core";
import { RequestService } from "../../../services/request.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'form-proyecto',
    templateUrl: './form-proyecto.component.html',
    providers: [RequestService]
})
export class FormProyectoComponent implements OnInit {
    private TAG: string = "FormProyectoComponent";
    public title = "Nuevo proyecto";    
    public clienteId: number = 0;
    private proyectoId: number = 0;
    public nombreCliente: string = "Cliente";
    public itemNombre: string = "";  
    public spinner: boolean = false;  

    constructor(private requestService: RequestService, private router: Router, private route: ActivatedRoute) {}

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
    
        if (this.proyectoId > 0) {
            this.getData();
        }        
    }

    getData() {
        try {
            this.spinner = true;
            let data = [
                {"uid": 1},
                {"pid": this.proyectoId},
                {"cid": this.clienteId}            
            ];
            this.requestService.getRequest("listado-proyectos", data).subscribe(
            response => {
                console.log(this.TAG, response);
                if (response.error) {
                    alert(response.error);
                } else {
                    for (let element of response) {
                        this.itemNombre = element.nombre;                  
                    }
                }
                this.spinner = false;                         
            },
            error => {
                console.log(this.TAG, "request-error:" + error);
                this.spinner = false;
            });
        } catch(error) {
          console.log(this.TAG, error);
        }
    }

    doSave() {
        if (this.itemNombre == "") {
            alert("El nombre es obligatorio");
            return;
        }
        this.spinner = true;
        let data = [
            {"pid": this.proyectoId.toString()},
            {"cid": this.clienteId.toString()},
            {"nombre": this.itemNombre}            
        ];      
        
        console.log(this.TAG, data);
        this.requestService.getRequest("form-proyecto", data).subscribe(response => {
            console.log(this.TAG, response);
            if (response.error) {
                alert(response.error);
            } else {
                if (response[0].respuesta == "OK") {
                    this.router.navigate(['/inicio/proyectos'], {queryParams: {cid: this.clienteId, nombre: this.nombreCliente}});
                } else {
                    alert(response[0].respuesta);
                }
                this.spinner = false;
            }            
        }, error => {
            this.spinner = false;
        });
    }
}