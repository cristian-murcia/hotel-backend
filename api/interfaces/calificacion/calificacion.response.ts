import { IResponse } from "../response.interface";
import { ICalificacion } from "./calificacion.interface";

export interface CalificacionResponse extends IResponse {
    calificacion?: ICalificacion;
    calificaciones?: ICalificacion[];
}