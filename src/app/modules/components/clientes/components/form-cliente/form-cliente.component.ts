import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestService } from "../../../../../services/request.service";

@Component({
    selector: 'form-cliente',
    templateUrl: './form-cliente.component.html',
    styleUrls: ['./form-cliente.component.css'],
    providers: [RequestService]
})
export class FormClienteComponent implements OnInit {
    private TAG: string = "FormClienteComponent";
    public title = "Nuevo cliente";
    private clienteId: number = 0;
    public itemNombre: string = "";
    public itemApPat: string = "";
    public itemApMat: string = "";
    public itemRfc: string = "";
    public itemDireccion: string = "";
    public itemTel: string = "";
    public itemCelular: string = "";
    public itemEmail: string = "";
    public spinner: boolean = false;

    constructor(private requestService: RequestService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.route.snapshot.queryParams['cid']) {
            if (parseInt(this.route.snapshot.queryParams['cid']) > 0) {                
                this.clienteId = this.route.snapshot.queryParams['cid'];                
            }
        }  
        if (this.route.snapshot.queryParams["nombre"]) {
            if (this.route.snapshot.queryParams["nombre"] != "") {
                this.title = this.route.snapshot.queryParams["nombre"];
            }
        } 
        if (this.clienteId > 0)   {
            this.getData(); 
        }          
    }

    getData() {
        try {
            this.spinner = true;
            let data = [
                {"cid": this.clienteId.toString()}
            ];

            this.requestService.getRequest("listado-clientes", data).subscribe(response => {
                //console.log(this.TAG, response);
                this.itemNombre = response[0].nombre;
                this.itemApPat = response[0].ap_pat;
                this.itemApMat = response[0].ap_mat;
                this.itemRfc = response[0].rfc;
                this.itemDireccion = response[0].direccion;
                this.itemTel = response[0].tel;
                this.itemCelular = response[0].cel;
                this.itemEmail = response[0].email;
                this.spinner = false;
            }, error => {
                this.spinner = false;
            });
        } catch(error) {
            alert(error);
        }
    }

    doSave() {
        this.spinner = true;
        if (this.itemNombre == "") {
            alert("El nombre es obligatorio");
            return;
        }

        let data = [
            {"cid": this.clienteId.toString()},
            {"nombre": this.itemNombre},
            {"appat": this.itemApPat},
            {"apmat": this.itemApMat},
            {"rfc": this.itemRfc},
            {"dir": this.itemDireccion},
            {"tel": this.itemTel},
            {"cel": this.itemCelular},
            {"email": this.itemEmail}
        ];      
        
        //console.log(this.TAG, data);
        this.requestService.getRequest("form-cliente", data).subscribe(response => {
            //console.log(this.TAG, response);
            if (response.error) {
                alert(response.error);
            } else {
                this.spinner = false;
                if (response[0].respuesta == "OK") {
                    this.router.navigate(['/inicio/clientes']);
                } else {
                    alert(response[0].respuesta);
                }
            }            
        }, error => {
            this.spinner = false;
        });
    }
}