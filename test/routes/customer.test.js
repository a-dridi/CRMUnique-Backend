process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Customer = require("../../src/model/customer");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const serverApp = require("../../src/app")
chai.use(chaiHttp);

describe("# Customer API Tests", () => {
    beforeEach((done) => {
        Customer.remove({}, (err) => {
            done();
        });
    });

    // New Customer - POST
    describe('## /Customer (POST) - Create Customer', () => {
        it('Should create new Customer with all the passed data', (done) => {
            let companyName = "The Company LLC";
            let forename = "John";
            let surname = "Doe";
            let email = "john.doe@mail.tld";
            let telephone = "+1-123-456";
            let street = "New Street 987";
            let city = "Bronx";
            let postCode = 19835;
            let country = "USA";
            let IBAN = "USBWKDO123456789";
            let BIC = "BWKEDMS";
            let bankInformation = "The 123 Bank of Bronx";
            let website = "www.website.tld";
            let facebookUrl = "Facebook";
            let twitterUrl = "twitter";
            let linkedinUrl = "linkedin";
            let xingUrl = "xing";
            let socialmediaUrl = "social media url";
            let language = "English";
            let timezone = "US/New York";
            let note = "Reach/Contact customer only through whatsapp";

            chai.request(serverApp)
                .post('/data/customer/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    companyName: companyName,
                    forename: forename,
                    surname: surname,
                    email: email,
                    telephone: telephone,
                    street: street,
                    city: city,
                    postCode: postCode,
                    country: country,
                    IBAN: IBAN,
                    BIC: BIC,
                    bankInformation: bankInformation,
                    website: website,
                    facebookUrl: facebookUrl,
                    twitterUrl: twitterUrl,
                    linkedinUrl: linkedinUrl,
                    xingUrl: xingUrl,
                    socialmediaUrl: socialmediaUrl,
                    language: language,
                    timezone: timezone,
                    note: note
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.companyName.should.be.eql(companyName);
                    res.body.forename.should.be.eql(forename);
                    res.body.surname.should.be.eql(surname);
                    res.body.email.should.be.eql(email);
                    res.body.telephone.should.be.eql(telephone);
                    res.body.street.should.be.eql(street);
                    res.body.city.should.be.eql(city);
                    res.body.postCode.should.be.eql(postCode);
                    res.body.country.should.be.eql(country);
                    res.body.IBAN.should.be.eql(IBAN);
                    res.body.BIC.should.be.eql(BIC);
                    res.body.bankInformation.should.be.eql(bankInformation);
                    res.body.website.should.be.eql(website);
                    res.body.facebookUrl.should.be.eql(facebookUrl);
                    res.body.twitterUrl.should.be.eql(twitterUrl);
                    res.body.linkedinUrl.should.be.eql(linkedinUrl);
                    res.body.xingUrl.should.be.eql(xingUrl);
                    res.body.socialmediaUrl.should.be.eql(socialmediaUrl);
                    res.body.language.should.be.eql(language);
                    res.body.timezone.should.be.eql(timezone);
                    res.body.note.should.be.eql(note);
                    should.exist(res.body._id);
                    done();
                });
        });
    });

    //Get Customer by id - GET
    describe('## /Customer (GET) - Get Customer by id', () => {
        it('Should get Customer by id ', (done) => {
            let companyName = "The Company LLC";
            let forename = "John";
            let surname = "Doe";
            let email = "john.doe@mail.tld";
            let telephone = "+1-123-456";
            let street = "New Street 987";
            let city = "Bronx";
            let postCode = 19835;
            let country = "USA";
            let IBAN = "USBWKDO123456789";
            let BIC = "BWKEDMS";
            let bankInformation = "The 123 Bank of Bronx";
            let website = "www.website.tld";
            let facebookUrl = "Facebook";
            let twitterUrl = "twitter";
            let linkedinUrl = "linkedin";
            let xingUrl = "xing";
            let socialmediaUrl = "social media url";
            let language = "English";
            let timezone = "US/New York";
            let note = "Reach/Contact customer only through whatsapp";

            chai.request(serverApp)
                .post('/data/customer/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    companyName: companyName,
                    forename: forename,
                    surname: surname,
                    email: email,
                    telephone: telephone,
                    street: street,
                    city: city,
                    postCode: postCode,
                    country: country,
                    IBAN: IBAN,
                    BIC: BIC,
                    bankInformation: bankInformation,
                    website: website,
                    facebookUrl: facebookUrl,
                    twitterUrl: twitterUrl,
                    linkedinUrl: linkedinUrl,
                    xingUrl: xingUrl,
                    socialmediaUrl: socialmediaUrl,
                    language: language,
                    timezone: timezone,
                    note: note
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .get('/data/customer/get/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.companyName.should.be.eql(companyName);
                            should.exist(res.body._id);
                            done();
                        });
                });
        });
    });

    //Delete Customer by id - GET
    describe('## /Customer (GET) - Delete Customer by id', () => {
        it('Should delete Customer by the id ', (done) => {
            let companyName = "The Company LLC";
            let forename = "John";
            let surname = "Doe";
            let email = "john.doe@mail.tld";
            let telephone = "+1-123-456";
            let street = "New Street 987";
            let city = "Bronx";
            let postCode = 19835;
            let country = "USA";
            let IBAN = "USBWKDO123456789";
            let BIC = "BWKEDMS";
            let bankInformation = "The 123 Bank of Bronx";
            let website = "www.website.tld";
            let facebookUrl = "Facebook";
            let twitterUrl = "twitter";
            let linkedinUrl = "linkedin";
            let xingUrl = "xing";
            let socialmediaUrl = "social media url";
            let language = "English";
            let timezone = "US/New York";
            let note = "Reach/Contact customer only through whatsapp";

            chai.request(serverApp)
                .post('/data/customer/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    companyName: companyName,
                    forename: forename,
                    surname: surname,
                    email: email,
                    telephone: telephone,
                    street: street,
                    city: city,
                    postCode: postCode,
                    country: country,
                    IBAN: IBAN,
                    BIC: BIC,
                    bankInformation: bankInformation,
                    website: website,
                    facebookUrl: facebookUrl,
                    twitterUrl: twitterUrl,
                    linkedinUrl: linkedinUrl,
                    xingUrl: xingUrl,
                    socialmediaUrl: socialmediaUrl,
                    language: language,
                    timezone: timezone,
                    note: note
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .delete('/data/customer/delete/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });

    });

    //Get All Customer - GET
    describe('## /Customer (GET) - Get All Customer', () => {
        it('Should get All Customer ', (done) => {
            let companyName = "The Company LLC";
            let forename = "John";
            let surname = "Doe";
            let email = "john.doe@mail.tld";
            let telephone = "+1-123-456";
            let street = "New Street 987";
            let city = "Bronx";
            let postCode = 19835;
            let country = "USA";
            let IBAN = "USBWKDO123456789";
            let BIC = "BWKEDMS";
            let bankInformation = "The 123 Bank of Bronx";
            let website = "www.website.tld";
            let facebookUrl = "Facebook";
            let twitterUrl = "twitter";
            let linkedinUrl = "linkedin";
            let xingUrl = "xing";
            let socialmediaUrl = "social media url";
            let language = "English";
            let timezone = "US/New York";
            let note = "Reach/Contact customer only through whatsapp";

            chai.request(serverApp)
                .post('/data/customer/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    companyName: companyName,
                    forename: forename,
                    surname: surname,
                    email: email,
                    telephone: telephone,
                    street: street,
                    city: city,
                    postCode: postCode,
                    country: country,
                    IBAN: IBAN,
                    BIC: BIC,
                    bankInformation: bankInformation,
                    website: website,
                    facebookUrl: facebookUrl,
                    twitterUrl: twitterUrl,
                    linkedinUrl: linkedinUrl,
                    xingUrl: xingUrl,
                    socialmediaUrl: socialmediaUrl,
                    language: language,
                    timezone: timezone,
                    note: note
                })
                .end((err, res) => {
                    companyName = "ABC Big Company LLC";
                    chai.request(serverApp)
                        .post('/data/customer/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            companyName: companyName,
                            forename: forename,
                            surname: surname,
                            email: email,
                            telephone: telephone,
                            street: street,
                            city: city,
                            postCode: postCode,
                            country: country,
                            IBAN: IBAN,
                            BIC: BIC,
                            bankInformation: bankInformation,
                            website: website,
                            facebookUrl: facebookUrl,
                            twitterUrl: twitterUrl,
                            linkedinUrl: linkedinUrl,
                            xingUrl: xingUrl,
                            socialmediaUrl: socialmediaUrl,
                            language: language,
                            timezone: timezone,
                            note: note
                        })
                        .end((err, res) => {
                            chai.request(serverApp)
                                .get('/data/customer/all')
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

    //Update one Customer - POST
    describe('## /Customer (POST) - Update One Customer', () => {
        it('Should Update A Customer ', (done) => {
            let companyName = "The Company LLC";
            let forename = "John";
            let surname = "Doe";
            let email = "john.doe@mail.tld";
            let telephone = "+1-123-456";
            let street = "New Street 987";
            let city = "Bronx";
            let postCode = 19835;
            let country = "USA";
            let IBAN = "USBWKDO123456789";
            let BIC = "BWKEDMS";
            let bankInformation = "The 123 Bank of Bronx";
            let website = "www.website.tld";
            let facebookUrl = "Facebook";
            let twitterUrl = "twitter";
            let linkedinUrl = "linkedin";
            let xingUrl = "xing";
            let socialmediaUrl = "social media url";
            let language = "English";
            let timezone = "US/New York";
            let note = "Reach/Contact customer only through whatsapp";

            chai.request(serverApp)
                .post('/data/customer/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    companyName: companyName,
                    forename: forename,
                    surname: surname,
                    email: email,
                    telephone: telephone,
                    street: street,
                    city: city,
                    postCode: postCode,
                    country: country,
                    IBAN: IBAN,
                    BIC: BIC,
                    bankInformation: bankInformation,
                    website: website,
                    facebookUrl: facebookUrl,
                    twitterUrl: twitterUrl,
                    linkedinUrl: linkedinUrl,
                    xingUrl: xingUrl,
                    socialmediaUrl: socialmediaUrl,
                    language: language,
                    timezone: timezone,
                    note: note
                })
                .end((err, res) => {
                    companyName = "The New Company LLC";
                    chai.request(serverApp)
                        .post('/data/customer/update')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            companyName: companyName,
                            forename: forename,
                            surname: surname,
                            email: email,
                            telephone: telephone,
                            street: street,
                            city: city,
                            postCode: postCode,
                            country: country,
                            IBAN: IBAN,
                            BIC: BIC,
                            bankInformation: bankInformation,
                            website: website,
                            facebookUrl: facebookUrl,
                            twitterUrl: twitterUrl,
                            linkedinUrl: linkedinUrl,
                            xingUrl: xingUrl,
                            socialmediaUrl: socialmediaUrl,
                            language: language,
                            timezone: timezone,
                            note: note
                        })
                        .end((err, res) => {
                            const createdId = res.body._id;
                            chai.request(serverApp)
                                .get('/data/customer/get/byId/' + createdId)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.companyName.should.be.eql(companyName);
                                    done();
                                });
                        });
                });
        });
    });
});