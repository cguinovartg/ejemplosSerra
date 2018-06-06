# AllianzSeed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

This project is a proof of concept.

### Development server

There is a mocked server in case the real server is not ready or unavailable. To run the mocked server type the following command

```sh
  npm run mock
```

### Start application locally

We can run our frontEnd application from our localhost and connect to different backEnds. The URLs are already configured and the scripts created. Bellow we have the different options:

- Pointing from localhost to mocked server
```sh
  npm run start:mock
```

- Pointing from localhost to localhost server
```sh
  npm run start
```

- Pointing from localhost to dev server
```sh
  npm run start:dev
```

- Pointing from localhost to integration server
```sh
  npm run start:int
```

- Pointing from localhost to production server
```sh
  npm run start:prod
```

Once the command has finished you can navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Build application

There are different ways to build the application depending on the environment where it will be deployed:

- Deploy for localhost
```sh
  npm run build
```

- Deploy for development, integration and production
```sh
  npm run build:prod
```

Environment file for prod have base_url and domain parameters empty because we will use relative url path on those environments.

### Allianz Libraries
This boilerplate uses 3 different libraries:

- NDBX Library: It's a UI libreary with UI component to be used in order to provide a homogeneous look and feel to all applicationss. To know more about this libreary please visit the following [link](https://api-test.allianz.com/ngx-ndbx-dev/).
- EPAC Library: It's a components library specific to EPAC applications that provides Epac components, services and directives to be used in all EPAC implementations. To know more about this libreary please visit the following [link](https://github.developer.allianz.io/pages/ePac-Core/ngx-epac-components/).
- CORE Library: It's a global core library that provides a set of services and non-ui components to be used in all Angular applications. To know more about this libreary please visit the following [link](https://github.developer.allianz.io/pages/ilt/ngx-core-components/).

### Allianz Tools
Although this boilerplate can be executed by itself, Epac applications used to be developed to be integrated through an iframe or an open window, in any case, some parameters like values or tokens mast be provided by the container. For that, Allianz provides a tool called Dev Container. It can be downloaded from the following [repository](https://github.developer.allianz.io/ePac-Core/ngx-epac-dev-container) and it will integrate the URL of the application inside the container.

### Src directory layout
    .
    ├── app                  
    │   ├── football              # Application modules loaded with lazy load
    │   ├── interfaces            # Application interfaces 
    │   ├── app.component.html         
    │   ├── app.component.scss 
    │   ├── app.component.spec.ts         
    │   ├── app.component.ts          
    │   ├── app.module.ts 
    │   └── app.routing.ts 
    ├──shared
    │   ├── services          
    │   ├── interfaces 
    │   ├── components          
    │   └── shared.module.ts 
    ├──assets
    ├──envionments
    ├──index.html
    ├──...                         # etc.

### Lazy modules directory layout
    .
    ├── football
    │   ├── classification
    │   │   ├── classification.component.html
    │   │   ├── classification.component.scss
    │   │   ├── classification.component.spec.ts
    │   │   ├── classification.component.ts
    │   │   ├── classification.module.ts
    │   │   └── classification.routing.ts
    │   ├── team
    │   │   ├── team.component.html
    │   │   ├── team.component.scss
    │   │   ├── team.component.spec.ts
    │   │   ├── team.component.ts
    │   │   ├── team.module.ts
    │   │   └── team.routing.ts
    │   ├── football.component.html
    │   ├── football.component.scss
    │   ├── football.component.spec.ts
    │   ├── football.component.ts
    │   ├── football.module.ts
    │   └── football.routing.ts                                
    └── ...                                   # etc.

### Shared directory layout
    .
    ├── shared                   
    │   ├── services            # All services
    │   ├── interfaces          # Interfaces made to receive data from services
    │   ├── components          # Dumb components
    │   └── shared.module.ts           
    └── ...                     # etc.

### Lazy Modules

An advantage of using modules to group related pieces of functionality of our application is the ability to load those pieces on demand. Lazy loading modules helps us decrease the startup time. With lazy loading our application does not need to load everything at once, it only needs to load what the user expects to see when the app first loads. Modules that are lazily loaded will only be loaded when the user navigates to their routes.

### Dumb Components

Components without logic that can be used in several places like cards, alerts, popups, etc.

### Interfaces

In this project we use two types of interfaces:
- The first type of interfaces are those that we will use for this particular application.
- The second type, are those we will use for receive data from services.

### Shared.Module.ts

When you write a shared module for your application, that contains stuff you use in other modules in the same app, you typically want all the services in that module shared only once.

If you just put the services in the providers property of the shared module’s NgModule() decorators, you might get weird cases, especially with lazy loading, when it feels like there’s more than one instance of the service. This is bad if you want to have shared state.

So in this application we use a way to write our shared module in which we use ModuleWithProviders, forRoot(), etc

# AllianzTest

This project use a test environment for e2e and unit testing. Currently has two simple e2e tests and two unit test for services.
Download dependencies with `npm install`.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io) with the default environment.
Run `ng test -e dev` or `npm test` to execute the unit test with the environment 'test' (src/environments/environment.dev.ts). 
You can include a new environment adding a new file in that folder and changing .angular-cli.json.
You can modify the behaviour of the script 'npm test' in packaje.json.
Add `--code-coverage` option for export result to the coverage folder or use the script `npm run test:coverage`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/) with the default environment.
Run `ng e2e -e test` or `npm e2e` to execute the unit test with the environment 'test'.
