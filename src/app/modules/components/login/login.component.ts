import { Component } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [RequestService]
})
export class LoginComponent {
  private TAG: string = "LoginComponent";
  public title = 'login';
  public inputUsuario: string = "";
  public inputPass: string = "";
  public enable: boolean = true;

  constructor(private requestService: RequestService, private router: Router) {}

  signIn() {
    if (this.inputUsuario == "") {
      alert("Ingrese su usuario");
      return;
    }
    if (this.inputPass == "") {
      alert("Ingrese su contraseña");
      return;
    }

    this.enable = false;
    let data = [
      {"user": this.inputUsuario},
      {"pass": this.inputPass}
    ];
    this.requestService.getRequest("login", data).subscribe(
        result => {
            //console.log(this.TAG, result);
            if (result.error) {
              alert(result.error);
              this.resetForm();
            } else {
              if (result[0].respuesta == "OK") {
                localStorage.setItem("uid", result[0].usuario_id);
                localStorage.setItem("a", result[0].admin);
                if (result[0].admin == 1) {
                  this.router.navigate(["/inicio/clientes"]);
                } else {
                  this.router.navigate(["/inicio/proyectos"]);
                }                
              } else {
                this.resetForm();
              }
            }            
        },
        error => {
            console.log(this.TAG, "request-error:" + error);
            this.resetForm();
        }
    );
  }

  resetForm() {
    this.inputUsuario = "";
    this.inputPass = "";
    this.enable = true;
  }
}