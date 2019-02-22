import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EICommonService } from '../../../services/common.service';
import { RequestService } from '../../../../services/request.service';
import { FileUpload } from '../../../models/file-upload';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [RequestService]
})
export class HomeComponent implements OnInit, OnDestroy {
    private TAG: string = "HomeComponent";
    public isAdmin = false;
    private commonServiceSubscription: Subscription = null;
    public carrusel = false;
    private fileId: number = 0;
    private fileUploads = Array<FileUpload>();

    constructor(private requestService: RequestService, private commonService: EICommonService, private router: Router) {}

    ngOnInit() {
        try {
            this.commonServiceSubscription = this.commonService.processEnd$.subscribe(() => {
                if (this.commonService.doCarrousel) {
                    this.commonService.doCarrousel = false;
                    this.fileId = this.commonService.fileId;
                    this.getDataCarrusel();
                }
            });
            if (localStorage.getItem("a")) {
                if (localStorage.getItem("a") == "1") { this.isAdmin = true; }
            }
        } catch(error) {
            console.log(error);
        }
    }

    getDataCarrusel() {
        try {
            this.carrusel = true;
            let data = [
                // {"uid": 1},
                {"cid": this.commonService.clienteId},
                {"pid": this.commonService.proyectoId},
                {"type": "imagen"}
            ];
            this.requestService.getRequest("listado-file-uploads", data).subscribe(
                result => {
                    //console.log(this.TAG, result);
                    this.fileUploads = result;                                                  
                },
                error => {
                    console.log(this.TAG, "request-error:" + error);
                }
            );
        } catch(error) {
            console.log(this.TAG, error);
        }
    }

    openCarrusel() {
        this.carrusel = true;
    }

    signout() {
        localStorage.clear();
        this.router.navigate(["login"]);
    }

    ngOnDestroy() {
        this.commonServiceSubscription.unsubscribe();
    }
}