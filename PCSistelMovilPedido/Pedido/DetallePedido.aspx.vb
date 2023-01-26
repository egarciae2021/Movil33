Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Public Class DetallePedido
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim objBlEmpleado As BL_GEN_Empleado = Nothing
        Dim financiamiento As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Dim campana As BL_MOV_CAM_Campana = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    If oUsuario Is Nothing Then
                        Dim scriptFinSession As String = "window.top.location.reload();"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptFinSession, True)
                        Exit Sub
                    End If
                    Dim IdCampana As Integer = Request.QueryString("IdCampana")
                    'Obtiene Datos Empleado....
                    If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then
                        hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                        objBlEmpleado = New BL_GEN_Empleado(oUsuario.IdCliente)
                        Dim oEmpleado As ENT_GEN_Empleado = objBlEmpleado.Mostrar(oUsuario.Empleado.P_vcCod)
                        If oEmpleado IsNot Nothing AndAlso oEmpleado.P_vcCod <> "" Then
                            lblNombreEmpleado.Text = ReemplazarTilder(oEmpleado.vcNom) & " (" & oUsuario.Empleado.P_vcCod & " - " & oUsuario.Mail & ")"
                            lblArea.Text = ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                            lblCentroCosto.Text = ReemplazarTilder(oEmpleado.CentroCosto.P_vcCodCenCos + " - " + oEmpleado.CentroCosto.vcNomCenCos)
                        End If

                    Else
                        Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                        Exit Sub
                    End If

                    financiamiento = New BL_MOV_CAM_FinanciamientoTipo(oUsuario.IdCliente)
                    campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
                    Dim listaFinanciamiento As List(Of ENT_MOV_CAM_FinanciamientoTipo) = financiamiento.ListarPorCampana(IdCampana)
                    Dim listaLugarEntrega As List(Of ENT_MOV_CAM_LugarEntrega) = campana.listarLugaresEntrega_porCampana(IdCampana)

                    For Each finan As ENT_MOV_CAM_FinanciamientoTipo In listaFinanciamiento
                        Me.ddlFinanciamiento.Items.Add(New ListItem(finan.DescripcionCorta, finan.IdTipoFinanciamiento))
                    Next

                    Dim js As New JavaScriptSerializer()
                    Dim script = "var LugarEntrega = " + js.Serialize(listaLugarEntrega) + "; "
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                End If

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If objBlEmpleado IsNot Nothing Then
                objBlEmpleado.Dispose()
            End If
            If financiamiento IsNot Nothing Then
                financiamiento.Dispose()
            End If
            If campana IsNot Nothing Then
                campana.Dispose()
            End If
        End Try
    End Sub

    Private Function ReemplazarTilder(ByVal strValor As String) As String
        strValor = strValor.Replace("Á", "A")
        strValor = strValor.Replace("É", "E")
        strValor = strValor.Replace("Í", "I")
        strValor = strValor.Replace("Ó", "O")
        strValor = strValor.Replace("Ú", "U")
        strValor = strValor.Replace("á", "a")
        strValor = strValor.Replace("é", "e")
        strValor = strValor.Replace("í", "i")
        strValor = strValor.Replace("ó", "o")
        strValor = strValor.Replace("ú", "u")

        Return strValor
    End Function

    <WebMethod()>
    Public Shared Function RegistrarFinanciamientoLugarEntrega(ByVal prIdPedido As Integer, ByVal pdIdFinanciamiento As Integer, ByVal prIdOficina As Integer) As Integer
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try
            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return pedido.RegistrarFinanciamientoLugarEntrega(prIdPedido, pdIdFinanciamiento, prIdOficina)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

End Class