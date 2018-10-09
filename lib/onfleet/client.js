'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise');

var Client = function () {
    function Client(apiKey, apiBase) {
        _classCallCheck(this, Client);

        this.apiKey = apiKey;
        this.apiBase = apiBase;
    }

    /**
     * Makes a get request.
     * 
     * @param {string} path
     * @param {object} query
     * @returns {Promise}
     */


    _createClass(Client, [{
        key: 'get',
        value: function get(path) {
            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var options = this.authorizeOptions();
            options.qs = query;
            return request.get(this.toUri(path), options);
        }

        /**
         * Makes a put request.
         *
         * @param {string} path
         * @param {object} body
         * @returns {Promise}
         */

    }, {
        key: 'put',
        value: function put(path, body) {
            var options = this.authorizeOptions();
            options.body = body;
            return request.put(this.toUri(path), options);
        }

        /**
         * Makes a post request.
         *
         * @param {string} path
         * @param {object} body
         * @returns {Promise}
         */

    }, {
        key: 'post',
        value: function post(path, body) {
            var options = this.authorizeOptions();
            options.body = body;
            return request.post(this.toUri(path), options);
        }

        /**
         * Makes a delete request.
         *
         * @param {string} path
         * @returns {Promise}
         */

    }, {
        key: 'delete',
        value: function _delete(path) {
            var options = this.authorizeOptions();
            return request.delete(this.toUri(path), options);
        }

        /**
         * Adds basic authentication to the options object.
         *
         * @param {object} options
         * @returns {object}
         */

    }, {
        key: 'authorizeOptions',
        value: function authorizeOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            options = options || {};
            options.auth = options.auth || {};
            options.auth['user'] = this.apiKey;
            options.auth['sendImmediately'] = true;
            options.json = true;
            return options;
        }

        /**
         * Appends the path to the api base in order to get a full endpoint URI.
         *
         * @param {string} path
         * @returns {string}
         */

    }, {
        key: 'toUri',
        value: function toUri(path) {
            return this.apiBase + path;
        }
    }]);

    return Client;
}();

module.exports = Client;