import {
  expect
} from 'chai';
import td from 'testdouble';
import httpMocks from 'node-mocks-http';
import Controller from '../../../controllers/controller.js';

describe('Center Controllers', () => {
  describe('getAllRows()', () => {
    const Centers = {
      findAll: td.function(),
    };

    const expectedResponse = [{
      id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
      centerName: 'Wembelton',
      description: 'a  dark and dank castle shrouded in gloom',
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Oshodi',
      capacity: 1500,
      cost: 100000.00,
      userId: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
    },
    {
      id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
      centerName: 'Baranduil',
      description: 'a  dark and dank castle shrouded in gloom',
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Oshodi',
      capacity: 1500,
      cost: 100000.00,
      userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    }
    ];

    td.when(Centers.findAll()).thenResolve(expectedResponse);

    const controller = new Controller(Centers);
    const req = httpMocks.createRequest();
    it('should return a list of centers', () => controller.getAllRows(req)
      .then(response => expect(response.data).to.eql(expectedResponse)));
  });

  describe('getRowById()', () => {
    it('should return a center', () => {
      const Centers = {
        findById: td.function(),
      };

      const expectedResponse = {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
        centerName: 'Baranduil',
        description: 'a  dark and dank castle shrouded in gloom',
        country: 'Nigeria',
        state: 'Lagos',
        lga: 'Oshodi',
        capacity: 1500,
        cost: 100000.00,
        userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
      };
      const req = httpMocks.createRequest({
        params: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
        }
      });
      td.when(Centers.findById(req.params.id)).thenResolve(expectedResponse);

      const controller = new Controller(Centers);

      return controller.getRowById(req)
        .then(response => expect(response.body).to.eql(expectedResponse));
    });
  });

  describe('createRow()', () => {
    it('should create a center', () => {
      const Centers = {
        create: td.function(),
      };

      const req = {
        body: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
          centerName: 'Baranduil',
          description: 'a  dark and dank castle shrouded in gloom',
          country: 'Nigeria',
          state: 'Lagos',
          lga: 'Oshodi',
          capacity: 1500,
          cost: 100000.00,
          userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
        }
      };

      td.when(Centers.create(req.body)).thenResolve(req.body);

      const controller = new Controller(Centers);
      return controller.createRow(req)
        .then((response) => {
          expect(response.statusCode).to.eql(201);
          expect(response.data).to.eql(req.body);
        });
    });
  });

  describe('updateRow()', () => {
    it('should update a center', () => {
      const Centers = {
        update: td.function(),
      };

      const req = {
        body: {
          id: 1,
          centerName: 'Wembelton',
          location: 'Bayelsa',
          capacity: 1500,
          cost: 100000.00,
          userId: 5,
        },
        params: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
        }
      };
      td.when(Centers.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      })).thenResolve(req.body);

      const controller = new Controller(Centers);
      return controller.updateRow(req)
        .then(response =>
          expect(response.data).to.eql(req.body));
    });
  });
  describe('deleteRow()', () => {
    it('should delete an event', () => {
      const Event = {
        destroy: td.function(),
      };
      const req = {
        params: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
        }
      };
      td.when(Event.destroy({
        where: {
          id: req.params.id
        },
      })).thenResolve(1);
      const controller = new Controller(Event);
      return controller.destroy(req)
        .then(response =>
          expect(response.data).to.eql(1));
    });
  });
});