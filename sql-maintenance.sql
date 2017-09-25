-- gets space used
exec sp_spaceused

-- shrink database
dbcc shrinkdatabase ({database-name})

-- shrink log file
dbcc shrinkfile ({database-name}, 3)
