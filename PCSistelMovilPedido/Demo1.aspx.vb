Imports System.IO

Public Class Demo1
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim lcDiv As HtmlGenericControl
        Dim physicalPath As String = HttpContext.Current.Request.MapPath("Common/Images/Planes")
        Dim dirs As String() = Directory.GetFiles(physicalPath, "*.png")
        For Each dir As String In dirs
            lcDiv = New HtmlGenericControl("div")
            Dim objImg As New HtmlImage()
            objImg.Src = Utilitario.ObtieneRaizSistema & "Common/Images/Planes/" & Path.GetFileName(dir)
            objImg.Attributes.Add("u", "image")
            lcDiv.Controls.Add(objImg)
            imgBanner.Controls.Add(lcDiv)
        Next
    End Sub




End Class