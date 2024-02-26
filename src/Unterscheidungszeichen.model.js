/**
 * Klasse um Ergebgnis einer Unterscheidungszeichen-Abfrage zu repräsentieren.
 */
export class UnterscheidungszeichenResult {

    /**
     *
     * @param {string} bedeutung Unterscheidungszeichen, z.B. "Karlsruhe"
     * @param {*} kategorie Bundesland oder Organisation/Behörde
     */
    constructor(unterscheidungszeichen, bedeutung, kategorie) {

        this.unterscheidungszeichen = unterscheidungszeichen;
        this.bedeutung              = bedeutung;
        this.kategorie              = kategorie;
    }

}