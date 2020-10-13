"use strict";
/**
 * Get hostname of request.
 *
 * @param (object} req
 * @return {string}
 * @private
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHost = exports.vhostof = exports.hostregexp = exports.hostnameof = void 0;
const ASTERISK_REGEXP = /\*/g;
const ASTERISK_REPLACE = "([^.]+)";
const END_ANCHORED_REGEXP = /(?:^|[^\\])(?:\\\\)*\$$/;
const ESCAPE_REGEXP = /([.+?^=!:${}()|[\]/\\])/g;
const ESCAPE_REPLACE = "\\$1";
function hostnameof(req) {
    var _a, _b;
    const host = (_b = (_a = req.hostname) !== null && _a !== void 0 ? _a : req.host) !== null && _b !== void 0 ? _b : req.headers.host; // http;
    if (!host)
        return;
    const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    const index = host.indexOf(":", offset);
    return index !== -1 ? host.substring(0, index) : host;
}
exports.hostnameof = hostnameof;
/**
 * Generate RegExp for given hostname value.
 *
 * @param (string|RegExp} val
 * @private
 */
function hostregexp(val) {
    let source = val instanceof RegExp
        ? val.source
        : String(val)
            .replace(ESCAPE_REGEXP, ESCAPE_REPLACE)
            .replace(ASTERISK_REGEXP, ASTERISK_REPLACE);
    // force leading anchor matching
    if (source[0] !== "^")
        source = "^" + source;
    // force trailing anchor matching
    if (!END_ANCHORED_REGEXP.test(source))
        source += "$";
    return new RegExp(source, "i");
}
exports.hostregexp = hostregexp;
/**
 * Get the vhost data of the request for RegExp
 *
 * @param (object} req
 * @param (RegExp} regexp
 * @return {object}
 * @private
 */
function vhostof(req, regexp) {
    const host = req.headers.host;
    const hostname = hostnameof(req);
    if (!host || !hostname)
        return;
    const match = regexp.exec(hostname);
    return {
        isMatch: match && match.length > 1,
        host,
        hostname,
        matches: match,
    };
}
exports.vhostof = vhostof;
exports.isValidHost = (req, h) => {
    const regexp = hostregexp(h);
    return vhostof(req, regexp);
};
