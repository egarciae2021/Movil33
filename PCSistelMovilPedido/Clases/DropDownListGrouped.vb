Public Class DropDownListGrouped
    Inherits DropDownList
    Public Sub AddItemGroup(groupTitle As String)
        Me.Items.Add(New ListItem(groupTitle, "$$OPTGROUP$$OPTGROUP$$"))
    End Sub

    Protected Overrides Sub RenderContents(writer As System.Web.UI.HtmlTextWriter)
        If Me.Items.Count > 0 Then
            Dim selected As Boolean = False
            Dim optGroupStarted As Boolean = False
            For i As Integer = 0 To Me.Items.Count - 1
                Dim item As ListItem = Me.Items(i)
                If item.Enabled Then
                    If item.Value = "$$OPTGROUP$$OPTGROUP$$" Then
                        If optGroupStarted Then
                            writer.WriteEndTag("optgroup")
                        End If
                        writer.WriteBeginTag("optgroup")
                        writer.WriteAttribute("label", item.Text)
                        writer.Write(">"c)
                        writer.WriteLine()
                        optGroupStarted = True
                    Else
                        writer.WriteBeginTag("option")
                        If item.Selected Then
                            If selected Then
                                Me.VerifyMultiSelect()
                            End If
                            selected = True
                            writer.WriteAttribute("selected", "selected")
                        End If
                        writer.WriteAttribute("value", item.Value, True)
                        If item.Attributes.Count > 0 Then
                            item.Attributes.Render(writer)
                        End If
                        If Me.Page IsNot Nothing Then
                            Me.Page.ClientScript.RegisterForEventValidation(Me.UniqueID, item.Value)
                        End If
                        writer.Write(">"c)
                        HttpUtility.HtmlEncode(item.Text, writer)
                        writer.WriteEndTag("option")
                        writer.WriteLine()
                    End If
                End If
            Next

            If optGroupStarted Then
                writer.WriteEndTag("optgroup")
            End If
        End If
    End Sub
End Class
