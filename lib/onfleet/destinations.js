'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Destinations = function () {
    function Destinations(client) {
        _classCallCheck(this, Destinations);

        this.client = client;
    }

    /**
     * Create a new destination.
     *
     * http://docs.onfleet.com/docs/destinations#create-destination
     *
     * @param {object} address - The address for the destination.
     * @param {array} location
     * @returns {Promise<object[]>}
     */


    _createClass(Destinations, [{
        key: 'create',
        value: function create(address, location) {
            return this.client.post('/destinations', {
                'address': address,
                'location': location
            });
        }

        /**
         * Gets a single destination.
         *
         * http://docs.onfleet.com/docs/destinations#get-single-destination
         *
         * @param {string} id
         * @returns {Promise<object>}
         */

    }, {
        key: 'get',
        value: function get(id) {
            if (!id) {
                throw new Error('No id given');
            }
            return this.client.get('/destinations/' + id);
        }
    }]);

    return Destinations;
}();

module.exports = Destinations;