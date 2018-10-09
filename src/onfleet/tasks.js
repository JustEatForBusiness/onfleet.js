'use strict';

const moment = require('moment');

class Tasks {

    constructor(client) {
        this.client = client;
    }

    /**
     * Creates a task
     *
     * http://docs.onfleet.com/docs/tasks#create-task
     *
     */
    create(destination, recipients, container = null, auto_assign = false) {
        let post_data = {
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
    get(id) {
        if (!id) {
            throw new Error('No id given');
        }
        return this.client.get(`/tasks/${id}`);
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
    all(from, to = null, lastId = null) {
        let qs = { from: from.valueOf() };

        if (to) {
            qs.to = to.valueOf();
        }

        if (lastId) {
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
     * Gets a list of all tasks scheduled for today.
     *
     * @returns {Promise}
     */
    today(includeFailed=true) {
        return this.client.get(`/tasks`).then(tasks => tasks.filter(task => {
            let isToday = task.completeBefore !== null && moment(task.completeBefore).isSame(moment(), 'day');
            let failed = task.completionDetails.success === false;
            return isToday && (includeFailed || !failed);
        }));
    }

    delete(id) {
        return this.client.delete(`/tasks/${id}`);
    }
}

module.exports = Tasks;
