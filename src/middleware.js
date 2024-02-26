import logging from "logging";

const logger = logging.default("request");


/**
 * Diese Middleware-Funktion schreibt für jeden HTTP-Request eine Zeile
 * auf den Logger.
 */
export function middlewareLogger(req, res, next) {

    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};