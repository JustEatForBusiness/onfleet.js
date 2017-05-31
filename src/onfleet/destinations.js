'use strict';

class Destinations {
    constructor(client) {
        this.client = client;
    }

    /**
     * Create a new destination.
     *
     * http://docs.onfleet.com/docs/destinations#create-destination
     *
     * @param {object} address - The address for the destination.
     * @param {array} location
     * @returns {Promise<object[]>}
     */
    create(address, location) {
        return this.client.post('/destinations', {
            'address': address,
            'location': location
        });
    }

    /**
     * Gets a single destination.
     *
     * http://docs.onfleet.com/docs/destinations#get-single-destination
     *
     * @param {string} id
     * @returns {Promise<object>}
     */
    get(id) {
        if(!id) {
            throw new Error('No id given');
        }
        return this.client.get(`/destinations/${id}`);
    }
}

module.exports = Workers;
