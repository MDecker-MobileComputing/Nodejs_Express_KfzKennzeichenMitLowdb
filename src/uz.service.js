/**
 * Diese Service-Klasse enthält die Business-Logik.
 */


import logging from "logging";

import { UnterscheidungszeichenIntern } from './model/UnterscheidungszeichenIntern.model.js';
import { datenbank }                    from './datenbank.js';


const logger = logging.default( "uz-service" );


/**
 * Funktion mit Business-Logik zum Suchen von Unterscheidungszeichen.
 *
 * @param {*} unterscheidungszeichen, das zu suchen ist (z.B. "KA");
 *            muss schon normalisiert sein.
 *
 * @returns {UnterscheidungszeichenIntern} Ergebnis der Suche oder `null`,
 *          wenn nichts gefunden wurde.
 */
function suchen( unterscheidungszeichen ) {

    const dbErgebnis = datenbank.suche( unterscheidungszeichen );
    if ( dbErgebnis === undefined ) {

        logger.info( `Kein Unterscheidungszeichen für \"${unterscheidungszeichen}\" gefunden.` );
        return null;

    } else {

        const ergebnis = new UnterscheidungszeichenIntern( unterscheidungszeichen,
                                                           dbErgebnis.bedeutung,
                                                           dbErgebnis.kategorie );

        logger.info( `Unterscheidungszeichen \"${unterscheidungszeichen}\" aufgelöst: ` +
                    ergebnis.bedeutung + ` (${ergebnis.kategorie})` );

        return ergebnis;
    }
}


/**
 * Neues Unterscheidungszeichen in Datenbank anlegen.
 *
 * @param {UnterscheidungszeichenIntern} uz Interne Repräsentation des neuen
 *                                          Unterscheidungszeichens. Attribute
 *                                          müssen schon normalisiert sein.
 *
 * @return {boolean} `true`, wenn das Unterscheidungszeichen neu angelegt wurde,
 *                    sonst `false` (es war dann schon vorhanden)
 */
async function anlegen( uz ) {

    const dbErgebnis = datenbank.suche( uz.unterscheidungszeichen );

    if ( dbErgebnis === undefined ) {

        logger.info( `Unterscheidungszeichen \"${uz.unterscheidungszeichen}\" ist noch nicht vorhanden, ` +
                    "versuche es anzulegen." );

        await datenbank.neuOderAendern( uz.unterscheidungszeichen,
                                        uz.bedeutung,
                                        uz.kategorie );

        logger.info( `Unterscheidungszeichen \"${uz.unterscheidungszeichen}\" erfolgreich angelegt.` );

        return true;

    } else {

        logger.warn( `Unterscheidungszeichen \"${uz.unterscheidungszeichen}\" ist schon vorhanden, ` +
                     "es kann nicht neu angelegt werden." )
        return false;
    }
}


/*
 * Funktionen als Attribute von Objekt `uzService` exportieren
 */
export const uzService = { suchen, anlegen };
