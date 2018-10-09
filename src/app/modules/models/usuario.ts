export class Usuario {
    public usuarioid: number;
    public usuario: string;
    public status: boolean;

    constructor(usuarioid: number, usuario: string, status: boolean) {
        this.usuarioid = usuarioid;
        this.usuario = usuario;
        this.status = status;
    }
}