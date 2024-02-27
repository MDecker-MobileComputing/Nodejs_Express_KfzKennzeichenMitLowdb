import express from "express";
import logging from "logging";

import {middlewareLogger}   from "./middleware/allgemein.middleware.js";
import uzRoutenRegistrieren from "./unterscheidungszeichen.controller.js";


const logger = logging.default("main");
const app    = express();


// HTTP konfigurieren
app.use( express.json() );
app.use(middlewareLogger);
uzRoutenRegistrieren(app);

logger.info("Web-Server konfiguriert.\n");


// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}\n`); }
  );