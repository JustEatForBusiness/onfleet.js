'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;
const Client = require('../lib/onfleet/client');
const Webhooks = require('../lib/onfleet/webhooks');
const moment = require('moment');
require('sinon-as-promised');

describe('onfleet.workers', () => {

    beforeEach(() => {
        this.client = new Client('key', 'testUrl');
        this.underTest = new Webhooks(this.client);
    });

    it('should call correct url when getting all webhooks', () => {
        let stub = sinon.stub(this.client, 'get').withArgs('/webhooks').resolves();
        return this.underTest.all('testId').then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    });

    it('should call correct url when creating a webhook', () => {
        let stub = sinon.stub(this.client, 'post').withArgs('/webhooks', {
            url: 'testUrl',
            trigger: 0,
            threshold: null })
            .resolves();
        return this.underTest.create('testUrl', 0).then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    });

    it('should call correct url when deleting a webhook', () => {
        let stub = sinon.stub(this.client, 'delete').withArgs('/webhooks/hookId')
            .resolves();
        return this.underTest.delete('hookId').then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    })
});
