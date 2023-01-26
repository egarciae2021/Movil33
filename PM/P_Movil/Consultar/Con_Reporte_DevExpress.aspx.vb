Imports System.Data
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports DevExpress.XtraReports.UI
Imports System.IO
Imports VisualSoft.Common.Logging
Imports DevExpress.XtraEditors
Imports DevExpress.XtraPrinting.Native
Public Class Con_Reporte_DevExpress
    Inherits System.Web.UI.Page
    Dim titulo1, titulo2, titulo3, titulo4 As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Response.Clear()
            Dim Tipo As String = Request.QueryString("Tipo")
            Dim SubTipo As String = Request.QueryString("SubTipo")
            Dim NumCriterio As String = Request.QueryString("NumCriterio")
            Dim Detalle As String = Request.QueryString("Detalle")
            Dim Area As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oArea As New ENT_GEN_Organizacion

            If CType(Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod <> "" Then
                oArea = Area.MostrarPorEmpleado(CType(Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod)
            Else
                oArea.P_inCodOrg = -1
                oArea.vcNomOrg = ""
            End If
            Area.Dispose()
            dvReporte.Visible = True
            dvSinDatos.Visible = False
            Dim oCriterio As ENT_MOV_IMP_Criterio = CType(Session("Criterio" & NumCriterio), ENT_MOV_IMP_Criterio)
            Select Case Tipo
                Case 1 'Reporte
                    Select Case SubTipo
                        Case 1 'Resumen de servicios por celulares / directos
                            GenerarResumenServicios("Celular", oCriterio)
                        Case 2 'Resumen de servicios por empleado
                            GenerarResumenServicios("Empleado", oCriterio)
                        Case 3 'Detalle de servicios por celulares / directos
                            GenerarDetalleServicios("Celular", oCriterio)
                        Case 4 'Detalle de servicios por empleado
                            GenerarDetalleServicios("Empleado", oCriterio)
                        Case 5 'Tipo de llamada por empleado
                            GenerarTipoEmpleado(oCriterio)
                        Case 6 'Consumo por planes
                            GenerarConsumoPlan(oCriterio)
                        Case 7 'Detalle de planes dentro del plan
                            GenerarDetallePlan(1, oCriterio)
                        Case 8 'Detalle de planes fuera del plan y/o exceso
                            GenerarDetallePlan(2, oCriterio)
                    End Select
                Case 2 'Sumario
                    Select Case SubTipo
                        Case 1 'Por Niveles
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorNivel_GeneralSumario(oCriterio)
                                Case 2 'GeneralDetalle
                                    GenerarSumarioPorNivel_GeneralDetalle(oCriterio)
                                Case 3 'DetalladoServicios
                                    GenerarSumarioPorNivel_DetalladoServicios(oCriterio)
                            End Select
                        Case 2 'Por Area
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorArea_GeneralSumario(oCriterio)
                                Case 2 'GeneralDetalle
                                    GenerarSumarioPorArea_GeneralDetalle(oCriterio)
                                Case 3 'DetalladoServicios
                                    GenerarSumarioPorArea_DetalladoServicios(oCriterio)
                            End Select
                        Case 3 'Por Lineas
                            Select Case Detalle
                                Case 1 'Por organizacion sumario
                                    GenerarSumarioPorLineas_PorOrganizacionSumario(oCriterio)
                                Case 2 'Por organizacion detalle
                                    GenerarSumarioPorLineas_PorOrganizacionDetalle(oCriterio)
                                Case 3 'GeneralSumario
                                    GenerarSumarioPorLineas_GeneralSumario(oCriterio)
                                Case 4 'GeneralDetalle
                                    GenerarSumarioPorLineas_GeneralDetalle(oCriterio)
                                Case 5 'DetalladoServicios
                                    GenerarSumarioPorLineas_DetalladoServicios(oCriterio)
                            End Select
                        Case 4 'Por Empleados
                            Select Case Detalle
                                Case 1 'Por organizacion sumario
                                    GenerarSumarioPorEmpleado_PorOrganizacionSumario(oCriterio)
                                Case 2 'Por organizacion detalle
                                    GenerarSumarioPorEmpleado_PorOrganizacionDetalle(oCriterio)
                                Case 3 'GeneralSumario
                                    GenerarSumarioPorEmpleado_GeneralSumario(oCriterio)
                                Case 4 'GeneralDetalle
                                    GenerarSumarioPorEmpleado_GeneralDetalle(oCriterio)
                                Case 5 'DetalladoServicios
                                    GenerarSumarioPorEmpleado_DetalladoServicios(oCriterio)
                            End Select
                        Case 5 'Por Centro de costo
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorCentroCosto_GeneralSumario(oCriterio)
                                Case 2 'GeneralDetalle
                                    GenerarSumarioPorCentroCosto_GeneralDetalle(oCriterio)
                                Case 3 'DetalladoServicios
                                    GenerarSumarioPorCentroCosto_DetalladoServicios(oCriterio)
                            End Select
                        Case 6 'Por Números
                            Select Case Detalle
                                Case 1 'General-LOC
                                    GenerarSumarioPorNumero_General(oCriterio, "LOC")
                                Case 2 'General-CEL
                                    GenerarSumarioPorNumero_General(oCriterio, "CEL")
                                Case 3 'General-DDN
                                    GenerarSumarioPorNumero_General(oCriterio, "DDN")
                                Case 4 'General-DDI
                                    GenerarSumarioPorNumero_General(oCriterio, "DDI")
                                Case 5 'General-Todos
                                    GenerarSumarioPorNumero_General(oCriterio, "")
                                Case 6 'Por Empresa
                                    GenerarSumarioPorNumero_PorEmpresa(oCriterio)
                                Case 7 'Por Grupo
                                    GenerarSumarioPorNumero_PorGrupo(oCriterio)
                            End Select
                        Case 7 'Por Frecuencia de llamadas
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorFrecuenciaLlamadas_GeneralSumario(oCriterio)
                            End Select
                        Case 8 'Por Compañias
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorOperador_GeneralSumario(oCriterio)
                            End Select
                        Case 9 'Por Pais
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorPais_GeneralSumario(oCriterio)
                            End Select
                        Case 10 'Por Ciudad
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorCiudad_GeneralSumario(oCriterio)
                            End Select
                        Case 11 'Por Fecha
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorFecha_GeneralSumario(oCriterio)
                                Case 2 'GeneralDetalle
                                    GenerarSumarioPorFecha_GeneralDetalle(oCriterio)
                            End Select
                        Case 12 'Por Hora
                            Select Case Detalle
                                Case 1 'GeneralSumario
                                    GenerarSumarioPorHora_GeneralSumario(oCriterio)
                                Case 2 'GeneralDetalle
                                    GenerarSumarioPorHora_GeneralDetalle(oCriterio)
                            End Select
                    End Select
                Case 3 'Desconocido
                    GenerarDesconocido(oCriterio)
                Case 4 'Ranking
                    GenerarRanking(oCriterio)
            End Select

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
    Private Sub GenerarResumenServicios(ByVal pstrTipo As String, ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarResumenServicioPorCelularDirecto(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_ResumenServicioCelDir"
                titulo1 = "Control de telefonía"
                titulo2 = "Resumen por " + pstrTipo + " - Llamadas Salientes"
                titulo3 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Select Case pstrTipo
                    Case "Empleado"
                        Dim myReport As XRPT_Con_Rpt_ResumenServicioPorEmp = New XRPT_Con_Rpt_ResumenServicioPorEmp()
                        GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)
                    Case "Celular"
                        Dim myReport As XRPT_Con_Rpt_ResumenServicioPorCelDir = New XRPT_Con_Rpt_ResumenServicioPorCelDir()
                        GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)
                End Select

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarDetalleServicios(ByVal pstrTipo As String, ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarDetalleServicioPorCelularDirecto(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_DetalleServicioCelDir"
                titulo1 = "Control de telefonía"
                titulo2 = "Resumen por " + pstrTipo + " - Llamadas Salientes"
                titulo3 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Select Case pstrTipo
                    Case "Empleado"
                        Dim myReport As XRPT_Con_Rpt_DetalleServicioPorEmp = New XRPT_Con_Rpt_DetalleServicioPorEmp()
                        GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)
                    Case "Celular"
                        Dim myReport As XRPT_Con_Rpt_DetalleServicioPorCelDir = New XRPT_Con_Rpt_DetalleServicioPorCelDir()
                        GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)
                End Select

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarTipoEmpleado(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarTipoEmpleado(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_TipoPorEmpleado"
                titulo1 = "Tipo de Llamada por Empleado"
                titulo2 = "Tipo de Llamada por Empleado"
                titulo3 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_TipoLlamadaPorEmpleado = New XRPT_Con_Rpt_TipoLlamadaPorEmpleado()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarConsumoPlan(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarConsumoPlan(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_ConsumoPorPlan"
                titulo1 = "Tipo de Llamada por Empleado"
                titulo2 = "Tipo de Llamada por Empleado"
                titulo3 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_ConsumoPorPlan = New XRPT_Con_Rpt_ConsumoPorPlan()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarDetallePlan(ByVal inTipPlan As Integer, ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Dim dsDatosConsulta As New DataSet
        Dim dsDatos As New DataSet
        Dim Titulo As String = ""
        Try
            If inTipPlan = 1 Then
                dsDatosConsulta = Llamada.DetallePlanDentroPlan(oCriterio, vcCodInt)
                dsDatos = Llamada.DetallePlanDentroPlan(oCriterio, vcCodInt)
                Titulo = "Detalles de Planes, Dentro del Plan"
            ElseIf inTipPlan = 2 Then
                dsDatosConsulta = Llamada.DetallePlanFueraExcesoPlan(oCriterio, vcCodInt)
                dsDatos = Llamada.DetallePlanDentroPlan(oCriterio, vcCodInt)
                Titulo = "Detalles de Planes, Fuera del Plan y/o Exceso"
            End If


            If dsDatosConsulta.Tables(0).Rows.Count > 0 Then
                dsDatosConsulta.Tables(0).TableName = "MOV_s_IMP_Llamada_DetalleDentroPlan"
                titulo1 = "Detalle de Planes"
                titulo2 = Titulo
                titulo3 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_DetallePlan = New XRPT_Con_Rpt_DetallePlan()
                GenerarReporte(myReport, dsDatosConsulta.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorNivel_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionNivel_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOrgNivel_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Nivel"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralSumario = New XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorNivel_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionNivel_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOrgNivel_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Nivel"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorNivel_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionNivel_DetalleServicios(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOrgNivel_DetServicios"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Nivel"
                titulo3 = "General - Servicios"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOrganizacionNivel_DetalladoServicios = New XRPT_Con_Rpt_SumarioPorOrganizacionNivel_DetalladoServicios()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorArea_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionArea_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOrgArea_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Área"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralSumario = New XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorArea_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionArea_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOrgArea_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Área"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorArea_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionArea_DetalleServicios(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOrgArea_DetServicios"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Área"
                titulo3 = "Detalle - Servicios"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOrganizacionArea_DetalladoServicios = New XRPT_Con_Rpt_SumarioPorOrganizacionArea_DetalladoServicios()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorLineas_PorOrganizacionSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_PorOrganizacionSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorLinea_PorOrgaSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Línea"
                titulo3 = "Por Organización - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionSumario = New XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorLineas_PorOrganizacionDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_PorOrganizacionDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorLinea_PorOrgaDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Línea"
                titulo3 = "Por Organización - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionDetalle = New XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorLineas_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorLinea_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Línea"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorLinea_GeneralSumario = New XRPT_Con_Rpt_SumarioPorLinea_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorLineas_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorLinea_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Línea"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorLinea_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorLinea_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorLineas_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_DetalleServicios(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorLinea_DetServicios"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Línea"
                titulo3 = "Servicios - Línea"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorLinea_ServicioCelular = New XRPT_Con_Rpt_SumarioPorLinea_ServicioCelular()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorEmpleado_PorOrganizacionSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_PorOrganizacionSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorEmpleado_PorOrgaSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Empleado"
                titulo3 = "Por Organización - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionSumario = New XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorEmpleado_PorOrganizacionDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_PorOrganizacionDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorEmpleado_PorOrgaDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Empleado"
                titulo3 = "Por Organización - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionDetalle = New XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorEmpleado_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Empleado"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario = New XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorEmpleado_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Empleado"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorEmpleado_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorEmpleado_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorEmpleado_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_DetalleServicios(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorEmpleado_DetServicios"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Empleado"
                titulo3 = "Detalles - Servicios"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorEmpleado_ServicioCelular = New XRPT_Con_Rpt_SumarioPorEmpleado_ServicioCelular()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorCentroCosto_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorCentroCosto_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorCCO_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Centro de Costo"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralSumario = New XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorCentroCosto_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorCentroCosto_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorCCO_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Centro de Costo"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorCentroCosto_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorCentroCosto_DetalleServicios(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorCCO_DetServicios"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Centro de Costo"
                titulo3 = "Detalles - Servicios"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorCentroCosto_DetalladoServicios = New XRPT_Con_Rpt_SumarioPorCentroCosto_DetalladoServicios()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorNumero_General(ByVal oCriterio As ENT_MOV_IMP_Criterio, ByVal vcGlo As String)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorNumero_General(oCriterio, vcGlo, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                If vcGlo = "" Then
                    titulo3 = "General - Todos"
                Else
                    titulo3 = "General - " + vcGlo.Replace("LOC", "FIJA")
                End If
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorNumero_General"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Números"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorNumero_General = New XRPT_Con_Rpt_SumarioPorNumero_General()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorNumero_PorEmpresa(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorNumero_PorEmpresa(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorNumero_PorEmpresa"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Números"
                titulo3 = "Por Empresa"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorNumero_PorEmpresa = New XRPT_Con_Rpt_SumarioPorNumero_PorEmpresa()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorNumero_PorGrupo(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorNumero_PorGrupo(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupo"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Números"
                titulo3 = "Por Grupos"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorNumero_PorGrupo = New XRPT_Con_Rpt_SumarioPorNumero_PorGrupo()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorFrecuenciaLlamadas_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorFrecuenciaLlamada_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorFrecLlam_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Frecuencia de Llamadas"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorFrecuenciaLlamada_GeneralSumario = New XRPT_Con_Rpt_SumarioPorFrecuenciaLlamada_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorOperador_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorOperador_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorOper_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Organización Nivel"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario = New XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorPais_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorPais_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorPais_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Paises"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorPais_GeneralSumario = New XRPT_Con_Rpt_SumarioPorPais_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorCiudad_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorCiudad_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorCiudad_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Ciudad, " + oCriterio.PaisSumario.vcNomPai + ")"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorCiudad_GeneralSumario = New XRPT_Con_Rpt_SumarioPorCiudad_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorFecha_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorFecha_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorFecha_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Fecha"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorFecha_GeneralSumario = New XRPT_Con_Rpt_SumarioPorFecha_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorFecha_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorFecha_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorFecha_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Fecha"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorFecha_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorFecha_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorHora_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorHora_GeneralSumario(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorHora_GenSumario"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Hora"
                titulo3 = "General - Sumario"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorHora_GeneralSumario = New XRPT_Con_Rpt_SumarioPorHora_GeneralSumario()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarSumarioPorHora_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ListarSumarioPorHora_GeneralDetalle(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_SumarioPorHora_GenDetalle"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Hora"
                titulo3 = "General - Detalle"
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_SumarioPorHora_GeneralDetalle = New XRPT_Con_Rpt_SumarioPorHora_GeneralDetalle()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarDesconocido(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ReporteCelularDesconocido(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_Desconocido"
                titulo1 = "Control de Telefonía"
                titulo2 = "Sumario por Líneas  Desconocidas"
                titulo3 = ""
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_Desconocido = New XRPT_Con_Rpt_Desconocido()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarRanking(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim FechaIni As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy")
        Dim FechaFin As String = Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy")
        Try
            Dim dsDatos As DataSet = Llamada.ReporteCelularRanking(oCriterio, vcCodInt)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables(0).TableName = "MOV_s_IMP_Llamada_Ranking"
                titulo1 = "Control de Telefonía"
                titulo2 = "Ranking por Empleado - " + oCriterio.NivelRanking.vcNomNiv.ToString()
                titulo3 = ""
                titulo4 = "Periodo Desde: " + FechaIni + " - Hasta: " + FechaFin

                Dim myReport As XRPT_Con_Rpt_Ranking = New XRPT_Con_Rpt_Ranking()
                GenerarReporte(myReport, dsDatos.Tables(0), dsDatos)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporte(ByRef myReport As XtraReport, ByVal dtDatosReporte As DataTable, ByVal dtDatosSet As DataSet)

        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Cultura As BL_GEN_Cultura = Nothing
        Dim Tipo As String = Request.QueryString("Tipo")
        Dim SubTipo As String = Request.QueryString("SubTipo")
        Dim NumCriterio As String = Request.QueryString("NumCriterio")
        Dim Detalle As String = Request.QueryString("Detalle")
        Dim oCriterio As ENT_MOV_IMP_Criterio = CType(Session("Criterio" & NumCriterio), ENT_MOV_IMP_Criterio)
        Dim Regi As BL_GEN_Regi = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Cultura = New BL_GEN_Cultura(oUsuario.IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            UtilitarioWeb.ActualizarCultura(oCultura)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                LogoCliente = Regi.Listar().REGI_imLOGEMP
            End If

            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)

            If oCriterio.vcTab = "" Then 'En en caso que no exista la tabla temporal y haya sido creada recien se guarda en la session y en el cliente
                If (dtDatosSet.Tables().Count > 1) Then
                    oCriterio.vcTab = dtDatosSet.Tables(1).Rows(0)("vcNomTab").ToString()
                    Session("Criterio" & oCriterio.inNumCri.ToString()) = oCriterio
                End If
            End If

            If Not IsNothing(dtDatosReporte) And dtDatosReporte.Rows.Count > 0 Then
                dsDatos.Tables.Add(dtDatosReporte.Copy)
                dsDatos.Tables(0).TableName = dtDatosReporte.TableName

                Dim mValores(8, 2) As String
                mValores(0, 0) = "cfTitulo1" : mValores(0, 1) = titulo1.ToUpper()
                mValores(1, 0) = "cfTitulo2" : mValores(1, 1) = titulo2
                mValores(2, 0) = "cfEmpresa" : mValores(2, 1) = dtCliente.Rows(0)("vcNomCli").ToString()
                mValores(3, 0) = "cfUsuario" : mValores(3, 1) = oUsuario.vcNom
                mValores(4, 0) = "cfTitulo3" : mValores(4, 1) = titulo3
                mValores(5, 0) = "cfTitulo4" : mValores(5, 1) = titulo4
                AsignarValoresFormulas(myReport.CalculatedFields, mValores)

                myReport.DataSource = dsDatos
                ReportViewer1.Report = myReport

                If SubTipo IsNot Nothing Then
                    Select Case Tipo
                        Case 1 'Reporte
                            Select Case SubTipo
                                Case 1 'Resumen de servicios por celulares / directos
                                    Dim myReport2 As XRPT_Con_Rpt_ResumenServicioPorCelDir = CType(myReport, XRPT_Con_Rpt_ResumenServicioPorCelDir)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                Case 2 'Resumen de servicios por empleado
                                    Dim myReport2 As XRPT_Con_Rpt_ResumenServicioPorEmp = CType(myReport, XRPT_Con_Rpt_ResumenServicioPorEmp)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                Case 3 'Detalle de servicios por celulares / directos
                                    Dim myReport2 As XRPT_Con_Rpt_DetalleServicioPorCelDir = CType(myReport, XRPT_Con_Rpt_DetalleServicioPorCelDir)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                Case 4 'Detalle de servicios por empleado
                                    Dim myReport2 As XRPT_Con_Rpt_DetalleServicioPorEmp = CType(myReport, XRPT_Con_Rpt_DetalleServicioPorEmp)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                Case 5 'Tipo de llamada por empleado
                                    Dim myReport2 As XRPT_Con_Rpt_TipoLlamadaPorEmpleado = CType(myReport, XRPT_Con_Rpt_TipoLlamadaPorEmpleado)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                Case 6 'Consumo por planes
                                    Dim myReport2 As XRPT_Con_Rpt_ConsumoPorPlan = CType(myReport, XRPT_Con_Rpt_ConsumoPorPlan)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                Case 7 'Detalle de planes dentro del plan
                                    Dim myReport2 As XRPT_Con_Rpt_DetallePlan = CType(myReport, XRPT_Con_Rpt_DetallePlan)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                Case 8 'Detalle de planes fuera del plan y/o exceso
                                    Dim myReport2 As XRPT_Con_Rpt_DetallePlan = CType(myReport, XRPT_Con_Rpt_DetallePlan)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                            End Select

                        Case 2 'Sumario
                            Select Case SubTipo
                                Case 1 'Por Niveles
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 3 'DetalladoServicios
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOrganizacionNivel_DetalladoServicios = CType(myReport, XRPT_Con_Rpt_SumarioPorOrganizacionNivel_DetalladoServicios)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTable2.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 2 'Por Area
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorOrganizacionArea_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 3 'DetalladoServicios
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOrganizacionArea_DetalladoServicios = CType(myReport, XRPT_Con_Rpt_SumarioPorOrganizacionArea_DetalladoServicios)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTable2.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 3 'Por Lineas
                                    Select Case Detalle
                                        Case 1 'Por organizacion sumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'Por organizacion detalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorLinea_PorOrganizacionDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 3 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorLinea_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorLinea_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 4 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorLinea_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorLinea_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 5 'DetalladoServicios
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorLinea_ServicioCelular = CType(myReport, XRPT_Con_Rpt_SumarioPorLinea_ServicioCelular)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTable2.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 4 'Por Empleados
                                    Select Case Detalle
                                        Case 1 'Por organizacion sumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'Por organizacion detalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 3 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 4 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorEmpleado_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorEmpleado_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 5 'DetalladoServicios
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorEmpleado_ServicioCelular = CType(myReport, XRPT_Con_Rpt_SumarioPorEmpleado_ServicioCelular)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTable2.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 5 'Por Centro de costo
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorCentroCosto_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 3 'DetalladoServicios
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorCentroCosto_DetalladoServicios = CType(myReport, XRPT_Con_Rpt_SumarioPorCentroCosto_DetalladoServicios)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTable2.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 6 'Por Números
                                    Select Case Detalle
                                        Case 1 'General-LOC
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_General = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_General)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'General-CEL
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_General = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_General)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                        Case 3 'General-DDN
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_General = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_General)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                        Case 4 'General-DDI
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_General = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_General)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                        Case 5 'General-Todos
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_General = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_General)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                        Case 6 'Por Empresa
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_PorEmpresa = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_PorEmpresa)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 7 'Por Grupo
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorNumero_PorGrupo = CType(myReport, XRPT_Con_Rpt_SumarioPorNumero_PorGrupo)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 7 'Por Frecuencia de llamadas
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorFrecuenciaLlamada_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorFrecuenciaLlamada_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 8 'Por Compañias
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario)
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 9 'Por Pais
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorPais_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorPais_GeneralSumario)
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 10 'Por Ciudad
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorCiudad_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorCiudad_GeneralSumario)
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 11 'Por Fecha
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorFecha_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorFecha_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorFecha_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorFecha_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                                Case 12 'Por Hora
                                    Select Case Detalle
                                        Case 1 'GeneralSumario
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorHora_GeneralSumario = CType(myReport, XRPT_Con_Rpt_SumarioPorHora_GeneralSumario)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCosto.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloSegundos.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloPromedio.Text = String.Format("Total ({0})", oCultura.Moneda.vcSimMon)
                                        Case 2 'GeneralDetalle
                                            Dim myReport2 As XRPT_Con_Rpt_SumarioPorHora_GeneralDetalle = CType(myReport, XRPT_Con_Rpt_SumarioPorHora_GeneralDetalle)
                                            'Actualización de Imagen y Cabecera Total
                                            If LogoCliente IsNot Nothing Then
                                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                            Else
                                                myReport2.xrPictureBoxLogo.Image = Nothing
                                            End If
                                            myReport2.XrTituloCostoFija.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCell.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoInter.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoSRCEL.Text = String.Format("Costo ({0})", oCultura.Moneda.vcSimMon)
                                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                                    End Select
                            End Select
                        Case 3 'Desconocido
                            Dim myReport2 As XRPT_Con_Rpt_Desconocido = CType(myReport, XRPT_Con_Rpt_Desconocido)
                            'Actualización de Imagen y Cabecera Total
                            If LogoCliente IsNot Nothing Then
                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                            Else
                                myReport2.xrPictureBoxLogo.Image = Nothing
                            End If
                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                        Case 4 'Ranking
                            Dim myReport2 As XRPT_Con_Rpt_Ranking = CType(myReport, XRPT_Con_Rpt_Ranking)
                            'Actualización de Imagen y Cabecera Total
                            If LogoCliente IsNot Nothing Then
                                myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                            Else
                                myReport2.xrPictureBoxLogo.Image = Nothing
                            End If
                            myReport2.XrTituloCostoTotal.Text = String.Format("Costo Total ({0})", oCultura.Moneda.vcSimMon)
                    End Select
                End If
            Else
                ReportViewer1.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        Finally

            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Cultura IsNot Nothing Then Cultura.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
        End Try

    End Sub
    Private Sub AsignarValoresFormulas(ByRef CamposCalculados As CalculatedFieldCollection, mValores(,) As String)
        For x As Integer = 0 To UBound(mValores) - 1
            If mValores(x, 0) IsNot Nothing AndAlso mValores(x, 0) <> "" Then
                For Each calcFiel As CalculatedField In CamposCalculados
                    If calcFiel.Name = mValores(x, 0) Then
                        calcFiel.Expression = "'" & mValores(x, 1) & "'"
                        Exit For
                    End If
                Next
            End If
        Next
    End Sub
    Public Function byteArrayToImage(byteArrayIn As Byte()) As System.Drawing.Image
        Try
            Dim converter As New System.Drawing.ImageConverter()
            Dim img As System.Drawing.Image = DirectCast(converter.ConvertFrom(byteArrayIn), System.Drawing.Image)
            Return img
        Catch ex As Exception
            Return Nothing
        End Try
    End Function
    Private Sub ReportViewer1_CacheReportDocument(sender As Object, e As DevExpress.XtraReports.Web.CacheReportDocumentEventArgs) Handles ReportViewer1.CacheReportDocument
        e.Key = Guid.NewGuid().ToString()
        Page.Session(e.Key) = e.SaveDocumentToMemoryStream()
    End Sub
    Private Sub ReportViewer1_RestoreReportDocumentFromCache(sender As Object, e As DevExpress.XtraReports.Web.RestoreReportDocumentFromCacheEventArgs) Handles ReportViewer1.RestoreReportDocumentFromCache
        Dim stream As Stream = TryCast(Page.Session(e.Key), Stream)
        If stream IsNot Nothing Then
            e.RestoreDocumentFromStream(stream)
        End If
    End Sub
End Class