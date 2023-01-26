Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.ImportacionExportacion
Imports CompCorreo

Partial Class P_Movil_Administrar_Adm_DistribucionMinutosImportarExportar
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            If Not IsPostBack Then

                Dim Tipo As String = Request.QueryString("Tipo")
                Dim SubTipo As String = Request.QueryString("SubTipo")
                hdfValorIlimitado.Value = Request.QueryString("vcValIli")
                hdfvcPeriodo.Value = Request.QueryString("vcPeriodo")

                'Linea = 1
                'CentroCosto = 2
                'Organizacion = 3
                'Nivel = 4
                'GrupoEmpleados = 5
                Try
                    Select Case Tipo
                        Case UtilitarioWeb.TipoDistribucionServicios.Linea

                            Select Case SubTipo
                                Case "1"  'Exportar
                                    PorLinea_Exportar()
                                Case "2"  'Importar
                                    dvImportar.Style("display") = "display"
                                    'PorLinea_Importar()
                            End Select

                        Case UtilitarioWeb.TipoDistribucionServicios.Organizacion

                            Select Case SubTipo
                                Case "1"  'Exportar
                                    'PorOrganizacion_Exportar()
                                Case "2"  'Importar
                                    dvImportar.Style("display") = "display"
                                    'PorLinea_Importar()
                            End Select

                        Case UtilitarioWeb.TipoDistribucionServicios.CentroCosto

                            Select Case SubTipo
                                Case "1"  'Exportar
                                    'PorCentroCosto_Exportar()
                                Case "2"  'Importar
                                    dvImportar.Style("display") = "display"
                                    'PorLinea_Importar()
                            End Select

                        Case UtilitarioWeb.TipoDistribucionServicios.GrupoEmpleados

                            Select Case SubTipo
                                Case "1"  'Exportar
                                    'PorGrupoEmpleados_Exportar()
                                Case "2"  'Importar
                                    dvImportar.Style("display") = "display"
                                    'PorLinea_Importar()
                            End Select

                        Case UtilitarioWeb.TipoDistribucionServicios.Nivel

                            Select Case SubTipo
                                Case "1"  'Exportar
                                    ' PorNivel_Exportar()
                                Case "2"  'Importar
                                    dvImportar.Style("display") = "display"
                                    'PorLinea_Importar()
                            End Select
                    End Select

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                End Try
            End If
        End If
    End Sub

    ' ===========================================================================================================================
    '   POR LINEA EXPORTAR
    ' ===========================================================================================================================
    Private Sub PorLinea_Exportar()

        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dm As New DistribucionMinutos()
        Dim dict As Dictionary(Of String, Object) = CType(Session("ParametrosLinea"), Dictionary(Of String, Object))

        Dim dtCampos As DataTable = Linea.ListarDistribucionServiciosColumnas(dict("vcCodCue").ToString())

        'Dim dtDatos As DataTable = Linea.ListarDistribucionServicios(dict("vcValIli").ToString(), dict("vcCodCue").ToString(), dict("vcCodLin").ToString(), dict("vcCodEmp").ToString(), dict("vcCodInt2").ToString(), _
        '                                                           dict("vcCodDis").ToString(), CType(dict("inCodModDis"), Integer?), dict("vcCodSuc").ToString(), _
        '                                                           CType(dict("inCodTip"), Integer?), CType(dict("btIncDep"), Boolean?), dict("vcCodCC").ToString(), CType(dict("inCodNiv"), Integer?),
        '                                                           CType(dict("inCodGruOri"), Integer?), CType(dict("inCodInt"), Integer?))

        Dim dtDatos As DataTable = Linea.ListarDistribucionServicios_Tmp_(dict("vcValIli").ToString(), dict("vcCodCue").ToString(), hdfvcPeriodo.Value, CType(dict("inCodNiv"), Integer?),
                                                                   CType(dict("inCodGruOri"), Integer?), dict("vcCodCC").ToString())
        'Dim dtDatos As DataTable

        Linea.Dispose()
        Dim nombreArchivo As String = "DistribucionMinutosLinea" & ".xls"

        System.IO.File.Delete(Server.MapPath("Distribucion\" & nombreArchivo))

        dm.ExportaDistribucionServicios(dtCampos, dtDatos, Server.MapPath("Distribucion\" & nombreArchivo), dict("vcValIli").ToString(), 9, 5)

        DescargarArchivo("Distribucion", nombreArchivo)

    End Sub

    Private Sub pororganizacion_exportar()
        Dim linea As bl_mov_linea = New bl_mov_linea(CType(httpcontext.current.session("usuario"), ent_seg_usuario).idcliente)
        Dim dm As New distribucionminutos()
        Dim dict As dictionary(Of String, Object) = CType(session("parametrosorganizacion"), dictionary(Of String, Object))
        Dim dtcampos As datatable = linea.listardistribucionservicioscolumnas(dict("vccodcue").tostring())
        Dim dtdatos As DataTable = linea.ListarDistribucionServicios(dict("vcvalili").ToString(), dict("vccodcue").ToString(), dict("vccodlin").ToString(), dict("vccodemp").ToString(), dict("vccodint2").ToString(), _
                                                                     dict("vccoddis").ToString(), CType(dict("incodmoddis"), Integer?), dict("vccodsuc").ToString(), _
                                                                     CType(dict("incodtip"), Integer?), CType(dict("btincdep"), Boolean?), dict("vccodcc").ToString(), CType(dict("incodniv"), Integer?), _
                                                                     CType(dict("incodgruori"), Integer?), CType(dict("incodint"), Integer?))
        linea.dispose()
        Dim nombrearchivo As String = "distribucionminutoslinea" & ".xls"

        system.io.file.delete(server.mappath("distribucion\" & nombrearchivo))
        dm.exportadistribucionservicios(dtcampos, dtdatos, server.mappath("distribucion\" & nombrearchivo), dict("vcvalili").tostring(), 9, 5)
        descargararchivo("distribucion", nombrearchivo)
    End Sub

    Private Sub PorCentroCosto_Exportar()
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dm As New DistribucionMinutos()
        Dim dict As Dictionary(Of String, Object) = CType(Session("ParametrosCentroCosto"), Dictionary(Of String, Object))
        Dim dtCampos As DataTable = Linea.ListarDistribucionServiciosColumnas(dict("vcCodCue").ToString())
        Dim dtDatos As DataTable = Linea.ListarDistribucionServicios(dict("vcValIli").ToString(), dict("vcCodCue").ToString(), dict("vcCodLin").ToString(), dict("vcCodEmp").ToString(), dict("vcCodInt2").ToString(), _
                                                                     dict("vcCodDis").ToString(), CType(dict("inCodModDis"), Integer?), dict("vcCodSuc").ToString(), _
                                                                     CType(dict("inCodTip"), Integer?), CType(dict("btIncDep"), Boolean?), dict("vcCodCC").ToString(), CType(dict("inCodNiv"), Integer?),
                                                                     CType(dict("inCodGruOri"), Integer?), CType(dict("inCodInt"), Integer?))
        Linea.Dispose()
        Dim nombreArchivo As String = "DistribucionMinutosLinea" & ".xls"

        System.IO.File.Delete(Server.MapPath("Distribucion\" & nombreArchivo))
        dm.ExportaDistribucionServicios(dtCampos, dtDatos, Server.MapPath("Distribucion\" & nombreArchivo), dict("vcValIli").ToString(), 9, 5)
        DescargarArchivo("Distribucion", nombreArchivo)
    End Sub

    Private Sub PorGrupoEmpleados_Exportar()
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dm As New DistribucionMinutos()
        Dim dict As Dictionary(Of String, Object) = CType(Session("ParametrosGrupoOrigen"), Dictionary(Of String, Object))
        Dim dtCampos As DataTable = Linea.ListarDistribucionServiciosColumnas(dict("vcCodCue").ToString())
        Dim dtDatos As DataTable = Linea.ListarDistribucionServicios(dict("vcValIli").ToString(), dict("vcCodCue").ToString(), dict("vcCodLin").ToString(), dict("vcCodEmp").ToString(), dict("vcCodInt2").ToString(), _
                                                                     dict("vcCodDis").ToString(), CType(dict("inCodModDis"), Integer?), dict("vcCodSuc").ToString(), _
                                                                     CType(dict("inCodTip"), Integer?), CType(dict("btIncDep"), Boolean?), dict("vcCodCC").ToString(), CType(dict("inCodNiv"), Integer?),
                                                                     CType(dict("inCodGruOri"), Integer?), CType(dict("inCodInt"), Integer?))
        Dim nombreArchivo As String = "DistribucionMinutosLinea" & ".xls"

        System.IO.File.Delete(Server.MapPath("Distribucion\" & nombreArchivo))
        dm.ExportaDistribucionServicios(dtCampos, dtDatos, Server.MapPath("Distribucion\" & nombreArchivo), dict("vcValIli").ToString(), 9, 5)
        DescargarArchivo("Distribucion", nombreArchivo)
    End Sub

    Private Sub PorNivel_Exportar()
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dm As New DistribucionMinutos()
        Dim dict As Dictionary(Of String, Object) = CType(Session("ParametrosNivel"), Dictionary(Of String, Object))
        Dim dtCampos As DataTable = Linea.ListarDistribucionServiciosColumnas(dict("vcCodCue").ToString())
        Dim dtDatos As DataTable = Linea.ListarDistribucionServicios(dict("vcValIli").ToString(), dict("vcCodCue").ToString(), dict("vcCodLin").ToString(), dict("vcCodEmp").ToString(), dict("vcCodInt2").ToString(), _
                                                                     dict("vcCodDis").ToString(), CType(dict("inCodModDis"), Integer?), dict("vcCodSuc").ToString(), _
                                                                     CType(dict("inCodTip"), Integer?), CType(dict("btIncDep"), Boolean?), dict("vcCodCC").ToString(), CType(dict("inCodNiv"), Integer?),
                                                                     CType(dict("inCodGruOri"), Integer?), CType(dict("inCodInt"), Integer?))
        Linea.Dispose()
        Dim nombreArchivo As String = "DistribucionMinutosLinea" & ".xls"

        System.IO.File.Delete(Server.MapPath("Distribucion\" & nombreArchivo))
        dm.ExportaDistribucionServicios(dtCampos, dtDatos, Server.MapPath("Distribucion\" & nombreArchivo), dict("vcValIli").ToString(), 9, 5)
        DescargarArchivo("Distribucion", nombreArchivo)
    End Sub

    Protected Sub btnCargar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnCargar.Click
        Dim files As HttpFileCollection = Request.Files
        Dim postedFile As HttpPostedFile = files(0)
        Dim nombreArchivo As String = "DistribucionMinutosI" & ".xls"

        If postedFile.ContentLength > 0 Then
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            postedFile.SaveAs(Server.MapPath("Distribucion\" & nombreArchivo))
            Dim dm As New DistribucionMinutos()

            Dim dt As DataTable = dm.ImportarDistribucionServicios(Server.MapPath("Distribucion\" & nombreArchivo), 9, 5)

            dt.Columns.Add("P_F_vcPeriodo", Type.GetType("System.String"))

            For Each dr As DataRow In dt.Rows


                dr("P_F_vcPeriodo") = hdfvcPeriodo.Value

            Next

            'JHERRERA 20140827 Se comentó por problemas de compilación
            'Linea.GuardarServiciosImportacion(dt, hdfValorIlimitado.Value, hdfvcPeriodo.Value)
            Linea.Dispose()
        End If
        OcultarPanel()
    End Sub

    Private Sub DescargarArchivo(ByVal carpeta As String, ByVal nombreArchivo As String)
        hdfArchivo.Value = carpeta & "\" & nombreArchivo

        Dim script As String = "ExportarArchivo(); CerrarCarga();"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    End Sub

    Private Sub OcultarPanel()
        Dim script As String = "CerrarCarga();"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    End Sub

    Protected Sub hdfArchivo_ValueChanged(sender As Object, e As EventArgs) Handles hdfArchivo.ValueChanged

    End Sub
End Class