process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const CustomerNote = require("../../src/model/communication-type");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const serverApp = require("../../src/app")
chai.use(chaiHttp);

describe("# CustomerNote API Tests", () => {
    beforeEach((done) => {
        CustomerNote.remove({}, (err) => {
            done();
        });
    });

    // New CustomerNote - POST
    describe('## /CustomerNote (POST) - Create CustomerNote', () => {
        it('Should create new CustomerNote with all the passed data', (done) => {
            let title = "Request of Customer A";
            let description = "Descriptions of Customer A";
            let attachmentLink = "http://LINK";
            let createdDate = new Date();

            chai.request(serverApp)
                .post('/data/customerNote/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    description: description,
                    attachmentLink: attachmentLink,
                    createdDate: createdDate,
                    deleted: false
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.title.should.be.eql(title)
                    res.body.description.should.be.eql(description);
                    res.body.attachmentLink.should.be.eql(attachmentLink);
                    should.exist(res.body._id);
                    done();
                });
        });
    });

    //Get CustomerNote by id - GET
    describe('## /CustomerNote (GET) - Get CustomerNote by id', () => {
        it('Should get CustomerNote by id ', (done) => {
            let title = "Request of Customer A";
            let description = "Descriptions of Customer A";
            let attachmentLink = "http://LINK";
            let createdDate = new Date();

            chai.request(serverApp)
                .post('/data/customerNote/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    description: description,
                    attachmentLink: attachmentLink,
                    createdDate: createdDate,
                    deleted: false
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .get('/data/customerNote/get/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.title.should.be.eql(title)
                            res.body.description.should.be.eql(description);
                            res.body.attachmentLink.should.be.eql(attachmentLink);
                            should.exist(res.body._id);
                            done();
                        });
                });
        });
    });

    //Delete CustomerNote by id - GET
    describe('## /CustomerNote (GET) - Delete CustomerNote by id', () => {
        it('Should delete CustomerNote by the id ', (done) => {
            let title = "Request of Customer A";
            let description = "Descriptions of Customer A";
            let attachmentLink = "http://LINK";
            let createdDate = new Date();

            chai.request(serverApp)
                .post('/data/customerNote/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    description: description,
                    attachmentLink: attachmentLink,
                    createdDate: createdDate,
                    deleted: false
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .get('/data/customerNote/delete/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });

    });

    //Get All CustomerNote - GET
    describe('## /CustomerNote (GET) - Get All CustomerNote', () => {
        it('Should get All CustomerNote ', (done) => {
            let title = "Request of Customer A";
            let description = "Descriptions of Customer A";
            let attachmentLink = "http://LINK";
            let createdDate = new Date();

            chai.request(serverApp)
                .post('/data/customerNote/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    description: description,
                    attachmentLink: attachmentLink,
                    createdDate: createdDate,
                    deleted: false
                })
                .end((err, res) => {
                    title = "Updates of Customer A";
                    chai.request(serverApp)
                        .post('/data/customerNote/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            title: title,
                            description: description,
                            attachmentLink: attachmentLink,
                            createdDate: createdDate,
                            deleted: false
                        })
                        .end((err, res) => {
                            chai.request(serverApp)
                                .get('/data/customerNote/all')
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    res.body.should.have.lengthOf(2);
                                    done();
                                });
                        });
                });
        });
    });

    //Update one CustomerNote - POST
    describe('## /CustomerNote (POST) - Update One CustomerNote', () => {
        it('Should Update A CustomerNote ', (done) => {
            let title = "Request of Customer A";
            let description = "Descriptions of Customer A";
            let attachmentLink = "http://LINK";
            let createdDate = new Date();

            chai.request(serverApp)
                .post('/data/customerNote/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    description: description,
                    attachmentLink: attachmentLink,
                    createdDate: createdDate,
                    deleted: false
                })
                .end((err, res) => {
                    message = "New Request of Customer A";
                    chai.request(serverApp)
                        .post('/data/customerNote/update')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            title: title,
                            description: description,
                            attachmentLink: attachmentLink,
                            createdDate: createdDate,
                            deleted: false
                        })
                        .end((err, res) => {
                            const createdId = res.body._id;
                            chai.request(serverApp)
                                .get('/data/customerNote/get/byId/' + createdId)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.title.should.be.eql(title);
                                    done();
                                });
                        });
                });
        });
    });
});