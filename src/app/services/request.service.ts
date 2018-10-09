import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../utilities/constants';
import { Router } from "@angular/router";

@Injectable()
export class RequestService {
    public url: string;
    public uploadUrl: string;
    private apiKey: string;

    constructor(private http: Http, private router: Router) {        
        this.url = new Constant().WS_URL;  
        this.uploadUrl = new Constant().WS_URL;  
        this.apiKey = new Constant().API_KEY;     
    }    

    getRequest(apiName: string, params?: any) {                
        let parameters: string = "";
        if (params) {
            let queryString = "";
            for (let param of params) {             
                queryString += "&" + JSON.stringify(param).replace("{","").replace("}","").replace(/"/g,'').split(":")[0];
                queryString += "=";
                queryString += JSON.stringify(param).replace("{","").replace("}","").replace(/"/g,'').split(":")[1];
            }
            if (queryString != "") {
                queryString.substring(1);
                parameters += "?api_key=" + this.apiKey + queryString;
            } 
        } else {
            parameters += "?api_key=" + this.apiKey;
        }
        console.log("url", this.url + apiName + parameters);

        return this.http.get(this.url + apiName + parameters).map(res => res.json());
    }

    postRequest(apiName:string, dataJSON){               
        let headers = new Headers();  
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');
        let options = new RequestOptions({ headers: headers});  
        console.log(this.url + apiName);
        console.log("service.postRequest", JSON.stringify(dataJSON));
        return this.http.post(this.url + apiName, JSON.stringify(dataJSON), options).map(res => res.json());
    }

    uploadFile(apiName: string, formData: FormData) {              
        return this.http.post(this.uploadUrl + apiName, formData).map(data => data.json());
    }
}