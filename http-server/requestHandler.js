'use strict'
var url = require ('url')

var fs = require('fs')

var requestHandler = function ( request, response, callback ){

  var responseBody = ''

  var requestUrl = url.parse(request.url, true)

  var pages = [
    {
      url: '/',
      content: '<a href="/first-of-pair">first-of-pair</a></br><a href="/second-of-pair">second-of-pair</a></br><a href="/the-pair">the-pair</a>'
    },
    {
      url: '/first-of-pair',
      content: '<p>And in the beginning there was the First Pair</p>'
    },
    {
      url: '/second-of-pair',
      content: '<p>and on the second day he separated the first pair from the second</p>'
    },
    {
      url: '/the-pair',
      content: '<p>The pair both have suspicious moustaches</p>'
    },
    {
      url: '/greeting',
      content: '<p>Welcome, ' + requestUrl.query.name + '!</p>'
    }
  ]

  response.statusCode = 200

  var selectedPage = pages.filter(function(element){
      return element.url === requestUrl.pathname
  })

  var fileToRead = 'home.html'

  //To use with Files on HDD
  if(selectedPage.length > 0)
  {
    fileToRead = selectedPage[0].url.replace('/','') + '.html'
  }
  else {
    fileToRead = '404.html'
  }

  fs.readFile(fileToRead, function(err, data){
      
      responseBody = data.toString()
      response.end(responseBody)
      callback(err, data)
    })

  // if(selectedPage.length > 0)
  // {
  //   responseBody = selectedPage[0].content
  // }
  // else {
  //   response.statusCode = 404
  //   responseBody = '<p>URL not found, you plum</p>'
  // }
  //
  // response.end(responseBody)
}

module.exports = requestHandler
