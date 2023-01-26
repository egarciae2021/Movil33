Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Services
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_TipoServicio
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim vcCodTS As String = Request.QueryString("Cod")
                    Dim TipoServicio As BL_GEN_TipoServicio = New BL_GEN_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    txtNombre.Focus()
                    If vcCodTS <> "" Then
                        Dim oSerializer As New JavaScriptSerializer
                        Dim oTipoServicio As ENT_GEN_TipoServicio = TipoServicio.Mostrar(vcCodTS)
                        If oTipoServicio.P_inCod = Integer.Parse(vcCodTS) Then
                            hdfCodigoTipoServicio.Value = vcCodTS
                            txtNombre.Text = oTipoServicio.vcNom.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtExp.Text = oTipoServicio.vcExpEn.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            chkMostrarDash.Checked = oTipoServicio.MostrarEnDash
                            hdfTS.Value = vcCodTS
                            txtExp.Enabled = False
                            ddlReporteExpEn.SelectedValue = oTipoServicio.vcRepExpEn
                        Else
                            hdfTS.Value = "-1"
                            txtExp.Enabled = True
                        End If

                    Else
                        hdfTS.Value = ""
                        'tbAgregarPaquete.Style("display") = "none"
                        'dvMensajePaquete.Style("display") = ""
                    End If

                    TipoServicio.Dispose()

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oTipoServicio As String, ByVal vcCodTS As String, ByVal esChk As String) As Integer
        Try

            Dim TipoServicio As BL_GEN_TipoServicio = New BL_GEN_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oTipoServicio As ENT_GEN_TipoServicio = oSerializer.Deserialize(Of ENT_GEN_TipoServicio)(oTipoServicio)

            v_oTipoServicio.MostrarEnDash = esChk.Equals("1")



            Dim _return As Integer
            If vcCodTS = "" Then
                _return = TipoServicio.Insertar(v_oTipoServicio)
            Else
                TipoServicio.Actualizar(v_oTipoServicio)
                _return = 0
            End If

            TipoServicio.Dispose()

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    '<WebMethod()> _
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function ObtenerPaquetes_TipoServicio(ByVal pIdTipoServicio As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
    '
    '    Dim oTipoServicio As BL_MOV_TipoServicio = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '    Try
    '        Dim ds As DataSet = oTipoServicio.ObtenerPaquetes_TipoServicio(pIdTipoServicio)
    '        oTipoServicio.Dispose()
    '        Dim dtModelosGrilla As DataTable = ds.Tables(0)
    '        Return JQGrid.DatosJSON(dtModelosGrilla, inPagTam, inPagAct)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If oTipoServicio IsNot Nothing Then oTipoServicio.Dispose()
    '    End Try
    'End Function

    '<WebMethod()>
    'Public Shared Function GuardarPaqueteA(ByVal IdPaquete As String, ByVal IdTipoServicio As String, ByVal strCantidad As String, ByVal strMonto As String, _
    '                                      ByVal strOpcion As String) As String
    '    Dim oTipoServicio As BL_MOV_TipoServicio = Nothing
    '    Try
    '        oTipoServicio = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim resultado As String = ""
    '
    '        resultado = oTipoServicio.Insertar(Convert.ToInt32(IdPaquete), Convert.ToInt32(IdTipoServicio), Convert.ToInt32(strCantidad), _
    '                                           Convert.ToDouble(strMonto), Convert.ToBoolean(strOpcion))
    '
    '        Return resultado
    '
    '    Catch ex As Exception
    '        Return ex.Message
    '    Finally
    '        If oTipoServicio IsNot Nothing Then oTipoServicio.Dispose()
    '    End Try
    'End Function
End Class
