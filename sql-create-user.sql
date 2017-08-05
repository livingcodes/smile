-- "Login" scope is server-wide
-- "User" scope is to a specific database

CREATE LOGIN {username} WITH PASSWORD = '{password}'
GO

CREATE USER {username} FOR LOGIN {username}
GO

-----------------------------------------------------
-- After restoring database
--   The login used on server may not be available on local computer
--   Also the user used by application may not be properly associated with login even if login pre-existed locally

--   If login doesn't exist then you gotta create it
--   The new login won't have permissions to database so add a server role to it
--   The new login won't have any users associated with it so create the user
--   There might be an existing user with same name so drop that user before adding the new one
------------------------------------------------------
DECLARE @DatabaseName VARCHAR(255)
SET @DatabaseName = 'db'

DECLARE @Login VARCHAR(255)
SET @Login = 'login'

DECLARE @Password VARCHAR(255)
SET @Password = 'password'

DECLARE @LoginPreexisted INT
SET @LoginPreexisted = 1

DECLARE @Sql NVARCHAR(512)

-- View logins for database _BEFORE_
SELECT name, dbname, * from master.dbo.syslogins where dbname = @DatabaseName

-- If login does not exist then
IF NOT EXISTS (SELECT name from master.dbo.syslogins where name = @Login AND dbname = @DatabaseName) BEGIN
	-- Create login
	SET @Sql = 'CREATE LOGIN [' + @Login + '] WITH PASSWORD = ''' + @Password + ''', DEFAULT_DATABASE = [' + @DatabaseName + ']'
	PRINT @Sql
	EXEC sp_executesql @Sql

	-- Make sysadmin
	EXEC sp_addsrvrolemember @Login, 'sysadmin'
END

-- Drop existing user
IF EXISTS (SELECT name from sys.database_principals where name = @Login) BEGIN
	SET @Sql = 'DROP USER [' + @Login + ']'
	PRINT @Sql
	EXEC sp_executesql @Sql
END

-- Create user
SET @Sql = 'CREATE USER [' + @Login + '] FOR LOGIN [' + @Login + ']'
PRINT @Sql
EXEC sp_executesql @Sql

-- View logins for database _AFTER_
SELECT name, dbname, * from master.dbo.syslogins where dbname = @DatabaseName

-- old way to select users (deprecated)
--select name, * from master.dbo.sysusers 

-- newer way to select users (doesn't include dbowners ???
--SELECT * FROM sys.database_principals

-- owners aren't in database_principals ???
--select suser_sname(owner_sid) as 'Owner', state_desc, * from sys.databases


--SELECT LoginName FROM master.dbo.syslogins WHERE Name = @Login AND DbName = @DatabaseName

-- Drop existing user
--SELECT LoginName FROM master.dbo.syslogins WHERE Name = @Login AND DbName = 'schoolsnetwork2'
