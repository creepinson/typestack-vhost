"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vhost = exports.VirtualHost = void 0;
const routing_controllers_1 = require("routing-controllers");
const types_1 = require("./types");
const util_1 = require("./util");
exports.VirtualHost = (opts) => {
    return routing_controllers_1.createParamDecorator({
        required: opts && opts.error ? true : false,
        value: (action) => {
            const req = action.request;
            const next = action.next;
            const hInfo = util_1.isValidHost(req, opts.host);
            if (opts.error && !hInfo.isMatch)
                throw new types_1.InvalidHostError();
            else if (!opts.error && !hInfo.isMatch)
                next();
            else
                opts.route(req, action.response, next);
            return hInfo;
        },
    });
};
exports.vhost = (opts) => {
    return (req, res, next) => {
        const hInfo = util_1.isValidHost(req, opts.host);
        if (opts.error && !hInfo.isMatch)
            throw new types_1.InvalidHostError();
        else if (!opts.error && !hInfo.isMatch)
            opts.route(req, res, next);
        else
            next();
    };
};
__exportStar(require("./types"), exports);
