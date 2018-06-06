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
      '/rws-team-service',
      '',
      {success: true}
    ),
    new Resource(
      '/rws-classification-service',
      '',
      {
        success: true,
        status: "OK",
        took: 0,
        data:
        [
          {classification: 1, name: 'Team 1', pj: 30, pg: 23, pe: 7, pp: 0, gf: 76, gc: 15, ptos: 76},
          {classification: 2, name: 'Team 2', pj: 30, pg: 20, pe: 7, pp: 3, gf: 50, gc: 14, ptos: 67},
          {classification: 3, name: 'Team 3', pj: 30, pg: 19, pe: 6, pp: 5, gf: 76, gc: 33, ptos: 63},
          {classification: 4, name: 'Team 4', pj: 30, pg: 19, pe: 5, pp: 6, gf: 58, gc: 31, ptos: 62},
          {classification: 5, name: 'Team 5', pj: 30, pg: 14, pe: 5, pp: 11, gf: 40, gc: 34, ptos: 47},
          {classification: 6, name: 'Team 6', pj: 30, pg: 14, pe: 4, pp: 12, gf: 50, gc: 53, ptos: 46},
          {classification: 7, name: 'Team 7', pj: 30, pg: 14, pe: 4, pp: 12, gf: 39, gc: 46, ptos: 46},
          {classification: 8, name: 'Team 8', pj: 30, pg: 12, pe: 8, pp: 10, gf: 44, gc: 43, ptos: 44},
          {classification: 9, name: 'Team 9', pj: 30, pg: 11, pe: 7, pp: 12, gf: 46, gc: 43, ptos: 40},
          {classification: 10, name: 'Team 10', pj: 30, pg: 11, pe: 7, pp: 12, gf: 36, gc: 43, ptos: 40}
        ]
      }
    ),
    new Resource(
      '/rws-bff-boilerplate/api/application-header-help',
      '',
      {
        success: true,
        status: "OK",
        took: 0,
        data: 
        {
          codCia: '2',
          context: 'ngx-boilerplate', 
          pageId: 'main', 
          url: 'https://www.google.es', 
          description: 'Sample page', 
          lang: 'ES'
        }
      }
    ),
    new Resource(
      '/rws-bff-boilerplate/api/logs',
      '',
      {
        success: true,
        status: "OK",
        took: 0
      }
    ),
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
