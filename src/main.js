import express from "express";
import logging from "logging";

import {middlewareLogger}   from "./middleware.js";
import uzRoutenRegistrieren from "./unterscheidungszeichen.controller.js";


const logger = logging.default("main");
const app    = express();


// HTTP konfigurieren
app.use(middlewareLogger);
uzRoutenRegistrieren(app);


// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}\n`); }
  );