CREATE PROCEDURE GetList
  @Page INT = 1
  @Take INT = 10
AS BEGIN
  
  -- Set page index
  DECLARE @PageIndex INT
  IF @Page < 1
    SET @Page = 1
  SET @PageIndex = @Page - 1
  
  -- Get list of items to page over
  ;WITH Items AS (
    SELECT *,
      ROW_NUMBER() OVER (ORDER BY PublishDate DESC) AS RowNumber
    FROM TableName
    WHERE ColumnName = Filter
  )
  -- Get count and limit to requested page
  SELECT *,
    (SELECT MAX(RowNumber) FROM TableName) AS 'RowCount'
  FROM Items
  WHERE RowNumber BETWEEN @PageIndex * @Take + 1 AND (@PageIndex + 1) * @Take
  
END


-- SQL Server 2012 & Greater
CREATE PROCEDURE GetList
  @Page INT = 1
  @Take INT = 10
AS BEGIN
  SELECT * FROM TableName
  WHERE ColumnName = Filter
  ORDER BY PublishDate DESC
  OFFSET((@Page - 1) * @Take) ROWS
  FETCH NEXT @Take ROWS ONLY
END
