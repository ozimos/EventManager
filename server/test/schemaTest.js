import {
  assert
} from 'chai';
import schema from '../middleware/validationSchemas.js';

context('Validation with Joi schemas', () => {
  describe('for POST requests on /api/v1/centers, validation', () => {
    // sample request body data
    const postCenterData = {
      name: 'Muson Center',
      description: 'a  beautiful and spacious edifice situated in a scenic location',
      cost: '100000',
      capacity: '1000',
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Ikorodu',
      amenities: ['Pool', 'Bar', 'Theater'],
      eventType: ['Cocktail', 'Birthday', 'Wedding']
    };
    const validatedPostCenterData = {
      name: 'Muson Center',
      description: 'a  beautiful and spacious edifice situated in a scenic location',
      cost: 100000,
      capacity: 1000,
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Ikorodu',
      amenities: ['Pool', 'Bar', 'Theater'],
      eventType: ['Cocktail', 'Birthday', 'Wedding']
    };

    it('throws error when some required fields are not in request body', () => {
      const modified = Object.assign({}, postCenterData);
      delete modified.capacity;
      const result = schema.postCenter.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });
    it('throws error when unknown fields are in request body', () => {
      const modified = Object.assign({}, postCenterData);
      modified.volume = 'high';
      const result = schema.postCenter.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });
    it('does not throw error when all required fields are in request body', () => {
      const result = schema.postCenter.validate(postCenterData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
    it('converts fields to expected values and types in request body', () => {
      const result = schema.postCenter.validate(postCenterData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
      assert.deepEqual(result.value, validatedPostCenterData, `Joi output: ${result.error}`);
    });
  });
  describe('for POST requests on /api/v1/events, validation', () => {
    // sample request body data
    const postEventData = {
      name: "Jason's Birthday",
      type: ['Cocktail', 'Birthday', 'Wedding'],
      centerId: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
      numOfDays: '1',
      startDate: '2018-02-15',
      estimatedAttendance: '1000',
    };
    const validatedPostEventData = {
      name: "Jason's Birthday",
      type: ['Cocktail', 'Birthday', 'Wedding'],
      centerId: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
      numOfDays: 1,
      // use Date.UTC to avoid problems due to different timezones on  local machines
      startDate: new Date(new Date(Date.UTC(2018, 1, 15))),
      estimatedAttendance: 1000,
    };
    it('throws error when some required fields are not in request body', () => {
      const modified = Object.assign({}, postEventData);
      delete modified.centerId;
      const result = schema.postEvent.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });
    it('throws error when unknown fields are in request body', () => {
      const modified = Object.assign({}, postEventData);
      modified.volume = 'high';
      const result = schema.postEvent.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });
    it('does not throw error when all required fields are in request body', () => {
      const result = schema.postEvent.validate(postEventData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
    it('converts fields to expected values and types in request body', () => {
      const result = schema.postEvent.validate(postEventData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
      assert.deepEqual(result.value, validatedPostEventData, `Joi output: ${result.error}`);
    });
  });
  describe('for PUT requests on /api/v1/events/:id, validation', () => {
    // sample request body data
    const updateCenterData = {
      cost: '100000',
      capacity: '1000',
      country: 'Nigeria',
      eventType: ['Cocktail', 'Birthday', 'Wedding']
    };
    const validatedUpdateCenterData = {
      cost: 100000,
      capacity: 1000,
      country: 'Nigeria',
      eventType: ['Cocktail', 'Birthday', 'Wedding']
    };

    it('does not throw error when request body is empty', () => {
      const result = schema.updateCenter.validate({});
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
    it('does not throw error when not all available fields are in request body', () => {
      const modified = Object.assign({}, updateCenterData);
      delete modified.startDate;
      const result = schema.updateCenter.validate(modified);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
    it('throws error when unknown fields are in request body', () => {
      const modified = Object.assign({}, updateCenterData);
      modified.volume = 'high';
      const result = schema.updateCenter.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });

    it('converts fields to expected values and types in request body', () => {
      const result = schema.updateCenter.validate(updateCenterData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
      assert.deepEqual(result.value, validatedUpdateCenterData, `Joi output: ${result.error}`);
    });
  });
  describe('for PUT requests on /api/v1/events/:id, validation', () => {
    // sample request body data
    const updateEventData = {
      name: "Jason's Birthday",
      type: ['Birthday', 'Wedding'],
      centerId: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
      startDate: '2018-02-16'
    };
    const validatedUpdateEventData = {
      name: "Jason's Birthday",
      type: ['Birthday', 'Wedding'],
      centerId: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
      startDate: new Date(Date.UTC(2018, 1, 16))
    };

    it('does not throw error when request body is empty', () => {
      const result = schema.updateEvent.validate({});
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
    it('does not throw error when not all available fields are in request body', () => {
      const modified = Object.assign({}, updateEventData);
      delete modified.startDate;
      const result = schema.updateEvent.validate(modified);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
    it('throws error when unknown fields are in request body', () => {
      const modified = Object.assign({}, updateEventData);
      modified.volume = 'high';
      const result = schema.updateEvent.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });

    it('converts fields to expected values and types in request body', () => {
      const result = schema.updateEvent.validate(updateEventData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
      assert.deepEqual(result.value, validatedUpdateEventData, `Joi output: ${result.error}`);
    });
  });
  describe('for request.params on GET, PUT and DELETE', () => {
    const test = [{
      id: 'add'
    }, {
      id: '3.5'
    }, {
      id: 3.5
    }];
    const item = {
      id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
    };

    test.forEach((elem) => {
      it(`throws error for non-uuid ${typeof elem.id} parameter: ${elem.id}`, () => {
        const result = schema.param.validate(item);
        assert.notEqual(result.error, null, `Joi output: ${result.error}`);
      });
    });

    it('does not throw error for uuid string parameter c848bf5c-27ab-4882-9e43-ffe178c82602', () => {
      const result = schema.param.validate(item);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
  });
  describe('for POST requests on /api/v1/users, validation', () => {
    // sample request body data
    const postUserData = {
      id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
      userName: 'admin',
      firstName: 'Tovieye',
      lastName: 'Ozi',
      email: 'ad.min@gmail.com',
      password: 'abc123',
      confirmPassword: 'abc123',
      isAdmin: true
    };

    it('throws error when some required fields are not in request body', () => {
      const modified = Object.assign({}, postUserData);
      delete modified.firstName;
      const result = schema.postUsers.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });
    it('throws error when unknown fields are in request body', () => {
      const modified = Object.assign({}, postUserData);
      modified.volume = 'high';
      const result = schema.postUsers.validate(modified);
      assert.notEqual(result.error, null, `Joi output: ${result.error}`);
    });
    it('does not throw error when all required fields are in request body', () => {
      const result = schema.postUsers.validate(postUserData);
      assert.equal(result.error, null, `Joi output: ${result.error}`);
    });
  });
});