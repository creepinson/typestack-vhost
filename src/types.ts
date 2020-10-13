import { BadRequestError } from "routing-controllers";

export interface VirtualHostResult {
    isMatch: boolean;
    host: string;
    hostname: string;
    matches: RegExpExecArray;
}

export class InvalidHostError extends BadRequestError {
    constructor() {
        super("You cannot access this website from this domain.");
    }
}
