'use strict';

class Workers {

    constructor(client) {
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
    get(id) {
        if (!id) {
            throw new Error('No id given');
        }
        return this.client.get(`/workers/${id}`);
    }

    /**
     *  Gets all drivers along with their current `onDuty` status, last reported
     * `location`, assigned `tasks` list and the ID of their `activeTask`, if there is one.
     * @returns {Promise<object[]>}
     */
    all() {
        return this.client.get(`/workers`);
    }
}

module.exports = Workers;