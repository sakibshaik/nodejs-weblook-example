const request = require("supertest");
const express = require('express');
const app = require("../../app");

describe('GET /api/webhooks', function() {
    it('responds with json', function(done) {
        request(app)
            .get('/api/webhooks')
            .set('Accept', 'application/json')
            .expect(function(res) {
                res.body.title = 'Express';
            })
            .expect(200,  done)
    });
});
