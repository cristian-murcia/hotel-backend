import { IResponse } from "../response.interface";
import { IImage } from "./image.interface";

export interface ImageResponse extends IResponse {
    urlData: IImage[]
}