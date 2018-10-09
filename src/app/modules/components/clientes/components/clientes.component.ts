import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';

@Component({
    selector: 'clientes',
    templateUrl: './clientes.component.html',
    providers: [RequestService]
})
export class ClientesComponent implements OnInit {
    private TAG: string = "ClientesComponent"
    public titulo: string;    
    public clientes = Array<Cliente>();
    public spinner: boolean = false;  

    @ViewChild('dropFile') nativeInputFile: ElementRef;

    constructor(private requestService: RequestService, private router: Router) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        try {  
            this.spinner = true;          
            this.requestService.getRequest("listado-clientes", undefined).subscribe(response => {
                console.log(this.TAG, response);
                if (response.error) {

                } else {
                    this.clientes = response;
                } 
                this.spinner = false;               
            });
        } catch(error) {
            console.log(this.TAG, error);
        }
    }
}