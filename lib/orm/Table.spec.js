const Table = require('./Table');

describe('Table', () => {
  let testProvider;

  beforeEach(() => {
    testProvider = {
      select: jest.fn().mockName('select').mockResolvedValue({id: 0}),
      selectAll: jest.fn().mockName('selectAll').mockResolvedValue([]),
      insert: jest.fn().mockName('insert').mockResolvedValue(0),
      update: jest.fn().mockName('update').mockResolvedValue(undefined),
      delete: jest.fn().mockName('delete').mockResolvedValue(undefined),
      create: jest.fn().mockName('create').mockResolvedValue(undefined),
      drop: jest.fn().mockName('drop').mockResolvedValue(undefined),
      prepareParams: jest.fn((...params) => params).mockName('prepareParams'),
    };
  });

  let table;

  beforeEach(() => {
    table = new Table(testProvider, {
      select: 'SELECT * FROM table WHERE id = ?',
      selectAll: 'SELECT * FROM table',
      insert: 'INSERT INTO table (id, name) VALUES (?, ?)',
      update: 'UPDATE table SET (name = ?) WHERE (id = ?)',
      delete: 'DELETE FROM table WHERE (id = ?)',
      create: 'CREATE table (id INTEGER)',
      drop: 'DROP table'
    });
  });

  it('select() should run query with params', async () => {
    const result = await table.select(0);
    expect(result).toEqual({id: 0});
    expect(testProvider.select).toHaveBeenCalledWith('SELECT * FROM table WHERE id = ?', 0);
    expect(testProvider.prepareParams).toHaveBeenCalled();
  });

  it('selectAll() should run query with params', async () => {
    const result = await table.selectAll();
    expect(result).toEqual([]);
    expect(testProvider.selectAll).toHaveBeenCalledWith('SELECT * FROM table');
    expect(testProvider.prepareParams).toHaveBeenCalled();
  });

  it('insert() should run query with params', async () => {
    const result = await table.insert(0, 'Pike');
    expect(result).toEqual(0);
    expect(testProvider.insert).toHaveBeenCalledWith('INSERT INTO table (id, name) VALUES (?, ?)', 0, 'Pike');
    expect(testProvider.prepareParams).toHaveBeenCalled();
  });

  it('update() should run query with params', async () => {
    await table.update({ id: 0, name: 'Kirk' });
    expect(testProvider.update).toHaveBeenCalledWith(
      'UPDATE table SET (name = ?) WHERE (id = ?)',
      {"id": 0, "name": "Kirk"}
    );
    expect(testProvider.prepareParams).toHaveBeenCalled();
  });

  it('delete() should run query with params', async () => {
    await table.delete(0);
    expect(testProvider.delete).toHaveBeenCalledWith('DELETE FROM table WHERE (id = ?)', 0);
    expect(testProvider.prepareParams).toHaveBeenCalled();
  });

  it('create() should run query with params', async () => {
    await table.create();
    expect(testProvider.create).toHaveBeenCalledWith('CREATE table (id INTEGER)');
  });

  it('drop() should run query with params', async () => {
    await table.drop();
    expect(testProvider.drop).toHaveBeenCalledWith('DROP table');
  });
});
