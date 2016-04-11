'use strict'

var chai = require('chai')
var expect = chai.expect

var requestHandler = require('../requestHandler')

var request = {
  url: '/'
}
var response = {
  responsebody:'',
  statusCode: '',
  end: function (body) {
    this.responseBody = body
  }
}

describe('Given a requestHandler', function(){
  describe('When called ', function(){
    it('Then returns a response', function(){

      requestHandler(request, response)

      expect(response.responseBody).to.not.equal('')
    })
  })

  describe('When called', function () {
    it('it returns 200 as a status code', function () {

      requestHandler(request, response)

      expect(response.statusCode).to.equal(200)
    })
  })
  describe('When called', function(){
    describe('Given the route url ("/")', function(){
      it('returns an HTML page with 3 links', function(){
        requestHandler(request, response)
        expect(response.responseBody).to.have.string('<a href="/first-of-pair">first-of-pair</a>')
        expect(response.responseBody).to.have.string('<a href="/second-of-pair">second-of-pair</a>')
        expect(response.responseBody).to.have.string('<a href="/the-pair">the-pair</a>')
      })
    })
    describe('Given the route of "/first-of-pair"', function(){
      it('Then returns a page containing text about first-of-pair', function(){
        request = {
          url: '/first-of-pair'
        }

        requestHandler(request, response)
        expect(response.responseBody).to.have.string('<p>And in the beginning there was the First Pair</p>')
      })
    })
    describe('Given the route of "/second-of-pair"', function () {
      it('Then returns a page containing text about second of pair', function () {
        request.url = '/second-of-pair'

        requestHandler(request, response)

        expect(response.responseBody).to.have.string('<p>and on the second day he separated the first pair from the second</p>')
      })
    })
    describe('Given the route "/the-pair"', function(){
      it('Then returns a page of text containing things the pair have in common', function(){
        request.url = '/the-pair'

        requestHandler(request, response)

        expect(response.responseBody).to.have.string('<p>The pair both have suspicious moustaches</p>')
      })
    })

    describe('Given a unhandled route', function () {
      it('should direct you to a 404 page with a 404 error', function () {
        request.url = '/three-of-a-kind'
        requestHandler(request, response)
        expect(response.statusCode).to.equal(404)
        expect(response.responseBody).to.have.string('<p>URL not found, you plum</p>')
      })
    })
    describe('Given the route "/greeting" and the querystring parameter name', function(){
      it('Then the greeting "Welcome, Finn!" and the name should be displayed on the screen', function(){
        request.url = '/greeting?name=Finn'

        requestHandler(request, response)

        expect(response.responseBody).to.have.string('<p>Welcome, Finn!</p>')
      })
      it('Then the greeting "Welcome, Smickers" and the name should be displayed on screen for a different name', function () {
        request.url = '/greeting?name=Smickers'

        requestHandler(request, response)

        expect(response.responseBody).to.have.string('<p>Welcome, Smickers!</p>')
      })
    })
  })


})
