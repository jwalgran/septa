/**
 * This module uses the request module as a high level API for consuming the
 * SEPTA REST services.
 * @private
 */
var request = require('request');

/**
 * Make a request to a SEPTA REST API and parse the JSON response.
 * @param {String} url A SEPTA REST API url.
 * @param {Function} callback The function to call when a response is received
 * from the SEPTA API or an error occurs.
 * @private
 */
var callSeptaApiAndParseJsonResponse = function(url, callback) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            if (callback) {
                callback(undefined, JSON.parse(body));
            }
        }
        else {
            if (callback) {
                callback(err, {"error": {"statusCode": response.statusCode, "body": JSON.parse(body)}});
            }
        }
    });
};

/**
 * Create a new BusRoute
 *
 * @constructor
 * @this {Circle}
 * @param {String} number A SEPTA bus route number.
 */
var BusRoute = function(number) {
    var DETOUR_URL = 'http://www3.septa.org/hackathon/BusDetours',
        ALERT_URL = 'http://www3.septa.org/hackathon/Alerts';
    this.number = number;
    this.detourUrl = DETOUR_URL + '/' + number;
    this.alertUrl = ALERT_URL + '/' + number;
}

/**
 * Get the detours for the BusRoute.
 *
 * @param {function} callback The function to call when a response is received
 * from the SEPTA bus detour API or an error occurs.
 */
BusRoute.prototype.getDetours = function(callback) {
    callSeptaApiAndParseJsonResponse(this.detourUrl, function(err, resp) {
        if (!err){
            callback(undefined, resp[0].route_info);
        } else {
            callback(err, resp);
        }
    });
}

/**
 * Get the current alerts for the BusRoute.
 *
 * @param {function} callback The function to call when a response is received
 * from the SEPTA alert API or an error occurs. The signature of the callback
 * should be:
 *
 * function(error, response)
 *
 * The response parameter passed to the callback is a string containing the
 * current alerts for the BusRoute.
 */
BusRoute.prototype.getAlerts = function(callback) {
    callSeptaApiAndParseJsonResponse(this.alertUrl, function(err, resp) {
        if (!err){
            callback(undefined, resp[0].current_message);
        } else {
            callback(err, resp);
        }
    });
}

exports.BusRoute = BusRoute;