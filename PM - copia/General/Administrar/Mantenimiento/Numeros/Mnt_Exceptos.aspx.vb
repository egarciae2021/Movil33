Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Numeros_Mnt_Exceptos
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Mantenimiento_Numeros_Mnt_Exceptos_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim GrupBaseDest As BL_GEN_GrupBaseDest = Nothing
        Dim excepto As BL_GEN_Excepto = Nothing
        Dim GroupDest As BL_GEN_GrupDest = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    hdfCod.Value = "-1"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    GrupBaseDest = New BL_GEN_GrupBaseDest(oUsuario.IdCliente)
                    Dim oGrupBaseDest As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_BASE_DEST) = GrupBaseDest.Listar_combo()

                    ddlTipo.DataSource = oGrupBaseDest
                    ddlTipo.DataTextField = "GRBD_vcNOMGRU"
                    ddlTipo.DataValueField = "GRBD_P_tiCODGRU"
                    ddlTipo.DataBind()


                    'chActivo.Visible = True


                    Dim codigo As String = Request.QueryString("Cod")

                    If Not IsNothing(codigo) Then
                        hdfCod.Value = codigo
                        excepto = New BL_GEN_Excepto(oUsuario.IdCliente)
                        Dim listaExceptos As List(Of String) = excepto.obtener_Excepto_x_id(Integer.Parse(codigo))

                        txtNumero.Text = listaExceptos(0)
                        txtDscNumero.Text = listaExceptos(1)
                        txtPaisMant.Text = listaExceptos(3) + " (" + listaExceptos(2) + ")"
                        txtCiudadMant.Text = listaExceptos(5) + " (" + listaExceptos(4) + ")"
                        txtTipoOriginal.Text = listaExceptos(7)
                        ddlTipo.SelectedValue = listaExceptos(6)

                        GroupDest = New BL_GEN_GrupDest(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oGroupDest As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_DEST) = GroupDest.obtener_M_GRUP_DEST_x_M_GRUP_BASE(listaExceptos(6))
                        ddlSubtipo.DataSource = oGroupDest
                        ddlSubtipo.DataTextField = "GRDE_vcNOMGRU"
                        ddlSubtipo.DataValueField = "GRDE_P_tiCODGRU"
                        ddlSubtipo.DataBind()

                        ddlSubtipo.SelectedValue = listaExceptos(8)
                        txtSubtipoOriginal.Text = listaExceptos(9)
                        txtEmpleado.Text = listaExceptos(11) + " (" + listaExceptos(10) + ")"
                        hdfEmpleado.Value = listaExceptos(10)

                        If listaExceptos(12) = "0" Then 'Estado Inactivo
                            chActivo.Checked = False
                            trEstado.Style("display") = ""
                        Else
                            chActivo.Checked = True
                            trEstado.Style("display") = "none"
                        End If

                    End If


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If GrupBaseDest IsNot Nothing Then GrupBaseDest.Dispose()
            If excepto IsNot Nothing Then excepto.Dispose()
            If GroupDest IsNot Nothing Then GroupDest.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarPais() As List(Of ENT_GEN_Pais)
        Dim Pais As BL_GEN_Pais = Nothing
        Try
            Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Pais.Listar("", "")
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pais IsNot Nothing Then
                Pais.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEmpleado() As List(Of String)
        Try

            Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of String) = Empleado.Listar_combo()
            Empleado.Dispose()
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCiudad(ByVal prCodPais As String) As List(Of ENT_GEN_Ciudad)
        Dim Ciudad As BL_GEN_Ciudad = Nothing
        Try
            Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
            codPais = codPais.Replace(")", "")
            Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Ciudad.ListarPorPais(codPais, "", "")

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Ciudad IsNot Nothing Then Ciudad.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerSubtipo(ByVal prIdTipo As Integer) As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_DEST)
        Dim subtipo As BL_GEN_GrupDest = Nothing
        Try
            subtipo = New BL_GEN_GrupDest(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return subtipo.obtener_M_GRUP_DEST_x_M_GRUP_BASE(prIdTipo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If subtipo IsNot Nothing Then subtipo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarNumero_x_dato(ByVal prCodPais As String, ByVal prCodCiudad As String, _
                                               ByVal prDato As String, ByVal prTipoConsulta As Byte) As List(Of VisualSoft.PCSistelMovil.General.BE.M_NUME)
        Dim Numero As BL_GEN_Numero = Nothing
        Try
            Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
            codPais = codPais.Replace(")", "")
            Dim codCiudad As String = prCodCiudad.Substring(prCodCiudad.IndexOf("(") + 1)
            codCiudad = codCiudad.Replace(")", "")
            Numero = New BL_GEN_Numero(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Numero.ListarNumero_x_dato(codPais, codCiudad, prDato, prTipoConsulta)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Numero IsNot Nothing Then Numero.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal prNumTel As String, ByVal prCodPais As String, ByVal prCodCiudad As String, ByVal prCodEmpleado As String, _
                                   ByVal prCodTipo As Byte, ByVal prCodSubtipo As Byte, ByVal esInsertar As Boolean, ByVal prEstado As Boolean) As String

        Dim Excepto As BL_GEN_Excepto = Nothing
        Try

            Excepto = New BL_GEN_Excepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
            codPais = codPais.Replace(")", "")

            Dim codCiudad As String = prCodCiudad.Substring(prCodCiudad.IndexOf("(") + 1)
            codCiudad = codCiudad.Replace(")", "")

            Dim codEmpleado As String = prCodEmpleado.Substring(prCodEmpleado.IndexOf("(") + 1)
            codEmpleado = codEmpleado.Replace(")", "")


            Dim resul As Boolean
            Try

                If esInsertar Then
                    resul = Excepto.Insertar(prNumTel, codPais, codCiudad, codEmpleado, prCodTipo, prCodSubtipo)

                Else
                    resul = Excepto.Actualizar(prNumTel, codPais, codCiudad, codEmpleado, prCodTipo, prCodSubtipo, prEstado)
                End If

                If resul Then
                    Return ""
                Else
                    Return "Error al guardar"
                End If

            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try

        Catch ex As Exception
        Finally
            If Excepto IsNot Nothing Then Excepto.Dispose()
        End Try
        Return ""
    End Function

    <WebMethod()>
    Public Shared Function ObtenerPaisInstalacion() As ENT_GEN_Pais
        Dim Pais As BL_GEN_Pais = Nothing
        Try
            Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim PaisInstalacion As ENT_GEN_Pais = Pais.MostrarPaisInstalacion()
            Return PaisInstalacion
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pais IsNot Nothing Then
                Pais.Dispose()
            End If
        End Try
    End Function

End Class
