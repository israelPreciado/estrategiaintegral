export class Cliente {
    public clienteId: number;
    public nombre: string;
    
    constructor(clienteId: number, nombre: string) {
        this.clienteId = clienteId;
        this.nombre = nombre;
    }
}