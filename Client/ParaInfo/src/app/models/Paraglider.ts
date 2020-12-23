import { Sizes } from './Sizes';


export interface Paraglider {
    id: string;
    brand: string;
    model: string;
    imgUrl: string;
    description: string;
    price:string;
    views:number;
    sizes:Array<Sizes>
}