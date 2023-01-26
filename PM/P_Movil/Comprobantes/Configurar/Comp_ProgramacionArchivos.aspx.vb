Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Collections.Generic
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.IO
Imports System.Web.Script.Services
Imports Utilitario
Public Class Comp_ProgramacionArchivos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim ComprobanteConfiguracion As BL_MOV_FAC_Comprobante_Configuracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)


                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Sub


    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarTipo(ByVal tipofiltro As String, ByVal filtro As String, ByVal campoordenar As String, ByVal orden As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
    ByVal tipo As String) As Object


        Dim Configuracion As BL_MOV_FAC_C_Configuracion = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Configuracion = New BL_MOV_FAC_C_Configuracion(oUsuario.IdCliente)

            Dim dsDetalle As DataSet = Configuracion.Listar_Tipo(tipofiltro, filtro, campoordenar, orden)
            HttpContext.Current.Session("vcFiltroProgramacionArchivos") = tipofiltro & "|" & filtro & "|" & campoordenar & "|" & orden & "|"

            Return JQGrid.DatosJSON(dsDetalle.Tables(0), inPagTam, inPagAct)


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try

    End Function

    Protected Sub eegP_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegProgramacionArchivos.ObtenerDatosAExportar
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Configuracion As BL_MOV_FAC_C_Configuracion = New BL_MOV_FAC_C_Configuracion(oUsuario.IdCliente)


            Dim tipofiltro As String = HttpContext.Current.Session("vcFiltroProgramacionArchivos").ToString().Split("|")(0)
            Dim filtro As String = HttpContext.Current.Session("vcFiltroProgramacionArchivos").ToString().Split("|")(1)
            Dim campoordenar As String = HttpContext.Current.Session("vcFiltroProgramacionArchivos").ToString().Split("|")(2)
            Dim orden As String = HttpContext.Current.Session("vcFiltroProgramacionArchivos").ToString().Split("|")(3)


            Dim dsDetalle As DataSet = Configuracion.Listar_Tipo(tipofiltro, filtro, campoordenar, orden)
            Configuracion.Dispose()

            Dim dtExcel As DataTable = dsDetalle.Tables(0)

            If (dtExcel.Rows.Count > 0) Then
                dtExcel.Columns.RemoveAt(0)
                dtExcel.Columns(0).ColumnName = "Código"
                dtExcel.Columns(1).ColumnName = "Descripción"
                dtExcel.Columns(2).ColumnName = "Ruta Origen"
                dtExcel.Columns(3).ColumnName = "Ruta Destino"
            End If



            eegProgramacionArchivos.ExportarDatos(dtExcel, "Programacion_de_Archivos")

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class