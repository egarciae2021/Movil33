Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE


Public Class Imp_Mis_Perfiles
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            Dim dt As DataTable = DirectCast(Session("datos"), DataTable)
            hdfCodEmp.Value = "0" 'dt.Rows(0)("USUA_F_vcCODEMP").ToString()
            Dim strTipoPivot As String = "1" 'Request.QueryString("Pivot")
            If strTipoPivot IsNot Nothing AndAlso strTipoPivot <> "" Then
                Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "Imp_Mis_Perfiles_TipoPivot", "var TipoPivot='" & strTipoPivot & "';", True)
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        End If
    End Sub

    <WebMethod()>
    Public Shared Function ListarMisPerfiles(ByVal vcCodPerfil As String, ByVal vcTipoConsulta As String) As List(Of ENT_MOV_IMP_Perfil)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _idUsuario As Int32 = oUsuario.P_inCod
            Dim MisPerfiles As List(Of ENT_MOV_IMP_Perfil) = Plantilla.MostrarPerfil(Convert.ToInt32(vcCodPerfil), _idUsuario, Convert.ToInt32(vcTipoConsulta))

            Return MisPerfiles

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCampos_X_Perfil(ByVal vcCodPerfil As String, ByVal vcTipoConsulta As String) As ENT_MOV_IMP_Perfil
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _idUsuario As Int32 = oUsuario.P_inCod
            Dim oPerfil As ENT_MOV_IMP_Perfil = Plantilla.ObtenerCampos_X_Perfil(Convert.ToInt32(vcCodPerfil), _idUsuario, Convert.ToInt32(vcTipoConsulta))

            Return oPerfil

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

End Class

