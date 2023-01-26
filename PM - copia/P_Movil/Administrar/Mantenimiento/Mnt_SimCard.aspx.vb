Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Auditoria

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_SimCard
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim SimCard As BL_MOV_SimCard = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = Nothing
        Try
            If Not IsPostBack Then

                cbeOrganizacion.UbicacionWindow = "window.top"
                cbeOrganizacion.UrlPagina = "General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod="
                cbeOrganizacion.AltoDialogo = 560
                cbeOrganizacion.AnchoDialogo = 810
                cbeOrganizacion.TituloDialog = "Organización"

                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim inCodSimCard As String = Request.QueryString("Cod")
                hdfCodCliente.Value = oUsuario.IdCliente


                Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)

                Dim lstTipoModeloDispositivo As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()

                'UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.Listar(-1, "<Seleccionar>"), "vcNom", "P_vcCod")
                'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                Operador.Dispose()
                LineaTipo.Dispose()
                TipoModeloDispositivo.Dispose()
                Dim oldCI As System.Globalization.CultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture
                'Tipo de Linea - wapumayta - 02-11-2015
                Dim General = New General()
                Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)

                '------------------------------------------------------

                If inCodSimCard <> "" Then

                    Dim oSerializer As New JavaScriptSerializer
                    Dim Script As String
                    SimCard = New BL_MOV_SimCard(oUsuario.IdCliente)
                    Dim oSimCard As ENT_MOV_SimCard = SimCard.Mostrar(inCodSimCard)

                    txtCodigo.Text = oSimCard.P_vcSimCard.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    txtObservacion.Text = oSimCard.Observacion.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    'ddlCuenta.SelectedValue = oSimCard.Cuenta.P_vcCod
                    chkEstado.Checked = oSimCard.btVig
                    If oSimCard.btVig Then
                        trEstado.Style("display") = "none"
                    End If

                    cbeOrganizacion.Descripcion = oSimCard.Organizacion.vcNomOrg
                    cbeOrganizacion.Codigo = oSimCard.Organizacion.vcCodInt

                    'validacines tipo 'wapumayta 06/08/2014
                    Dim cantLineas As Integer = 0
                    'cantLineas = Plan.ValidarCambioTipo(inCodPla)
                    'If cantLineas > 0 Then
                    '    If cantLineas = 1 Then
                    '        ttgInfoCuenta.Mensaje = "No se puede editar por que ya está siendo usado por " + cantLineas.ToString() + " línea."
                    '    Else
                    '        ttgInfoCuenta.Mensaje = "No se puede editar por que ya está siendo usado por " + cantLineas.ToString() + " líneas."
                    '    End If
                    '    dvInfoCuenta.Style("display") = ""
                    '    ddlCuenta.Enabled = False
                    'End If
                    'fin validacion tipo

                    hdfSimCard.Value = inCodSimCard
                    Script = " "

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                Else

                    Dim Script As String
                    hdfSimCard.Value = ""
                    trEstado.Style("display") = "none"
                    txtCodigo.Focus()
                    Script = " "
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(SimCard) Then SimCard.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oSimCard As String, ByVal vcCamDim As String) As Integer
        Dim SimCard As BL_MOV_SimCard = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            SimCard = New BL_MOV_SimCard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oSimCard As ENT_MOV_SimCard = oSerializer.Deserialize(Of ENT_MOV_SimCard)(oSimCard)

            v_oSimCard.P_vcSimCard = v_oSimCard.P_vcSimCard.Replace("&#39", "'")
            v_oSimCard.Observacion = v_oSimCard.Observacion.Replace("&#39", "'")

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Móvil"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "SimCard"
            oAuditoria.Tabla = Constantes.TableNames.PlanMovil

            Dim strAntes As String = ""
            Dim P_inCod As Integer = 0
            If v_oSimCard.P_vcSimCard = "" Then
                v_oSimCard.P_vcSimCard = v_oSimCard.Nombre
                P_inCod = SimCard.Insertar(v_oSimCard, vcCamDim)
                If P_inCod <> "-1" Then
                    oAuditoria.Insertar(New String() {P_inCod})
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {v_oSimCard.P_vcSimCard})
                SimCard.Actualizar(v_oSimCard, vcCamDim)
                oAuditoria.DespuesActualizar(New String() {v_oSimCard.P_vcSimCard}, strAntes)
            End If
            Return P_inCod
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(SimCard) Then SimCard.Dispose()
        End Try
    End Function
End Class