import express from 'express';

const router = express.Router();
 router.use('events',  import events from 'events')
export router;
const centers = [{
  centerId: 1,
  centerName: 'Muson Center',
  centerCost: 100000,
  centerCapacity: 1000,
  centerImage: '',
  centerLocation: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Ikorodu'
  },
  centerAmenities: ['Pool', 'Bar', 'Theater',],
  centerEventType: ['Cocktail', 'Birthday', 'Wedding']

},

{
  centerId: 2,
  centerName: 'The Dome',
  centerCost: 200000,
  centerCapacity: 5000,
  centerImage: 'dome.jpg',
  centerLocation: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'VI'
  },
  centerAmenities: ['Pool', 'Bar'],
  centerEventType: ['Cocktail', 'Birthday', 'Wedding']

}
];
