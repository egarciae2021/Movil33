Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports System.Web.Services

Public Class Con_Fac_Reportes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Reportes As BL_MOV_FAC_Reportes = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Reportes = New BL_MOV_FAC_Reportes(oUsuario.IdCliente)

                    Dim dtReportes As DataTable = Reportes.ListarReportes()

                    If dtReportes.Rows.Count = 0 Then
                        ddlReportes.Items.Insert(0, New ListItem("Sin reportes", "-2"))
                    Else
                        UtilitarioWeb.Dataddl(ddlReportes, dtReportes, "NombreReporte", "CodigoReporte")
                        ddlReportes.Items.Insert(0, New ListItem("--Seleccione--", "-1"))
                    End If


                    Dim script As String = "var arReportes = ["
                    For Each dr As DataRow In dtReportes.Rows
                        script = script + "{CodigoReporte:'" + UtilitarioWeb.ComprobarStringNULL(dr("CodigoReporte"), "")
                        script = script + "',NombreReporte:'" + UtilitarioWeb.ComprobarStringNULL(dr("NombreReporte"), "")
                        script = script + "',Descripcion:'" + UtilitarioWeb.ComprobarStringNULL(dr("Descripcion"), "")
                        script = script + "',NombreArchivo:'" + UtilitarioWeb.ComprobarStringNULL(dr("NombreArchivo"), "")
                        script = script + "',Personalizado:" + IIf(UtilitarioWeb.ComprobarBoolNULL(dr("Personalizado"), False), "true", "false")
                        script = script + ",ProcedimientoPersonalizado:'" + UtilitarioWeb.ComprobarStringNULL(dr("ProcedimientoPersonalizado"), "")
                        script = script + "',Existe:" + IIf(UtilitarioWeb.ComprobarBoolNULL(dr("Existe"), False), "true", "false")
                        script = script + ",UsaParametros:" + IIf(UtilitarioWeb.ComprobarBoolNULL(dr("UsaParametros"), False), "true", "false") + "},"
                    Next
                    script = script.Substring(0, script.Length - 1)
                    script = script + "];"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Reportes) Then Reportes.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Sub CargarValores(ByVal CodigoReporte As String, ByVal Personalizado As Boolean, ByVal NombreArchivo As String, ByVal Procedimiento As String, ByVal Parametros As String)
        HttpContext.Current.Session("FacReporte_CodigoReporte") = CodigoReporte
        HttpContext.Current.Session("FacReporte_Personalizado") = Personalizado
        HttpContext.Current.Session("FacReporte_NombreArchivo") = NombreArchivo
        HttpContext.Current.Session("FacReporte_Procedimiento") = Procedimiento
        HttpContext.Current.Session("FacReporte_Parametros") = Parametros
    End Sub

    Private Sub eegReporte_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegReporte.ObtenerDatosAExportar
        Dim Reportes As BL_MOV_FAC_Reportes = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Reportes = New BL_MOV_FAC_Reportes(oUsuario.IdCliente)

            Dim CodigoReporte As String = HttpContext.Current.Session("FacReporte_CodigoReporte").ToString()
            Dim Parametros As String = HttpContext.Current.Session("FacReporte_Parametros").ToString()
            Dim Personalizado As Boolean = Convert.ToBoolean(HttpContext.Current.Session("FacReporte_Personalizado"))
            Dim NombreArchivo As String = HttpContext.Current.Session("FacReporte_NombreArchivo").ToString()
            Dim Procedimiento As String = HttpContext.Current.Session("FacReporte_Procedimiento").ToString()
            Dim ds As New DataSet()

            Dim dtData As New DataTable()
            Dim dtCampos As New DataTable()
            Dim lstCampos As List(Of ENT_ENT_Campo) = New List(Of ENT_ENT_Campo)

            If Not Personalizado Then
                ds = Reportes.ConsultaReporte(CodigoReporte, Parametros)
            Else
                ds = Reportes.ConsultaReportePersonalizado(Procedimiento)
            End If

            If ds.Tables.Count = 2 Then
                dtData = ds.Tables(0)
                dtCampos = ds.Tables(1)

                For Each dr As DataRow In dtCampos.Rows
                    lstCampos.Add(New ENT_ENT_Campo(dr("vcNom").ToString(), dr("vcDes").ToString(), dr("vcNom").ToString()))
                Next

                For Each c As ENT_ENT_Campo In lstCampos
                    c.btVis = True
                    c.btVig = True
                Next
            End If

            eegReporte.ExportarDatos(dtData, NombreArchivo, lstCampos)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Reportes) Then Reportes.Dispose()
        End Try
    End Sub
End Class