import { RestErgebnis }                 from '../model/RestErgebnis.model.js';
import { UnterscheidungszeichenIntern } from '../model/UnterscheidungszeichenIntern.model.js';


/**
 * Middleware-Funktionen für die Suche eines Unterscheidungszeichen.
 * Der Such-String (Pfad-Parameter) wird normalisiert, d.h. in Großbuchstaben
 * umgewandelt und führende und abschließende Leerzeichen entfernt.
 */
function queryNormalisieren(req, res, next) {

    const suchString       = req.params.id;
    const suchStringNormal = suchString.toUpperCase().trim();
    req.params.id          = suchStringNormal;

    next(); // nächste Middleware-Funktion aufrufen
}


/**
 * Middleware-Funktionen für die Suche eines Unterscheidungszeichen.
 * Es wird überprüft, ob der Such-String aus 1 bis 3 Buchstaben besteht.
 */
function queryValidieren(req, res, next) {

    const regex = /^[a-zA-Z]{1,3}$/; // regulärer Ausdruck

    const suchString = req.params.id;

    if ( regex.test(suchString) === false ) {

        const ergebnisErfolglos = new RestErgebnis( false,
            `Unterscheidungszeichen \"${suchString}\" besteht nicht aus 1 bis 3 Buchstaben.`,
            new UnterscheidungszeichenIntern( "", "", "" )
            );
        res.send(ergebnisErfolglos)
           .status(400); // Bad Request

    } else {

        next(); // nächste Middleware-Funktion aufrufen
    }
}

export const uzQueryMiddlewareArray = [ queryNormalisieren, queryValidieren  ];
