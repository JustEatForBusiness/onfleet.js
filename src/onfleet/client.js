'use strict';

const request = require('request-promise');

class Client {
    constructor(apiKey, apiBase) {
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
    get(path, query=undefined) {
        let options = this.authorizeOptions();
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
    put(path, body) {
        let options = this.authorizeOptions();
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
    post(path, body) {
        let options = this.authorizeOptions();
        options.body = body;
        return request.post(this.toUri(path), options);
    }

    /**
     * Makes a delete request.
     *
     * @param {string} path
     * @returns {Promise}
     */
    delete(path) {
        let options = this.authorizeOptions();
        return request.delete(this.toUri(path), options);
    }

    /**
     * Adds basic authentication to the options object.
     *
     * @param {object} options
     * @returns {object}
     */
    authorizeOptions(options = null) {
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
    toUri(path) {
        return this.apiBase + path;
    }
}

module.exports = Client;
