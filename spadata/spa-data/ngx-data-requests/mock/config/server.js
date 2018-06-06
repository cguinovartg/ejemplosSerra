'use strict';
/**************************************************************************************************
 * This sample demonstrates the most simplistic usage of Swagger-Express-Middleware.
 * It simply creates a new Express Application and adds all of the Swagger middleware
 * without changing any options, and without adding any custom middleware.
 **************************************************************************************************/

// Set the DEBUG environment variable to enable debug output
process.env.DEBUG = 'swagger:middleware';

var util            = require('util'),
    path            = require('path'),
    express         = require('express'),
    swagger         = require('swagger-express-middleware'),
    Middleware      = swagger.Middleware,
    MemoryDataStore = swagger.MemoryDataStore,
    Resource        = swagger.Resource,
    port            = 3000;

var app = express();
/*var middleware = new Middleware(app);*/

var middleware = require('swagger-express-middleware');

middleware(path.join(__dirname, '../backend-definition/backend-definition.yaml'), app, function(err, middleware) {
  // create custom data storage
  var myDB = new MemoryDataStore();
  myDB.save(
    new Resource(
      '/customers',
      '',
      [
        {id: 1, name: 'Mateo', surname: 'Bernal'},
        {id: 2, name: 'Samuel', surname: 'Andreo'},
        {id: 3, name: 'Adrian', surname: 'Nieve'}
      ]
    ),
    new Resource(
      '/language-stadistics',
      '',
      [
        {id: 1, language: 'C+', total: 18},
        {id: 2, language: 'Ruby', total: 15},
        {id: 3, language: 'Phyton', total: 21},
        {id: 4, language: 'Java', total: 23},
        {id: 5, language: 'Javascript', total: 27},
        {id: 6, language: 'C#', total: 29}
      ]
    ),
    new Resource(
      '/rws-widgets-services',
      '',
      {
        success: true,
        status: "OK",
        took: 0,
        data: 
        {
          results: 
          [
            'DRAW00', 
            'SAMPLEWIDGETS/MOLECULES/INPUT$SAMPLEVEHICLEFINDERPAISES', 
            'www.google.es', 
            'www.google.es', 
            'ES'
          ]
        }
      }
    )
  );

  // Obligatorio
  app.use(middleware.metadata());

  // These two middleware don't have any options (yet)
  app.use(
    middleware.CORS(),
    middleware.validateRequest()
  );

  app.use(middleware.files(
      {
        // Serve the Swagger API from "/swagger/api" instead of "/api-docs"
        apiPath: '/',
        // Disable serving the "PetStore.yaml" file
        rawFilesPath: false
      }
    ));

  // The mock middleware will use our custom data store,
  // which we already pre-populated with mock data
  app.use(middleware.mock(myDB));

  app.listen(port, function() {
    console.log('The Swagger Mocked BackEnd is now running at http://localhost:'+port);
  });
});
