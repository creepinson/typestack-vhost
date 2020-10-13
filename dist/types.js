"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidHostError = void 0;
const routing_controllers_1 = require("routing-controllers");
class InvalidHostError extends routing_controllers_1.BadRequestError {
    constructor() {
        super("You cannot access this website from this domain.");
    }
}
exports.InvalidHostError = InvalidHostError;
