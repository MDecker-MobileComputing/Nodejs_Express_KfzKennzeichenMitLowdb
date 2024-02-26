/**
 * Diese Service-Klasse enthält die Business-Logik.
 */

import { JSONFilePreset } from 'lowdb/node';
import logging from "logging";

import { UnterscheidungszeichenIntern } from './UnterscheidungszeichenIntern.model.js';


const logger = logging.default("datenbank");

// Datenbank initialisieren
const anfangsDaten =  {

    "B": {
        "bedeutung": "Berlin",
        "kategorie": "B"
    },
    "BA": {
        "bedeutung": "Bamberg",
        "kategorie": "BY"
    },
    "BAD": {
        "bedeutung": "Baden-Baden",
        "kategorie": "BW"
    },
    "KA": {
        "bedeutung": "Karlsruhe",
        "kategorie": "BW"
    },
    "HD": {
        "bedeutung": "Heidelberg",
        "kategorie": "BW"
    },
    "X": {
        "bedeutung": "Nato",
        "kategorie": "MIL"
    },
    "Y": {
        "bedeutung": "Bundeswehr",
        "kategorie": "MIL"
    }
};

const dbDatei = "db.json";
const db      = await JSONFilePreset(dbDatei, anfangsDaten);

const anzahlDatensaetze = Object.keys( db.data ).length;
logger.info(`Datenbank \"${dbDatei}\" geladen mit ${anzahlDatensaetze} Datensätzen.`);


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
    const dbErgebnis     = db.data[ uzNormalisiert ];

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


/*
 * Funktionen als Attribute von Objekt `uzService` exportieren
 */
export const uzService = {
    suchen
};