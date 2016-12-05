'use strict';

const moment = require('moment');

class Tasks {

    constructor(client) {
        this.client = client;
    }

    /**
     * Gets a single task for the given id
     *
     * http://docs.onfleet.com/docs/tasks#get-single-task
     *
     * @param {string} id
     */
    get(id) {
        if(!id) {
            throw new Error('No id given');
        }
        return this.client.get(`/tasks/${id}`);
    }

    /**
     * Gets all tasks. Result is paginated.
     * Result is of form - {lastId: 'asdad', tasks: [...]} where lastId is the id of the last element in the page.
     * If null, the last page has been reached.
     * @returns {Promise}
     */
    all(from, to = null, lastId = null) {
        let qs = {from: from.valueOf()};

        if(to) {
            qs.to = to.valueOf();
        }

        if(lastId) {
            qs.lastId = lastId;
        }

        return this.client.get(`/tasks/all`, qs);
    }

    /**
     * Gets a single task identified by the given short id.
     *
     * http://docs.onfleet.com/v2.0/docs/tasks#get-single-task-by-shortid
     *
     * @param {string} id
     */
    byShortId(id) {
        return this.client.get('/tasks/shortId/' + id);
    }

    /**
     * Gets a list of all tasks that were scheduled for the same day as the given date.
     * Failed tasks (or those with success=false) are included by default but can be excluded
     * by providing an optional parameter.
     * @param {Moment} date
     * @param {boolean} includeFailed
     * @return {Promise}
     */
    onDay(date, includeFailed=true) {

        let from = date.clone().startOf('day');
        let to = date.clone().endOf('day');

        let tasks = [];
        let thisTask = this;

        function getAllPages(from, to, lastId) {
            return thisTask.all(from, to, lastId)
                .then(result => {
                    tasks.push(...result.tasks);
                    if (result.lastId) {
                        return getAllPages(from, to, result.lastId);
                    }

                    return tasks;
                });
        }

        return getAllPages(from, to).then(tasks => {
            return tasks.filter(task => {
                let taskFailed = task.completionDetails.success === false;
                return includeFailed || !taskFailed;
            });
        });
    }

    /**
     * Gets a list of all tasks that were scheduled for today.
     * Failed tasks (or those with success=false) are included by default but can be excluded
     * by providing an optional parameter.
     * @param {boolean} includeFailed
     * @returns {Promise}
     */
    today(includeFailed=true) {
        return this.onDay(moment(), includeFailed);
    }
}

module.exports = Tasks;
