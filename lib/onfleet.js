'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('./onfleet/client.js');
var Tasks = require('./onfleet/tasks.js');
var Teams = require('./onfleet/teams.js');
var Webhooks = require('./onfleet/webhooks.js');
var Workers = require('./onfleet/workers.js');
var Destinations = require('./onfleet/destinations.js');

var Onfleet = function () {
    function Onfleet(apiKey, apiBase) {
        _classCallCheck(this, Onfleet);

        this.client = new Client(apiKey, apiBase);
        this._destinations = new Destinations(this.client);
        this._tasks = new Tasks(this.client);
        this._teams = new Teams(this.client);
        this._webhooks = new Webhooks(this.client);
        this._workers = new Workers(this.client);
    }

    _createClass(Onfleet, [{
        key: 'destinations',
        get: function get() {
            return this._destinations;
        }
    }, {
        key: 'tasks',
        get: function get() {
            return this._tasks;
        }
    }, {
        key: 'teams',
        get: function get() {
            return this._teams;
        }
    }, {
        key: 'webhooks',
        get: function get() {
            return this._webhooks;
        }
    }, {
        key: 'workers',
        get: function get() {
            return this._workers;
        }
    }], [{
        key: 'Triggers',
        get: function get() {
            return {
                TASK_STARTED: 0,
                TASK_ETA: 1,
                TASK_ARRIVAL: 2,
                TASK_COMPLETED: 3,
                TASK_FAILED: 4,
                WORKER_DUTY: 5,
                TASK_CREATED: 6,
                TASK_UPDATED: 7,
                TASK_DELETED: 8,
                TASK_ASSIGNED: 9,
                TASK_UNASSIGNED: 10
            };
        }
    }]);

    return Onfleet;
}();

module.exports = Onfleet;