export class FileUpload {
    public fileId: number;
    public tipo: string;
    public nombre: string;
    public url: string;
    public fecha: string;

    constructor(fielId: number, tipo: string, nombre: string, url: string, fecha: string) {
        this.fileId = fielId;
        this.tipo = tipo;
        this.nombre = nombre;
        this.url = url;
        this.fecha = fecha;
    }
}