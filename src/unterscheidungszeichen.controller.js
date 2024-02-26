/**
 * Diese Controller-Klasse enthält die REST-Endpunkte.
 */

import logging     from "logging";
import {uzService} from "./unterscheidungszeichen.service.js";

import { UnterscheidungszeichenIntern } from './UnterscheidungszeichenIntern.model.js';
import { RestErgebnis }                 from './RestErgebnis.model.js';


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
 *
 * @param {*} res Response-Objekt in das HTTP-Status-Code und Payload
 *                (Body) geschrieben werden.
 */
async function suchen(req, res) {

    const pfadParameter = req.params.uz;
    const suchString    = pfadParameter.toUpperCase().trim();

    const result = uzService.suchen( suchString );

    if (result === null) {

        const uzLeer = new UnterscheidungszeichenIntern("", "", "");

        const ergebnisErfolglos = new RestErgebnis( false,
                                                    `Unterscheidungszeichen \"${suchString}\" nicht gefunden.`,
                                                    uzLeer );
        res.send(ergebnisErfolglos);
        res.status(404);

    } else {

        const ergebnisErfolg = new RestErgebnis( true,
                                                 "Unterscheidungszeichen konnte aufgelöst werden",
                                                 result );

        res.status(200);
        res.send(ergebnisErfolg);
    }
}
