export const centers = [{
  id: 1,
  name: 'Muson Center',
  cost: 100000,
  capacity: 1000,
  image: '',
  location: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Ikorodu'
  },
  amenities: ['Pool', 'Bar', 'Theater'],
  eventType: ['Cocktail', 'Birthday', 'Wedding']

},

{
  id: 2,
  name: 'The Dome',
  cost: 200000,
  capacity: 5000,
  image: 'dome.jpg',
  location: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'VI'
  },
  amenities: ['Pool', 'Bar'],
  eventType: ['Cocktail', 'Birthday', 'Wedding']

}
];


export const events = [{
  id: 1,
  name: "Jason's Birthday",
  cost: 100000,
  capacity: 1000,
  dates: ['15 / 12 / 2017', '16 / 12 / 2017'],
  centerId: 2,
  eventType: ['Cocktail', 'Birthday', 'Wedding']
},

{
  id: 2,
  name: 'The Dome',
  cost: 200000,
  capacity: 5000,
  dates: ['17 / 12 / 2017', '18 / 12 / 2017'],

  centerId: 1,
  eventType: ['Cocktail', 'Wedding']

}
];

