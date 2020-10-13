import { BadRequestError } from "routing-controllers";
export interface VirtualHostResult {
    isMatch: boolean;
    host: string;
    hostname: string;
    matches: RegExpExecArray;
}
export declare class InvalidHostError extends BadRequestError {
    constructor();
}
