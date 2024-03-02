const User = require('./User');
const bcrypt = require('bcrypt');
const { provider } = require('./db');

describe('User', () => {
  const user = {
    login: 'jkirk',
    password: 'password',
    firstName: 'James',
    lastName: 'Kirk',
  };

  beforeAll(async () => {
    await provider.connection.open();
  });

  let id;
  beforeAll(async () => {
    const _user = await new User(user).save();
    id = _user.id;
  });

  afterAll(async () => {
    const _user = await User.getById(id);
    await _user.delete();
  });

  afterAll(() => {
    provider.connection.close();
  });

  it('should get User by ID', async () => {
    const _user = await User.getById(id);

    expect(_user).toEqual({
      id,
      login: user.login,
      password: expect.any(String),
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await expect(bcrypt.compare(user.password, _user.password)).resolves.toBe(true);
  });

  it('should get User by login', async () => {
    const _user = await User.getByLogin('jkirk');

    expect(_user).toEqual({
      id,
      login: user.login,
      password: expect.any(String),
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await expect(bcrypt.compare(user.password, _user.password)).resolves.toBe(true);
  });

  it('should return null if no user with requested login', async () => {
    await expect(User.getByLogin('kjen')).resolves.toBe(null);
  });

  describe('validateAndGet', () => {
    it('should validate user with correct password', async () => {
      await expect(User.validateAndGet('jkirk', 'password')).resolves.toEqual({
        id,
        login: user.login,
        password: expect.any(String),
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });

    it('should not validate user with wrong password', async () => {
      await expect(User.validateAndGet('jkirk', 'wrong-password')).resolves.toEqual(null);
    });
  });
});
