Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Imp_Mnt_Ruta
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Zona As BL_GEN_Zona = Nothing
        Dim IMP_Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim IMP_Ruta As BL_MOV_IMP_Ruta = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodRut As String = Request.QueryString("Cod")
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Zona = New BL_GEN_Zona(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    IMP_Plantilla = New BL_MOV_IMP_Plantilla(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    UtilitarioWeb.Dataddl(ddlZona, Zona.ListarPorPaisActual(-1, "<Seleccionar>"), "vcCodOri", "P_inCodOri")
                    UtilitarioWeb.Dataddl(ddlTipoNumero, Llamada.ListarTipoNumero(-1, "<Seleccionar>"), "vcNomTipNum", "P_inCodTipNum")
                    If Not IsNothing(inCodRut) Then
                        IMP_Ruta = New BL_MOV_IMP_Ruta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oIMP_Ruta As New ENT_MOV_IMP_Ruta
                        Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla

                        oIMP_Ruta = IMP_Ruta.Mostrar(Integer.Parse(inCodRut))

                        oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(oIMP_Ruta.Operador.P_inCodOpe)
                        oIMP_Plantilla.inTipArc = -1
                        oIMP_Plantilla.inTipPla = -1
                        UtilitarioWeb.Dataddl(ddlPlantilla, IMP_Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>"), "vcNom", "P_inCodPla")


                        ddlOperador.SelectedValue = oIMP_Ruta.Operador.P_inCodOpe
                        ddlPlantilla.SelectedValue = oIMP_Ruta.F_inCodPla
                        ddlZona.SelectedValue = oIMP_Ruta.Zona.P_inCodOri
                        txtPrefijo.Text = oIMP_Ruta.vcPre
                        txtReemplazarPrefijo.Text = oIMP_Ruta.vcRemPre
                        txtLongitudMinimo.Text = oIMP_Ruta.inLonMin
                        txtLongitudMaximo.Text = oIMP_Ruta.inLonMax
                        ddlTipoNumero.SelectedValue = oIMP_Ruta.inTipNum
                        chkEstado.Checked = oIMP_Ruta.btVig
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        hdfCod.Value = inCodRut
                    Else
                        UtilitarioWeb.ValorDefectoddl(ddlPlantilla, "No disponible", "-1")
                        ddlPlantilla.Enabled = False
                        ddlZona.SelectedValue = 511
                        trEstado.Style("display") = "none"
                        hdfCod.Value = ""
                    End If

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
                IMP_Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
                oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(ddlOperador.SelectedValue)
                oIMP_Plantilla.inTipArc = -1
                oIMP_Plantilla.inTipPla = -1

                If oIMP_Plantilla.Operador.P_inCodOpe = -1 Then
                    ddlPlantilla.Items.Clear()
                    UtilitarioWeb.ValorDefectoddl(ddlPlantilla, "No disponible", "-1")
                    ddlPlantilla.Enabled = False
                    ddlPlantilla.ToolTip = "Seleccione un operador y un archivo  para activar esta opción"
                Else
                    UtilitarioWeb.Dataddl(ddlPlantilla, IMP_Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>"), "vcNom", "P_inCodPla")
                    ddlPlantilla.Enabled = True
                    'ddlPlantilla.Attributes("disabled") = ""
                    'ddlPlantilla.ToolTip = ""
                End If

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If Zona IsNot Nothing Then Zona.Dispose()
            If IMP_Plantilla IsNot Nothing Then IMP_Plantilla.Dispose()
            If Llamada IsNot Nothing Then Llamada.Dispose()
            If IMP_Ruta IsNot Nothing Then IMP_Ruta.Dispose()
        End Try
    End Sub

    Protected Sub ddlOperador_SelectedIndexChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles ddlOperador.SelectedIndexChanged
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
            oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(ddlOperador.SelectedValue)
            oIMP_Plantilla.inTipArc = -1
            oIMP_Plantilla.inTipPla = -1

            If oIMP_Plantilla.Operador.P_inCodOpe = -1 Then
                ddlPlantilla.Items.Clear()
                UtilitarioWeb.ValorDefectoddl(ddlPlantilla, "No disponible", "-1")
                ddlPlantilla.Enabled = False
                ddlPlantilla.ToolTip = "Seleccione un operador y un archivo  para activar esta opción"
            Else
                UtilitarioWeb.Dataddl(ddlPlantilla, Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>"), "vcNom", "P_inCodPla")
                ddlPlantilla.Enabled = True
                'ddlPlantilla.Attributes("disabled") = ""
                'ddlPlantilla.ToolTip = ""
            End If
            ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal inCodRut As String, ByVal inCodOpe As String, ByVal F_inCodPla As String, ByVal inCodZon As String, ByVal vcPre As String, ByVal vcRemPre As String,
                                   ByVal inLonMin As String, ByVal inLonMax As String, ByVal inCodTipNum As String, ByVal btVig As String) As String

        Dim IMP_Ruta As BL_MOV_IMP_Ruta = Nothing
        Try

            IMP_Ruta = New BL_MOV_IMP_Ruta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oIMP_Ruta As New ENT_MOV_IMP_Ruta

            oIMP_Ruta.Operador.P_inCodOpe = inCodOpe
            oIMP_Ruta.F_inCodPla = Integer.Parse(F_inCodPla)
            oIMP_Ruta.Zona.P_inCodOri = Integer.Parse(inCodZon)
            oIMP_Ruta.vcPre = vcPre.Replace("&#39", "'")
            oIMP_Ruta.vcRemPre = vcRemPre.Replace("&#39", "'")
            oIMP_Ruta.inLonMin = Integer.Parse(inLonMin)
            oIMP_Ruta.inLonMax = Integer.Parse(inLonMax)
            oIMP_Ruta.inTipNum = Integer.Parse(inCodTipNum)
            oIMP_Ruta.btVig = Convert.ToBoolean(btVig)

            If inCodRut = "" Then
                Return IMP_Ruta.Insertar(oIMP_Ruta)
            Else
                oIMP_Ruta.P_inCodRut = Integer.Parse(inCodRut)
                Return IMP_Ruta.Actualizar(oIMP_Ruta)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Ruta IsNot Nothing Then IMP_Ruta.Dispose()
        End Try
    End Function
End Class