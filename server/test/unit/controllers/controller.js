import {
  expect
} from 'chai';
import td from 'testdouble';
import Controller from '../../../controllers/controller.js';

const Table = td.object();
const controller = new Controller(Table);
describe('Center Controllers', () => {
  afterEach(() => td.reset());
  describe('getAllRows()', () => {
    it('should return a list of centers if data is returned from database', () => {
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

      td.when(Table.findAll()).thenResolve(expectedResponse);

      controller.getAllRows()
        .then(response => expect(response.data).to.eql(expectedResponse));
    });
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'no records available';

      td.when(Table.findAll()).thenResolve([]);
      controller.getAllRows()
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.findAll()).thenReject(error);
      controller.getAllRows()
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('getRowById()', () => {
    const req = {
      params: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
      }
    };
    it('should return a center if data is returned from database', () => {
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

      td.when(Table.findById(req.params.id)).thenResolve(expectedResponse);


      controller.getRowById(req)
        .then(response => expect(response.data).to.eql(expectedResponse));
    });
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'no records available';

      td.when(Table.findById(req.params.id)).thenResolve(null);
      controller.getRowById(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.findById(req.params.id)).thenReject(error);
      controller.getRowById(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('createRow()', () => {
    it('should create a center', () => {
      const req = {
        body: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
          centerName: 'Baranduil',
          description: 'a  dark and dank castle shrouded in gloom',
          country: 'Nigeria',
        }
      };
      const res = {
        body: {
          state: 'Lagos',
          lga: 'Oshodi',
          capacity: 1500,
          cost: 100000.00,
          userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
        }
      };
      td.when(Table.create(req.body)).thenResolve(res.body);
      controller.createRow(req)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.data).to.eql(res.body);
        });
    });
    it('should return an error message if error occurs when accessing database', () => {
      const req = {
        body: 'wrong input',
      };
      const error = {
        message: 'database error'
      };
      td.when(Table.create(req.body)).thenReject(error);
      controller.createRow(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('updateRow()', () => {
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
    it('should update a center', () => {
      td.when(Table.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      })).thenResolve(req.body);

      controller.updateRow(req)
        .then(response =>
          expect(response.data).to.eql(req.body));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      })).thenReject(error);
      controller.updateRow(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });
  describe('deleteRow()', () => {
    const req = {
      params: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
      }
    };
    it('should delete an event', () => {
      const req = {
        params: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
        }
      };
      td.when(Table.destroy({
        where: {
          id: req.params.id
        },
      })).thenResolve(1);
      controller.deleteRow(req)
        .then(response =>
          expect(response.data).to.eql(1));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.destroy({
        where: {
          id: req.params.id
        },
      })).thenReject(error);
      controller.deleteRow(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });
});