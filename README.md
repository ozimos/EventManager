# EventsManager

[![Build Status](https://travis-ci.org/ozimos/EventsManager.svg?branch=develop)](https://travis-ci.org/ozimos/EventsManager)
[![Coverage Status by Coveralls](https://coveralls.io/repos/github/ozimos/EventsManager/badge.svg?branch=develop)](https://coveralls.io/github/ozimos/EventsManager?branch=develop)
[![Maintainability by Code Climate](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/ozimos/EventsManager/maintainability)

## What the project does

A full stack app allowing users to schedule and manage events at different facilities
Users can add, change and delete events
Users can perform above actions against facilities.
Users can view facilities based on various criteria such as amenities, availability etc
Administrators can add facilities

## Why the project is useful

Given you manage an events center, this app will help you accept applications to use your center / facilities, and will either decline events when the proposed day is already taken, or suggest an available day

- Introduction/Background Information
- Features
  TECHNOLOGIES USED

## How users can get started with the project

- Requirements
- How to setup the project/Installation/Configuration
- How to run tests

Back-end: Node/Expressjs
Libraries: ES6, Babel-CLI, eslint, Mocha/Chai
Postman

Usage

Clone or download the repo
npm install - to install the dependencies need by the app
npm run start:dev - to run the app
API ENDPOINTS

Request End Point Action Data,
POST /events/  Creates an event,
PUT /events/[eventId] Edit an event ,
DELETE /events/[eventId] Delete an event,
POST /centers/ Add a new center,
GET /centers/ Get all centers,
GET /centers/[centerId] Get a single center,
PUT /centers/[centerId] Modify the details of center.

## Limitations of the project

## Contributing to the project

## Troubleshooting & FAQ

## License

PS: This is merely a guideline, sections and sub-sections can be added and removed based on the project.