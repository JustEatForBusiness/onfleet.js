'use strict';

/**
 * http://docs.onfleet.com/docs/teams
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Teams = function () {
    function Teams(client) {
        _classCallCheck(this, Teams);

        this.client = client;
    }

    /**
     * Gets all webhooks.
     *
     * http://docs.onfleet.com/docs/teams#list-teams
     *
     * @returns {Promise}
     */


    _createClass(Teams, [{
        key: 'all',
        value: function all() {
            return this.client.get('/teams');
        }

        /**
         * Get a single team.
         *
         * http://docs.onfleet.com/docs/teams#get-single-team
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
            return this.client.get('/teams/' + id);
        }

        /**
         * Delete a team.
         *
         * http://docs.onfleet.com/docs/teams#delete-team
         *
         * @param {string} id
         * @returns {Promise<object>}
         */

    }, {
        key: 'delete',
        value: function _delete(id) {
            return this.client.delete('/teams/' + id);
        }
    }]);

    return Teams;
}();

module.exports = Teams;