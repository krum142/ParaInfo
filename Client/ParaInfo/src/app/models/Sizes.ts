import { Areas } from './Areas';

export interface Sizes {
    [x: string]: any;
    id: string;
    wingSize:string;
    flat:Areas;
    proj:Areas;
    flattening:string;
    upperSurface:string;
    underSurface:string;
    numberCells:string;
    weight:string;
    risers:string;
    nakedPilot:string;
    inflightWeight:string;
    wingLoading:string;
    minSpeed:string;
    trimSpeed:string;
    maxSpeed:string;
    minSinkRate:string;
    certification:string
}