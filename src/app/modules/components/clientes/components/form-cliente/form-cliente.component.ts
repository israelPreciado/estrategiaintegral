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
    private title = "Crear nuevo cliente";
    private clienteId: number = 0;
    private itemNombre: string = "";
    private itemApPat: string = "";
    private itemApMat: string = "";
    private itemRfc: string = "";
    private itemDireccion: string = "";
    private itemTel: string = "";
    private itemCelular: string = "";
    private itemEmail: string = "";

    constructor(private requestService: RequestService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.route.snapshot.queryParams['id']) {
            if (parseInt(this.route.snapshot.queryParams['id']) > 0) {
                this.title = "Editar";
                this.clienteId = this.route.snapshot.queryParams['id'];
            }
        }        
    }

    doSave() {
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
        
        console.log(this.TAG, data);
        this.requestService.getRequest("form-cliente", data).subscribe(response => {
            console.log(this.TAG, response);
            if (response[0].respuesta == "OK") {
                this.router.navigate(['/inicio/clientes']);
            } else {
                alert(response.error);
            }
        });
    }
}