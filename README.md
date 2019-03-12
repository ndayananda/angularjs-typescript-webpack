# angularjs-typescript-webpack UI Application

angularjs-typescript-webpack UI is a single page application built using AngularJS 1.6, Typescript, Webpack 3

# Modular architecture

Each module in an Angular app is a module component. A module component is the root definition for that module that encapsulates the logic, templates, routing and child components.

### Module theory

The design in the modules maps directly to our folder structure, which keeps things maintainable and predictable. "app.ts" is the root module which defines the base module that bootstraps our app. We then import our core, layout and other modules into the root module to include our dependencies. The core module require lower-level reusable modules, services, directives, filters which can be used across the application. The layout module contains the common modules across the application like header, footer, left navigation etc. The shared folder contains our components, controllers, services, directives, filters and tests for each reusable feature.

### File naming conventions

Keep it simple and lowercase, use the component name, e.g. `users.*.js*`, `layout.*.js` - with the name of the type of file in the middle. Use `*.module.js` for the module definition file, as it keeps it verbose and consistent with Angular.

```
users.module.js
users.component.js
users.service.js
users.directive.js
users.filter.js
usrs.spec.js
users.template.html
users.scss

```

### Scalable file structure

File structure is extremely important, this describes a scalable and predictable structure.

The high level folder structure simply contains `index.html` and `app/`, a directory in which all our root, core, layout, shared and smp modules live along with the markup and styles for each component.

# Components

### Component theory

Components are essentially templates with a controller. They are _not_ Directives, nor should you replace Directives with Components, unless you are upgrading "template Directives" with controllers, which are best suited as a component. Components also contain bindings that define inputs and outputs for data and events, lifecycle hooks and the ability to use one-way data flow and event Objects to get data back up to a parent component. These are the new defacto standard in AngularJS 1.5 and above. Everything template and controller driven that we create will likely be a component, which may be a stateful, stateless or routed component. You can think of a "component" as a complete piece of code, not just the `.component()` definition Object. Let's explore some best practices and advisories for components, then dive into how you should be structuring them via stateful, stateless and routed component concepts.

### Supported properties

These are the supported properties for `.component()` that you can/should use:

| Property | Support |
|---|---|
| bindings | Yes, use `'@'`, `'<'`, `'&'` only |
| controller | Yes |
| controllerAs | Yes, default is `$ctrl` |
| require | Yes (new Object syntax) |
| template | Yes |
| templateUrl | Yes |
| transclude | Yes |

### Controllers

Controllers should only be used alongside components, never anywhere else. If you feel you need a controller, what you really need is likely a stateless component to manage that particular piece of behaviour.

Here are some advisories for using `Class` for controllers:

* Drop the name "Controller", i.e. use `controller: class TodoComponent {...}` to aid future Angular migration
* Always use the `constructor` for dependency injection purposes
* Use [ng-annotate](https://github.com/olov/ng-annotate)'s `'ngInject';` syntax for `$inject` annotations
* If you need to access the lexical scope, use arrow functions
* Alternatively to arrow functions, `let ctrl = this;` is also acceptable and may make more sense depending on the use case
* Bind all public functions directly to the `Class`
* Make use of the appropriate lifecycle hooks, `$onInit`, `$onChanges`, `$postLink` and `$onDestroy`
* Note: `$onChanges` is called before `$onInit`, see [resources](#resources) section for articles detailing this in more depth
* Use `require` alongside `$onInit` to reference any inherited logic
* Do not override the default `$ctrl` alias for the `controllerAs` syntax, therefore do not use `controllerAs` anywhere

### One-way dataflow and Events

One-way dataflow was introduced in AngularJS 1.5, and redefines component communication.

Here are some advisories for using one-way dataflow:

* In components that receive data, always use one-way databinding syntax `'<'`
* _Do not_ use `'='` two-way databinding syntax anymore, anywhere
* Components that have `bindings` should use `$onChanges` to clone the one-way binding data to break Objects passing by reference and updating the parent data
* Use `$event` as a function argument in the parent method (see stateful example below `$ctrl.addTodo($event)`)
* Pass an `$event: {}` Object back up from a stateless component (see stateless example below `this.onAddTodo`).
* Bonus: Use an `EventEmitter` wrapper with `.value()` to mirror Angular, avoids manual `$event` Object creation
* Why? This mirrors Angular and keeps consistency inside every component. It also makes state predictable.

### Stateful components

Let's define what we'd call a "stateful component".

* Fetches state, essentially communicating to a backend API through a service
* Does not directly mutate state
* Renders child components that mutate state
* Also referred to as smart/container components

### Stateless components

Let's define what we'd call a "stateless component".

* Has defined inputs and outputs using `bindings: {}`
* Data enters the component through attribute bindings (inputs)
* Data leaves the component through events (outputs)
* Mutates state, passes data back up on-demand (such as a click or submit event)
* Doesn't care where data comes from - it's stateless
* Are highly reusable components
* Also referred to as dumb/presentational components

### Routed components

Let's define what we'd call a "routed component".

* It's essentially a stateful component, with routing definitions
* No more `router.js` files
* We use Routed components to define their own routing logic
* Data "input" for the component is done via the route resolve (optional, still available in the controller with service calls)

# Directives

### Directive theory

Directives gives us `template`, `scope` bindings, `bindToController`, `link` and many other things. The usage of these should be carefully considered now that `.component()` exists. Directives should not declare templates and controllers anymore, or receive data through bindings. Directives should be used solely for decorating the DOM. By this, it means extending existing HTML - created with `.component()`. In a simple sense, if you need custom DOM events/APIs and logic, use a Directive and bind it to a template inside a component. If you need a sensible amount of DOM manipulation, there is also the `$postLink` lifecycle hook to consider, however this is not a place to migrate all your DOM manipulation to, use a Directive if you can for non-Angular things.

Here are some advisories for using Directives:

* Never use templates, scope, bindToController or controllers
* Always `restrict: 'A'` with Directives
* Use compile and link where necessary
* Remember to destroy and unbind event handlers inside `$scope.$on('$destroy', fn);`

### Recommended properties

Due to the fact directives support most of what `.component()` does (template directives were the original component), I'm recommending limiting your directive Object definitions to only these properties, to avoid using directives incorrectly:

| Property | Use it? | Why |
|---|---|---|
| bindToController | No | Use `bindings` in components |
| compile | Yes | For pre-compile DOM manipulation/events |
| controller | No | Use a component |
| controllerAs | No | Use a component |
| link functions | Yes | For pre/post DOM manipulation/events |
| multiElement | Yes | [See docs](https://docs.angularjs.org/api/ng/service/$compile#-multielement-) |
| priority | Yes | [See docs](https://docs.angularjs.org/api/ng/service/$compile#-priority-) |
| require | No | Use a component |
| restrict | Yes | Defines directive usage, always use `'A'` |
| scope | No | Use a component |
| template | No | Use a component |
| templateNamespace | Yes (if you must) | [See docs](https://docs.angularjs.org/api/ng/service/$compile#-templatenamespace-) |
| templateUrl | No | Use a component |
| transclude | No | Use a component |

### Constants or Classes

There are a few ways to approach using ES2015 and directives, either with an arrow function and easier assignment, or using an ES2015 `Class`. Choose what's best for you or your team, keep in mind Angular uses `Class`.

Use "oclazyload": "^1.1.0" when there are many independent modules like Dashboard, Tasks, etc.

# Services

### Service theory

Services are essentially containers for business logic that our components shouldn't request directly. Services contain other built-in or external services such as `$http`, that we can then inject into component controllers elsewhere in our app. We have two ways of doing services, using `.service()` or `.factory()`. With ES2015 `Class`, we should only use `.service()`, complete with dependency injection annotation using `$inject`.

# Styles

Using [Webpack](https://webpack.github.io/) we can now use `import` statements on our `.scss` files in our `*.module.js` to let Webpack know to include that file in our stylesheet. Doing this lets us keep our components isolated for both functionality and style; it also aligns more closely to how stylesheets are declared for use in Angular. Doing this won't isolate our styles to just that component like it does with Angular; the styles will still be usable application wide but it is more manageable and makes our applications structure easier to reason about.

If you have some variables or globally used styles like form input elements then these files should still be placed into the shared `scss` folder. e.g. `shared/sass/_variables.scss`. These global styles can then be `@imported` into your root module (`app.module.ts`) stylesheet like you would normally do.


# JS Standards

Follow JS coding standards
Google: https://google.github.io/styleguide/jsguide.html
Airbnb: https://github.com/airbnb/javascript