const { provider, tables, CreateDatabase } = require('../index.js');

describe('database', () => {
  beforeAll(() => {
    provider.connection.open();
  });

  beforeAll(async () => {
    await new CreateDatabase().execute();
  });

  afterAll(() => {
    provider.connection.close();
  });

  describe('table', () => {
    describe.each([
      [
        'Users',
        {
          Login: 'tester',
          Password: 'password',
          FirstName: 'Christopher',
          LastName: 'Pike',
        }
      ],

      [
        'Employees',
        {
          FirstName: 'Christopher',
          LastName: 'Pike',
          Photo: 0
        }
      ],

      [
        'Departments',
        {
          Name: 'QA',
          Description: 'Quality Assurance'
        }
      ],

      [
        'Notes',
        {
          Author: 0,
          Employee: 0,
          Date: '2024-01-01',
          Text: 'Test Message.'
        }
      ],

      [
        'Images',
        {
          Author: 0,
          Date: '2024-01-01',
          Caption: 'Test photo',
          Size: 512,
          Path: 'images/image-1.png'
        }
      ]
    ])('%s', (table, object) => {
      let id;
      beforeAll(async () => {
        id = await tables[table].insert(object);
      });

      test('insert and select record', async () => {
        const response = await tables[table].select({ Id: id });
        expect(response).toEqual({ Id: id, ...object });
      });

      afterAll(async () => {
        await tables[table].delete({ Id: id });
        await expect(tables[table].select({ Id: id })).resolves.toBe(undefined);
      });
    });

    describe('DepartmentEmployees', () => {
      beforeAll(async () => {
        await tables.DepartmentEmployees.insert({ Department: 100, Employee: 100 });
      });

      test('insert and select record', async () => {
        const response = await tables.DepartmentEmployees.select({ Department: 100, Employee: 100 });
        expect(response).toEqual({ Department: 100, Employee: 100 });
      });

      afterAll(async () => {
        await tables.DepartmentEmployees.delete({ Department: 100, Employee: 100 });
        await expect(tables.DepartmentEmployees.select({ Department: 100, Employee: 100 })).resolves.toBe(undefined);
      });
    });
  });
});
