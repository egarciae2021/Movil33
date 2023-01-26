Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_Solicitudes_de_atencion_SOA_Mnt_Bolsas
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_Solicitudes_de_atencion_SOA_Mnt_Bolsas_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'viIdTecnico = Me.ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    'hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim codigo As String = Request.QueryString("Cod")
                    Dim campo As String = Request.QueryString("Par")

                    If Not codigo Is Nothing Then
                        hdfIdBolsa.Value = codigo
                    Else
                        hdfIdBolsa.Value = "0"
                    End If

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarNivel(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try

            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.ListarNivel(prIdNivel)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then
                nivel.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarNivelConGeneral(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try

            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.ListarNivelconGeneral(prIdNivel)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then
                nivel.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarNivelVigentes(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try

            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.ListarNivelVigentes(prIdNivel)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then
                nivel.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa_dependencias(ByVal prIdBolsa As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.ListarBolsa_dependencias(prIdBolsa)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa(ByVal prIdBolsa As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.ListarBolsa(prIdBolsa)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa_porNivel(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.ListarBolsa_porNivel(prIdNivel)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa_porNivelExacto(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.ListarBolsa_porNivelExacto(prIdNivel)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarBolsa(ByVal prNombre As String, ByVal prDescripcion As String, ByVal prIdNivel As Integer, _
                                          ByVal prXml As String, ByVal pEsExterno As Integer, ByVal pEsAutomatico As Integer) As Integer
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.registrarBolsa(prNombre, prDescripcion, prIdNivel, prXml, IIf(pEsExterno = 1, True, False), IIf(pEsAutomatico = 1, True, False))

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function verificarEliminarEscalamiento(ByVal prIdBolsaBase As Integer, ByVal prIdBolsaFinal As Integer) As String
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.verificarEliminarEscalamiento(prIdBolsaBase, prIdBolsaFinal)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EditarBolsa(ByVal prIdBolsa As Integer, ByVal prNombre As String, ByVal prDescripcion As String, ByVal prIdNivel As Integer, _
                                       ByVal prXml As String, ByVal prActivo As Integer, ByVal pEsExterno As Integer, ByVal pEsAutomatico As Integer) As String
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.EditarBolsa(prIdBolsa, prNombre, prDescripcion, prIdNivel, prXml, prActivo, IIf(pEsExterno = 1, True, False), IIf(pEsAutomatico = 1, True, False))

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerBolsasNivelcero_tree() As List(Of ENT_SOA_TreeBolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.obtenerBolsasNivelcero_tree()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function
End Class
