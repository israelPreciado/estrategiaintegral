import { Component, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { MatDialog } from '@angular/material';
import { PruebaModalComponent } from '../../prueba-modal/prueba-modal.component';

@Component({
    selector: 'clientes',
    templateUrl: './clientes.component.html',
    providers: [RequestService]
})
export class ClientesComponent {
    private TAG: string = "ClientesComponent"
    public titulo: string;
    public nombreLogotipo: string = "";
    public ancho: any = 0;
    public selectedFiles: FileList;
    public subscribe;
    public object: Number;
    public folderName: string = "avances-proyectos";
    public fondoUrl: any;    
    public imageUrl: string = "";
    public imageThumbUrl: string = "";
    public editar: boolean;
    public spinner: boolean = false;    
    public spinnerColor: string = "#3498db";
    dataImagen:any = [];

    @ViewChild('dropFile') nativeInputFile: ElementRef;

    constructor(private requestService: RequestService, private dialog: MatDialog) {}

    selectFile(obj) {
        this.object = obj;
        this.nativeInputFile.nativeElement.click();
    }

    detectFiles(event, obj) {
        if (obj) {
            this.object = obj;
        }
        this.selectedFiles = event.target.files;
        //console.log("selectedFiles", this.selectedFiles);
        var reader = new FileReader();
        reader.onload = (myevent) => {
            console.log("myevent", myevent);
            console.log("aqui", reader.result);
            switch (this.object) {
                case 1:
                    this.fondoUrl = reader.result;
                    break;
                case 2:
                    this.fondoUrl = reader.result;
                    break;
            }
        }
        reader.readAsDataURL(event.target.files[0]);
        //console.log("event.target.files[0]", event.target.files[0]);
    }

    drop(event, obj) {
        if (obj) {
            this.object = obj;
        }
        this.selectedFiles = event.dataTransfer.files;
        event.stopPropagation();
        event.preventDefault();
        var reader = new FileReader();
        reader.onload = (myevent) => {
            console.log("aqui", reader.result);
            switch (this.object) {
                case 1:
                    this.fondoUrl = reader.result;
                    break;
                case 2:
                    this.fondoUrl = reader.result;
                    break;
            }
        }
        reader.readAsDataURL(event.dataTransfer.files[0])
    }

    allowDrop(event, obj) {
        this.object = obj;
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    cerrarVentana() {
        //this.dialogRef.close("");
    }

    openPruebaModal() {
        let dialogRef = this.dialog.open(PruebaModalComponent, {disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            console.log(this.TAG, "ventana prueba modal cerrada");
        });
    }

    guardar() {
        try {
            let file: File;
            let fileData = "0";

            console.log("postData - logotipos.crear-nuevo.component");            
            
            // nuevo archivo
            if (!this.selectedFiles) {
                alert("Selecciona una imagen.");
                return;
            }
            fileData = "1";
            file = this.selectedFiles.item(0);
            
            this.spinner = true;
            let form: FormData = new FormData();
                        
            form.append("file", file);            
            form.append("name", this.nombreLogotipo);            
            form.append("folder", this.folderName);
            form.append("url", this.imageUrl);
            form.append("cid", "1"); // cliente id
            form.append("pid", "1"); // proyecto id
            
            this.requestService.uploadFile("upload", form).subscribe(response => {
                console.log("requestService", response);
                if (response.error) {
                    console.log("requestService", response.error);
                } else {
                    console.log("requestService", response);
                    if (response[0].resultado == "OK") {
                        // update interface
                        this.spinner = false;
                        alert("archivo subido correctamente");
                        //this.dialogRef.close("UPDATE_INTERFACE");
                    } else {
                        alert(response[0].resultado);
                        //this.dialogRef.close("");
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}