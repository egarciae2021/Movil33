Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services

Public Class Mnt_Consolidado
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim oLinea As BL_MOV_Linea = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    oLinea = New BL_MOV_Linea(oUsuario.IdCliente)

                    Dim dsConsolidado As DataSet = oLinea.Listar_Consolidado()
                    Dim Columnas As String = " var mColumnas = ["
                    For Each Columna As DataColumn In dsConsolidado.Tables(0).Columns
                        Columnas &= "'" & Columna.ColumnName & "',"
                    Next
                    Columnas &= "];"
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "Columnas", Columnas, True)

                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try

    End Sub

    <WebMethod()>
    Public Shared Function ObtenerConsolidado() As List(Of Object)
        Try
            Dim oLinea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsResultado As DataSet = oLinea.Listar_Consolidado()
            oLinea.Dispose()
            Dim lstObjPrincipal As New List(Of Object)
            Dim lstObj As List(Of Object)
            Dim dict As Dictionary(Of String, Object)
            'Listado..
            For Each Tabla As DataTable In dsResultado.Tables
                lstObj = New List(Of Object)
                For i As Integer = 0 To Tabla.Rows.Count - 1
                    dict = New Dictionary(Of String, Object)
                    For Each Columna As DataColumn In Tabla.Columns
                        dict.Add(Columna.ColumnName, Tabla.Rows(i)(Columna.ColumnName).ToString())
                    Next
                    lstObj.Add(dict)
                Next
                lstObjPrincipal.Add(lstObj)
            Next
            Return lstObjPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


End Class