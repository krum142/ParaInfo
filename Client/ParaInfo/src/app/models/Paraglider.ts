import { Sizes } from './Sizes';


export interface Paraglider {
    id: string;
    brand: string;
    model: string;
    imageUrl: string;
    description: string;
    views:number;
    sizes:Array<Sizes>
}