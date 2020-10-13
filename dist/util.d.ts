/**
 * Get hostname of request.
 *
 * @param (object} req
 * @return {string}
 * @private
 */
import { Regex } from "@throw-out-error/regbuild";
import { Request } from "express";
import { VirtualHostResult } from "./types";
export declare function hostnameof(req: Request): string | undefined;
/**
 * Generate RegExp for given hostname value.
 *
 * @param (string|RegExp} val
 * @private
 */
export declare function hostregexp(val: Regex): RegExp;
/**
 * Get the vhost data of the request for RegExp
 *
 * @param (object} req
 * @param (RegExp} regexp
 * @return {object}
 * @private
 */
export declare function vhostof(req: Request, regexp: RegExp): VirtualHostResult | undefined;
export declare const isValidHost: (req: Request, h: Regex) => VirtualHostResult;
