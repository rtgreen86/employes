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
    describe('employees', () => {
      const firstName = 'Christopher';
      const lastName = 'Pike';
      const notes = 'Test employee.';

      let id;

      beforeAll(async () => {
        id = await tables.employees.insert({ firstName, lastName, notes });
      });

      test('insert and select record', async () => {
        const record = await tables.employees.select({ id });
        expect(record).toEqual({
          id,
          firstName,
          lastName,
          photo: null,
          notes,
        });
      });

      afterAll(async () => {
        await tables.employees.delete({ id });
        await expect(tables.employees.select({ id })).resolves.toBe(undefined);
      });
    });

    describe('departments', () => {
      const name = 'IT';
      const description = 'IT department.';

      let id;

      beforeAll(async () => {
        id = await tables.departments.insert({ name, description });
      });

      test('insert and select record', async () => {
        const record = await tables.departments.select({ id });
        expect(record).toEqual({ id, name, description });
      });

      afterAll(async () => {
        await tables.departments.delete({ id });
        await expect(tables.departments.select({ id })).resolves.toBe(undefined);
      });
    });

    describe('messages', () => {
      const sender = 0;
      const recipient = 1;
      const date = '2024-01-01';
      const subject = 'Test';
      const text = 'This is test message.';

      let id;

      beforeAll(async () => {
        id = await tables.messages.insert({ sender, recipient, date, subject, text });
      });

      test('insert and select record', async () => {
        const record = await tables.messages.select({ id });
        expect(record).toEqual({ id, sender, recipient, date, subject, text });
      });

      afterAll(async () => {
        await tables.messages.delete({ id });
        await expect(tables.messages.select({ id })).resolves.toBe(undefined);
      });
    });

    describe('images', () => {
      const owner = 0;
      const date = '2024-01-01';
      const caption = 'Test image';
      const size = 512;
      const path = '/test.png';

      let id;

      beforeAll(async () => {
        id = await tables.images.insert({ owner, date, caption, size, path });
      });

      test('insert and select record', async () => {
        const record = await tables.images.select({ id });
        expect(record).toEqual({ id, owner, date, caption, size, path });
      });

      afterAll(async () => {
        await tables.images.delete({ id });
        await expect(tables.images.select({ id })).resolves.toBe(undefined);
      });
    });
  });
});
