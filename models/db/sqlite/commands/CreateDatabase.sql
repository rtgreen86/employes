CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  firstName VARCHAR(128) NOT NULL,
  lastName VARCHAR(128) NOT NULL,
  photo VARCHAR(4096),
  notes varchar(4096)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  login VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  employee INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "users_employees_index" ON users (employee);

CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(4096)
);

CREATE TABLE IF NOT EXISTS department_employees (
  department INTEGER NOT NULL,
  employee INTEGER NOT NULL,
  PRIMARY KEY (department, employee)
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  sender INTEGER NOT NULL,
  recipient INTEGER NOT NULL,
  date VARCHAR(24) NOT NULL,
  subject VARCHAR(1024) NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  owner INTEGER NOT NULL,
  date VARCHAR(24),
  caption VARCHAR(4096),
  size INTEGER NOT NULL,
  path VARCHAR(4096) NOT NULL
);

INSERT OR IGNORE INTO employees (
  id, firstName, lastName, notes
) VALUES (
  0, 'Admin', 'Admin', 'Admin user.'
);

INSERT OR IGNORE INTO users (
  id, login, password, employee
) VALUES (
  0, 'admin', '', 0
);
