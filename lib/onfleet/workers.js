'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Workers = function () {
    function Workers(client) {
        _classCallCheck(this, Workers);

        this.client = client;
    }

    /**
     * Gets a single worker details
     *
     * http://docs.onfleet.com/v2.0/docs/workers#get-single-worker
     *
     * @param {string} id
     * @returns {Promise<object>}
     */


    _createClass(Workers, [{
        key: 'get',
        value: function get(id) {
            if (!id) {
                throw new Error('No id given');
            }
            return this.client.get('/workers/' + id);
        }

        /**
         *  Gets all drivers along with their current `onDuty` status, last reported
         * `location`, assigned `tasks` list and the ID of their `activeTask`, if there is one.
         * @returns {Promise<object[]>}
         */

    }, {
        key: 'all',
        value: function all() {
            return this.client.get('/workers');
        }
    }]);

    return Workers;
}();

module.exports = Workers;