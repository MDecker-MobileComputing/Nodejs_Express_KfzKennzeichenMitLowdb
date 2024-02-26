import { JSONFilePreset } from 'lowdb/node';

import logging from "logging";

const logger = logging.default("datenbank");

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

};
const db = await JSONFilePreset("db.json", anfangsDaten);


const anzahlDatensaetze = Object.keys( db.data ).length;
logger.info(`Datenbank geladen mit ${anzahlDatensaetze} Datensätzen.`);


function suchen(unterscheidungszeichen) {

    const uzNormalisiert = unterscheidungszeichen.toUpperCase().trim();
    const ergebnis = db.get(uzNormalisiert).value();

    logger.info(`Anfrage nach ${uzNormalisiert} ergab ${JSON.stringify(ergebnis)}`);

    return ergebnis
}


export const uzService = {
    suchen
};