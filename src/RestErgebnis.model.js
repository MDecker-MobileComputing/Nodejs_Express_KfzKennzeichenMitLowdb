/**
 * Klasse um Ergebgnis einer Unterscheidungszeichen-Abfrage im JSON-Format an
 * den Client zurückzugeben.
 */
export class RestErgebnis {

    /**
     * Objekt mit Antwort auf REST-Anfrage erzeugen.
     *
     * @param {boolean} erfolg `true` wenn die Anfrage erfolgreich war, sonst `false`
     *
     * @param {string} Wenn `erfolg=false` ist, dann enthält diese Eigenschaft eine Fehlermeldung
     *
     * @param {UnterscheidungszeichenIntern} unterscheidungszeichen
     */
    constructor(erfolg, nachricht, unterscheidungszeichen) {

        this.erfolg                 = erfolg;
        this.nachricht              = nachricht;
        this.unterscheidungszeichen = unterscheidungszeichen;
    }

}