import { createParamDecorator } from "routing-controllers";
import { Request, Response, NextFunction, Handler } from "express";
import { Regex } from "@throw-out-error/regbuild";
import { InvalidHostError, VirtualHostResult } from "./types";
import { hostregexp, isValidHost, vhostof } from "./util";

export const VirtualHost = (opts: {
    host: Regex;
    error?: boolean;
    route?: Handler;
}): ((object: unknown, method: string, index: number) => void) => {
    return createParamDecorator({
        required: opts && opts.error ? true : false,
        value: (action) => {
            const req: Request = action.request;
            const next = action.next as NextFunction;

            const hInfo = isValidHost(req, opts.host);
            if (opts.error && !hInfo.isMatch) throw new InvalidHostError();
            else if (!opts.error && !hInfo.isMatch) next();
            else opts.route(req, action.response, next);

            return hInfo;
        },
    });
};

export const vhost = (opts: {
    host: Regex;
    route?: Handler;
    error?: boolean;
}) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const hInfo = isValidHost(req, opts.host);
        if (opts.error && !hInfo.isMatch) throw new InvalidHostError();
        else if (!opts.error && !hInfo.isMatch) opts.route(req, res, next);
        else next();
    };
};

export * from "./types";
