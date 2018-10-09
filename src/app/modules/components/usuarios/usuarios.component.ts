import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../services/request.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  providers: [RequestService]
})
export class UsuariosComponent implements OnInit {
  private TAG: string = "UsuariosComponent";
  title = 'Usuarios';
  private clienteId: number = 0;
  private proyectoId: number = 0;  
  private usuarioId: number = 0;
  private nombreCliente: string = "Cliente";
  private nombreProyecto: string = "Proyecto";
  public inputUsuario: string = "";
  public inputPass: string = "";
  public usuarios = Array<Usuario>();
  public timeLine: boolean = false;
  public disabled = false;  

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {}

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
            this.nombreProyecto = this.route.snapshot.queryParams["proyecto"];
        }
    }

    if (this.clienteId > 0 && this.proyectoId > 0) {
      this.timeLine = true;
    }

    this.getData();
  }

  getData() {
    this.disabled = true;
    let data = [
      {"uid": localStorage.getItem("uid")}
    ];
    this.requestService.getRequest("listado-usuarios", data).subscribe(
        result => {
            console.log(this.TAG, result);
            this.usuarios = result;     
            this.disabled = false;                  
        },
        error => {
            console.log(this.TAG, "request-error:" + error);
            this.disabled = false;
        }
    );
  }

  onGuardarReactivar() {
    if (this.inputUsuario == "") {
      alert("El usuario no es válido.");
      return;
    }
    if (this.inputPass == "") {
      alert("La contraseña no es válida.");
      return;
    }
    
    this.disabled = true;

    let data = [
        {"uid": this.usuarioId.toString()},
        {"u": this.inputUsuario},
        {"p": this.inputPass}        
    ];      
  
    console.log(this.TAG, data);
    this.requestService.getRequest("form-usuario", data).subscribe(response => {
        console.log(this.TAG, response);
        if (response.error) {
          alert(response.error);
        } else {
          this.disabled = false;
          if (response[0].respuesta == "OK") {
            //this.router.navigate(['/inicio/clientes']);
            alert("Cambios realizados correctamente");
            this.nuevoUsuario();
            this.getData();
          } else {
              alert(response[0].respuesta);
          }
        }                
    });
  }

  nuevoUsuario() {
    this.usuarioId = 0;
    this.inputUsuario = "";
    this.inputPass = "";  
    this.disabled = false;  
  }

  cancelarSuspender() {
    if (this.usuarioId.toString() == localStorage.getItem("a")) {
      alert("No se puede desactivar el administrador");
      return;
    }

    if (this.usuarioId == 0) {
      alert("Selecciona un usuario");
      return;
    }

    this.disabled = true;

    let data = [
      {"uid": this.usuarioId.toString()},
      {"u": this.inputUsuario},
      {"p": "x"},
      {"s": "0"}     
    ];      

    console.log(this.TAG, data);
    this.requestService.getRequest("form-usuario", data).subscribe(response => {
        console.log(this.TAG, response);
        if (response.error) {
          alert(response.error);
        } else {
          this.disabled = false;
          if (response[0].respuesta == "OK") {
            //this.router.navigate(['/inicio/clientes']);
            alert("Cambios realizados correctamente");
            this.nuevoUsuario();
            this.getData();
          } else {
              alert(response[0].respuesta);
          }
        }                
    });
  }

  onEliminar() {

  }

  onUsuario(usuario: Usuario) {
    console.log("usuario", usuario);    
    if (this.clienteId > 0 && this.proyectoId > 0) {
      if (usuario.status) {
        this.disabled = true;

        let data = [          
          {"uid": usuario.usuarioid},
          {"pid": this.proyectoId.toString()},
          {"s": 1}                     
        ];      
        
        console.log(this.TAG, data);
        this.requestService.getRequest("proyecto-usuarios", data).subscribe(response => {
            console.log(this.TAG, response);
            if (response.error) {
              alert(response.error);
            } else {
              if (response[0].respuesta == "OK") {
                this.router.navigate(["inicio/proyecto-usuarios"], {queryParams: {cid: this.clienteId, pid: this.proyectoId, nombre: this.nombreCliente, proyecto: this.nombreProyecto}});
              } else {
                  alert(response[0].respuesta);
              }
            } 
            this.disabled = false;          
        });        
      }      
    } else {
      this.usuarioId = usuario.usuarioid;
      this.inputUsuario = usuario.usuario;
      this.inputPass = "";
    }
    console.log("usuarioId", this.usuarioId);
  }

  onEdit(usuario: Usuario) {
    console.log("usuario", usuario);
    this.usuarioId = usuario.usuarioid;
    this.inputUsuario = usuario.usuario;
    this.inputPass = "";
    this.disabled = false;
    console.log("usuarioId", this.usuarioId);
  }
}
