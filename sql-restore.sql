-- switch to master so that the database is not in use
USE master
RESTORE DATABASE {DatabaseName}
FROM DISK = 'c:\directory\{filename}.bak'
-- overwrite
WITH REPLACE
GO

-- example
USE master
RESTORE DATABASE NeatoSite
FROM DISK = 'c:\directory\neatosite.bak'
WITH REPLACE
GO
