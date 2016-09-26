# `abase` <small>("_a [Base](https://en.wiktionary.org/wiki/base#Noun)_")</small>

A _Base_ for building reliable web apps quickly.

## _Why_?

Keeping people's (_personal_) data safe is _essential_ in every web application
that requires _personalisation_.
Yet writing the `code` to help people _manage_ their own data can be quite
tedious and usually is _not_ the "_core competence_" of most web apps.

We found that we had built/re-built the "user" registration/verification/login,
"manage my profile/preferences" and permissions/roles "workflow" enough times
that it was time to make something generic & re-useable.

> <small>You _can_ pay a 3rd Party "Auth"-as-a-Service Provider and have them
manage your ("_user_") data on a server you have _no control_ over and
pay them for each registration/login event ... for some companies
this is a good option because they don't have to _think_ about where
the data is stored, however we prefer to know _exactly_ where data is
stored, how it's encrypted and who can access it.˜</small>

## _What_?

### Distinguishing/Differntiating Features

+ A Secure way of storing people's personal data.
+ Plain English Access controls
+ Mobile First/Optimised (Responsive) UI (_view/edit data on any device_)
+ Server-side Rendered (_for speed_) with client-side (_progressive_) enhancement (_for user experience_)

## _Who_?


### Who _Should_ Use This?

Anyone building a web app (where the experience is personalised) and wants to _know_ where/how data is stored and thus _ensure_ that customer data is not being _miss-managed_ or [sold](https://codingvc.com/the-value-of-data-part-3-data-business-models) (_which we think_ [***wrong***]()).


## _How_?

### Requirements

+ Simple UI/UX for people to
  + register
  + login
  + verify (their email)
  + re-set password
  + view/update any other personal details once logged in
+ REST API Endpoint for all actions (_when content-type is **not** set to `text/html`_)
+ HTML Responses for all endpoints that request content-type
<br /><br />

# _tl;dr_

### Why Build a _New_ Tool/Service?

There are _many_ platforms for "User" (_people_) authentication and personal
data storage/management, why build _another_ one?

Simple: to incorporate the all the _best_ ideas/practices we like
and have an _extensible_ (_plugin-based_) platform anyone can add to/build upon.

### Why PostgreSQL?

While there is a lot of _hype_ surrounding NoSQL Databases like MongoDB & Redis,
we _found_ we were having to write a lot of code to do _useful_ queries.
And while de-normalising data might "_make sense_" for "_scalability_" in _theory_,
what we found in _practice_ is that even with ***100 Billion Records*** (_way more users than 99.99% of companies/startups!_)
a well-managed PostgreSQL cluster copes very well.

> Make up your own mind: https://www.postgresql.org/about  
> If you're still Curious or Worried about scaling PostgreSQL?
see: https://www.citusdata.com
> Want to model the network of people as a graph? https://github.com/cayleygraph/cayley

# First version

## Endpoints

When the abase plugin is added to an Hapi application it will automatically create 6 endpoints:

- /signup:
  - GET: display a simple signup form
  - POST: create a new user in the database (email, password)
- /login, GET: display the login form
  - GET: display a simple form for login (email, password)
- /user/list:
  - GET: display all the users
- /users/detail/{idUser}:
  - GET: display the information of a user
- /user/edit/{idUser}:
  - GET: display the from where the information of a user can be edited
  - POST: save the new information of the user in the database
- /config/user:
  - GET: display form where an "admin" of the application can add field to the user structure
  - POST: add new field into the structure user (ex: "name" field with the type string)

## Configuration

There are at the moment 3 config files:

- example_config_2.json: define the pages(endpoints) and which fields should be displayed on these pages

- fields.json: define the structure of the user object. The endpoint /config/user is managing this config files

- types.json: define the type of the fields which can be used in the user structure, ex: string, boolean, password... These types are mapped to an html representation, ex string -> an input with the type text; password -> an input with the type password; boolean -> a checkbox This allow the plugin to know which html to render depeding of the structure of the user and it allow us to have a dynamic structure (add/remove new field)

We are currently using Handlebars to render the different types of field. For that each type is define as a handlebars partial (see render/partials)




