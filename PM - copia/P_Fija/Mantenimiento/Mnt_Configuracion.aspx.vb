Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
'Imports VisualSoft.PCSistel.Producto.BL
'Imports VisualSoft.PCSistel.Producto.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization


Public Class Mnt_Configuracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Mantenimiento As BL_MNT_Mantenimiento = Nothing
        Dim TipoDato As BL_MOV_CaracteristicaTipoDato = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    Mantenimiento = New BL_MNT_Mantenimiento(0, oUsuario.IdCliente)
                    TipoDato = New BL_MOV_CaracteristicaTipoDato(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(ddlTipoDato, TipoDato.Listar(""), "vcNom", "P_inCod")
                    Dim vcCod As String = Request.QueryString("Cod")

                    If vcCod <> "" Then
                        Dim oSerializer As New JavaScriptSerializer
                        Dim oMantenimiento As ENT_MNT_Mantenimiento
                        oMantenimiento = Mantenimiento.Mostrar(vcCod, "")

                        hdfIdMantenimiento.Value = oMantenimiento.IdMantenimiento
                        txtCodigo.Text = oMantenimiento.Codigo
                        txtNombre.Text = oMantenimiento.Nombre
                        chkEstado.Checked = oMantenimiento.btVig
                        hdfNumeroRegistro.Value = oMantenimiento.NumeroRegistros

                        'campos
                        Dim scriptCampos As String = "var arCampos = " & oSerializer.Serialize(oMantenimiento.Campos) & ";"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptCampos, True)

                        If (oMantenimiento.btVig) Then
                            trEstado.Style("display") = "none"
                        End If
                    Else
                        hdfNumeroRegistro.Value = "0"
                        hdfIdMantenimiento.Value = "-1"
                        trEstado.Style("display") = "none"

                        'campos
                        Dim scriptCampos As String = "var arCampos = [];"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptCampos, True)
                    End If
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
    Public Shared Function Guardar(ByVal oMantenimiento As String, ByVal CamposExtras As String) As Integer
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Mantenimiento As BL_MNT_Mantenimiento = New BL_MNT_Mantenimiento(0, oUsuario.IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim ENT_Mantenimiento As ENT_MNT_Mantenimiento = oSerializer.Deserialize(Of ENT_MNT_Mantenimiento)(oMantenimiento)
            Dim oCamposExtras As List(Of Dictionary(Of String, Object)) = oSerializer.Deserialize(Of List(Of Dictionary(Of String, Object)))(CamposExtras)

            For Each voCamposExtras As Dictionary(Of String, Object) In oCamposExtras
                If voCamposExtras("IdTipoDato") = "8" Or voCamposExtras("IdTipoDato") = "9" Then
                    voCamposExtras("Parametros") = oSerializer.Serialize(voCamposExtras("Parametros"))
                End If
            Next

            Return Mantenimiento.Guardar(ENT_Mantenimiento, oCamposExtras)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class