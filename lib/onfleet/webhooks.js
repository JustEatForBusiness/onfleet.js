'use strict';

class Webhooks {

    constructor(client) {
        this.client = client;
    }

    /**
     * Gets all webhooks.
     *
     * http://docs.onfleet.com/docs/webhooks#list-webhooks
     *
     * @returns {Promise}
     */
    all() {
        return this.client.get('/webhooks');
    }

    /**
     * Creates a webhook
     * @param url - The URL onfleet will post to
     * @param {int} trigger - The webhook event trigger
     * @param {int} threshold
     */
    create(url, trigger, threshold = null) {
        console.log({url, trigger, threshold});
        return this.client.post('/webhooks', {url, trigger, threshold});
    }

    delete(id) {
        return this.client.delete(`/webhooks/${id}`);
    }
}

module.exports = Webhooks;
