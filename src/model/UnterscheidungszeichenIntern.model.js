/**
 * Klasse um Ergebgnis einer Unterscheidungszeichen-Abfrage zu repräsentieren.
 * <br><br>
 *
 * Eine Instanz dieser Klasse darf nicht direkt in serialisierter Form an den
 * Client zurückgegeben werden, sondern muss in ein `RestErgebnis`-Objekt
 * verpackt werden.
 */
export class UnterscheidungszeichenIntern {

    /**
     * Objekt mit Unterscheidungszeichen-Information erzeugen.
     *
     * @param {string} bedeutung Unterscheidungszeichen, z.B. "Karlsruhe"
     *
     * @param {*} kategorie Bundesland oder Organisation/Behörde
     */
    constructor(unterscheidungszeichen, bedeutung, kategorie) {

        this.unterscheidungszeichen = unterscheidungszeichen;
        this.bedeutung              = bedeutung;
        this.kategorie              = kategorie;
    }

}