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
        ALERT_URL = 'http://www3.septa.org/hackathon/Alerts',
        LOCATION_URL = 'http://www3.septa.org/hackathon/TransitView';
    this.number = number;
    this.detourUrl = DETOUR_URL + '/' + number;
    this.alertUrl = ALERT_URL + '/' + number;
    this.locationUrl = LOCATION_URL + '/' + number;
};

/**
 * Download the current detours for the BusRoute.
 *
 * @param {function} callback The function to call when a response is received
 * from the SEPTA bus detour API or an error occurs. The signature of the callback
 * should be:
 *
 * function(error, response)
 *
 * The response parameter passed to the callback is an array of objects. Each
 * object in the array has three properties: route_direction, reason, and
 * current_message. The current_message property can contain embedded newline
 * characters. Example:
 * [
 *   {
 *     route_direction: '',
 *     reason: '',
 *     current_message: 'NORTHBOUND VIA 22ND  \nSTREET\nL - SNYDER\nR - 25TH\nR - WASHINGTON\nL - 22ND \nREGULAR  ROUTE'
 *   },
 *   {
 *     route_direction: '',
 *     reason: '',
 *     current_message: 'SOUTHBOUND VIA 23RD \nSTREET\nL - WASHINGTON\nR - 21ST\nR - POINT BREEZE\nL - 23  RD\nREGULAR ROUTE'
 *   },
 *   {
 *     route_direction: '',
 *     reason: '',
 *     current_message: '(Fri, Sat & Sun 6pm - 3am)\nSB via Pennsylvania:\nR - 21St\nReg rte'
 *   }
 * ]
 */
BusRoute.prototype.fetchDetours = function(callback) {
    callSeptaApiAndParseJsonResponse(this.detourUrl, function(err, resp) {
        if (!err){
            if (resp.length > 0) {
                callback(undefined, resp[0].route_info);
            } else {
                // If the SEPTA API returns an empty array I simulate the 'no detours found'
                // response so that the calling code gets a consistant response
                callback(undefined, [{"route_direction":"","reason":"","current_message":""}]);
            }
        } else {
            callback(err, resp);
        }
    });
};

/**
 * Download the current alerts for the BusRoute.
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
BusRoute.prototype.fetchAlerts = function(callback) {
    callSeptaApiAndParseJsonResponse(this.alertUrl, function(err, resp) {
        if (!err){
            callback(undefined, resp[0].current_message);
        } else {
            callback(err, resp);
        }
    });
};

/**
 * Download the current locations for all the buses on a BusRoute.
 *
 * @param {function} callback The function to call when a response is received
 * from the SEPTA alert API or an error occurs. The signature of the callback
 * should be:
 *
 * function(error, response)
 *
 * The response parameter passed to the callback is a string containing the
 * current locations for the buses on the route.
 */
BusRoute.prototype.fetchLocations = function(callback) {
    callSeptaApiAndParseJsonResponse(this.locationUrl, function(err, resp) {
        if (!err){
            callback(undefined, resp.bus);
        } else {
            callback(err, resp);
        }
    });
};

exports.BusRoute = BusRoute;