'use strict';

const describe = require("mocha").describe;
const nock = require("nock");
const Client = require('../lib/onfleet/client');

describe('onfleet client', () => {
    const API_KEY = 'key';
    const API_BASE = 'http://hubspot.com';

    before(() => {
        this.client = new Client(API_KEY, API_BASE)
    });

    it('should make simple get request', (done) => {
        let get = nock(API_BASE)
            .get('/tasks')
            .basicAuth({
                user: API_KEY
            })
            .reply(200);

        this.client.get('/tasks').then(() => {
            get.done();
            done();
        });
    });

    it('should make get request with query string', (done) => {

        let qs = {paramOne: 'param1', paramTwo: 'param2'};
        let get = nock(API_BASE)
            .get('/tasks')
            .query(qs)
            .basicAuth({
                user: API_KEY
            })
            .reply(200);

        this.client.get('/tasks', qs).then(() => {
            get.done();
            done();
        });
    });

    it('should make simple post request', (done) => {
        let body = {paramOne: 'param1', paramTwo: 'param2'};
        let post = nock(API_BASE)
            .post('/tasks', body)
            .basicAuth({
                user: API_KEY
            })
            .reply(200);

        this.client.post('/tasks', body).then(() => {
            post.done();
            done();
        });
    });

    it('should make simple put request', (done) => {
        let body = {paramOne: 'param1', paramTwo: 'param2'};
        let put = nock(API_BASE)
            .put('/tasks', body)
            .basicAuth({
                user: API_KEY
            })
            .reply(200);

        this.client.put('/tasks', body).then(() => {
            put.done();
            done();
        });
    });

    it('should make simple delete request', (done) => {
        let del = nock(API_BASE)
            .delete('/tasks/taskId')
            .basicAuth({
                user: API_KEY
            })
            .reply(200);

        this.client.delete('/tasks/taskId').then(() => {
            del.done();
            done();
        });
    });

});
