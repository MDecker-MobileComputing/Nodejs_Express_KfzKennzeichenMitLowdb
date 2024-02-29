
import { RestErgebnis }                     from '../model/RestErgebnis.model.js';
import { UnterscheidungszeichenIntern }     from '../model/UnterscheidungszeichenIntern.model.js';

import { HTTP_STATUS_CODE_400_BAD_REQUEST, UZ_REGEXP } from '../konstanten.js';


// Leeres Unterscheidungszeichen-Objekt für Fehlerfälle
const uzInternLeer = new UnterscheidungszeichenIntern( "", "", "" );


/**
 * Middleware-Funktion für die Route zum Anlegen eines neuen Unterscheidungszeichens.
 * Die Pflichtattribute aus dem JSON-Body werden (soweit vorhanden) normalisiert.
 */
function postNormalisieren(req, res, next) {

    if (req.body.unterscheidungszeichen) {

        req.body.unterscheidungszeichen = req.body.unterscheidungszeichen.trim().toUpperCase();
    }

    if (req.body.bedeutung) {

        req.body.bedeutung = req.body.bedeutung.trim();
    }

    if (req.body.kategorie) {

        req.body.kategorie = req.body.kategorie.trim().toUpperCase();
    }

    next(); // nächste Middleware-Funktion aufrufen
}


/**
 * Middleware-Funktion für Route zum Anlegen eines neuen Unterscheidungszeichens.
 * Wenn die Pflichtfelder nicht gefüllt sind, wird der Request mit einer Fehler-Response
 * abgebrochen. Es wird auch überprüft, ob die Mindest-/Max-Länge der einzelnen Pflichtfelder
 * eingehalten wurde.
 *
 * Vor dieser Middleware-Funktion sollte die Middleware-Funktion `middlewareNeuNormalisierung`
 * aufgerufen werden.
 */
function postValidieren(req, res, next) {

    let ergebnisErfolglos = null

    const uz = req.body.unterscheidungszeichen;
    if (uz === undefined)  {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'uz' fehlt im JSON-Body.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_400_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    const bedeutung = req.body.bedeutung;
    if (bedeutung === undefined) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'bedeutung' fehlt im JSON-Body.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_400_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    const kategorie = req.body.kategorie;
    if (kategorie === undefined) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'kategorie' fehlt im JSON-Body.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_400_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }


    if (UZ_REGEXP.test(uz) === false) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'uz' muss aus 1 bis 3 Buchstaben bestehen",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_400_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    if (bedeutung.length < 3) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'bedeutung' muss mindestens 3 Zeichen lang sein.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_400_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    const KAT_REGEXP = /^[a-zA-Z]{2,3}$/;
    if (KAT_REGEXP.test(kategorie) === false) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'kategorie' muss aus 2 oder 3 Buchstaben bestehen",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_400_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    next(); // nächste Middleware-Funktion aufrufen
}


export const uzPostMiddlewareArray = [ postNormalisieren, postValidieren ];
