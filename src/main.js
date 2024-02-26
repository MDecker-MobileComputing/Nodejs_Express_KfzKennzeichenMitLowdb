import express from "express";
import logging from "logging";

export const logger = logging.default("main");

import uzRoutenRegistrieren from "./unterscheidungszeichen.controller.js";


const app = express();

uzRoutenRegistrieren(app);

const PORT_NUMMER = 8080;

app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}\n`); }
  );