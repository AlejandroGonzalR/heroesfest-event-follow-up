'use strict';

module.exports = (app) => {
    const monitoringController = require('../controllers/controller.monitoring');
    const balancerController = require('../controllers/controller.balancer');

    // Load Balancer Controller Routes
    app.route('/institutions')
        .get(balancerController.obtainInstitutions);

    app.route('/attendees')
        .get(balancerController.getEventReport);

    // Monitoring Controller Routes
    app.route('/send-email')
        .post(monitoringController.reportErrorLog);

    app.route('/save-log')
        .post(monitoringController.saveErrorLog);
};
