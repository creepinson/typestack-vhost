/**
 * Get hostname of request.
 *
 * @param (object} req
 * @return {string}
 * @private
 */

import { Regex } from "@throw-out-error/regbuild";
import { Request, Response, NextFunction } from "express";
import { InvalidHostError, VirtualHostResult } from "./types";

const ASTERISK_REGEXP = /\*/g;
const ASTERISK_REPLACE = "([^.]+)";
const END_ANCHORED_REGEXP = /(?:^|[^\\])(?:\\\\)*\$$/;
const ESCAPE_REGEXP = /([.+?^=!:${}()|[\]/\\])/g;
const ESCAPE_REPLACE = "\\$1";

export function hostnameof(req: Request): string | undefined {
    const host =
        req.hostname ?? // express v4
        req.host ?? // express v3
        req.headers.host; // http;

    if (!host) return;

    const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    const index = host.indexOf(":", offset);

    return index !== -1 ? host.substring(0, index) : host;
}

/**
 * Generate RegExp for given hostname value.
 *
 * @param (string|RegExp} val
 * @private
 */

export function hostregexp(val: Regex) {
    let source =
        val instanceof RegExp
            ? val.source
            : String(val)
                  .replace(ESCAPE_REGEXP, ESCAPE_REPLACE)
                  .replace(ASTERISK_REGEXP, ASTERISK_REPLACE);

    // force leading anchor matching
    if (source[0] !== "^") source = "^" + source;

    // force trailing anchor matching
    if (!END_ANCHORED_REGEXP.test(source)) source += "$";

    return new RegExp(source, "i");
}

/**
 * Get the vhost data of the request for RegExp
 *
 * @param (object} req
 * @param (RegExp} regexp
 * @return {object}
 * @private
 */

export function vhostof(
    req: Request,
    regexp: RegExp,
): VirtualHostResult | undefined {
    const host = req.headers.host;
    const hostname = hostnameof(req);

    if (!host || !hostname) return;

    const match = regexp.exec(hostname);

    return {
        isMatch: match && match.length > 1,
        host,
        hostname,
        matches: match,
    };
}
export const isValidHost = (req: Request, h: Regex): VirtualHostResult => {
    const regexp = hostregexp(h);
    return vhostof(req, regexp);
};
