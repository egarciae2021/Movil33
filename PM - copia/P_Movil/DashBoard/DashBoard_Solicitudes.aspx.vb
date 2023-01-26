
Imports System.Diagnostics.Eventing.Reader
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Auditoria
Imports System.Collections.Generic
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports UtilitarioWeb

Public Class DashBoard_Solicitudes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim dash_Solicitudes As BL_DashBoard_Solicitudes = Nothing

        Try

            If Not IsPostBack Then

                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim bl_ As BL_MOV_IMP_Servicio = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

                If TipoSolicitud.EsResponsableAprobacion() Then hdfIdTipSolAprLeer.Value = TipoSolicitud.ListarTipoSolicitudGrupo(1) Else hdfIdTipSolAprLeer.Value() = "0"
                hdfIdTipSolAprResp.Value = TipoSolicitud.ListarTipoSolicitudAprobacion()
                If UtilitarioWeb.Seguridad.EsAdministrador() Then hdfCodEmp.Value = "-1" Else hdfCodEmp.Value = oUsuario.Empleado.P_vcCod
                If oUsuario.CodIntResp = "" And Seguridad.EsAdministrador Then hdfCodIntRes.Value = "000" Else hdfCodIntRes.Value = oUsuario.CodIntResp

                hdfIdTipSolTecAsi.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
                hdfIdTipSolTecPro.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
                hdfIdTipSolTecCulAnu.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)

                hdfSolicitudesMultipleEspecialista.Value = Session("SolicitudesMultipleEspecialista")

                Dim esresponsable As Boolean = False

                If oUsuario.CodIntResp <> "" Then
                    esresponsable = True
                End If

                Dim vcTecnicos As String = Session("vcTecnicos")
                Dim codigoUsuario As Integer = oUsuario.P_inCod
                Dim esAdmin As Boolean = UtilitarioWeb.Seguridad.EsAdministrador()

                btAprobacion.Value = "0"
                btProceso.Value = "0"

                If esresponsable Then
                    btAprobacion.Value = "1"
                End If

                Dim vcTenicos_arr = vcTecnicos.Split(",")
                For j = 0 To vcTenicos_arr.Length - 1
                    If Convert.ToString(codigoUsuario) = vcTenicos_arr(j).ToString() Then
                        btProceso.Value = "1"
                    End If
                Next

                If esAdmin Then
                    btAprobacion.Value = "1"
                    btProceso.Value = "1"
                End If

                Dim fecDesde As String = ""

                Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "ParametrosReporte", "", "", "", "", "", "", "", "")

                Dim script As String = ""

                For Each row As DataRow In dt.Rows

                    Dim clave As String = row("Clave")
                    Dim valor As String = row("Valor")

                    If clave = "dwDesde" Then
                        script = script + " var p_dwDesde = '" + valor + "';"
                        fecDesde = valor
                    End If

                Next

                dwDesde.Items.Clear()

                Dim miDateTime As Date
                Dim diferencia As Integer

                If Request.QueryString("pe") IsNot Nothing Then
                    miDateTime = Date.ParseExact("20" + fecDesde.Substring(5, 2) + fecDesde.Substring(0, 2) + "010000", "yyyyMMddhhmm", Nothing)
                Else
                    miDateTime = Date.Now
                End If
                diferencia = DateDiff(DateInterval.Month, miDateTime, Date.Today)
                For i = 0 To 11
                    Dim mes As Date
                    If Request.QueryString("pe") IsNot Nothing Then
                        If diferencia > 6 Then
                            mes = miDateTime.AddMonths(6 - i)
                        Else
                            mes = miDateTime.AddMonths(diferencia - i)
                        End If
                    Else
                        mes = miDateTime.AddMonths(-i)
                    End If
                    Select Case mes.Month
                        Case 1
                            dwDesde.Items.Add(New ListItem("Enero " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 2
                            dwDesde.Items.Add(New ListItem("Febrero " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 3
                            dwDesde.Items.Add(New ListItem("Marzo " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 4
                            dwDesde.Items.Add(New ListItem("Abril " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 5
                            dwDesde.Items.Add(New ListItem("Mayo " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 6
                            dwDesde.Items.Add(New ListItem("Junio " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 7
                            dwDesde.Items.Add(New ListItem("Julio " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 8
                            dwDesde.Items.Add(New ListItem("Agosto " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 9
                            dwDesde.Items.Add(New ListItem("Septiembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 10
                            dwDesde.Items.Add(New ListItem("Octubre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case 11
                            dwDesde.Items.Add(New ListItem("Noviembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                        Case Else
                            dwDesde.Items.Add(New ListItem("Diciembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                            Exit Select
                    End Select
                Next

                dash_Solicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

                Try
                    lblPeriodo.Text = dwDesde.SelectedItem.Text
                Catch ex As Exception
                End Try

                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash_Solicitudes IsNot Nothing Then dash_Solicitudes.Dispose()
        End Try

    End Sub

    ' =============================================================================================================================
    ' LISTA Grafico PIE
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Grafico_Pai_Aprobacion(ByVal vcPeriodo As String, ByVal vcIdTipSolAprLeer As String, ByVal vcIdTipSolAprResp As String,
                                            ByVal vcCodEmp As String, ByVal vcCodIntRes As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            ' =====================================
            ' VARIABLES
            ' =====================================
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            ' =====================================
            ' DATOS
            ' =====================================
            Dim esResponsableArea As Boolean = oUsuario.esJefeArea
            Dim esAdministrador As Boolean = oUsuario.EsAdministrador

            Dim filtro As String = GeneraFiltroPorCodigoArea()

            Dim dt As DataTable = bl_.ObtieneCantidadSolicitudes_Pie_(vcPeriodo, oUsuario.P_inCod, vcIdTipSolAprLeer, vcIdTipSolAprResp, vcCodEmp, vcCodIntRes, Nothing, filtro)

            ' =====================================
            ' BUCLE
            ' =====================================
            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Valor")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Periodo").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("IdEstado").ToString()
                            ent.vcGrupo03 = dt.Rows(fila)("Valor").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Color").ToString()

                            ent.vcGrupo21 = dt.Rows(fila)("NomAbrev").ToString()

                            fila = fila + 1

                            'If ent.vcGrupo03 > 0 Then
                            list_.Add(ent)
                            'End If
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Pai_Proceso(ByVal vcPeriodo As String, ByVal vcIdTipSolTecAsi As String, ByVal vcIdTipSolTecPro As String,
                                                    ByVal vcIdTipSolTecCulAnu As String, ByVal vcCodEmp As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            ' =====================================
            ' VARIABLES
            ' =====================================
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            ' =====================================
            ' DATOS
            ' =====================================
            Dim vcFiltro As String = GeneraFiltroPorCodigoArea()

            Dim dt As DataTable = bl_.ObtieneCantidadSolicitudes_Pie_proceso_(vcPeriodo, oUsuario.P_inCod, vcIdTipSolTecAsi, vcIdTipSolTecPro, vcIdTipSolTecCulAnu, vcCodEmp, Nothing, vcFiltro)

            ' =====================================
            ' BUCLE
            ' =====================================
            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Valor")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Periodo").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("IdEstado").ToString()
                            ent.vcGrupo03 = dt.Rows(fila)("Valor").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Color").ToString()

                            ent.vcGrupo21 = dt.Rows(fila)("NomAbrev").ToString()

                            fila = fila + 1

                            'If ent.vcGrupo03 > 0 Then
                            list_.Add(ent)
                            'End If
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_TopTen_Aprobacion(ByVal vcPeriodo As String, ByVal vcIdTipSolAprLeer As String, ByVal vcIdTipSolAprResp As String,
                                                     ByVal vcIdTipSolTecAsi As String, ByVal vcIdTipSolTecPro As String, ByVal vcIdTipSolTecCulAnu As String,
                                            ByVal vcCodEmp As String, ByVal vcCodIntRes As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim esResponsableArea As Boolean = oUsuario.esJefeArea
            Dim esAdministrador As Boolean = oUsuario.EsAdministrador

            Dim filtro As String = GeneraFiltroPorCodigoArea()

            'If (listaCodigosArea.Count > 1 And oUsuario.F_vcCodInt.Contains(",")) Then
            '    For Each codigoArea As String In listaCodigosArea
            '        filtro += "EM.EMPL_CodInt2 like '" & codigoArea & "%' OR "
            '    Next

            '    If filtro.Length > 0 Then
            '        filtro = filtro.Substring(0, filtro.Length - 4)
            '        filtro = "(" + filtro + ")"
            '    End If
            'Else
            '    filtro = "EM.EMPL_CodInt2 like '" & IIf(listaCodigosArea(0) <> "", listaCodigosArea(0), "asd") & "%'"
            'End If

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtieneCantidadSolicitudes_TopTen(vcPeriodo, 2, oUsuario.P_inCod, vcIdTipSolAprLeer, vcIdTipSolAprResp, vcCodEmp, vcCodIntRes, vcIdTipSolTecAsi, vcIdTipSolTecPro, vcIdTipSolTecCulAnu, filtro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("IdTipoSolicitud").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("NombreTipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("IdEstado").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("NombreEstado").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Color").ToString()

                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_TopTen_Proceso(ByVal vcPeriodo As String, ByVal vcIdTipSolAprLeer As String, ByVal vcIdTipSolAprResp As String,
                                                     ByVal vcIdTipSolTecAsi As String, ByVal vcIdTipSolTecPro As String, ByVal vcIdTipSolTecCulAnu As String,
                                            ByVal vcCodEmp As String, ByVal vcCodIntRes As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim vcFiltro As String = GeneraFiltroPorCodigoArea()

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtieneCantidadSolicitudes_TopTen(vcPeriodo, 3, oUsuario.P_inCod, vcIdTipSolAprLeer, vcIdTipSolAprResp, vcCodEmp, vcCodIntRes, vcIdTipSolTecAsi, vcIdTipSolTecPro, vcIdTipSolTecCulAnu, vcFiltro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                        ent.vcGrupo01 = dt.Rows(fila)("IdTipoSolicitud").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("NombreTipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("IdEstado").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("NombreEstado").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Color").ToString()

                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    Public Shared Function GeneraFiltroPorCodigoArea() As String
        Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

        Dim esResponsableArea As Boolean = oUsuario.esJefeArea
        Dim esAdministrador As Boolean = oUsuario.EsAdministrador

        Dim filtro As String = ""
        Dim listaCodigosArea As String()

        If esAdministrador Then 'Si es administrador tiene que ver todas las solicitudes aunque no tenga asignado ningún área
            filtro = "EM.EMPL_CodInt2 like '001%' "
        ElseIf esResponsableArea Or oUsuario.F_vcCodInt <> "" Then

            If esResponsableArea Then
                listaCodigosArea = oUsuario.CodIntResp.Split(",")
                For Each codigoArea In listaCodigosArea
                    filtro += "EM.EMPL_CodInt2 like '" & codigoArea & "%' OR "
                Next
            Else 'Si no es responsable de área pero tiene areas asignadas
                listaCodigosArea = oUsuario.F_vcCodInt.Split(",")
                For Each codigoArea In listaCodigosArea
                    filtro += "EM.EMPL_CodInt2 like '" & codigoArea & "%' OR "
                Next
            End If

            If filtro.Length > 0 Then
                filtro = filtro.Substring(0, filtro.Length - 4)
                filtro = "(" + filtro + ")"
            End If

        End If

        Return filtro
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Umbrales_Aprobados(ByVal vcPeriodo As String, ByVal vcIdTipSolAprLeer As String, ByVal vcIdTipSolAprResp As String,
                                                      ByVal vcCodEmp As String, ByVal vcCodIntRes As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

            Dim esResponsableArea As Boolean = oUsuario.esJefeArea
            Dim esAdministrador As Boolean = oUsuario.EsAdministrador

            Dim filtro As String = GeneraFiltroPorCodigoArea()

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtenerUmbralesAprobados_(vcPeriodo, oUsuario.P_inCod, vcIdTipSolAprLeer, vcIdTipSolAprResp, vcCodEmp, vcCodIntRes, filtro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("Id").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("TipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("IdUmbral").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("Nombre").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Color").ToString()
                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Umbrales_PorAprobar(ByVal vcPeriodo As String, ByVal vcIdTipSolAprLeer As String, ByVal vcIdTipSolAprResp As String,
                                                      ByVal vcCodEmp As String, ByVal vcCodIntRes As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

            Dim vcFiltro As String = GeneraFiltroPorCodigoArea()

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtenerUmbralesPorAprobar_(vcPeriodo, oUsuario.P_inCod, vcIdTipSolAprLeer, vcIdTipSolAprResp, vcCodEmp, vcCodIntRes, vcFiltro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("Id").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("TipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("IdUmbral").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("Nombre").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Color").ToString()
                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Umbrales_EnProceso(ByVal vcPeriodo As String, ByVal vcIdTipSolTecAsi As String, ByVal vcIdTipSolTecPro As String, ByVal vcIdTipSolTecCulAnu As String,
                                                      ByVal vcCodEmp As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod
            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtenerUmbralesEnProceso_(oUsuario.P_inCod, vcIdTipSolTecAsi, vcIdTipSolTecPro, vcIdTipSolTecCulAnu, vcCodEmp)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("Id").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("TipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("IdUmbral").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("Nombre").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Color").ToString()
                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Umbrales_PorAsignar(ByVal vcPeriodo As String, ByVal vcIdTipSolTecAsi As String, ByVal vcIdTipSolTecPro As String, ByVal vcIdTipSolTecCulAnu As String,
                                                      ByVal vcCodEmp As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

            Dim vcFiltro As String = GeneraFiltroPorCodigoArea()

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtenerUmbralesPorAsignar_(oUsuario.P_inCod, vcIdTipSolTecAsi, vcIdTipSolTecPro, vcIdTipSolTecCulAnu, vcCodEmp, vcFiltro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("Id").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("TipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("IdUmbral").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("Nombre").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Color").ToString()
                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_TotalPeriodo_Aprobacion(ByVal vcPeriodo As String, ByVal vcTipSolAprLeer As String, ByVal vcTipSolAprResp As String, ByVal vcTipSolTecAsi As String,
                                                           ByVal vcTipSolTecPro As String, ByVal vcTipSolTecCulAnu As String, ByVal vcCodEmp As String, ByVal vcCodIntRes As String,
                                                           ByVal vcIdEstado As String, ByVal vcNroMeses As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

            Dim vcFiltro As String = GeneraFiltroPorCodigoArea()

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtieneTotalPeriodo_Tipo_EstadoAprDev_(2, oUsuario.P_inCod, vcTipSolAprLeer, vcTipSolAprResp, vcCodEmp, vcCodIntRes, vcTipSolTecAsi,
                                                                             vcTipSolTecPro, vcTipSolTecCulAnu, vcPeriodo, vcIdEstado, vcNroMeses, vcFiltro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("Periodo").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("IdTipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("NombreTipoSolicitud").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("IdEstado").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("NombreEstado").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo09 = dt.Rows(fila)("Color").ToString()
                        ent.vcGrupo10 = Convert.ToInt32(dt.Rows(fila)("ActivoPorDefecto")).ToString()
                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_TotalPeriodo_Proceso(ByVal vcPeriodo As String, ByVal vcTipSolAprLeer As String, ByVal vcTipSolAprResp As String, ByVal vcTipSolTecAsi As String,
                                                           ByVal vcTipSolTecPro As String, ByVal vcTipSolTecCulAnu As String, ByVal vcCodEmp As String, ByVal vcCodIntRes As String,
                                                           ByVal vcIdEstado As String, ByVal vcNroMeses As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

            Dim vcFiltro As String = GeneraFiltroPorCodigoArea()

            ''Validar criterio 3
            Dim dt As DataTable = bl_.ObtieneTotalPeriodo_Tipo_EstadoAprDev_(3, oUsuario.P_inCod, vcTipSolAprLeer, vcTipSolAprResp, vcCodEmp, vcCodIntRes, vcTipSolTecAsi,
                                                                             vcTipSolTecPro, vcTipSolTecCulAnu, vcPeriodo, vcIdEstado, vcNroMeses, vcFiltro)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("Periodo").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("IdTipoSolicitud").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("NombreTipoSolicitud").ToString()
                        ent.vcGrupo06 = dt.Rows(fila)("IdEstado").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("NombreEstado").ToString()
                        ent.vcGrupo08 = dt.Rows(fila)("Cantidad").ToString()
                        ent.vcGrupo09 = dt.Rows(fila)("Color").ToString()
                        ent.vcGrupo10 = Convert.ToInt32(dt.Rows(fila)("ActivoPorDefecto")).ToString()
                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEstadosPorTipoEstado(ByVal inIdTipoEstado As String) As List(Of ENT_GEN_GrupoServicio)
        Dim dt As DataTable
        Dim Estado As BL_MOV_Estado = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            Estado = New BL_MOV_Estado(oUsuario.IdCliente)
            dt = Estado.ListarPorModulo(Convert.ToInt32(inIdTipoEstado), 0)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("P_inCod").ToString()
                        ent.vcGrupo05 = dt.Rows(fila)("vcNom").ToString()
                        fila = fila + 1
                        If ent.vcGrupo01 <> "32" Then 'NO DEBEN MOSTRAR LAS SOLICITUDES PENDIENTES
                            list_.Add(ent)
                        End If

                    Next
                End If
            End If

            Return list_
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Estado) Then Estado.Dispose()
        End Try
    End Function

#Region "clase GrupoServicio"
    Class ENT_GEN_GrupoServicio

#Region "Declaracion"
        Private _IdGrupo As String
        Private _vcGrupo As String
        Public _vcGrupoWidth As String
        Public _vcGrupoAlign As String

        Public _vcGrupoServicio As String
        Public _vcServicioEnlace As String
        Public _vcPrefijo As String
        Public _vcAbrt As String
        Public _vcPosicion As String
        Public _vcColor As String

        Public _vcGrupo01 As String
        Public _vcGrupo02 As String
        Public _vcGrupo03 As String
        Public _vcGrupo04 As String
        Public _vcGrupo05 As String
        Public _vcGrupo06 As String
        Public _vcGrupo07 As String
        Public _vcGrupo08 As String
        Public _vcGrupo09 As String
        Public _vcGrupo10 As String
        Public _vcGrupo11 As String
        Public _vcGrupo12 As String
        Public _vcGrupo13 As String
        Public _vcGrupo14 As String
        Public _vcGrupo15 As String
        Public _vcGrupo16 As String
        Public _vcGrupo17 As String
        Public _vcGrupo18 As String
        Public _vcGrupo19 As String
        Public _vcGrupo20 As String

        ''Cambio ECONDEÑA
        Public _vcGrupo21 As String

        Public _vcGrupoWidth01 As String
        Public _vcGrupoWidth02 As String
        Public _vcGrupoWidth03 As String
        Public _vcGrupoWidth04 As String
        Public _vcGrupoWidth05 As String
        Public _vcGrupoWidth06 As String
        Public _vcGrupoWidth07 As String
        Public _vcGrupoWidth08 As String

#End Region

#Region "Métodos"

        Public Property vcColor() As String
            Get
                Return _vcColor
            End Get
            Set(ByVal value As String)
                _vcColor = value
            End Set
        End Property

        Public Property vcServicioEnlace() As String
            Get
                Return _vcServicioEnlace
            End Get
            Set(ByVal value As String)
                _vcServicioEnlace = value
            End Set
        End Property

        Public Property vcPrefijo() As String
            Get
                Return _vcPrefijo
            End Get
            Set(ByVal value As String)
                _vcPrefijo = value
            End Set
        End Property

        Public Property vcAbrt() As String
            Get
                Return _vcAbrt
            End Get
            Set(ByVal value As String)
                _vcAbrt = value
            End Set
        End Property

        Public Property vcPosicion() As String
            Get
                Return _vcPosicion
            End Get
            Set(ByVal value As String)
                _vcPosicion = value
            End Set
        End Property

        Public Property vcGrupoServicio() As String
            Get
                Return _vcGrupoServicio
            End Get
            Set(ByVal value As String)
                _vcGrupoServicio = value
            End Set
        End Property

        Public Property vcGrupoAlign() As String
            Get
                Return _vcGrupoAlign
            End Get
            Set(ByVal value As String)
                _vcGrupoAlign = value
            End Set
        End Property

        Public Property vcGrupoWidth() As String
            Get
                Return _vcGrupoWidth
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth = value
            End Set
        End Property

        Public Property vcGrupoWidth01() As String
            Get
                Return _vcGrupoWidth01
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth01 = value
            End Set
        End Property

        Public Property vcGrupoWidth02() As String
            Get
                Return _vcGrupoWidth02
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth02 = value
            End Set
        End Property

        Public Property vcGrupoWidth03() As String
            Get
                Return _vcGrupoWidth03
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth03 = value
            End Set
        End Property

        Public Property vcGrupoWidth04() As String
            Get
                Return _vcGrupoWidth04
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth04 = value
            End Set
        End Property

        Public Property vcGrupoWidth05() As String
            Get
                Return _vcGrupoWidth05
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth05 = value
            End Set
        End Property

        Public Property vcGrupoWidth06() As String
            Get
                Return _vcGrupoWidth06
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth06 = value
            End Set
        End Property

        Public Property vcGrupoWidth07() As String
            Get
                Return _vcGrupoWidth07
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth07 = value
            End Set
        End Property

        Public Property vcGrupoWidth08() As String
            Get
                Return _vcGrupoWidth08
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth08 = value
            End Set
        End Property


        Public Property IdGrupo() As String
            Get
                Return _IdGrupo
            End Get
            Set(ByVal value As String)
                _IdGrupo = value
            End Set
        End Property

        Public Property vcGrupo() As String
            Get
                Return _vcGrupo
            End Get
            Set(ByVal value As String)
                _vcGrupo = value
            End Set
        End Property

        Public Property vcGrupo01() As String
            Get
                Return _vcGrupo01
            End Get
            Set(ByVal value As String)
                _vcGrupo01 = value
            End Set
        End Property

        Public Property vcGrupo02() As String
            Get
                Return _vcGrupo02
            End Get
            Set(ByVal value As String)
                _vcGrupo02 = value
            End Set
        End Property

        Public Property vcGrupo03() As String
            Get
                Return _vcGrupo03
            End Get
            Set(ByVal value As String)
                _vcGrupo03 = value
            End Set
        End Property

        Public Property vcGrupo04() As String
            Get
                Return _vcGrupo04
            End Get
            Set(ByVal value As String)
                _vcGrupo04 = value
            End Set
        End Property

        Public Property vcGrupo05() As String
            Get
                Return _vcGrupo05
            End Get
            Set(ByVal value As String)
                _vcGrupo05 = value
            End Set
        End Property

        Public Property vcGrupo06() As String
            Get
                Return _vcGrupo06
            End Get
            Set(ByVal value As String)
                _vcGrupo06 = value
            End Set
        End Property

        Public Property vcGrupo07() As String
            Get
                Return _vcGrupo07
            End Get
            Set(ByVal value As String)
                _vcGrupo07 = value
            End Set
        End Property

        Public Property vcGrupo08() As String
            Get
                Return _vcGrupo08
            End Get
            Set(ByVal value As String)
                _vcGrupo08 = value
            End Set
        End Property

        Public Property vcGrupo09() As String
            Get
                Return _vcGrupo09
            End Get
            Set(ByVal value As String)
                _vcGrupo09 = value
            End Set
        End Property

        Public Property vcGrupo10() As String
            Get
                Return _vcGrupo10
            End Get
            Set(ByVal value As String)
                _vcGrupo10 = value
            End Set
        End Property

        Public Property vcGrupo11() As String
            Get
                Return _vcGrupo11
            End Get
            Set(ByVal value As String)
                _vcGrupo11 = value
            End Set
        End Property

        Public Property vcGrupo12() As String
            Get
                Return _vcGrupo12
            End Get
            Set(ByVal value As String)
                _vcGrupo12 = value
            End Set
        End Property

        Public Property vcGrupo13() As String
            Get
                Return _vcGrupo13
            End Get
            Set(ByVal value As String)
                _vcGrupo13 = value
            End Set
        End Property

        Public Property vcGrupo14() As String
            Get
                Return _vcGrupo14
            End Get
            Set(ByVal value As String)
                _vcGrupo14 = value
            End Set
        End Property

        Public Property vcGrupo15() As String
            Get
                Return _vcGrupo15
            End Get
            Set(ByVal value As String)
                _vcGrupo15 = value
            End Set
        End Property

        Public Property vcGrupo16() As String
            Get
                Return _vcGrupo16
            End Get
            Set(ByVal value As String)
                _vcGrupo16 = value
            End Set
        End Property

        Public Property vcGrupo17() As String
            Get
                Return _vcGrupo17
            End Get
            Set(ByVal value As String)
                _vcGrupo17 = value
            End Set
        End Property

        Public Property vcGrupo18() As String
            Get
                Return _vcGrupo18
            End Get
            Set(ByVal value As String)
                _vcGrupo18 = value
            End Set
        End Property

        Public Property vcGrupo19() As String
            Get
                Return _vcGrupo19
            End Get
            Set(ByVal value As String)
                _vcGrupo19 = value
            End Set
        End Property

        Public Property vcGrupo20() As String
            Get
                Return _vcGrupo20
            End Get
            Set(ByVal value As String)
                _vcGrupo20 = value
            End Set
        End Property

        Public Property vcGrupo21() As String
            Get
                Return _vcGrupo21
            End Get
            Set(value As String)
                _vcGrupo21 = value
            End Set
        End Property
#End Region

    End Class
#End Region

End Class