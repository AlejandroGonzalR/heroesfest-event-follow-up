'use strict';

module.exports = (app) => {
    const controller = require('../controllers/controller');

    // Controller Routes
    app.route('/attendees')
        .get(controller.getAllAttendees);

    app.route('/attendees/:institution')
        .get(controller.getAttendeesByInstitution);

    app.route('/institutions')
        .get(controller.getAllInstitutions);
};
