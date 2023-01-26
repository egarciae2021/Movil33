Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports Utilitario
Public Class VisorComprobante
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Comprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim script As String = String.Empty
                    Auditoria.InsertarAuditoria("Ingreso a VisorComprobante.aspx")
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    Comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
                    Dim ds As DataSet = Comprobante.MostrarDatosVisor(oUsuario.Empleado.P_vcCod)
                    If (Convert.ToInt32(ds.Tables(0).Rows(0)("resultado")) <> 0) Then
                        CargarControles(ds)
                        script = "var fechaMin = " + ds.Tables(1).Rows(0)("PeriodoMin").ToString() + "; var fechaMax = " + ds.Tables(1).Rows(0)("PeriodoMax").ToString()
                    Else
                        Dim strFecha As String = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, "0") + DateTime.Now.Day.ToString().PadLeft(2, "0")
                        script = "flagPag = true; fechaMin = " + strFecha + "; var fechaMax = " + strFecha + ";"
                    End If

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                End If
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Comprobante IsNot Nothing Then Comprobante.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarComprobantes(ByVal p_idEmpleado As String, p_fechaIni As String, ByVal p_fecFin As String, ByVal p_idTipoDocumento As Integer, ByVal p_idEstadoCobro As Integer) As List(Of ENT_MOV_FAC_Comprobante)
        Dim Comprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            Comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)

            Return Comprobante.MostrarByEmpleado(p_idEmpleado, p_fechaIni, p_fecFin, p_idTipoDocumento, p_idEstadoCobro)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Comprobante IsNot Nothing Then Comprobante.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarPdf(ByVal p_nroComprobante As String, ByVal p_idEmpleado As String, ByVal p_idTipoDocumento As Integer) As String
        Dim oComprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            oComprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
            Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//Temporal//Comprobantes//"

            Dim eComprobante As New ENT_MOV_FAC_Comprobante
            eComprobante.NumeroComprobante = p_nroComprobante
            eComprobante.IdEmpleado = p_idEmpleado
            eComprobante.IdTipoDocumento = p_idTipoDocumento
            Dim vcRutaDescargar = oComprobante.Listar_ComprobantePdf(eComprobante, vcRuta, oCultura)
            Return vcRutaDescargar
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If oComprobante IsNot Nothing Then oComprobante.Dispose()
        End Try
    End Function

    Private Sub CargarControles(ds As DataSet)

        ddlTipoComprobante.DataBind()
        Dataddl(ddlTipoComprobante, ds.Tables(2), "Descripcion", "IdTipoDocumento")
        ddlTipoComprobante.SelectedIndex = 0

        Dataddl(ddlEstado, ds.Tables(3), "Descripcion", "EstadoCobro")
        ddlEstado.SelectedIndex = 0

    End Sub

    Shared Sub Dataddl(ByVal ddl As DropDownList, ByVal Datos As Object, ByVal Texto As String, ByVal Valor As String)
        ddl.DataSource = Datos
        ddl.DataTextField = Texto
        ddl.DataValueField = Valor
        ddl.DataBind()
    End Sub

End Class