'use strict';

const Client = require('./onfleet/client.js');
const Tasks = require('./onfleet/tasks.js');
const Workers = require('./onfleet/workers.js');
const Webhooks = require('./onfleet/webhooks.js');

class Onfleet {

    constructor(apiKey, apiBase) {
        this.client = new Client(apiKey, apiBase);
    }

    get tasks() {
        return new Tasks(this.client);
    }

    get workers() {
        return new Workers(this.client);
    }

    get webhooks() {
        return new Webhooks(this.client);
    }

    static get Triggers() {
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
}

module.exports = Onfleet;
