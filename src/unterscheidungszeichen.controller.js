import logging from "logging";

export const logger = logging.default("uz-controller");


export default function uzRoutenRegistrieren(app) {

    logger.info("Sollte jetzt die Routen registrieren");

    /*
    app.get(prefix, wrapAsync(search));
    app.post(prefix, wrapAsync(create));

    // Einzelne Ressource
    app.get(`${prefix}/:id`, wrapAsync(read));
    app.put(`${prefix}/:id`, wrapAsync(update));
    app.patch(`${prefix}/:id`, wrapAsync(update));
    app.delete(`${prefix}/:id`, wrapAsync(remove));
    */
};