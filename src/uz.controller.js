/**
 * Diese Controller-Klasse enthält die REST-Endpunkte für die Collection "Unterscheidungszeichen".
 */

import logging from "logging";

import { uzService }              from "./uz.service.js";
import { uzPostMiddlewareArray }  from "./middleware/uz-post.middleware.js";
import { uzQueryMiddlewareArray } from "./middleware/uz-query.middleware.js";

import { UnterscheidungszeichenIntern } from './model/UnterscheidungszeichenIntern.model.js';
import { RestErgebnis }                 from './model/RestErgebnis.model.js';

import { HTTP_STATUS_CODE_200_OK,
         HTTP_STATUS_CODE_404_NOT_FOUND,
         HTTP_STATUS_CODE_409_CONFLICT  } from './konstanten.js';


const logger = logging.default( "uz-controller" );

/** Anfangs-String für alle Routen, mit Versionsnummer. */
const prefixFuerRouten = "/kfzkennzeichen/v1";


/**
 * Routen für einzelne REST-Endpunkte registrieren.
 *
 * @param {*} Express-App-Objekt
 */
export default function uzRoutenRegistrieren( app ) {

    const uzCollection = "unterscheidungszeichen";

    const routeGetRessource = `${prefixFuerRouten}/${uzCollection}/:id`;
    app.get( routeGetRessource, uzQueryMiddlewareArray, getRessource );
    logger.info( `Route registriert: GET  ${routeGetRessource}` );

    const routePostCollection = `${prefixFuerRouten}/${uzCollection}`;
    app.post( routePostCollection, uzPostMiddlewareArray, postCollection );
    logger.info( `Route registriert: POST ${routePostCollection}` );
};


// Leeres Unterscheidungszeichen-Objekt für Fehlerfälle
const uzInternLeer = new UnterscheidungszeichenIntern( "", "", "" );



/**
 * REST-Endpunkt zur Abfrage von Unterscheidungszeichen.
 * <br><br>
 *
 * Wegen der vorgeschalteten Middleware-Funktionen können wir davon ausgehen,
 * dass der Such-String (Pfad-Parameter) normalisiert ist (Großbuchstaben,
 * keine Leerzeichen am Anfang und Ende) und einen formal zulässigen
 * Inhalt (ein bis drei Buchstaben) hat.
 *
 * @param {*} req Request-Objekt, zum Auslesen von Pfad-Parameter mit
 *                Unterscheidungszeichen, das abgefragt werden soll.
 *
 * @param {*} res Response-Objekt in das HTTP-Status-Code und Payload
 *                (Body) geschrieben werden.
 */
function getRessource( req, res ) {

    const suchString = req.params.id;

    const result = uzService.suchen( suchString ); // *** eigentliche Suche ***

    if (result === null) {

        const ergebnisErfolglos = new RestErgebnis( false,
                                                    `Unterscheidungszeichen \"${suchString}\" nicht gefunden.`,
                                                    uzInternLeer );
        res.status( HTTP_STATUS_CODE_404_NOT_FOUND )
           .send( ergebnisErfolglos );

    } else {

        const ergebnisErfolg = new RestErgebnis( true,
                                                 `Unterscheidungszeichen "${suchString}" gefunden.`,
                                                 result );
        res.status( HTTP_STATUS_CODE_200_OK )
           .send( ergebnisErfolg );
    }
}


/**
 * REST-Endpunkt zum Anlegen eines neuen Unterscheidungszeichens.
 * <br><br>
 *
 * Wegen der vorgeschalteten Middleware-Funktionen können wir davon ausgehen,
 * dass die Pflichtattribute im Request mit zulässigen Werten gefüllten sind.
 *
 * @param {*} req Request-Objekt, zum Auslesen des Bodys (JSON) mit
 *                den drei Attributen des neuen Unterscheidungszeichen:
 *                - `unterscheidungszeichen`
 *                - `bedeutung`
 *                - `kategorie`
 *
 * @param {*} res Response-Objekt in das HTTP-Status-Code geschrieben wird.
 */
async function postCollection( req, res ) {

    const uzNormalized        = req.body.unterscheidungszeichen;
    const bedeutungNormalized = req.body.bedeutung;
    const kategorieNormalized = req.body.kategorie;

    const neuesUz = new UnterscheidungszeichenIntern( uzNormalized,
                                                      bedeutungNormalized,
                                                      kategorieNormalized );

    const warErfolgreich = await uzService.anlegen( neuesUz ); // *** eigentliches Erzeugen ***

    if ( warErfolgreich ) {

        const ergebnisErfolg = new RestErgebnis( true,
                                                 `Unterscheidungszeichen "${uzNormalized}" erfolgreich angelegt.`,
                                                 neuesUz );
        res.status( HTTP_STATUS_CODE_200_OK )
           .send( ergebnisErfolg );

    } else {

        const ergebnisErfolglos = new RestErgebnis( false,
                                                    `Unterscheidungszeichen "${uzNormalized}" war schon vorhanden.`,
                                                    uzInternLeer );
        res.status( HTTP_STATUS_CODE_409_CONFLICT )
           .send( ergebnisErfolglos );
    }
}
