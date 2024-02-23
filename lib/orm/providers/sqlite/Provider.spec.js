const Provider = require('./Provider');

describe('Provider', () => {
  let provider;

  beforeAll(() => {
    provider = new Provider({
      connectionString: ':memory:',
      verbose: true,
    });
  });

  beforeAll(() => {
    provider.connection.open();
  });

  beforeAll(async () => {
    await provider.exec(SQL);
  });

  afterAll(() => {
    provider.connection.close();
  });

  it('should get element from DB', async () => {
    const row = await provider.select('SELECT * FROM test WHERE id = ?', 0);
    expect(row).toEqual({id: 0, payload: 'Test content 0.'});
  });

  it('should get elements list', async () => {
    const rows = await provider.selectAll('SELECT * FROM test');
    expect(rows).toEqual([
      { id: 0, payload: 'Test content 0.' },
      { id: 1, payload: 'Test content 1.' },
    ]);
  });

  it('should put record to DB and return id', async () => {
    const id = await provider.insert('INSERT INTO test (payload) VALUES (?)', 'Test content 3.');
    const row = await provider.select('SELECT * from test WHERE id = ?', id);
    expect(row).toEqual({ id: id, payload: 'Test content 3.' });
  });

  it('should update record and return changes', async () => {
    const id = await provider.insert('INSERT INTO test (payload) VALUES (?)', 'Test content 4.');
    await expect(provider.update('UPDATE test SET payload = ? WHERE id = ?', 'Updated Content', id)).resolves.toEqual(1);
    const row = await provider.select('SELECT * from test WHERE id = ?', id);
    expect(row).toEqual({ id, payload: 'Updated Content' });
  });

  it('should delete item and return changes', async () => {
    const id = await provider.insert('INSERT INTO test (payload) VALUES (?)', 'Test content 5.');
    await expect(provider.delete('DELETE FROM test WHERE id = ?', id)).resolves.toEqual(1);
    await expect(provider.select('SELECT * from test WHERE id = ?', id)).resolves.toBe(undefined);
  });
});

const SQL = `CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, payload VARCHAR(128) NOT NULL);
INSERT OR IGNORE INTO test (id, payload) VALUES (0, "Test content 0.");
INSERT OR IGNORE INTO test (id, payload) VALUES (1, "Test content 1.");`;
