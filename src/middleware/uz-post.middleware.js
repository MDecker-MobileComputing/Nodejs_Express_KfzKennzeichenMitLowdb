
import { RestErgebnis }                     from '../model/RestErgebnis.model.js';
import { UnterscheidungszeichenIntern }     from '../model/UnterscheidungszeichenIntern.model.js';

import { HTTP_STATUS_CODE_400_BAD_REQUEST, UZ_REGEXP } from '../konstanten.js';


// Leeres Unterscheidungszeichen-Objekt für Fehlerfälle
const uzInternLeer = new UnterscheidungszeichenIntern( "", "", "" );


/**
 * Middelware-Funktion, um die Datentypen der Pflichtattribute im JSON-Body zu prüfen.
 * Da ein nicht vorhandenes Attribut `undefined` ist, wird hiermit auch geprüft, ob
 * die Pflichtattribute im JSON-Body vorhanden sind.
 */
function postDatentypenPruefen( req, res, next ) {

    let ergebnisErfolglos = null;

    if ( typeof req.body.unterscheidungszeichen !== "string" ) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Pflichtattribut 'unterscheidungszeichen' fehlt oder ist nicht vom Typ 'string'.",
                                              uzInternLeer );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );
        return;
    }

    if ( typeof req.body.bedeutung !== "string" ) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Pflichtattribut 'bedeutung' fehlt oder ist nicht vom Typ 'string'.",
                                              uzInternLeer );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );
        return;
    }

    if ( typeof req.body.kategorie !== "string" ) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Pflichtattribut 'kategorie' fehlt oder ist nicht vom Typ 'string'.",
                                              uzInternLeer );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );
        return;
    }

    next();
}


/**
 * Middleware-Funktion für die Route zum Anlegen eines neuen Unterscheidungszeichens.
 * Die Pflichtattribute aus dem JSON-Body werden (soweit vorhanden) normalisiert.
 */
function postNormalisieren( req, res, next ) {

    if ( req.body.unterscheidungszeichen ) {

        req.body.unterscheidungszeichen = req.body.unterscheidungszeichen.trim().toUpperCase();
    }

    if ( req.body.bedeutung ) {

        req.body.bedeutung = req.body.bedeutung.trim();
    }

    if ( req.body.kategorie ) {

        req.body.kategorie = req.body.kategorie.trim().toUpperCase();
    }

    next(); // nächste Middleware-Funktion aufrufen
}


/**
 * Middleware-Funktion überprüft, ob die im JSON-Body enthaltenen Attribute gültige
 * Werte haben.
 */
function postValidieren( req, res, next ) {

    let ergebnisErfolglos = null;

    const uz = req.body.unterscheidungszeichen;
    if ( UZ_REGEXP.test( uz ) === false ) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'uz' muss aus 1 bis 3 Buchstaben bestehen",
                                              uzInternLeer );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );
        return;
    }

    const bedeutung = req.body.bedeutung;
    if ( bedeutung.length < 3 ) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'bedeutung' muss mindestens 3 Zeichen lang sein.",
                                              uzInternLeer );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );
        return;
    }

    const KAT_REGEXP = /^[a-zA-Z]{2,3}$/;
    const kategorie = req.body.kategorie;
    if ( KAT_REGEXP.test(kategorie) === false ) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'kategorie' muss aus 2 oder 3 Buchstaben bestehen",
                                              uzInternLeer );
        res.status( HTTP_STATUS_CODE_400_BAD_REQUEST )
           .send( ergebnisErfolglos );
        return;
    }

    next(); // nächste Middleware-Funktion aufrufen
}


/**
 * Reihenfolge der Middleware-Funktionen ist relevant. So geht z.B. `postNormalisieren`
 * davon aus, dass die im JSON-Body enthaltenen Attribute den richtigen Datentyp haben.
 */
export const uzPostMiddlewareArray = [
                                       postDatentypenPruefen,
                                       postNormalisieren,
                                       postValidieren
                                     ];
