import { IResponse } from "../response.interface";
import { IUsuario } from "./usuario.interface";

export interface UsuarioResponse extends IResponse {
    usuario?: IUsuario;
    usuarios?: IUsuario[];
}