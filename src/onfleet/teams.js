'use strict';

/**
 * http://docs.onfleet.com/docs/teams
 */
class Teams {

    constructor(client) {
        this.client = client;
    }

    /**
     * Gets all webhooks.
     *
     * http://docs.onfleet.com/docs/teams#list-teams
     *
     * @returns {Promise}
     */
    all() {
        return this.client.get('/teams');
    }

    /**
     * Gets a single worker details
     *
     * http://docs.onfleet.com/docs/teams#get-single-team
     *
     * @param {string} id
     * @returns {Promise<object>}
     */
    get(id) {
        if(!id) {
            throw new Error('No id given');
        }
        return this.client.get(`/teams/${id}`);
    }


    /**
     * Delete a team.
     *
     * http://docs.onfleet.com/docs/teams#delete-team
     *
     * @param {string} id
     * @returns {Promise<object>}
     */
    delete(id) {
        return this.client.delete(`/teams/${id}`);
    }
}

module.exports = Workers;
