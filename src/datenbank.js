/*
 * Nur in dieser Klasse darf auf die Datenbank zugegriffen werden.
 */

import { JSONFilePreset } from 'lowdb/node';
import logging from "logging";


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

const dbDateiName = "db.json"; // diese Datei in .gitignore aufnehmen
const db          = await JSONFilePreset( dbDateiName, anfangsDaten );

const anzahlDatensaetze = Object.keys( db.data ).length;
logger.info(`Datenbank \"${dbDateiName}\" geladen mit ${anzahlDatensaetze} Datensätzen.`);

await db.write();


/**
 * Auf Datenbank nach Unterscheidungszeichen suchen.
 *
 * @param {string} suchString Such-String für Unterscheidungszeichen (z.B. "KA"), muss
 *                            schon auf Großbuchstaben normalisiert und getrimmt sein
 *
 * @returns {object} Ergebnis der Suche oder `undefined`, wenn nichts gefunden wurde;
 *                   Im Erfolgsfall ein Objekt mit Attributen `bedeutung` und `kategorie`
 *                   zurückgegeben.
 */
function suche(suchString) {

    return db.data[ suchString ];
}


/*
 * Funktionen als Attribute von Objekt `datenbank` exportieren
 */
export const datenbank = {

    suche
};