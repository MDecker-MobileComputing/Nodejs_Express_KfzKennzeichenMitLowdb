import logging          from "logging";
import swaggerUi        from "swagger-ui-express";
import yaml             from "yamljs";
import openApiValidator from "express-openapi-validator";

const logger = logging.default("openapi");

/*
 * Datei mit Beschreibung der Endpunkte der REST-API im OpenAPI-Format.
 * Die Datei wird im Unterverzeichnis `public` abgelegt, damit sie über
 * den Web-Server als statische Datei ausgeliefert werden kann.
 */
const OPENAPI_DATEI = "./public/openapi.yaml";


/**
 * Swagger-UI für die openapi.yaml-Datei konfigurieren. Swagger-UI bietet eine
 * grafische Oberfläche, mit der die API dokumentiert und interaktiv ausprobiert
 * werden kann.
 *
 * @param {*} app Express.js-Objekt
 */
export function swaggerUiKonfigurieren(app) {

    try {

        const swaggerDocument = yaml.load(OPENAPI_DATEI);

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        logger.info("Swagger-UI registriert.");

    } catch (error) { // YAML-Datei nicht gefunden oder Syntax-Fehler in dieser Datei,
                      // Syntax-Fehler können auch mit https://apitools.dev/swagger-parser/online/ gefunden werden

        logger.error(`Fehler beim Laden der OpenAPI-Datei ${OPENAPI_DATEI},` +
                     "Swagger-UI steht nicht zur Verfügung.", error);
    }
}


/**
 * OpenAPI-Validator für Express.js konfigurieren.
 *
 * @param {*} app Express.js-Objekt
 */
export function openApiValidatorKonfigurieren(app) {

    try {

        app.use(openApiValidator.middleware({
            apiSpec          : OPENAPI_DATEI,
            validateRequests : true, // (default)
            validateResponses: true // false by default
        }));

        logger.info("OpenAPI-Validator registriert.");

    } catch (error) {

        logger.error("Fehler beim Laden der OpenAPI-Datei, OpenAPI-Validator steht nicht zur Verfügung.", error);
    }
}