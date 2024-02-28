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
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    const bedeutung = req.body.bedeutung;
    if (bedeutung === undefined) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'bedeutung' fehlt im JSON-Body.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    const kategorie = req.body.kategorie;
    if (kategorie === undefined) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'kategorie' fehlt im JSON-Body.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }


    if (uz.length < 0 || uz.length > 3) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'uz' muss 1 bis 3 Zeichen lang sein.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    if (bedeutung.length < 3) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'bedeutung' muss mindestens 3 Zeichen lang sein.",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    if (kategorie.length < 2) {

        ergebnisErfolglos = new RestErgebnis( false,
                                              "Attribut 'kategorie' muss mindestens 2 Zeichen lang sein",
                                              uzInternLeer );
        res.status(HTTP_STATUS_CODE_BAD_REQUEST)
           .send(ergebnisErfolglos);
        return;
    }

    next(); // nächste Middleware-Funktion aufrufen
}


export const uzPostMiddlewareArray = [ postNormalisieren, postValidieren ];
