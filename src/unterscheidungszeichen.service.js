/**
 * Diese Service-Klasse enthält die Business-Logik.
 */


import logging from "logging";

import { UnterscheidungszeichenIntern } from './UnterscheidungszeichenIntern.model.js';
import { datenbank } from './datenbank.js';


const logger = logging.default("uz-service");



/**
 * Funktion mit Business-Logik zum Suchen von Unterscheidungszeichen.
 *
 * @param {*} unterscheidungszeichen, das zu suchen ist (z.B. "KA")
 *
 * @returns {UnterscheidungszeichenIntern} Ergebnis der Suche oder `null`,
 *          wenn nichts gefunden wurde.
 */
function suchen(unterscheidungszeichen) {

    const uzNormalisiert = unterscheidungszeichen.toUpperCase().trim();

    const dbErgebnis = datenbank.suche(uzNormalisiert);
    if (dbErgebnis === undefined) {

        logger.info(`Kein Unterscheidungszeichen für \"${uzNormalisiert}\" gefunden.`);
        return null;

    } else {

        const ergebnis = new UnterscheidungszeichenIntern( uzNormalisiert,
                                                           dbErgebnis.bedeutung,
                                                           dbErgebnis.kategorie );

        logger.info(`Unterscheidungszeichen \"${uzNormalisiert}\" aufgelöst: ` +
                    ergebnis.bedeutung + ` (${ergebnis.kategorie})` );

        return ergebnis;
    }
}


/**
 * Neues Unterscheidungszeichen in Datenbank anlegen.
 *
 * @param {UnterscheidungszeichenIntern} unterscheidungszeichen Infos
 */
function anlegen(unterscheidungszeichen) {


}



/*
 * Funktionen als Attribute von Objekt `uzService` exportieren
 */
export const uzService = {

    suchen,
    anlegen
};