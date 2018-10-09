export class Proyecto {
    public clienteId: number;
    public proyectoId: number;
    public nombre: string;

    constructor(clienteId: number, proyectoId: number, nombre: string) {
        this.clienteId = clienteId;
        this.proyectoId = proyectoId;
        this.nombre = nombre;
    }
}