Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.Campana.BE

Public Class ALM_AlmacenKardex
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = Nothing
        Dim objBlTipoServicio As BL_MOV_TipoServicio = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If Not IsPostBack Then
                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                LineaTipo = New BL_MOV_LineaTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")

                If ddlOperador.Items.Count = 2 Then
                    ddlOperador.Enabled = False
                    ddlOperador.SelectedIndex = 1

                    Dim lstCampana As New List(Of MOV_CAM_Campana)
                    lstCampana = ListarCampanaPorOperador(ddlOperador.SelectedValue)
                    UtilitarioWeb.Dataddl(ddlCampana, lstCampana, "Descripcion", "IdCampana")
                    If lstCampana.Find(Function(c) c.btActivo = True) IsNot Nothing Then
                        ddlCampana.SelectedValue = lstCampana.Find(Function(c) c.btActivo = True).IdCampana.ToString()
                        ddlCampana.Enabled = False
                        hdfCampanaActiva.Value = ddlCampana.SelectedValue
                    End If
                    'Debe de estar debajo del find porque sino se cae cuando no hay data
                    lstCampana.Insert(0, New MOV_CAM_Campana() With {.IdCampana = -1, .Descripcion = "<Seleccionar>"})
                End If

                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")

                objBlTipoServicio = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()
                TipoServicio.Insert(0, New ENT_MOV_TipoModeloDispositivo() With {.IdTipoModeloDispositivo = -1, .Descripcion = "TODOS"})
                UtilitarioWeb.Dataddl(ddlTipo, TipoServicio, "Descripcion", "IdTipoModeloDispositivo")

                Me.ddlTipoServicio.Items.Add(New ListItem("<TODOS>", -1))

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If TipoModeloDispositivo IsNot Nothing Then Operador.Dispose()
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
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
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function getTipoServicio(ByVal prIdTipoModeloDispositivo As Integer) As List(Of ENT_MOV_TipoServicio)
        Dim pedido As BL_MOV_TipoServicio = Nothing
        Try
            pedido = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return pedido.Listar_porIdTipoModeloDispositivo(prIdTipoModeloDispositivo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerKardexAlmacen(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal prIdCampana As Integer, _
                                                        ByVal prWhere As String) As Object
        Dim Almacen As BL_MOV_Almacen = Nothing
        Try
            Almacen = New BL_MOV_Almacen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'guardar filtros en variable session
            Dim dicParam As New Dictionary(Of String, String)
            dicParam.Add("IdCampana", prIdCampana.ToString())
            dicParam.Add("Where", prWhere)
            HttpContext.Current.Session("KardexParametros") = dicParam

            Return JQGrid.DatosJSON(Almacen.obtenerKardexAlmacen(prIdCampana, prWhere), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Almacen IsNot Nothing Then
                Almacen.Dispose()
            End If
        End Try
    End Function

    Private Sub eegKardex_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegKardex.ObtenerDatosAExportar
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim Almacen As BL_MOV_Almacen = Nothing
        Dim dtDatos As DataTable
        Try
            Almacen = New BL_MOV_Almacen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdCampana As Integer = 0
            Dim Where As String = String.Empty
            Dim parametros As Dictionary(Of String, String) = CType(HttpContext.Current.Session("KardexParametros"), Dictionary(Of String, String))
            IdCampana = Convert.ToInt32(parametros("IdCampana"))
            Where = parametros("Where")

            dtDatos = Almacen.obtenerKardexAlmacen_To_Export(IdCampana, Where)
            Me.eegKardex.ExportarDatos(dtDatos, "KardexAlmacen")
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Almacen IsNot Nothing Then
                Almacen.Dispose()
            End If
        End Try
    End Sub

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