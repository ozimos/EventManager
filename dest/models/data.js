"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports.centers = void 0;
var centers = [{
  id: 1,
  name: 'Muson Center',
  description: 'a  beautiful and spacious edifice situated in a scenic location',
  cost: 100000,
  capacity: 1000,
  location: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Ikorodu'
  },
  amenities: ['Pool', 'Bar', 'Theater'],
  eventType: ['Cocktail', 'Birthday', 'Wedding']
}, {
  id: 2,
  name: 'The Dome',
  description: 'a  beautiful and spacious edifice situated in a scenic location',
  cost: 200000,
  capacity: 5000,
  location: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'VI'
  },
  amenities: ['Pool', 'Bar'],
  eventType: ['Cocktail', 'Birthday', 'Wedding']
}];
exports.centers = centers;
var events = [{
  id: 1,
  name: "Jason's Birthday",
  type: ['Cocktail', 'Birthday', 'Wedding'],
  centerID: 100,
  duration: 1,
  startDate: '2017-12-15',
  estimatedAttendance: 1000
}, {
  id: 2,
  name: 'Award Night',
  type: ['Cocktail', 'Conference'],
  centerID: 200,
  duration: 2,
  startDate: '2017-12-17',
  estimatedAttendance: 5000
}];
exports.events = events;