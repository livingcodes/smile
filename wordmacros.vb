Sub H1()
    Selection.Style = ActiveDocument.Styles("Heading 1")
End Sub

Sub H2()
    Selection.Style = ActiveDocument.Styles("Heading 2")
End Sub

Sub InsertTriangleBullet()
    Selection.TypeText Text:=ChrW(55357) & ChrW(56632)
End Sub

' Move

Sub MoveLeft() ' Alt-k
    Selection.MoveLeft 1
End Sub

Sub MoveRight() ' Alt-l
    Selection.MoveRight 1
End Sub

Sub MoveUp() ' Alt-i
    Selection.MoveUp Unit:=wdLine, Count:=1, Extend:=wdMove
End Sub

Sub MoveDown() ' Alt-,
    Selection.MoveDown Unit:=wdLine, Count:=1
End Sub

Sub MoveLeftWord() ' Alt-j
    Selection.MoveLeft Unit:=wdWord, Count:=1
End Sub

Sub MoveRightWord() ' Alt-;
    Selection.MoveRight Unit:=wdWord, Count:=1
End Sub

Sub MoveHome() ' Alt-h
    Selection.HomeKey Unit:=wdLine
End Sub

Sub MoveEnd() ' Alt-'
    Selection.EndKey Unit:=wdLine
End Sub

' Extend

Sub MoveLeftExtend() ' alt+shift+k
    Selection.MoveLeft Unit:=wdCharacter, Count:=1, Extend:=wdExtend
End Sub

Sub MoveRightExtend() ' alt+shift+l
    Selection.MoveRight wdCharacter, 1, wdExtend
End Sub

Sub MoveUpExtend() ' alt+shift+i
    Selection.MoveUp wdLine, 1, wdExtend
End Sub

Sub MoveDownExtend() ' alt+shift+,
    Selection.MoveDown wdLine, 1, wdExtend
End Sub

Sub MoveLeftWordExtend() ' alt+shift+j
    Selection.MoveLeft wdWord, 1, wdExtend
End Sub

Sub MoveRightWordExtend() ' alt+shift+;
    Selection.MoveRight wdWord, 1, wdExtend
End Sub

Sub MoveHomeExtend() ' alt+shift+h
    Selection.HomeKey wdLine, wdExtend
End Sub

Sub MoveEndExtend() ' alt+shift+'
    Selection.EndKey wdLine, wdExtend
End Sub

Sub MoveUpPage() ' alt+shift+o
    Selection.GoTo wdGoToPage, wdGoToPrevious
End Sub

Sub MoveDownPage() ' alt+shift+.
    Selection.MoveDown wdLine, 100
    'Selection.GoTo wdLine, wdGoToLast
End Sub
