'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Webhooks = function () {
    function Webhooks(client) {
        _classCallCheck(this, Webhooks);

        this.client = client;
    }

    /**
     * Gets all webhooks.
     *
     * http://docs.onfleet.com/docs/webhooks#list-webhooks
     *
     * @returns {Promise}
     */


    _createClass(Webhooks, [{
        key: 'all',
        value: function all() {
            return this.client.get('/webhooks');
        }

        /**
         * Creates a webhook
         * @param url - The URL onfleet will post to
         * @param {int} trigger - The webhook event trigger
         * @param {int} threshold
         */

    }, {
        key: 'create',
        value: function create(url, trigger) {
            var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return this.client.post('/webhooks', { url: url, trigger: trigger, threshold: threshold });
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            return this.client.delete('/webhooks/' + id);
        }
    }]);

    return Webhooks;
}();

module.exports = Webhooks;