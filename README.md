# Integration Tests with NodeJs and GraphQL

### Goal

It is using Docker, so to run it in the CI environment, I need to make sure that the database is up and with all migrations applied before run tests.

**How can I do it?**

The [arojunior/flyway:5.2.4](https://github.com/arojunior/flyway) image help to handle the migrations. It is using the "wait-for-it" script to wait for MySQL container before execute the migrations.

The other helper is the `config/setupTests.js` script. It is used to get the database up and wait for the migrations being applied before start the tests.

### What you can find here

- Boilerplate for NodeJs + GraphQL applications;
- Good example for types and schema organization;
- ESLint already configured.

### Problem that I want to solve for tests

- Reliable test, I mean, not just for schema;
- Easy to setup;
- Easy to understand;
