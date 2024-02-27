/**
 * Diese Controller-Klasse enthält die REST-Endpunkte.
 */

import logging     from "logging";
import {uzService} from "./unterscheidungszeichen.service.js";

import { UnterscheidungszeichenIntern } from './model/UnterscheidungszeichenIntern.model.js';
import { RestErgebnis }                 from './model/RestErgebnis.model.js';


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

// Leeres Unterscheidungszeichen-Objekt für Fehlerfälle
const unterscheidungszeichenLeer = new UnterscheidungszeichenIntern("", "", "");


const HTTP_STATUS_CODE_OK          = 200;
const HTTP_STATUS_CODE_NOT_FOUND   = 404;
const HTTP_STATUS_CODE_BAD_REQUEST = 400;


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

    if (suchString.length > 3) {

        const ergebnisErfolglos = new RestErgebnis( false,
                                                    `Unterscheidungszeichen \"${suchString}\" zu lang!`,
                                                    unterscheidungszeichenLeer );
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);

        return;
    }

    const result = uzService.suchen( suchString );

    if (result === null) {

        const ergebnisErfolglos = new RestErgebnis( false,
                                                    `Unterscheidungszeichen \"${suchString}\" nicht gefunden.`,
                                                    unterscheidungszeichenLeer );
        res.send(ergebnisErfolglos)
           .status(HTTP_STATUS_CODE_NOT_FOUND);

    } else {

        const ergebnisErfolg = new RestErgebnis( true,
                                                 `Unterscheidungszeichen "${pfadParameter}" konnte aufgelöst werden.`,
                                                 result );
        res.status(HTTP_STATUS_CODE_OK)
           .send(ergebnisErfolg);
    }
}
