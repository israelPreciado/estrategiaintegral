import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EICommonService {
    private processEndSource = new Subject<void>();
    public processEnd$ = this.processEndSource.asObservable();   
    public fileId: number = 0; 
    public clienteId: number = 0;
    public proyectoId: number = 0;
    // filters
    public doCarrousel: boolean = false;

    constructor() {}

    carrousel() {
        this.doCarrousel = true;
        this.processEndSource.next();
    }
}