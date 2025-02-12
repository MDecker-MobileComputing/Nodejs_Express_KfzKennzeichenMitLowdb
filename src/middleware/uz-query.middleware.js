import { RestErgebnis }                 from '../model/RestErgebnis.model.js';
import { UnterscheidungszeichenIntern } from '../model/UnterscheidungszeichenIntern.model.js';

import { HTTP_STATUS_CODE_400_BAD_REQUEST, UZ_REGEXP } from '../konstanten.js';


/**
 * Middleware-Funktionen für die Suche eines Unterscheidungszeichen.
 * Der Such-String (Pfad-Parameter) wird normalisiert, d.h. in Großbuchstaben
 * umgewandelt und führende und abschließende Leerzeichen entfernt.
 */
function queryNormalisieren( req, res, next ) {

    const suchString       = req.params.id;
    const suchStringNormal = suchString.toUpperCase().trim();
    req.params.id          = suchStringNormal;

    next(); // nächste Middleware-Funktion aufrufen
}


/**
 * Middleware-Funktionen für die Suche eines Unterscheidungszeichen.
 * Es wird überprüft, ob der Such-String aus 1 bis 3 Buchstaben besteht.
 */
function queryValidieren( req, res, next ) {

    const suchString = req.params.id;

    if ( UZ_REGEXP.test(suchString) === false ) {

        const ergebnisErfolglos = new RestErgebnis( false,
                `Unterscheidungszeichen \"${suchString}\" besteht nicht aus 1 bis 3 Buchstaben.`,
                new UnterscheidungszeichenIntern( "", "", "" )
            );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );

    } else {

        next(); // nächste Middleware-Funktion aufrufen
    }
}

// benannte Exports
export const uzQueryMiddlewareArray = [ queryNormalisieren, queryValidieren ];
