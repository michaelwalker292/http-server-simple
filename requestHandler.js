'use strict'
var url = require ('url')

var requestHandler = function ( request, response ){

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

  if(selectedPage.length > 0)
  {
    responseBody = selectedPage[0].content
  }
  else {
    response.statusCode = 404
    responseBody = '<p>URL not found, you plum</p>'
  }

  // switch (requestUrl.pathname)
  // {
  //   case '/':
  //     responseBody = '<a href="/first-of-pair">first-of-pair</a>'
  //     responseBody += '</br><a href="/second-of-pair">second-of-pair</a></br><a href="/the-pair">the-pair</a>'
  //     break;
  //
  //   case '/first-of-pair':
  //     responseBody = '<p>And in the beginning there was the First Pair</p>'
  //     break;
  //
  //   case '/second-of-pair':
  //     responseBody = '<p>and on the second day he separated the first pair from the second</p>'
  //     break;
  //
  //   case '/the-pair':
  //     responseBody = '<p>The pair both have suspicious moustaches</p>'
  //     break;
  //   case '/greeting':
  //     responseBody = '<p>Welcome, ' + requestUrl.query.name + '!</p>'
  //     break;
  //
  //   default:
  //     response.statusCode = 404
  //     responseBody = '<p>URL not found, you plum</p>'
  // }

  response.end(responseBody)
}

module.exports = requestHandler
