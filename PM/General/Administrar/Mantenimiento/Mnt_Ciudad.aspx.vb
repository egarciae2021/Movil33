Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_Ciudad
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Ciudad As BL_GEN_Ciudad = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim vcCodCiu As String = Request.QueryString("Cod")
                    Dim vcParam As String = Request.QueryString("Par")

                    If vcParam IsNot Nothing AndAlso vcParam.Split(",")(0).ToString.Equals("CIUD_PF_vcCODPAI") Then
                        vcCodCiu = vcCodCiu.Split("-")(1) + "-" + vcCodCiu.Split("-")(0)
                    End If

                    'hdfCompania.Value = vcCodCue
                    Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


                    If vcCodCiu <> "" Then
                        Dim oSerializer As New JavaScriptSerializer
                        'Dim Script As String
                        Dim oCiudad As ENT_GEN_Ciudad = Ciudad.Mostrar(vcCodCiu)
                        If oCiudad.P_vcCodCiu + "-" + oCiudad.Pais.P_vcCodPai = vcCodCiu Then
                            txtCodigo.Enabled = False
                            txtCodigo.Text = oCiudad.P_vcCodCiu.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtNombre.Text = oCiudad.vcNomCiu.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            hdfPais.Value = oCiudad.Pais.P_vcCodPai
                            txtPais.Text = oCiudad.Pais.vcNomPai.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtPais.Enabled = False
                            hdfCiudad.Value = oCiudad.P_vcCodCiu
                            chkPadre.Enabled = False
                            chkEstado.Checked = oCiudad.CIUD_btEST
                            If chkEstado.Checked Then
                                trEstado.Style("display") = "none"
                            Else
                                chkEstado.Enabled = True
                            End If
                        Else
                            hdfCiudad.Value = "-1"
                        End If
                        txtNombre.Focus()
                    Else
                        hdfCiudad.Value = ""
                        trEstado.Style("display") = "none"
                        txtPais.Focus()
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Ciudad IsNot Nothing Then Ciudad.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCiudadPorPais(ByVal vcCodPai As String, ByVal vcCiudadesBase As String) As List(Of ENT_GEN_Ciudad)
        Dim Ciudad As BL_GEN_Ciudad = Nothing
        Dim resultado As New List(Of ENT_GEN_Ciudad)
        Try
            vcCiudadesBase = vcCiudadesBase.Replace("&#39", "'")
            Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            resultado = Ciudad.ListarCiudadPorPais(vcCodPai, vcCiudadesBase)
        Catch ex As Exception
        Finally
            If Ciudad IsNot Nothing Then Ciudad.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal oCiudad As String, ByVal vcCodCiu As String) As Integer
        Dim Ciudad As BL_GEN_Ciudad = Nothing
        Try

            Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCiudad As ENT_GEN_Ciudad = oSerializer.Deserialize(Of ENT_GEN_Ciudad)(oCiudad)

            If vcCodCiu = "" Then
                Return Ciudad.Insertar(v_oCiudad)
            Else
                Ciudad.Actualizar(v_oCiudad)
                Return 0
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Ciudad IsNot Nothing Then Ciudad.Dispose()
        End Try
    End Function

End Class
