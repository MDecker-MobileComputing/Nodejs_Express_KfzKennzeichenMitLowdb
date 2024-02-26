/**
 * Diese Controller-Klasse enthält die REST-Endpunkte.
 */

import logging from "logging";
import {uzService} from "./unterscheidungszeichen.service.js";

export const logger = logging.default("uz-controller");

/** Anfangs-String für alle Routen, mit Versionsnummer. */
const prefixFuerRouten = "/unterscheidungszeichen/v1";


/**
 * Routen für einzelne REST-Endpunkte registrieren.
 *
 * @param {*} Express-App-Objekt
 */
export default function uzRoutenRegistrieren(app) {

    const routeSuche = `${prefixFuerRouten}/suchen/:uz`;
    app.get(routeSuche, suchen);
    logger.info(`Route registriert: GET ${routeSuche}`);
};


/**
 * REST-Endpunkt zur Abfrage von Unterscheidungszeichen.
 *
 * @param {*} req Request-Objekt, zum Auslesen von Pfad-Parameter
 * @param {*} res Response-Objekt
 * @returns
 */
async function suchen(req, res) {

    const pfadParameter = req.params.uz;
    const suchString    = pfadParameter.toUpperCase().trim();

    const result = uzService.suchen( suchString );

    if (result === null) {

        res.status(404);
        res.send("Nicht gefunden");

    } else {

        res.status(200);
        res.send(result);
    }
}
