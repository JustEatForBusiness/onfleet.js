'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moment = require('moment');

var Tasks = function () {
    function Tasks(client) {
        _classCallCheck(this, Tasks);

        this.client = client;
    }

    /**
     * Creates a task
     *
     * http://docs.onfleet.com/docs/tasks#create-task
     *
     */


    _createClass(Tasks, [{
        key: 'create',
        value: function create(destination, recipients) {
            var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var auto_assign = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var post_data = {
                'destination': destination,
                'recipients': recipients
            };
            if (container) {
                post_data.container = container;
            } else if (auto_assign) {
                post_data.autoAssign = true;
            }
            return this.client.post('/tasks', post_data);
        }

        /**
         * Gets a single task for the given id
         *
         * http://docs.onfleet.com/docs/tasks#get-single-task
         *
         * @param {string} id
         */

    }, {
        key: 'get',
        value: function get(id) {
            if (!id) {
                throw new Error('No id given');
            }
            return this.client.get('/tasks/' + id);
        }

        /**
         * Gets a paginated collection of all tasks in your organization. The result is in the form
         * { lastId: 'xyz', tasks: [] } where lastId is the id of the last element in the page; if lastId is null then you
         * have reached the last page. Each request will return up to 128 tasks but may return fewer and still include a
         * lastId.
         *
         * The from and to query parameters are considered differently depending on task state.
         *
         *      Completed tasks: time comparison performed on task completion time
         *      All other task states: time comparison performed on task creation time
         *
         * http://docs.onfleet.com/docs/tasks#list-tasks
         *
         * @param from string
         * @param to string
         * @param lastId string
         * @returns {Promise}
         */

    }, {
        key: 'all',
        value: function all(from) {
            var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var lastId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var qs = { from: from.valueOf() };

            if (to) {
                qs.to = to.valueOf();
            }

            if (lastId) {
                qs.lastId = lastId;
            }

            return this.client.get('/tasks/all', qs);
        }

        /**
         * Gets a single task identified by the given short id.
         *
         * http://docs.onfleet.com/v2.0/docs/tasks#get-single-task-by-shortid
         *
         * @param {string} id
         */

    }, {
        key: 'byShortId',
        value: function byShortId(id) {
            return this.client.get('/tasks/shortId/' + id);
        }

        /**
         * Gets a list of all tasks scheduled for today.
         *
         * @returns {Promise}
         */

    }, {
        key: 'today',
        value: function today() {
            var includeFailed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            return this.client.get('/tasks').then(function (tasks) {
                return tasks.filter(function (task) {
                    var isToday = task.completeBefore !== null && moment(task.completeBefore).isSame(moment(), 'day');
                    var failed = task.completionDetails.success === false;
                    return isToday && (includeFailed || !failed);
                });
            });
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            return this.client.delete('/tasks/' + id);
        }
    }]);

    return Tasks;
}();

module.exports = Tasks;