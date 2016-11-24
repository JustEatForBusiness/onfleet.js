class Tasks {

    constructor(client) {
        this.client = client;
    }

    /**
     * Gets a single task for the given id or all tasks that were completed in the last 24 hours, scheduled in the
     * next 24 hours, or created but not completed.
     *
     * http://docs.onfleet.com/v2.0/docs/tasks#get-single-task
     *
     * @param {string} id
     */
    get(id = null) {
        let path = id ? `/tasks/${id}` : `/tasks`;
        return this.client.get(path).then(response => JSON.parse(response));
    }

    /**
     * Gets a single task identified by the given short id.
     *
     * http://docs.onfleet.com/v2.0/docs/tasks#get-single-task-by-shortid
     *
     * @param {string} id
     */
    byShortId(id) {
        return this.client.get('/tasks/shortId/' + id).then(response => JSON.parse(response));
    }

    /**
     * Gets a list of all tasks that were scheduled for today. Failed tasks (or those
     * with success=false) are included by default but can be excluded by providing an
     * optional parameter.
     *
     * @param {boolean=} includeFailed
     * @return {Promise}
     */
    today(includeFailed = true) {

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
}

module.exports = Tasks;
