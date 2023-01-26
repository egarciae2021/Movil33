Imports System.Data
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Consultar_Con_Reporte
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try

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
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = ""

        Select Case pstrTipo
            Case "Empleado"
                vcReporte = "Reportes/Con_Rpt_ResumenServicioPorEmp.rpt"
                'vcReporte = "Reportes/RptPrueba.rpt"
            Case "Celular"
                vcReporte = "Reportes/Con_Rpt_ResumenServicioPorCelDir.rpt"
        End Select

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de telefonía'")
        dictCampoFormula.Add("titulo", "'Resumen por " & pstrTipo & " - Llamadas Salientes'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                        " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarResumenServicioPorCelularDirecto(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte(vcReporte, dsDatos, oCriterio, "MOV_s_IMP_Llamada_ResumenServicioCelDir", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarDetalleServicios(ByVal pstrTipo As String, ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = ""
        Select Case pstrTipo
            Case "Empleado"
                vcReporte = "Reportes/Con_Rpt_DetalleServicioPorEmp.rpt"
            Case "Celular"
                vcReporte = "Reportes/Con_Rpt_DetalleServicioPorCelDir.rpt"
        End Select

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de telefonía'")
        dictCampoFormula.Add("titulo", "'Resumen por " & pstrTipo & " - Llamadas Salientes'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                        " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")
        dictCampoFormula.Add("titulototalempleado", "'Total por Empleado'")
        dictCampoFormula.Add("titulototallinea", "'Total por Linea'")
        dictCampoFormula.Add("titulototalgeneral", "'Total General'")
        dictCampoFormula.Add("tiponumero", "'Celular'")

        Dim dsDatos As DataSet = Llamada.ListarDetalleServicioPorCelularDirecto(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte(vcReporte, dsDatos, oCriterio, "MOV_s_IMP_Llamada_DetalleServicioCelDir", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarDesconocido(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Líneas  Desconocidas'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ReporteCelularDesconocido(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_Desconocido.rpt", dsDatos, oCriterio, "MOV_s_IMP_Llamadas_Desconocido", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarRanking(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        'dictCampoFormula.Add("titulo", "'Ranking por  Organización - Llamadas Salientes Realizadas'")
        dictCampoFormula.Add("titulo", "'Ranking por Empleado - " & oCriterio.NivelRanking.vcNomNiv.ToString() & "'")

        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")
        dictCampoFormula.Add("tituloranking", "'Ranking '")
        dictCampoFormula.Add("deranking", "' de '")
        dictCampoFormula.Add("titulototalgeneral", "'Total'")
        dictCampoFormula.Add("titulosubtotal", "'SubTotal'")

        Dim dsDatos As DataSet = Llamada.ReporteCelularRanking(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_Ranking.rpt", dsDatos, oCriterio, "MOV_s_IMP_Llamadas_Ranking", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarTipoEmpleado(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Tipo de Llamada por Empleado'")
        dictCampoFormula.Add("titulo", "'Tipo de Llamada por Empleado'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarTipoEmpleado(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_TipoLlamadaPorEmpleado.rpt", dsDatos, oCriterio, "MOV_s_IMP_Llamada_TipoPorEmpleado", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarDetallePlan(ByVal inTipPlan As Integer, ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim dsDatosConsulta As New DataSet
        Dim Titulo As String = ""

        If inTipPlan = 1 Then
            dsDatosConsulta = Llamada.DetallePlanDentroPlan(oCriterio, vcCodInt)
            Titulo = "'Detalles de Planes, Dentro del Plan'"
        ElseIf inTipPlan = 2 Then
            dsDatosConsulta = Llamada.DetallePlanFueraExcesoPlan(oCriterio, vcCodInt)
            Titulo = "'Detalles de Planes, Fuera del Plan y/o Exceso'"
        End If
        Llamada.Dispose()
        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", Titulo)
        dictCampoFormula.Add("titulo", "'Detalle de Planes'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")




        GenerarReporte("Reportes/Con_Rpt_DetallePlan.rpt", dsDatosConsulta, oCriterio, "MOV_s_IMP_Llamada_DetallePlan", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarConsumoPlan(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Consumo por Planes'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarConsumoPlan(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_ConsumoPorPlan.rpt", dsDatos, oCriterio, "MOV_s_IMP_Llamada_ConsumoPorPlan", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorNivel_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Organización Nivel'")
        dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionNivel_GeneralSumario(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorOrganizacionNivel_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorNivel_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Organización Nivel'")
        dictCampoFormula.Add("subtitulo2", "'General - Detalle'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionNivel_GeneralDetalle(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorOrganizacionNivel_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorNivel_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Organización Nivel'")
        dictCampoFormula.Add("subtitulo2", "'Detalle - Servicios'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionNivel_DetalleServicios(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorOrganizacionNivel_DetalladoServicios.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_DetalleServicios", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorArea_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Organización Área'")
        dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionArea_GeneralSumario(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorOrganizacionArea_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorArea_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Organización Área'")
        dictCampoFormula.Add("subtitulo2", "'General - Detalle'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionArea_GeneralDetalle(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorOrganizacionArea_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorArea_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Organización Área'")
        dictCampoFormula.Add("subtitulo2", "'Detalle - Servicios'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOrganizacionArea_DetalleServicios(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorOrganizacionArea_DetalladoServicios.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_DetalleServicios", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorLineas_PorOrganizacionSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Linea'")
        dictCampoFormula.Add("subtitulo2", "'Por Organización - Sumario'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_PorOrganizacionSumario(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorLinea_PorOrganizacionSumario.rpt", dsDatos, oCriterio, "SumarioPorLinea_PorOrganizacionSumario", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorLineas_PorOrganizacionDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Linea'")
        dictCampoFormula.Add("subtitulo2", "'Por Organización - Detalle'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_PorOrganizacionDetalle(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorLinea_PorOrganizacionDetalle.rpt", dsDatos, oCriterio, "SumarioPorLinea_PorOrganizacionDetalle", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorLineas_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Linea'")
        dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_GeneralSumario(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorLinea_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorLineas_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Linea'")
        dictCampoFormula.Add("subtitulo2", "'General - Detalle'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_GeneralDetalle(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorLinea_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
    End Sub
    Private Sub GenerarSumarioPorLineas_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        dictCampoFormula.Add("tipotelefonia", "'Celular'")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
        dictCampoFormula.Add("titulo", "'Sumario por Línea'")
        dictCampoFormula.Add("subtitulo2", "'Servicios - Línea'")
        dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                                 " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
        dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorLinea_DetalleServicios(oCriterio, vcCodInt)
        Llamada.Dispose()

        GenerarReporte("Reportes/Con_Rpt_SumarioPorLinea_ServicioCelular.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_DetalleServicios", dictCampoFormula, oUsuario)
    End Sub
   Private Sub GenerarSumarioPorEmpleado_PorOrganizacionSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Empleado'")
      dictCampoFormula.Add("subtitulo2", "'Por Organización - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_PorOrganizacionSumario(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorEmpleado_PorOrganizacionSumario.rpt", dsDatos, oCriterio, "SumarioPorLinea_PorOrganizacionSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorEmpleado_PorOrganizacionDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Empleado'")
      dictCampoFormula.Add("subtitulo2", "'Por Organización - Detalle'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_PorOrganizacionDetalle(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorEmpleado_PorOrganizacionDetalle.rpt", dsDatos, oCriterio, "SumarioPorLinea_PorOrganizacionDetalle", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorEmpleado_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Empleado'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorLinea_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorEmpleado_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Empleado'")
      dictCampoFormula.Add("subtitulo2", "'General - Detalle'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_GeneralDetalle(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorEmpleado_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorEmpleado_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Empleado'")
      dictCampoFormula.Add("subtitulo2", "'Detalles - Servicios'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorEmpleado_DetalleServicios(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorEmpleado_ServicioCelular.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_DetalleServicios", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorCentroCosto_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por  Centro de Costo'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorCentroCosto_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorCentroCosto_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorCentroCosto_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por  Centro de Costo'")
      dictCampoFormula.Add("subtitulo2", "'General - Detalle'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorCentroCosto_GeneralDetalle(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorCentroCosto_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorCentroCosto_DetalladoServicios(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Centro de Costo'")
      dictCampoFormula.Add("subtitulo2", "'Detalle - Servicios'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorCentroCosto_DetalleServicios(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorCentroCosto_DetalladoServicios.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_DetalleServicios", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorNumero_General(ByVal oCriterio As ENT_MOV_IMP_Criterio, ByVal vcGlo As String)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      If vcGlo = "" Then
         dictCampoFormula.Add("subtitulo2", "'General - Todos'")
      Else
            dictCampoFormula.Add("subtitulo2", "'General - " & vcGlo.Replace("LOC", "FIJA") & "'")
      End If
      dictCampoFormula.Add("titulo", "'Sumario por Números'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorNumero_General(oCriterio, vcGlo, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorNumero_General.rpt", dsDatos, oCriterio, "SumarioPorNumero_General", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorNumero_PorEmpresa(ByVal oCriterio As ENT_MOV_IMP_Criterio)
        Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Números'")
      dictCampoFormula.Add("subtitulo2", "'Por Empresa'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Llamada.ListarSumarioPorNumero_PorEmpresa(oCriterio, vcCodInt)
      Llamada.Dispose()

      GenerarReporte("Reportes/Con_Rpt_SumarioPorNumero_PorEmpresa.rpt", dsDatos, oCriterio, "SumarioPorNumero_PorEmpresa", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorNumero_PorGrupo(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Números'")
      dictCampoFormula.Add("subtitulo2", "'Por Grupos'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulototaltipo", "'Total por Tipo'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorNumero_PorGrupo(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorNumero_PorGrupo.rpt", dsDatos, oCriterio, "SumarioPorNumero_PorGrupo", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorFrecuenciaLlamadas_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Frecuencia de Llamadas'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorFrecuenciaLlamada_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorFrecuenciaLlamada_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorFrecrecuenciaLlamada_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorOperador_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Organización Nivel'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulototaloperador", "'Total por Operador'")
      dictCampoFormula.Add("titulototalsucursal", "'Total por Sucursal'")

      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorOperador_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorOperador_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOperador_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorPais_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Paises'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorPais_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorPais_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOperador_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorCiudad_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Ciudad, " & oCriterio.PaisSumario.vcNomPai & "'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total por Pais'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorCiudad_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorCiudad_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOperador_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorFecha_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Fecha'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorFecha_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorFecha_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorFecha_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Fecha'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorFecha_GeneralDetalle(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorFecha_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorHora_GeneralSumario(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Hora'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                               " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorHora_GeneralSumario(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorHora_GeneralSumario.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralSumario", dictCampoFormula, oUsuario)
   End Sub
   Private Sub GenerarSumarioPorHora_GeneralDetalle(ByVal oCriterio As ENT_MOV_IMP_Criterio)
      Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
      Dim dictCampoFormula As New Dictionary(Of String, String)

      dictCampoFormula.Add("tipotelefonia", "'Celular'")
      dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
      dictCampoFormula.Add("subtitulo1", "'Control de Telefonía'")
      dictCampoFormula.Add("titulo", "'Sumario por Hora'")
      dictCampoFormula.Add("subtitulo2", "'General - Sumario'")
      dictCampoFormula.Add("periodo", "'Desde: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaIni, "dd/MM/yyyy") & _
                                      " - Hasta: " & Utilitarios.ConvertAnsiToFechaString(oCriterio.vcPorDiaFin, "dd/MM/yyyy") & "'")
      dictCampoFormula.Add("tituloperiodo", "'Periodo'")
      dictCampoFormula.Add("titulsucursal", "'Sucursal'")
      dictCampoFormula.Add("titulototal", "'Total'")
      dictCampoFormula.Add("titulohora", "'Hora'")
      dictCampoFormula.Add("titulofecha", "'Fecha'")
      dictCampoFormula.Add("tituloemisor", "'Emisor'")
      dictCampoFormula.Add("tituloempresa", "'Empresa'")
        Dim dsDatos As DataSet = Llamada.ListarSumarioPorHora_GeneralDetalle(oCriterio, vcCodInt)
      Llamada.Dispose()
      GenerarReporte("Reportes/Con_Rpt_SumarioPorHora_GeneralDetalle.rpt", dsDatos, oCriterio, "SumarioPorOrganizacionNivel_GeneralDetalle", dictCampoFormula, oUsuario)
   End Sub

    Private Sub GenerarReporte(ByVal vcNombreReporte As String, ByVal dsDatosReporte As DataSet, ByVal oCriterio As ENT_MOV_IMP_Criterio, ByVal vcEsquema As String,
                               ByVal dictCampoFormula As Dictionary(Of String, String), ByVal oUsuario As ENT_SEG_Usuario)

        Dim Cliente As BL_GEN_Cliente = Nothing

        Try
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            ''crConsulta.Report.FileName = vcNombreReporte
            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Nothing

            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            If oCriterio.vcTab = "" Then 'En en caso que no exista la tabla temporal y haya sido creada recien se guarda en la session y en el cliente
                If (dsDatosReporte.Tables.Count > 1) Then
                    oCriterio.vcTab = dsDatosReporte.Tables(1).Rows(0)("vcNomTab").ToString()
                    Session("Criterio" & oCriterio.inNumCri.ToString()) = oCriterio
                End If
            End If

            If Not IsNothing(dsDatosReporte.Tables(0)) And dsDatosReporte.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables.Add(dsDatosReporte.Tables(0).Copy)
                dsDatos.Tables(0).TableName = vcEsquema
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"

                ''crConsulta.ReportDocument.SetDataSource(dsDatos)

                ''For Each objFormula As FormulaFieldDefinition In crConsulta.ReportDocument.DataDefinition.FormulaFields
                ''    Try
                ''        objFormula.Text = dictCampoFormula(objFormula.Name.ToLower)
                ''    Catch ex As Exception

                ''    End Try
                ''Next
            Else
                ''crvConsulta.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If


        Catch ex As Exception
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try

    End Sub
End Class