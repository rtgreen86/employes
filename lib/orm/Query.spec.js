const Query = require('./Query');

describe('Query', () => {
  let testProvider;

  beforeEach(() => {
    testProvider = {
      get: jest.fn().mockResolvedValue([]),
    };
  });

  it('should execute query with params', async () => {
    await new Query(testProvider, 'get', 'SELECT * FROM test').run('arg-1', 'arg-2');
    expect(testProvider.get).toHaveBeenCalledWith('SELECT * FROM test', 'arg-1', 'arg-2');
  });
});
