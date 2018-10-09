export class FileUpload {
    public file_id: number;
    public tipo: string;
    public nombre: string;
    public url: string;
    public fecha: string;

    constructor(file_id: number, tipo: string, nombre: string, url: string, fecha: string) {
        this.file_id = file_id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.url = url;
        this.fecha = fecha;
    }
}