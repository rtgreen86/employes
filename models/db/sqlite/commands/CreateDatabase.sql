CREATE TABLE IF NOT EXISTS Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  Login VARCHAR(128) NOT NULL,
  Password VARCHAR(128) NOT NULL,
  FirstName VARCHAR(128) NOT NULL,
  LastName VARCHAR(128) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "UsersLoginIndex" ON Users (Login);

CREATE TABLE IF NOT EXISTS Employees (
  Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  FirstName VARCHAR(128) NOT NULL,
  LastName VARCHAR(128) NOT NULL,
  Photo INTEGER
);

CREATE TABLE IF NOT EXISTS Departments (
  Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  Name VARCHAR(128) NOT NULL,
  Description VARCHAR(4096)
);

CREATE TABLE IF NOT EXISTS DepartmentEmployees (
  Department INTEGER NOT NULL,
  Employee INTEGER NOT NULL,
  PRIMARY KEY (Department, Employee)
);

CREATE TABLE IF NOT EXISTS Notes (
  Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  Author INTEGER NOT NULL,
  Employee INTEGER NOT NULL,
  Date VARCHAR(24) NOT NULL,
  Text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Images (
  Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  Author INTEGER NOT NULL,
  Date VARCHAR(24),
  Caption VARCHAR(4096),
  Size INTEGER NOT NULL,
  Path VARCHAR(4096) NOT NULL
);

INSERT OR IGNORE INTO Users
  (Id, Login, Password, FirstName, LastName)
VALUES
  (0, 'admin', '', '', 'Admin');

INSERT OR IGNORE INTO Employees
  (Id, FirstName, LastName)
VALUES
  (0, 'John', 'Smith');

INSERT OR IGNORE INTO Departments
  (Id, Name, Description)
VALUES
  (0, 'Account', 'Account Department'),
  (1, 'HR', 'Human Resources Department'),
  (2, 'IT', 'Information Technology Department');

INSERT OR IGNORE INTO Employees
  (FirstName, LastName)
VALUES
  ('James T.', 'Kirk'),
  ('Kathryn', 'Janeway'),
  ('Jean-Luc', 'Picard');
