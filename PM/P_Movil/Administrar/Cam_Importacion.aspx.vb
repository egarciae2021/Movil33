Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data

Partial Class P_Movil_Administrar_Cam_Importacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfCampana.Value = Request.QueryString("IdCampana")
                    hdfTipoImportacion.Value = Request.QueryString("TipoImportacion")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function CargarArchivo(ByVal rutaArchivo As String, ByVal IdCampana As String, ByVal TipoImportacion As String) As List(Of Object)
        Dim blGeneral As BL_General = Nothing
        Dim CampanaCreditoListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing
        Try
            Dim dict As New Dictionary(Of String, Object)
            Dim dtCampos As New DataTable
            Dim dtResultadoImportacion As New DataTable
            Dim dtResultado As New DataTable
            Dim mensaje As String = String.Empty
            Dim colmodel As New List(Of Object)

            blGeneral = New BL_General(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dtCampos = blGeneral.ListarCamposPlantilla(TipoImportacion)

            Select Case TipoImportacion
                Case "5"
                    CampanaCreditoListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    'dtResultadoImportacion = Importacion.ObtenerDatosExcelInterop(HttpContext.Current.Server.MapPath("~/" & rutaArchivo), dtCampos, mensaje)
                    dtResultado = CampanaCreditoListaNegra.ListarValidado(dtResultadoImportacion, dtCampos, Convert.ToInt32(IdCampana))

                    colmodel.Add(JQGrid.Columna("rowId", "rowId", True, True, 80, False, True, ""))
                    colmodel.Add(JQGrid.Columna("IdCampana", "IdCampana", True, True, 80, False, True, ""))
                    colmodel.Add(JQGrid.Columna("IdEmpleado", "IdEmpleado", False, True, 80, False, True, ""))
                    colmodel.Add(JQGrid.Columna("NombreEmpleado", "NombreEmpleado", False, True, 200, False, True, ""))
                    colmodel.Add(JQGrid.Columna("Descripcion", "Descripcion", False, True, 250, False, True, ""))
                    colmodel.Add(JQGrid.Columna("Observaciones", "Observaciones", False, True, 250, False, True, ""))
                Case "2"

            End Select

            HttpContext.Current.Session("GrillaDeImportacion") = dtResultado
            HttpContext.Current.Session("GrillaCampos") = dtCampos
            Return colmodel
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blGeneral IsNot Nothing Then blGeneral.Dispose()
            If CampanaCreditoListaNegra IsNot Nothing Then CampanaCreditoListaNegra.Dispose()
        End Try

    End Function

    <WebMethod()> _
    Public Shared Function ListarData(ByVal inPagTam As String, ByVal inPagAct As String) As Dictionary(Of String, Object)
        Dim dtResultado As DataTable = HttpContext.Current.Session("GrillaDeImportacion")
        Return JQGrid.DatosJSON(dtResultado, Convert.ToUInt32(inPagTam), Convert.ToUInt32(inPagAct))
    End Function
End Class
