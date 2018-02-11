import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { FileUpload } from '../../models/file-upload';

@Component({
    selector: 'proyectos',
    templateUrl: './proyectos.component.html',
    providers: [RequestService]
})
export class ProyectosComponent implements OnInit {
    private TAG: string = "ProyectosComponent";
    public fileUploads = Array<FileUpload>();

    constructor(private requestService: RequestService) {}

    ngOnInit() {
        let data = [
            {cid: 1},
            {pid: 1}
        ];
        this.requestService.getRequest("listado-file-uploads", data).subscribe(
            result => {
                console.log(this.TAG, result);
                for (let element of result) {
                    this.fileUploads.push(new FileUpload(element.file_id, element.tipo, element.nombre, element.url, element.fecha));
                }            
            },
            error => {
                console.log(this.TAG, "request-error:" + error);
            }
        );
    }
}