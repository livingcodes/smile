-- SQL Examples

-- count per day
SELECT
	CONVERT(DATE, WatchTime),
	COUNT(CONVERT(DATE, WatchTime))
FROM Watch
WHERE WatchTime >= '2023-01-01' 
	AND WatchTime < '2023-02-01'
GROUP BY CONVERT(DATE, WatchTime)
ORDER BY CONVERT(DATE, WatchTime)