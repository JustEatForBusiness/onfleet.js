class Workers {

    constructor(client) {
        this.client = client;
    }

    /**
     * Gets a single worker details or all drivers along with their current `onDuty` status, last reported
     * `location`, assigned `tasks` list and the ID of their `activeTask`, if there is one.
     *
     * http://docs.onfleet.com/v2.0/docs/workers#get-single-worker
     *
     * @param {string|null} id
     */
    get(id = null) {
        let path = id ? `/workers/${id}` : `/workers`;
        return this.client.get(path);
    }
}

module.exports = Workers;
