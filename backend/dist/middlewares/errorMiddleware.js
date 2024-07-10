"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = `Resource Not Found!`;
    }
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
