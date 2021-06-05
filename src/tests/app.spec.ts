import mocha from 'mocha'
import app from '../app'
import UrlShortnerController from '../controller/urlshortner.controller'
import {strict as assert} from 'assert'
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
var should = chai.should()
const appObj = new app([new UrlShortnerController()]).app
const chairequest = chai.request(appObj).keepOpen();



describe('Wrong requests verification', () => {
    it("should return 404 for wrong route", (done) => {
        chairequest
            .get('/?name')
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})

describe('verify the contoller', () => {
    var creationres:string = ""
    it("should create the new path", (done) => {
        chairequest
            .get('/url?name=https://www.google.com')
            .end((err, res) => {
                res.should.have.status(201);
                res.text.should.be.a('string');
                creationres = res.text
                done();
            })
    })


    it ("should get the same path", (done) => {
        chairequest
            .get('/url?name=https://www.google.com')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql(creationres);
                done();
            })
    })
    // chairequest.close()
})