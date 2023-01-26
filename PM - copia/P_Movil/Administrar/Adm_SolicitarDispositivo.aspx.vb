Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Collections
Imports System.Collections.Generic

Partial Class P_Movil_Administrar_Adm_SolicitarDispositivo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    'jherrera 20130513
                    '-----------------
                    Dim vcTab As String

                    If Not IsNothing(Request.QueryString("vcTab")) Then
                        vcTab = Request.QueryString("vcTab")
                        Session("vcTab") = vcTab

                        If vcTab = "Adm_CambioDispositivo" Then
                            lblTituloSolicitud.Text = "Solicitud de cambio de equipo"
                            hdfSolicitud.Value = "1"
                            btnSolicitar.Value = "Elegir equipo"
                        ElseIf vcTab = "Adm_NuevoDispositivo" Then
                            lblTituloSolicitud.Text = "Solicitud de nuevo de equipo"
                            btnSolicitar.Value = "Elegir equipo"
                            hdfSolicitud.Value = "2"
                            ddlDispositivo.Visible = False
                            lblEquipoTitulo.Visible = False
                        ElseIf vcTab = "Adm_ReposicionDispositivo" Then
                            lblTituloSolicitud.Text = "Solicitud de reposición de equipo"
                            btnSolicitar.Value = "Elegir equipo"
                            hdfSolicitud.Value = "3"
                        End If

                        hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfAdmin.Value = "0"
                        If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                        If hdfAdmin.Value = "0" Then 'If oUsuario.Empleado.P_vcCod <> "" Then
                            Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                     lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                     Empleado.Dispose()
                            txtEmpleado.Style("display") = "none"
                            hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                            'tbModelos.Visible = False
                        Else
                            lblEmpleado.Style("display") = "none"
                            hdfCodEmpleado.Value = ""
                        End If
                    Else
                        vcTab = Session("vcTab").ToString()

                        If vcTab = "Adm_CambioDispositivo" Then
                            lblTituloSolicitud.Text = "Solicitud de cambio de equipo"
                            hdfSolicitud.Value = "1"
                            btnSolicitar.Value = "Elegir equipo"
                        ElseIf vcTab = "Adm_NuevoDispositivo" Then
                            lblTituloSolicitud.Text = "Solicitud de nuevo de equipo"
                            btnSolicitar.Value = "Elegir equipo"
                            hdfSolicitud.Value = "2"
                            ddlDispositivo.Visible = False
                            lblEquipoTitulo.Visible = False
                        ElseIf vcTab = "Adm_ReposicionDispositivo" Then
                            lblTituloSolicitud.Text = "Solicitud de reposicion de equipo"
                            btnSolicitar.Value = "Elegir equipo"
                            hdfSolicitud.Value = "3"
                        End If

                        hdfAdmin.Value = "0"
                        If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                        Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                        If hdfAdmin.Value = "0" Then 'If oUsuario.Empleado.P_vcCod <> "" Then
                     lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom

                            txtEmpleado.Style("display") = "none"
                            hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                            tbModelos.Visible = False
                        Else
                            lblEmpleado.Style("display") = "none"
                            hdfCodEmpleado.Value = ""
                        End If

                        hdfCodEmpleado.Value = Request.QueryString("vcCodEmp")
                        hdfDispositivo.Value = Request.QueryString("dcNumLin")
                        hdfNuevoDispositivo.Value = Request.QueryString("vcNueDis")

                        txtEmpleado.Text = (Empleado.Mostrar(hdfCodEmpleado.Value)).vcNom.Replace("&#39", "''")
                  Empleado.Dispose()
                        Dim lstDispositivos As New List(Of ENT_MOV_Dispositivo)
                        lstDispositivos = Dispositivo.ListarPorEmpleado(hdfCodEmpleado.Value)
                        Dispositivo.Dispose()
                        ddlDispositivo.Items.Add(New ListItem("<Seleccionar>", "-1"))

                        For Each objDisp As ENT_MOV_Dispositivo In lstDispositivos
                            ddlDispositivo.Items.Add(New ListItem(objDisp.ModeloDispositivo.vcNom, objDisp.P_vcCodIMEI))
                        Next

                        ddlDispositivo.SelectedValue = hdfDispositivo.Value
                        divTabs.Style("Display") = "inherit"
                    End If
                    '-----------------

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
    Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of ENT_MOV_Dispositivo)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Dispositivos As New BL_MOV_Dispositivo(oUsuario.IdCliente)
            Dim lstDispositivo As List(Of ENT_MOV_Dispositivo)
            lstDispositivo = Dispositivos.ListarPorEmpleado(vcCodEmp)
            Dispositivos.Dispose()
            Return lstDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCodigoModelo(ByVal vcCodEmp As String, ByVal vcCodIMEI As String, ByVal vcTipSol As String) As Integer
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim dtSolicitud As New DataTable()
            dtSolicitud = Solicitud.MostrarPorCodEmpNumLin(vcCodEmp, vcCodIMEI, Convert.ToInt32(vcTipSol))
            Solicitud.Dispose()

            If dtSolicitud.Rows.Count > 0 AndAlso Not IsDBNull(dtSolicitud.Rows(0)("F_inCodModDis")) Then
                Return Convert.ToInt32(dtSolicitud.Rows(0)("F_inCodModDis"))
            Else
                Return 0
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadDispositivos(ByVal vcCodEmp As String) As Integer
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = new BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            Dim lstModeloDispositivo As DataTable

         lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo(vcCodEmp)

         ModeloDispositivo.Dispose()

            Dim intCantidad = lstModeloDispositivo.Rows.Count

            If intCantidad = 0 Then
                Return -1
            ElseIf (intCantidad = 1) Then
                Return Convert.ToInt32(lstModeloDispositivo.Rows(0)("P_inCod"))
            Else
                Return 0
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
