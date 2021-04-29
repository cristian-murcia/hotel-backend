import { IResponse } from "../response.interface";
import { IHotel } from "./hotel.interface";

export interface HotelResponse extends IResponse {
    hotel?: IHotel;
    hotels?: IHotel[];
}