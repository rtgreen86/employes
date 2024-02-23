const Connection = require('./Connection');

describe('Connection', () => {
  const config = {
    connectionString: ':memory:',
    verbose: true,
  };

  let connection;

  beforeAll(() => {
    connection = new Connection(config);
  });

  beforeAll(async () => {
    await connection.open();
  });

  afterAll(() => {
    connection.close();
  });

  beforeAll(async () => {
    await connection.exec(`
      CREATE TABLE test (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        payload VARCHAR(128)
      );
      INSERT INTO test (id, payload) VALUES (0, "Test 1.");
      INSERT INTO test (id, payload) VALUES (1, "Test 2.");
    `);
  });

  it('all() should select rows', async () => {
    const rows = await connection.all('SELECT * FROM test');
    expect(rows[0]).toEqual({id: 0, payload: 'Test 1.'});
    expect(rows[1]).toEqual({id: 1, payload: 'Test 2.'});
  });

  it('get() should select one record', async () => {
    const row = await connection.get('SELECT * FROM test WHERE id = ?', 0);
    expect(row).toEqual({id: 0, payload: 'Test 1.'});
  });

  it('run() should insert record', async () => {
    const result = await connection.run('INSERT INTO test (payload) VALUES ("Test 3.")');
    expect(result.lastID).toEqual(2);
  });

  it('run() should update record', async () => {
    const result = await connection.run('UPDATE test SET payload = ? WHERE id = ?', 'Updated payload.', 1);
    expect(result.changes).toEqual(1);
  });

  it('open() called second time should not throw error', async () => {
    await expect(connection.open()).resolves.toEqual(connection);
  });

  describe('connection closed', () => {
    beforeAll(() => {
      connection.close();
    });

    it.each(['all', 'exec', 'get', 'run'])('%s() should rejects if connection not opened.', async (method) => {
      await expect(connection[method]()).rejects.toThrow('Connection is closed.');
    });
  });
});
