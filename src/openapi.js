import logging   from "logging";
import swaggerUi from 'swagger-ui-express';
import yaml      from 'yamljs';

const logger = logging.default("openapi");

const OPENAPI_DATEI = "./openapi.yaml";


/**
 * Swagger-UI für die openapi.yaml-Datei konfigurieren.
 *
 * @param {*} app Express.js-Objekt
 */
export function swaggerUiKonfigurieren(app) {

    try {

        const swaggerDocument = yaml.load(OPENAPI_DATEI);

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        logger.info("Swagger-UI registriert");

    } catch (error) { // YAML-Datei nicht gefunden oder Syntax-Fehler in dieser Datei

        logger.error(`Fehler beim Laden der OpenAPI-Datei ${OPENAPI_DATEI}, Swagger-UI steht nicht zur Verfügung.`, error);
        // Syntax-Fehler können auch mit https://apitools.dev/swagger-parser/online/ gefunden werden
    }
}