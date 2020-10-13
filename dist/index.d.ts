import { Request, Response, NextFunction, Handler } from "express";
import { Regex } from "@throw-out-error/regbuild";
export declare const VirtualHost: (opts: {
    host: Regex;
    error?: boolean;
    route?: Handler;
}) => (object: unknown, method: string, index: number) => void;
export declare const vhost: (opts: {
    host: Regex;
    route?: Handler;
    error?: boolean;
}) => (req: Request, res: Response, next: NextFunction) => void;
export * from "./types";
