import express from "express";
import logging from "logging";

import { middlewareLogger }              from "./middleware/allgemein.middleware.js";
import { mwCatchIllegalJson }            from "./middleware/allgemein.middleware.js";
import { swaggerUiKonfigurieren }        from "./openapi.js";
import { openApiValidatorKonfigurieren } from "./openapi.js";
import uzRoutenRegistrieren              from "./uz.controller.js";
// uzRoutenRegistrieren muss nicht in Schweifenklammern gesetzt werden, weil es sich
// um einen Default-Export handelt; die anderen Imports beziehen sich auf benannte Exports,
// deshalb müssen sie in geschweifte Klammern gesetzt werden.


const logger = logging.default( "main" );
const app    = express();


// Express.js konfigurieren
app.use( express.json()           );
app.use( express.static( "public" ) );

app.use( middlewareLogger   );
app.use( mwCatchIllegalJson );

if ( process.env.NODE_ENV === "production" ) {

    logger.info( "Produktivbetrieb, OpenAPI-Validator und Swagger-UI sind deshalb deaktiviert." );

} else {

    logger.info( "Entwicklungs- oder Testbetrieb, OpenAPI-Validator und Swagger-UI werden deshalb aktiviert." );
    swaggerUiKonfigurieren( app ); // muss vor openApiValidatorKonfigurieren aufgerufen werden
    openApiValidatorKonfigurieren( app );
}

uzRoutenRegistrieren( app );


logger.info( "Express.js (Web-Server) konfiguriert.\n" );


// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
            () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`); }
          );
