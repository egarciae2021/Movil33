Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Imp_EliminarRegistros
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Plantilla = New BL_MOV_IMP_Plantilla(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim listaOperadores As List(Of ENT_GEN_Operador) = Operador.Listar()

                    UtilitarioWeb.Dataddl(ddlTipoTelefonia, Llamada.ListarTipoTelefonia(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoLlamada, Llamada.ListarTipoLlamada(), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoPlantilla, Plantilla.ListarTipoPlantilla(-1, "<Seleccionar>"), "vcNomTipPla", "P_inCodTipPla")
                    UtilitarioWeb.DatachkLst(chklstOperador, listaOperadores, "vcNomOpe", "P_inCodOpe")
                    ddlTipoLlamada.Items.Insert(0, New ListItem("<Seleccionar>", "-1"))

                    For Each itemOperador In listaOperadores
                        Dim listaCuentas As List(Of ENT_MOV_Cuenta) = ListarCuentaPorOperador(itemOperador.P_inCodOpe.ToString(), "")

                        For i As Integer = 0 To listaCuentas.Count - 1
                            ddlCuentas.Items.Add(New ListItem(listaCuentas(i).vcNom + " (" + itemOperador.vcNomOpe + ")", listaCuentas(i).P_vcCod))
                        Next
                    Next

                    HdfTotalCheckOperador.Value = chklstOperador.Items.Count.ToString()

                    If chklstOperador.Items.Count = 1 Then
                        chkOperador.Enabled = False
                        chkOperador.Checked = True
                        chklstOperador.Enabled = False
                        chklstOperador.Items(0).Selected = True
                    End If

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
            If Llamada IsNot Nothing Then
                Llamada.Dispose()
            End If
        End Try
    End Sub


    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String, ByVal codAreaSeleccionada As String) As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            Dim FiltroCodSucursalesParaCuentas As String = ""

            If (codAreaSeleccionada <> "") Then

                FiltroCodSucursalesParaCuentas = "( CodigoOrganizacion LIKE '" & codAreaSeleccionada & "%' OR ISNULL(CodigoOrganizacion,'') = '') OR"

            ElseIf (oUsuario.F_vcCodInt.Contains(",")) Then

                Dim arrayCodigosAreas As String() = oUsuario.F_vcCodInt.Split(",")

                For Each codigo As String In arrayCodigosAreas
                    'CodigoOrganizacion LIKE @CodInt + '%' OR ISNULL(CodigoOrganizacion,'') = ''
                    FiltroCodSucursalesParaCuentas += "( CodigoOrganizacion LIKE '" & codigo.ToString & "%' OR ISNULL(CodigoOrganizacion,'') = '') OR"
                Next
            End If

            If (FiltroCodSucursalesParaCuentas <> "") Then
                FiltroCodSucursalesParaCuentas = FiltroCodSucursalesParaCuentas.Substring(0, FiltroCodSucursalesParaCuentas.Length - 3)
            End If

            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperadorConFiltro(Convert.ToInt32(inCodOpe), oUsuario.P_inCod, FiltroCodSucursalesParaCuentas)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ProcesarEliminacion(ByVal dtFecIni As String, ByVal dtFecFin As String, ByVal inCodTipTel As String, ByVal inCodTipLla As String, ByVal inCodTipPla As String, ByVal lstOpe As String, ByVal lstCuentas As String()) As String
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing

        Try
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Llamada.ProcesarEliminacion(Convert.ToDateTime(dtFecIni), Convert.ToDateTime(dtFecFin), Convert.ToInt32(inCodTipTel), Convert.ToInt32(inCodTipLla), Convert.ToInt32(inCodTipPla), lstOpe, lstCuentas)

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then
                Llamada.Dispose()
            End If
        End Try
    End Function
End Class