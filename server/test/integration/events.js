/* eslint-disable no-console */
import {
  Center,
  User,
  Event,
  jwt,
  expect,
  request
} from './helpers';

/**
 * function to generate valid dates for events
 * ensure  dates are in the present
 * @param {Date} refDate a reference date
 * @param {Array} [rest=[]] an array of days offset from refDate
 * @returns {Date} Date
 */
function validDate(refDate, rest = []) {
  const refMilSecs = refDate ? refDate.getTime() : Date.now();
  const offsetDays = rest.reduce((accum, curr) => accum + curr, 1);
  const newDate = new Date(refMilSecs + (offsetDays * 24 * 60 * 60 * 1000));
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
}
const initDate = validDate();
const initDays = 2;
const finishDate = new Date(initDate);
finishDate.setUTCDate(finishDate.getUTCDate() + initDays);
const dates = [initDate, finishDate];

describe('Routes Events', () => {
  const defaultUser = {
    id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    userName: 'admin',
    firstName: 'Tovieye',
    lastName: 'Ozi',
    email: 'ad.min@gmail.com',
    passwordHash: 'abc123',
    isAdmin: true
  };
  const defaultCenter = {
    id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
    name: 'Baranduil',
    description: 'a  dark and dank castle shrouded in gloom',
    cost: 50000,
    capacity: 5000,
    country: 'Algeria',
    state: 'Lagos',
    lga: 'Oshodi',
    amenities: ['Pool', 'Bar'],
    eventType: ['Cocktail', 'Birthday'],
    userId: defaultUser.id
  };
  const defaultEvent = {
    id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    name: 'ZAL',
    type: ['Cocktail', 'Dinner'],
    centerId: defaultCenter.id,
    userId: defaultUser.id,
    numOfDays: initDays,
    startDate: initDate,
    dates,
    estimatedAttendance: 5000,
  };
  const payload = {
    isAdmin: defaultUser.isAdmin,
    id: defaultUser.id
  };
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    timeZoneName: 'short'
  };
  const rootURL = '/api/v1';
  const eventsUrl = `${rootURL}/events`;
  const eventIdUrl = `${rootURL}/events/${defaultEvent.id}`;

  // truncates Event, Center, User and creates new row entries before test
  // Creates JWT before test
  let token;
  before(async () => {
    try {
      await Event.truncate({
        cascade: true
      });
      await Center.truncate({
        cascade: true
      });
      await User.truncate({
        cascade: true
      });
      await User.create(defaultUser);
      await Center.create(defaultCenter);
      await Event.create(defaultEvent);
      token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      });
    } catch (error) {
      console.log(error);
    }
  });


  // Create A Event
  describe('POST /events', () => {
    const newEvent = {
      name: 'ZAL',
      type: ['Cocktail', 'Dinner'],
      centerId: defaultCenter.id,
      numOfDays: 2,
      startDate: validDate(defaultEvent.startDate, [200]),
      estimatedAttendance: 5000,
    };
    it('should create an event if the event date(s) has not been booked', () => request.post(eventsUrl).set('authorization', `JWT ${token}`)
      .send(newEvent).then((res) => {
        expect(res.body.name).to.equal(newEvent.name);
        expect(newEvent.startDate.toISOString()).to.have.string(res.body.startDate);
        expect(res.body.userId).to.equal(payload.id);
      }));
  });
  // Get All Events
  describe('GET /events', () => {
    it('should return a list of events', () => request.get(eventsUrl)
      .then((res) => {
        expect(res.body).to.an('array');
        expect(res.body[0].name).to.equal(defaultEvent.name);
        expect(defaultEvent.startDate.toISOString()).to.have.string(res.body[0].startDate);
      }));
  });
  // Get One Event
  describe('GET /events/:id', () => {
    it('should return an event', () =>
      request.get(eventIdUrl)
        .then((res) => {
          expect(res.body.name).to.equal(defaultEvent.name);
          expect(defaultEvent.startDate.toISOString()).to.have.string(res.body.startDate);
        }));
  });
  // Update A Event
  describe('PUT /events/:id', () => {
    const updatedEvent = {
      name: 'Updated event',
      startDate: validDate(defaultEvent.startDate, [2]),
    };

    it('should update an event', () => request.put(eventIdUrl)
      .set('authorization', `JWT ${token}`).send(updatedEvent).then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[1][0].name).to.equal(updatedEvent.name);
        expect(updatedEvent.startDate.toISOString()).to.have.string(res.body[1][0].startDate);
      }));
  });
});