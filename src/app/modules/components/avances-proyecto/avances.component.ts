import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request.service';
import { FileUpload } from '../../models/file-upload';
import { Constant } from '../../../utilities/constants';
import { EICommonService } from '../../services/common.service';

@Component({
  selector: 'avances-proyecto',
  templateUrl: './avances.component.html',
  providers: [RequestService]
})
export class AvancesComponent implements OnInit {
    private TAG: string = "AvancesComponent";
    title = 'Avances del proyecto'; 
    public isAdmin = false;   
    private clienteId: number = 0;
    private proyectoId: number = 0;
    private fileId: number = 0;
    private nombreCliente: string = "Cliente";
    public nombreLogotipo: string = "";
    public ancho: any = 0;
    public selectedFiles: FileList;
    public extensionsAllowed = Array<string>();
    public imageExtension = Array<string>();
    public subscribe;    
    public folderName: string = "avances-proyectos";
    public fondoUrl: any;    
    public imageUrl: string = "";
    public imageThumbUrl: string = "";
    public editar: boolean;
    public spinner: boolean = false;        
    dataImagen:any = [];
    public fileUploads = Array<FileUpload>();
    public eliminar = false;  
    public procesando = false; 

    @ViewChild('dropFile') nativeInputFile: ElementRef;

    constructor(private requestService: RequestService, private commonService: EICommonService, private route: ActivatedRoute) {
        this.imageExtension.push('jpg');
        this.imageExtension.push('jpeg');
        this.imageExtension.push('png');
        this.extensionsAllowed.push('jpg');
        this.extensionsAllowed.push('jpeg');
        this.extensionsAllowed.push('png');

        this.extensionsAllowed.push('pdf');
        this.extensionsAllowed.push('doc');
        this.extensionsAllowed.push('docx');
        this.extensionsAllowed.push('xls');
        this.extensionsAllowed.push('xlsx');
        this.extensionsAllowed.push('ppt');
        this.extensionsAllowed.push('pptx');
        this.extensionsAllowed.push('dwg');
    }

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
        if (localStorage.getItem("a")) {
            if (localStorage.getItem("a") == "1") { this.isAdmin = true; }
        }

        this.getData();
    }
    
    getData() {
        try {
            this.spinner = true;
            let data = [
                // {"uid": 1},
                {"cid": this.clienteId},
                {"pid": this.proyectoId},
                {"types": "all"}
            ];
            this.requestService.getRequest("listado-file-uploads", data).subscribe(
                result => {
                    console.log(this.TAG, result);
                    this.fileUploads = result;  
                    this.spinner = false;   
                    this.procesando = false;                          
                },
                error => {
                    console.log(this.TAG, "request-error:" + error);
                    this.spinner = false;
                    this.procesando = false;
                }
            );
        } catch(error) {
            console.log(this.TAG, error);
        }
    }

    selectFile() {        
        this.nativeInputFile.nativeElement.click();
    }

    detectFiles(event) {                
        var reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let allow = false;
            let file: File = event.target.files[0];
            let fileExtension = "";
            let arrFileName = file.name.split(".");
            for (let i = 0; i < arrFileName.length; i++) {
                fileExtension = arrFileName[i];
            }

            for (let i = 0; i < this.extensionsAllowed.length; i++) {
                console.log('extensionAllowed', this.extensionsAllowed[i]);
                if (fileExtension == this.extensionsAllowed[i]) allow = true;
            }

            if (allow) {
                this.selectedFiles = event.target.files;                        
                reader.readAsDataURL(file);
                reader.onload = (myevent) => {
                    //console.log("myevent", myevent);                                
                    console.log("fileExtension", fileExtension);
                    console.log("file.type", file.name);
                    switch(fileExtension) {
                        case 'doc': case 'docx':
                            this.fondoUrl = "/assets/images/doc.png";
                            break;
                        case 'pdf':
                            this.fondoUrl = "/assets/images/pdf.png";
                            break;
                        case 'xls': case 'xlsx':
                            this.fondoUrl = "/assets/images/xls.png";
                            break;
                        case "ppt": case "pptx":
                            this.fondoUrl = "/assets/images/ppt.png";
                            break;
                        case "dwg":
                            this.fondoUrl = "/assets/images/dwg.png";
                            break;
                        default:
                            this.fondoUrl = reader.result;
                    }
                }
            } else {
                alert("Tipo no permitido");
            }             
        }        
    }

    drop(event) {                
        event.stopPropagation();
        event.preventDefault();
        var reader = new FileReader();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            let allow = false;
            let file: File = event.dataTransfer.files[0];
            let fileExtension = "";
            let arrFileName = file.name.split(".");
            for (let i = 0; i < arrFileName.length; i++) {
                fileExtension = arrFileName[i];
            }

            for (let i = 0; i < this.extensionsAllowed.length; i++) {
                console.log('extensionAllowed', this.extensionsAllowed[i]);
                if (fileExtension == this.extensionsAllowed[i]) allow = true;
            }

            if (allow) {
                this.selectedFiles = event.dataTransfer.files;            
                reader.readAsDataURL(file);
                reader.onload = (myevent) => {
                    //console.log("myevent", myevent);                                    
                    console.log("fileExtension", fileExtension);
                    console.log("file.type", file.name);
                    switch(fileExtension) {
                        case 'doc': case 'docx':
                            this.fondoUrl = "/assets/images/doc.png";
                            break;
                        case 'pdf':
                            this.fondoUrl = "/assets/images/pdf.png";
                            break;
                        case 'xls': case 'xlsx':
                            this.fondoUrl = "/assets/images/xls.png";
                            break;
                        case "ppt": case "pptx":
                            this.fondoUrl = "/assets/images/ppt.png";
                            break;
                        case "dwg":
                            this.fondoUrl = "/assets/images/dwg.png";
                            break;
                        default:
                            this.fondoUrl = reader.result;
                    }
                }
            } else {
                alert("Tipo no permitido");
            }           
        }
    }

    allowDrop(event) {        
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    guardar() {
        try {
            let file: File;
            let fileData = "0";

            console.log("postData - logotipos.crear-nuevo.component");            
            
            // nuevo archivo
            if (!this.selectedFiles) {
                alert("Selecciona un archivo.");
                return;
            }
            fileData = "1";
            file = this.selectedFiles.item(0);
            
            this.spinner = true;
            let form: FormData = new FormData();
            let apiKey = new Constant().API_KEY;            
            let fileExtension = "";
            let arrFileName = file.name.split(".");
            let isImage = false;
            for (let i = 0; i < arrFileName.length; i++) {
                fileExtension = arrFileName[i];
            }
            for (let i = 0; i < this.imageExtension.length; i++) {
                console.log('extensionAllowed', this.imageExtension[i]);
                if (fileExtension == this.imageExtension[i]) isImage = true;
            }
            
            console.log("extension", fileExtension);
            form.append("api_key", apiKey);
            form.append("file", file);            
            form.append("name", this.nombreLogotipo); 
            if (isImage)            {
                form.append("type", "imagen");
            } else {
                form.append("type", "otro");
            }
            form.append("folder", this.folderName);
            form.append("url", this.imageUrl);
            form.append("cid", this.clienteId.toString()); // cliente id
            form.append("pid", this.proyectoId.toString()); // proyecto id
                        
            this.requestService.uploadFile("upload", form).subscribe(response => {
                console.log("requestService", response);
                if (response.error) {
                    console.log("requestService", response.error);
                } else {
                    console.log("requestService", response);
                    if (response[0].resultado == "OK") {
                        // update interface
                        this.spinner = false;
                        this.fondoUrl = null;
                        this.selectedFiles = null;
                        this.getData();
                        //alert("archivo subido correctamente");
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

    openUrl(url: string, tipo: string, fileId: number) {
        if (tipo == "imagen") {
            console.log("fileId", fileId);
            this.commonService.fileId = fileId;
            this.commonService.clienteId = this.clienteId;
            this.commonService.proyectoId = this.proyectoId;
            this.commonService.carrousel();
        } else {
            window.open(url);
        }        
    }

    onPreEliminar() {             
        this.eliminar = true;                
    }

    onCancelar() {
        this.fileId = 0;
        this.eliminar = false;
    }

    onEliminar(fileId: number) {
        console.log("fileId", fileId)   ;
        this.fileId = fileId;
        this.spinner = true;
        this.procesando = true;

        let data = [
            {"fid": this.fileId}
        ];
        this.requestService.getRequest("eliminar-file", data).subscribe(
            result => {
                console.log(this.TAG, result);
                this.spinner = false; 
                this.eliminar = false;
                            
                if (result.error) {
                    alert(result.error);
                } else {
                    this.getData();
                }                                                       
            },
            error => {
                console.log(this.TAG, "request-error:" + error);
                this.spinner = false;
                this.eliminar = false;                
            }
        );
    }
}
