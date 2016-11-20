'use strict';

const rp = require('request-promise');

class Onfleet {

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiBase = 'https://onfleet.com/api/v2';
        this.imageBase = 'https://d15p8tr8p0vffz.cloudfront.net';
    }

    /**
     * Gets a single task for the given id.
     *
     * http://docs.onfleet.com/v2.0/docs/tasks#get-single-task
     *
     * @param {string} id
     */
    getTask(id) {
        return this.get('/tasks/' + id).then(response => JSON.parse(response));
    }

    /**
     * Gets a single task identified by the given short id.
     *
     * http://docs.onfleet.com/v2.0/docs/tasks#get-single-task-by-shortid
     *
     * @param {string} id
     */
    getTaskByShortId(id) {
        return this.get('/tasks/shortId/' + id).then(response => JSON.parse(response));
    }

    /**
     * Gets a list of task that were completed in the last 24 hours, scheduled in the
     * next 24 hours, or created but not completed.
     *
     * http://docs.onfleet.com/v2.0/docs/tasks#list-tasks
     */
    getTasks() {
        return this.get('/tasks').then(response => JSON.parse(response));
    }

    /**
     * Gets a list of all tasks that were scheduled for today. Failed tasks (or those
     * with success=false) are included by default but can be excluded by providing an
     * optional parameter.
     *
     * @param {boolean=} includeFailed
     * @return {Promise}
     */
    getTodaysTasks(includeFailed) {

        includeFailed = includeFailed === undefined || includeFailed;

        let from = new Date();
        from.setHours(0, 0, 0, 0);
        let to = new Date();
        to.setHours(24, 0, 0, 0);

        return this.getTasks().then(tasks => {
            return tasks.filter(task => {
                let taskFailed = task.completionDetails.success === false;
                let includeTask = includeFailed || !taskFailed;
                let completeBeforeDate = new Date(task.completeBefore || task.completeAfter);
                return includeTask && completeBeforeDate > from && completeBeforeDate < to;
            });
        });
    }

    /**
     * Gets a single worker details.
     *
     * http://docs.onfleet.com/v2.0/docs/workers#get-single-worker
     *
     * @param {string} id
     */
    getWorker(id) {
        return this.get('/workers/' + id).then(response => JSON.parse(response));
    }

    /**
     * Gets a list of all drivers along with their current `onDuty` status, last reported
     * `location`, assigned `tasks` list and the ID of their `activeTask`, if there is one.
     *
     * http://docs.onfleet.com/v2.0/docs/workers#list-workers
     *
     * @return {Promise}
     */
    getWorkers() {
        return this.get('/workers').then(response => JSON.parse(response));
    }

    /**
     * Makes a get request.
     *
     * @param {string} path
     * @param {object} options
     * @returns {Promise}
     */
    get(path, options) {

        options = options || {};
        options = this.authorizeOptions(options);
        options.method = 'GET';
        options.uri = this.toUri(path);

        return rp.get(options);
    }

    /**
     * Adds basic authentication to the options object.
     *
     * @param {object} options
     * @returns {object}
     */
    authorizeOptions(options) {

        options.auth = options.auth || {};
        options.auth['user'] = this.apiKey;
        options.auth['sendImmediately'] = true;

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

module.exports = {

    Onfleet: Onfleet,

    /**
     * @param {string} apiKey
     * @returns {Onfleet}
     */
    getClient: function (apiKey) {
        return new Onfleet(apiKey);
    }
};