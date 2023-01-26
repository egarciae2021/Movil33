Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.Campana.BE

Public Class ALM_Almacen_Reporte
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If Not IsPostBack Then
                Dim vcTab As String = Request.QueryString("vcTab")
                Dim vcTipRep As String = Request.QueryString("vcTipRep")
                hdfvcTab.Value = vcTab
                hdfvcTipRep.Value = vcTipRep

                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                'OPERADOR
                Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, ""), "vcNomOpe", "P_inCodOpe")
                'LINEATIPO
                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "Seleccione"), "vcDescripcion", "P_inCod")
                'CAMPANA
                Dim lstDataCampana As New List(Of MOV_CAM_Campana)
                lstDataCampana = ListarCampanaPorOperador(ddlOperador.SelectedValue)
                UtilitarioWeb.Dataddl(ddlCampana, lstDataCampana, "Descripcion", "IdCampana")


                If lstDataCampana.Find(Function(c) c.btActivo = True) IsNot Nothing Then
                    ddlCampana.SelectedValue = lstDataCampana.Find(Function(c) c.btActivo = True).IdCampana.ToString()
                    hdfCampanaActiva.Value = ddlCampana.SelectedValue
                End If
                lstDataCampana.Insert(0, New MOV_CAM_Campana() With {.IdCampana = -1, .Descripcion = "<Seleccionar>"})




            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If Not IsNothing(Operador) Then Operador.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCampanaPorOperador(ByVal IdOperador As String) As List(Of MOV_CAM_Campana)
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Campana.ListarPorOperador(Convert.ToInt32(IdOperador))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then Campana.Dispose()
        End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
        For p As Integer = 0 To oUsuario.Perfiles.Count - 1
            If (vcPerfiles = "") Then
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            Else
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            End If
        Next
        '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function
End Class