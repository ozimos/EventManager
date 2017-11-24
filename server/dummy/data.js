export const centers = [{
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
  centerAmenities: ['Pool', 'Bar', 'Theater'],
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


export const events = [{
  eventId: 1,
  eventName: "Jason's Birthday",
  eventCost: 100000,
  eventCapacity: 1000,
  eventDates: [15 / 12 / 2017, 16 / 12 / 2017],
  centerId: 2,
  centerEventType: ['Cocktail', 'Birthday', 'Wedding']
},

{
  eventId: 2,
  eventName: 'The Dome',
  eventCost: 200000,
  eventCapacity: 5000,
  eventDates: [17 / 12 / 2017, 18 / 12 / 2017, 19 / 12 / 2017],

  centerId: 1,
  centerEventType: ['Cocktail', 'Wedding']

}
];
