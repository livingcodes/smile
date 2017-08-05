-- PRIMARY KEY Clustered Index, Must Be Unique, Can't Be Null, Can Only Have One, Determines Sort
-- IDENTITY(1,1) Auto Increment, Start With 1, Increment By 1
-- NTEXT, TEXT, and IMAGE will be removed. Use nvarchar(max), varchar(max), and varbinary(max) instead.
-- VARCHAR({1-8000}|max}), ASCII, 1 byte per character
-- NVARCHAR Unicode, multilingual, 2 bytes per character
-- INT 4 bytes, -2billion to +2billion
-- BIGINT 8 bytes, -9*10^18 to +9*10^18
-- DATETIME min value 1753, 0 and empty converts to 1900, C# min 0001

CREATE TABLE SAMPLE (
  -- Auto increment and set id on insert
  Id INT IDENTITY(1,1) PRIMARY KEY,
  -- Auto set date created on insert
  DateCreated DATETIME NOT NULL DEFAULT(GETDATE())
)

-- PRIMARY KEY Examples
CREATE TABLE Person (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Age INT
)

CREATE TABLE Person (
  Id INT NOT NULL,
  CONSTRAINT PK_Person PRIMARY KEY Id
)

CREATE TABLE Person (
  [Key] VarChar(50) Not Null,
  [Group] VarChar(50) Not Null,
  [Value] VarChar(50),
  Primary Key ([Key], [Group])
)

-- FOREIGN KEY Examples
CREATE TABLE Person (
  Id INT PRIMARY KEY
)
CREATE TABLE Orders (
  Id INT PRIMARY KEY,
  PersonId INT FOREIGN KEY REFERENCES Person(Id)
)
CREATE TABLE Orders (
  Id INT PRIMARY KEY,
  PersonId INT,
  CONSTRAINT FK_Orders_PersonId FOREIGN KEY PersonId REFERENCES Person(Id)
)

-- Select data from existing table into new table
SELECT * INTO NewTable From ExistingTable

-- Filtered Index Example
CREATE NONCLUSTERED INDEX FI_BillOfMaterialsWithEndDate
    ON Production.BillOfMaterials (ComponentID, StartDate)
    WHERE EndDate IS NOT NULL ;
