import logging   from "logging";
import swaggerUi from 'swagger-ui-express';
import yaml      from 'yamljs';

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
export function swaggerUiKonfigurieren( app ) {

    try {

        const swaggerDocument = yaml.load( OPENAPI_DATEI );

        app.use( "/api-docs", 
                 swaggerUi.serve, 
                 swaggerUi.setup( swaggerDocument ) 
              );

        logger.info( "Swagger-UI registriert." );

    } catch ( fehler ) { // YAML-Datei nicht gefunden oder Syntax-Fehler in dieser Datei,
                      // Syntax-Fehler können auch mit https://apitools.dev/swagger-parser/online/ gefunden werden

        logger.error( `Fehler beim Laden der OpenAPI-Datei ${OPENAPI_DATEI},` +
                      "Swagger-UI steht nicht zur Verfügung.", fehler );
    }
}