Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Collections
Imports System.Collections.Generic
Imports System.IO
Imports CompCorreo
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Registrar_Solicitud
    Inherits System.Web.UI.Page
    Shared ruta As String = String.Empty

    Protected Sub form1_Load(sender As Object, e As System.EventArgs) Handles form1.Load
        Dim Empleado As BL_GEN_Empleado
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                hdfAdmin.Value = "0"
                If Seguridad.EsAdministrador() Then hdfAdmin.Value = "1"

                'CULTURA
                'Dim GEN_Cultura As BL_GEN_Cultura = BL_GEN_Cultura.Instance
                'Dim GEN_Region As BL_GEN_Regi = BL_GEN_Regi.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oCultura As ENT_GEN_Cultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
                'hdfNumDecimales.Value = oCultura.dcNumDec
                'hdfSepDecimal.Value = oCultura.vcSimDec
                'hdfSepMiles.Value = oCultura.vcSimSepMil
                'FIN CULTURA
                If hdfAdmin.Value = "0" Then
                    Empleado = New BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                    txtEmpleado.Style("display") = "none"
                    hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                    ddlTipoSolicitud.Enabled = True
                Else
                    lblEmpleado.Style("display") = "none"
                    ddlTipoSolicitud.Enabled = False
                    hdfCodEmpleado.Value = ""
                End If

                'Dim Solicitud As BL_MOV_Solicitud = BL_MOV_Solicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                Dim tipsol As New List(Of Utilitario.Itemlst)
                Dim item0 As New Utilitario.Itemlst
                item0.inCod = "-1"
                item0.vcNom = "--Seleccione--"
                tipsol.Add(item0)
                tipsol.AddRange(Utilitario.ListarTipoSolicitud(-1, ""))
                Utilitario.Dataddl(ddlTipoSolicitud, tipsol, "vcNom", "inCod")

                hdfGaleria.Value = "1"
                obtenerRuta()
                Utilitario.AgregarTema(Server, Page.Header, "Principal")
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Empleado IsNot Nothing Then
                Empleado.Dispose()
            End If
        End Try

    End Sub

    'LISTAR DATOS
    <WebMethod()>
    Public Shared Function ListarOperadores() As List(Of ENT_GEN_Operador)
        Dim Operador As BL_GEN_Operador
        Try
            Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Operador.Listar()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCodigoModelo(ByVal vcCodEmp As String, ByVal vcCodIMEI As String, ByVal vcTipSol As String) As Integer
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim dtSolicitud As New DataTable()
            dtSolicitud = Solicitud.MostrarPorCodEmpNumLin(vcCodEmp, vcCodIMEI, Convert.ToInt32(vcTipSol))
            Solicitud.Dispose()
            If dtSolicitud.Rows.Count > 0 AndAlso Not IsDBNull(dtSolicitud.Rows(0)("F_inCodModDis")) Then
                Return Convert.ToInt32(dtSolicitud.Rows(0)("F_inCodModDis"))
            Else
                Return 0
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanesPorOperador(ByVal inCodOpe As Integer, ByVal vcNombre As String, ByVal vcCodEmp As String) As List(Of ENT_MOV_Plan)
        Dim Plan As BL_MOV_Plan
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Plan.ListarPlanAutoComplete(inCodOpe, vcNombre, vcCodEmp)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetallePlan(ByVal IdPlan As Integer) As ENT_MOV_Plan
        Dim Plan As BL_MOV_Plan
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Plan.Mostrar(IdPlan)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetalleSubPlan(ByVal IdSubPlan As Integer) As ENT_MOV_SubPlan
        Dim Plan As BL_MOV_Plan
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Plan.MostrarSubPlan(IdSubPlan)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEmpleados(ByVal vcNomEmp As String, ByVal inMaxFil As Integer, ByVal inTipLin As Integer) As List(Of String)
        Dim Empleado As BL_GEN_Empleado
        Try
            Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Dim dtEmp As DataTable = Empleado.ListarPorNombrePorTipoLineaGruOri(vcNomEmp, inMaxFil, vcCodInt, inTipLin)
            Dim lstEmp As New List(Of String)
            For Each dr As DataRow In dtEmp.Rows
                Dim element As String
                element = dr("EMPL_P_vcCODEMP").ToString() + "-" + dr("EMPL_vcNOMEMP").ToString() + "-" + dr("EMPL_F_inCODGRUORI").ToString()
                lstEmp.Add(element)
            Next
            Return lstEmp
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Empleado IsNot Nothing Then
                Empleado.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicios(ByVal codEmp As String, ByVal lin As String) As List(Of String)
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Dim dtServ As DataTable = Solicitud.ListarServicios(codEmp, lin)

            Dim lstServ As New List(Of String)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)
            For Each dr As DataRow In dtServ.Rows
                Dim element As String
                element = dr("vcNom").ToString + "-" + dr("btHab").ToString + "-" + dr("GROR_vcNOMGRU").ToString + "-" + dr("COMP_vcNOMCIA").ToString + "-" + dr("inIdSer").ToString + "-" + dr("vcDesc").ToString + "-" + Utilitario.DevuelveNumeroFormateado(dr("dcCost").ToString, strForNum) + "-" + dr("btActiva").ToString
                lstServ.Add(element)
            Next
            Return lstServ
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of List(Of Object))
        'Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivos As BL_MOV_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dispositivos = New BL_MOV_Dispositivo(oUsuario.IdCliente)
            Dim listaDisp As List(Of List(Of Object)) = Dispositivos.MostrarDatosDispostivosXEmpleado(vcCodEmp)

            For Each obj In listaDisp
                Dim rutaImagen As String = String.Empty
                If Not IsDBNull(obj(0).ModeloDispositivo.Imagen) And Not IsNothing(obj(0).ModeloDispositivo.Imagen) Then
                    Dim barrImg As Byte() = obj(0).ModeloDispositivo.Imagen
                    Dim archivo As String = obj(0).ModeloDispositivo.P_inCod & ".jpg"
                    Dim rutaLocal As String = ruta + archivo
                    'Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/" + archivo)
                    Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                    fs.Write(barrImg, 0, barrImg.Length)
                    fs.Flush()
                    fs.Close()
                    rutaImagen = "~/Common/Images/ModeloDispositivo/" + archivo
                Else
                    rutaImagen = "~/Common/Images/NoDisponible.jpg"
                End If
                obj(0).ModeloDispositivo.vcRutArc = rutaImagen
            Next
            Return listaDisp
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Dispositivos IsNot Nothing Then
                Dispositivos.Dispose()
            End If
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Function ListarServiciosActuales(ByVal vcLinea As String) As List(Of Object)
    '    Try
    '        Dim ServicioOperador As BL_MOV_ServicioOperador = BL_MOV_ServicioOperador.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim listO As New List(Of Object)
    '        Dim DataTable As DataTable = ServicioOperador.MostrarServiciosLinea(vcLinea)
    '        For Each dr As DataRow In DataTable.Rows
    '            Dim dict As New Dictionary(Of String, String)
    '            dict.Add("CodServ", dr("inCodServ"))
    '            dict.Add("Act", dr("btActiva"))
    '            listO.Add(dict)
    '        Next
    '        Return listO
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(Utilitario.MensajeError)
    '    End Try
    'End Function

    Private Function obtenerRuta() As String
        If IsNothing(ruta) Or ruta.Equals(String.Empty) Then
            ruta = Server.MapPath("~/Common/Images/ModeloDispositivo\")
        End If
        Return ruta
    End Function

    <WebMethod()>
    Public Shared Function MostrarServiciosActuales(ByVal vcLin As String) As List(Of ENT_GEN_Servicio)
        Dim lstServicio As New List(Of ENT_GEN_Servicio)
        Dim Linea As BL_MOV_Linea
        Try
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oLineaDS As DataSet = Linea.Mostrar(vcLin)

            For Each dr As DataRow In oLineaDS.Tables(1).Rows
                Dim oServicio As New ENT_GEN_Servicio()
                If Not IsDBNull(dr("P_F_inCodTipSer")) Then
                    oServicio.P_inCod = Utilitario.ComprobarIntNULL(dr("P_F_inCodTipSer"), -1)
                    oServicio.vcNom = Utilitario.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                    oServicio.inCodTipDat = 2
                Else
                    oServicio.P_inCod = Utilitario.ComprobarIntNULL(dr("P_F_inCodSer"), -1)
                    oServicio.vcNom = Utilitario.ComprobarStringNULL(dr("vcNomSer"), "")
                    oServicio.inCodTipDat = 1
                End If
                oServicio.dcCan = Utilitario.ComprobarDecimalNULL(dr("dcCan"), 0)
                lstServicio.Add(oServicio)
            Next
            'If oLineaDS.Tables(1).Rows.Count > 0 Then
            '    Dim oSerial As New JavaScriptSerializer
            '    hdfServicio.Value = oSerial.Serialize(lstServicio)
            'End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Linea IsNot Nothing Then
                Linea.Dispose()
            End If
        End Try

        Return lstServicio
    End Function

    <WebMethod()>
    Public Shared Function ListarContenidos(ByVal inTipSol As Integer) As List(Of Dictionary(Of String, String))
        Dim dict As List(Of Dictionary(Of String, String))
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         dict = Solicitud.ListarContenidoTabs(inTipSol, "")
            Solicitud.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try

        Return dict
    End Function

    <WebMethod()>
    Public Shared Function VerificaLineaEmpleadoCambio(ByVal dcNumLin As String, ByVal vcCodEmp As String) As String
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoCambio(oUsuario.Empleado.P_vcCod, dcNumLin)
            'Else
            Resultado = Linea.VerificaLineaEmpleadoCambio(vcCodEmp, dcNumLin)
            'End If

            Return Resultado.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Linea IsNot Nothing Then
                Linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function VerificaLineaEmpleadoReposicion(ByVal dcNumLin As String, ByVal vcCodEmp As String) As String
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoReposicion(oUsuario.Empleado.P_vcCod, dcNumLin)
            'Else
            Resultado = Linea.VerificaLineaEmpleadoReposicion(vcCodEmp, dcNumLin)
            'End If

            Return Resultado.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Linea IsNot Nothing Then
                Linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function VerificaLineaEmpleadoNuevo(ByVal vcCodEmp As String) As String
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoNuevo(oUsuario.Empleado.P_vcCod)
            'Else
            Resultado = Linea.VerificaLineaEmpleadoNuevo(vcCodEmp)
            'End If

            Return Resultado.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Linea IsNot Nothing Then
                Linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicios_NoUsados(ByVal CodCue As String, ByVal CodLin As String, ByVal CodTipServ As Integer) As List(Of ENT_GEN_Servicio)
        Dim Servicio As BL_GEN_Servicio = Nothing
        Try
            Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstServ As List(Of ENT_GEN_Servicio) = Servicio.ListarServicio_NoUtilizados_x_Linea(CodCue, CodLin, CodTipServ)
            Return lstServ
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Servicio IsNot Nothing Then
                Servicio.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServiciosTipoNoUsados(ByVal CodCue As String, ByVal CodLin As String) As List(Of ENT_GEN_TipoServicio)
        Dim Servicio As BL_GEN_Servicio = Nothing
        Try
            Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstServTipo As List(Of ENT_GEN_TipoServicio) = Servicio.ListarServicioTipo_NoUtilizados_x_Linea(CodCue, CodLin)
            Return lstServTipo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Servicio IsNot Nothing Then
                Servicio.Dispose()
            End If
        End Try
    End Function

    'ENVIO DE SOLICITUDES
    <WebMethod()>
    Public Shared Function EnviarSolicitudCambio(ByVal vcNumLin As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, _
                                                 ByVal vcArchAdj As String, ByVal vcCodPlan As String) As String
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea
            Dim dcMonto As Decimal = 0
            oLinea.P_vcNum = vcNumLin
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)
            'resultado = Solicitud.Insertar(oLinea, "", Convert.ToInt32(Utilitario.TipoSolicitud.Cambio), oUsuario, dcMonto)
            Solicitud.Dispose()
            If resultado <> 0 Then
                'SOLICITUD DE LIENA
                'If vcCodPlan <> "" Then
                '    Solicitud.Insertar(vcCodEmp, vcCodPlan, Convert.ToInt32(Utilitario.TipoSolicitud.Nuevo), inCodModDis)
                'End If
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_Empleado
                Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                oEmpleado = Empleado.Mostrar(vcCodEmp)

                'Grabar archivos adjuntos agregado 05-09-2013
                ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim listatemporal As List(Of String) = vcArchAdj.Split(",").ToList()
                For Each ubic As String In listatemporal
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal/File" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                            Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                            Dim BinaryData(fs.Length - 1) As Byte
                            fs.Read(BinaryData, 0, BinaryData.Length)
                            oArchivoAdjunto.F_vcCodSol = resultado
                            oArchivoAdjunto.vcNomAdj = ubic
                            oArchivoAdjunto.binData = BinaryData
                            oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                            ArchivoAdjunto.Insertar(oArchivoAdjunto)
                            fs.Flush()
                            fs.Close()
                        End Using
                        File.Delete(strfn)
                    End If
                Next
                'fin grabar archivos
                Return ""
            Else
                Return "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
            End If
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If

            If Empleado IsNot Nothing Then
                Empleado.Dispose()
            End If

            If ArchivoAdjunto IsNot Nothing Then
                ArchivoAdjunto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudNuevo(ByVal inCodModDis As String, ByVal vcCodEmp As String, ByVal vcArchAdj As String, ByVal vcCodPlan As String) As String
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea
            Dim dcMonto As Decimal = 0
            oLinea.P_vcNum = 0
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)
            'resultado = Solicitud.Insertar(oLinea, "", Convert.ToInt32(Utilitario.TipoSolicitud.Nuevo), oUsuario, dcMonto)
            Solicitud.Dispose()
            If resultado <> 0 Then
                'SOLICITUD DE LIENA
                'If vcCodPlan <> "" Then
                '    Solicitud.Insertar(vcCodEmp, vcCodPlan, Convert.ToInt32(Utilitario.TipoSolicitud.Nuevo), inCodModDis)
                'End If
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(1)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_Empleado
                Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                oEmpleado = Empleado.Mostrar(vcCodEmp)

                'Grabar archivos adjuntos agregado 05-09-2013
                ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim listatemporal As List(Of String) = vcArchAdj.Split(",").ToList()
                For Each ubic As String In listatemporal
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal/File" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                            Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                            Dim BinaryData(fs.Length - 1) As Byte
                            fs.Read(BinaryData, 0, BinaryData.Length)
                            oArchivoAdjunto.F_vcCodSol = resultado
                            oArchivoAdjunto.vcNomAdj = ubic
                            oArchivoAdjunto.binData = BinaryData
                            oArchivoAdjunto.vcExtAdj = Path.GetExtension(strfn).Substring(1)
                            ArchivoAdjunto.Insertar(oArchivoAdjunto)
                            fs.Flush()
                            fs.Close()
                        End Using
                        File.Delete(strfn)
                    End If
                Next
                'fin grabar archivos
                Return ""
            Else
                Return "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
            End If
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If

            If Empleado IsNot Nothing Then
                Empleado.Dispose()
            End If

            If ArchivoAdjunto IsNot Nothing Then
                ArchivoAdjunto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudReposicion(ByVal vcNumLin As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, _
                                                     ByVal vcArchAdj As String, ByVal vcCodPlan As String) As String
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea
            Dim dcMonto As Decimal = 0
            oLinea.P_vcNum = vcNumLin
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)
            'resultado = Solicitud.Insertar(oLinea, "", Convert.ToInt32(Utilitario.TipoSolicitud.Reposicion), oUsuario, dcMonto)
            Solicitud.Dispose()
            If resultado <> 0 Then
                'SOLICITUD DE LINEA
                'If vcCodPlan <> "" Then
                '    Solicitud.Insertar(vcCodEmp, vcCodPlan, Convert.ToInt32(Utilitario.TipoSolicitud.Nuevo), inCodModDis)
                'End If
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(3)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_Empleado
                Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                oEmpleado = Empleado.Mostrar(vcCodEmp)

                'Grabar archivos adjuntos agregado 05-09-2013
                ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim listatemporal As List(Of String) = vcArchAdj.Split(",").ToList()
                For Each ubic As String In listatemporal
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal/File" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                            Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                            Dim BinaryData(fs.Length - 1) As Byte
                            fs.Read(BinaryData, 0, BinaryData.Length)
                            oArchivoAdjunto.F_vcCodSol = resultado
                            oArchivoAdjunto.vcNomAdj = ubic
                            oArchivoAdjunto.binData = BinaryData
                            oArchivoAdjunto.vcExtAdj = Path.GetExtension(strfn).Substring(1)
                            ArchivoAdjunto.Insertar(oArchivoAdjunto)
                            fs.Flush()
                            fs.Close()
                        End Using
                        File.Delete(strfn)
                    End If
                Next
                'fin grabar archivos
                Return ""
            Else
                Return "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
            End If
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If

            If Empleado IsNot Nothing Then
                Empleado.Dispose()
            End If

            If ArchivoAdjunto IsNot Nothing Then
                ArchivoAdjunto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudReparacion(ByVal vcCodEmp As String, ByVal vcCodDis As String, ByVal vcDesSol As String) As Integer
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oDispositivo As New ENT_MOV_Dispositivo

            oDispositivo.F_vcCodEmp = vcCodEmp
            oDispositivo.P_vcCodIMEI = vcCodDis
            Dim resultado As Integer = 0
            'resultado = Solicitud.Insertar(oDispositivo, vcDesSol, Convert.ToInt32(Utilitario.TipoSolicitud.Reparacion), oUsuario)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudActivacion(ByVal vcCodEmp As String, ByVal vcNumLin As String, _
                                                     ByVal ServDel As String, ByVal ServAdd As String, _
                                                     ByVal vcDescSol As String) As Integer
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim resultado = 0
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
         ''resultado = Solicitud.InsertarActivacion(vcCodEmp, vcNumLin, "", oUsuario, vcDescSol)

            'If (resultado <> 0) Then
            '    If ServAdd <> "" Then
            '        Dim lstServAdd = ServAdd.Split(",").ToList()
            '        For Each serv As String In lstServAdd
            '            Solicitud.InsertarDetalleActivacion(resultado, serv, True)
            '        Next
            '    End If
            '    If ServDel <> "" Then
            '        Dim lstServDel = ServDel.Split(",").ToList()
            '        For Each serv As String In lstServDel
            '            Solicitud.InsertarDetalleActivacion(resultado, serv, False)
            '        Next
            '    End If
            'End If
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudAmpliacion(ByVal vcCodEmp As String, ByVal vcNumLin As String, _
                                                     ByVal vcArchAdj As String, ByVal CodPlan As String) As Integer
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim resultado = 0
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
         ''resultado = Solicitud.Insertar(vcCodEmp, CodPlan, Utilitario.TipoSolicitud.Ampliacion, vcNumLin, oUsuario)

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Function
End Class
