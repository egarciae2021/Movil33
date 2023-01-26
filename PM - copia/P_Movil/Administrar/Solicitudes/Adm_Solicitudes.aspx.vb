Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_Solicitudes
   Inherits System.Web.UI.Page

   Protected Sub P_Movil_Administrar_Adm_Solicitudes_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoAdquisicion As BL_MOV_TipoAdquisicion = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If Not IsPostBack Then
                hdfNomUsuarioLogeado.Value = oUsuario.vcNom 'agregado 19-09-2013 wapumayta
                hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                hdfAdmin.Value = "0"

                hdf_nom.Value = Request.QueryString("nom")
                If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                TipoAdquisicion = New BL_MOV_TipoAdquisicion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                UtilitarioWeb.Dataddl(ddlTipoSolicitud, Solicitud.ListarTipo(), "vcNomTipSol", "inCodTipSol")
                'Solicitud.Dispose()

                UtilitarioWeb.Dataddl(ddlTipoAdquisicion, TipoAdquisicion.Listar(-1, "<Todos>"), "vcNom", "P_inCodTipAdq")

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoAdquisicion) Then TipoAdquisicion.Dispose()
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
   End Sub

   '<WebMethod()>
   'Public Shared Function ListarTipos() As List(Of Itemlst)
   '    Try

   '        'Return Utilitario.ListarTipoSolicitud(-1, "")

   '    Catch ex As Exception
   '        Dim util As New Utilitarios
   '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
   '        Throw New Exception(UtilitarioWeb.MensajeError)
   '    End Try
   'End Function

   <WebMethod()>
   Public Shared Function ListarEstados() As List(Of Itemlst)
        Dim Estado As BL_MOV_Estado = Nothing
        Dim lista As List(Of Itemlst) = New List(Of Itemlst)
        Try
            Estado = New BL_MOV_Estado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim tablas As System.Data.DataTable = Estado.ListarPorModulo(2, 3, -1, "")
            'Estado.Dispose()

            For Each fila As System.Data.DataRow In tablas.Rows
                Dim item As New Itemlst
                item.inCod = fila("P_inCod")
                item.vcNom = fila("vcNom")
                lista.Add(item)
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Estado) Then Estado.Dispose()
        End Try

        Return lista
    End Function

   <WebMethod()>
   Public Shared Function ListarPorTiposPorEstados(ByVal prCodEstados As String, ByVal prCodTipos As String, ByVal prCamBus As String, ByVal prBus As String, ByVal vcCodEmp As String, ByVal inAdm As String) As List(Of ENT_MOV_Solicitud)
        Dim solicitud As BL_MOV_Solicitud = Nothing
        Dim lstSolicitud As New List(Of ENT_MOV_Solicitud)
        Try
            'If inAdm = 1 Then
            '    Return Solicitud.ListarPorTipoPorEstadoPorFiltro(Convert.ToInt32(inCodTipSol), Convert.ToInt32(inCodEst), Convert.ToInt32(inCamBus), vcBus.Replace("&#39", "'"))
            'Else
            '    Return Solicitud.ListarPorTipoPorEstadoPorFiltro(Convert.ToInt32(inCodTipSol), Convert.ToInt32(inCodEst), Convert.ToInt32(inCamBus), vcBus.Replace("&#39", "'"), vcCodEmp)
            'End If
            solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Return solicitud.ListarPorTiposPorEstados(prCodEstados, prCodTipos)
            If inAdm = 1 Then
                lstSolicitud = solicitud.ListarPorTipoPorEstadoPorFiltro(prCodTipos, prCodEstados, prCamBus, prBus)
            Else
                lstSolicitud = solicitud.ListarPorTipoPorEstadoPorFiltro(prCodTipos, prCodEstados, prCamBus, prBus, vcCodEmp)
            End If
            'solicitud.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(solicitud) Then solicitud.Dispose()
        End Try

        Return lstSolicitud
    End Function

   <WebMethod()>
   Public Shared Function ListarPorIds(ByVal prCodIds As String) As List(Of ENT_MOV_Solicitud)
        Dim solicitud As BL_MOV_Solicitud = Nothing
        Dim lstSolicitud As New List(Of ENT_MOV_Solicitud)
        Try

            solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstSolicitud = solicitud.ListarPorIds(prCodIds)
            'solicitud.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(solicitud) Then solicitud.Dispose()
        End Try

        Return lstSolicitud
    End Function

   <WebMethod()>
   Public Shared Function RegistrarDetalle(ByVal prIdSolicitud As Integer, ByVal prDetalle As String, ByVal prEstecnico As Boolean) As String

      'Dim Detalle As BL_MOV_SolicitudDetalle = New BL_MOV_SolicitudDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim resul As Boolean
      Dim registradoPor As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom
      Try
         'resul = Detalle.Insertar(prIdSolicitud, prDetalle, prEstecnico, registradoPor)

         If resul Then
            Return ""
         Else
            Return "Error al guardar"
         End If

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try

   End Function

   <WebMethod()>
   Public Shared Sub RespuestaSolicitud(ByVal vcCodIMEI As String, ByVal inCodSol As String, ByVal inTipSol As String, ByVal inEstSol As String,
                                         ByVal codNumLim As String, ByVal dtFecEnt As String, ByVal vcObs As String)
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oSolicitud As New ENT_MOV_Solicitud
            Dim daFecEnt As DateTime

            oSolicitud.DispositivoNuevo.P_vcCodIMEI = vcCodIMEI.Replace("&#39", "'")
            oSolicitud.P_inCodSol = Integer.Parse(inCodSol)
            oSolicitud.inTipSol = Integer.Parse(inTipSol)
            oSolicitud.Estado.P_inCod = Integer.Parse(inEstSol)
            oSolicitud.vcNumLin = codNumLim
            oSolicitud.vcObs = vcObs

            If (inEstSol = 6 AndAlso dtFecEnt.Trim() <> "") Or inEstSol = 8 Then
                oSolicitud.Estado.P_inCod = 7
            ElseIf inEstSol = 6 AndAlso dtFecEnt.Trim = "" Then
                oSolicitud.Estado.P_inCod = 8
            End If

            If dtFecEnt.Trim() <> "" Then
                daFecEnt = Convert.ToDateTime(dtFecEnt)
            Else
                daFecEnt = DateTime.MinValue
            End If

            'If ((inTipSol <> 6 Or inTipSol <> 7) And inEstSol = 9) Then
            'Solicitud.RespuestaSolicitud(oSolicitud, daFecEnt, oUsuario)
            'Solicitud.Dispose()
            'End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Sub

   'agregado 13-09-2013 wapumayta
   <WebMethod()>
   Public Shared Sub RespuestaSolicitudServicio(ByVal inCodSol As String, ByVal inTipSol As String, ByVal inEstSol As String, ByVal EnvCor As Boolean,
                                         ByVal codNumLim As String, ByVal vcObs As String, ByVal CantSol As Integer, ByVal ServSol As Integer)
      Try
         'Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSolicitud As New ENT_MOV_Solicitud
         oSolicitud.P_inCodSol = Integer.Parse(inCodSol)
         oSolicitud.inTipSol = Integer.Parse(inTipSol)
         oSolicitud.Estado.P_inCod = Integer.Parse(inEstSol)
         oSolicitud.vcNumLin = codNumLim
         oSolicitud.vcObs = vcObs
         'Solicitud.RespuestaSolicitudServicio((oSolicitud, ServSol, CantSol, EnvCor)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function ListarDispositivosLibresPorSolicitud(ByVal inCodSol As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing
        Dim lstDispositivo As List(Of ENT_MOV_Dispositivo)
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstDispositivo = Dispositivo.ListarDispositivosLibresPorSolicitud(Integer.Parse(inCodSol))
            'Dispositivo.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivo) Then Dispositivo.Dispose()
        End Try
        Return lstDispositivo
    End Function

   <WebMethod()>
   Public Shared Function ListarLineasLibresPorSolicitud(ByVal inCodSol As String) As List(Of ENT_MOV_Linea)
        Dim Linea As BL_MOV_Linea = Nothing
        Dim _return As List(Of ENT_MOV_Linea)
        Try
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            _return = Linea.ListarDisponible(Integer.Parse(inCodSol))
            'Linea.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
        Return _return
    End Function

   <WebMethod()>
   Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing
        Dim lstDispositivo As List(Of ENT_MOV_Dispositivo)
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim tipadq As Integer = 1
            lstDispositivo = Dispositivo.ListarDisponiblesPorEmpleadoGrupo(vcCodEmp, tipadq)
            'Dispositivo.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivo) Then Dispositivo.Dispose()
        End Try
        Return lstDispositivo
    End Function

   <WebMethod()>
   Public Shared Function ListarEquiposPorFiltro(ByVal vcCodEmp As String, ByVal inCodModDis As String, ByVal vcFecIni As String,
                                                  ByVal vcFecFin As String, ByVal inTipAdq As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing
        Dim lstDispositivo As List(Of ENT_MOV_Dispositivo)
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstDispositivo = Dispositivo.ListarPorFiltro(vcCodEmp, Convert.ToInt32(inCodModDis), vcFecIni, vcFecFin, Convert.ToInt32(inTipAdq))
            'Dispositivo.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivo) Then Dispositivo.Dispose()
        End Try
        Return lstDispositivo
    End Function

   <WebMethod()>
   Public Shared Function ListarHistoricosPorDispositivo(ByVal vcCodIMEI As String) As List(Of Object)
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing

        Dim lstObj As New List(Of Object)
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtHistoricos As DataTable = Dispositivo.ListarHistoricosPorDispositivo(vcCodIMEI)
            'Dispositivo.Dispose()

            For i As Integer = 0 To dtHistoricos.Rows.Count - 1

                Dim dict As New Dictionary(Of String, Object)
                dict.Add("P_F_vcCodDis", dtHistoricos.Rows(i)("P_F_vcCodDis").ToString())
                dict.Add("P_dtFecIni", dtHistoricos.Rows(i)("P_dtFecIni").ToString())
                dict.Add("dtFecFin", dtHistoricos.Rows(i)("dtFecFin").ToString())
                dict.Add("F_vcNumLin", dtHistoricos.Rows(i)("F_vcNumLin").ToString())
                dict.Add("F_inCodEst", dtHistoricos.Rows(i)("F_inCodEst").ToString())
                dict.Add("vcNomEst", dtHistoricos.Rows(i)("vcNomEst").ToString())
                dict.Add("F_vcCodEmp", dtHistoricos.Rows(i)("F_vcCodEmp").ToString())
                dict.Add("EMPL_vcNOMEMP", dtHistoricos.Rows(i)("EMPL_vcNOMEMP").ToString())
                lstObj.Add(dict)
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivo) Then Dispositivo.Dispose()
        End Try

        Return lstObj
    End Function

   <WebMethod()>
   Public Shared Function CreaSolicitud(ByVal vcCodIMEI As String, ByVal inTipSol As String, ByVal codNumLim As String, ByVal dtFecEnt As String,
                                         ByVal inCodModDis As String, ByVal vcCodEmp As String, ByVal vcObs As String) As String

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim result As String = String.Empty
        Try

            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSolicitud As New ENT_MOV_Solicitud
            Dim resultado As Integer
            Dim daFecEnt As DateTime

            oSolicitud.DispositivoNuevo.P_vcCodIMEI = vcCodIMEI.Replace("&#39", "'")
            oSolicitud.inTipSol = Integer.Parse(inTipSol)
            If codNumLim = "" Then
                oSolicitud.vcNumLin = "0"
            Else
                oSolicitud.vcNumLin = codNumLim
            End If
            oSolicitud.Empleado.P_vcCod = vcCodEmp
            oSolicitud.vcObs = vcObs
            oSolicitud.inCodModDis = Integer.Parse(inCodModDis)

            If (dtFecEnt.Trim() <> "") Then
                oSolicitud.Estado.P_inCod = 7
            Else
                oSolicitud.Estado.P_inCod = 8
            End If

            If dtFecEnt.Trim() <> "" Then
                daFecEnt = Convert.ToDateTime(dtFecEnt)
            Else
                daFecEnt = DateTime.MinValue
            End If

            resultado = Solicitud.CreaSolicitud(oSolicitud, daFecEnt)
            Solicitud.Dispose()

            If resultado = 1 Then
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                Notificacion.Dispose()
                Dim oEmpleado As New ENT_GEN_Empleado
                Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                oEmpleado = Empleado.Mostrar(vcCodEmp)
                Empleado.Dispose()
                result = ""
            Else
                result = "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
            End If

            result = ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
            If Not IsNothing(Notificacion) Then Notificacion.Dispose()
        End Try

        Return result
    End Function

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

   End Sub

   <WebMethod()>
   Public Shared Function ListarServiciosActuales(ByVal vcNum As String) As List(Of ENT_GEN_Servicio)
        'MOSTRAR SERVICIOS
        Dim Linea As BL_MOV_Linea = Nothing
        Dim lstServicioAct As List(Of ENT_GEN_Servicio)
        Try
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oLineaDS As DataSet = Linea.Mostrar(vcNum)
            'Linea.Dispose()

            lstServicioAct = New List(Of ENT_GEN_Servicio)
            For Each dr As DataRow In oLineaDS.Tables(1).Rows
                Dim oServicio As New ENT_GEN_Servicio()
                If Not IsDBNull(dr("P_F_inCodTipSer")) Then
                    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodTipSer"), -1)
                    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                    oServicio.inCodTipDat = 2
                Else
                    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodSer"), -1)
                    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "")
                    oServicio.inCodTipDat = 1
                End If
                oServicio.dcCan = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCan"), 0)
                lstServicioAct.Add(oServicio)
            Next
            'If oLineaDS.Tables(1).Rows.Count > 0 Then
            '    Dim oSerial As New JavaScriptSerializer
            '    Return lstServicioAct
            'End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
        Return lstServicioAct

    End Function

   'agregado 25-09-2013 wapumayta
   <WebMethod()>
   Public Shared Function DescargarAdjunto(ByVal idAjd As Integer) As String

        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Dim oArchivoAdjunto As ENT_MOV_ArchivoAdjunto = Nothing
        Try
            ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oArchivoAdjunto = ArchivoAdjunto.MostarArchivoAdjunto(idAjd)
            ArchivoAdjunto.Dispose()
            Dim strfn As String = HttpContext.Current.Server.MapPath("../Temporal/" & oArchivoAdjunto.vcNomAdj)
            Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
            fs.Write(oArchivoAdjunto.binData, 0, oArchivoAdjunto.binData.Length - 1)
            fs.Flush()
            fs.Close()
            'HttpContext.Current.Response.WriteFile("../Temporal/" & oArchivoAdjunto.vcNomAdj)


            'prueba
            'Dim ruta As String = "../Temporal/" & oArchivoAdjunto.vcNomAdj
            'HttpContext.Current.Response.Clear()
            'HttpContext.Current.Response.ContentType = "text/plain"
            'HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" & ruta)
            'HttpContext.Current.Response.Flush()
            'HttpContext.Current.Response.TransmitFile(ruta)
            'fin prueba
            'Return strfn
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ArchivoAdjunto) Then ArchivoAdjunto.Dispose()
        End Try

        Return oArchivoAdjunto.vcNomAdj
    End Function

   Private Sub Descargar()
      Dim ruta As String = "../Temporal/5b50f135-eafc-40e9-a51e-131d5ecbef09--30.96 Kb--Captura2.PNG"
      Response.Clear()
      Response.ContentType = "text/plain"
        Response.AddHeader("Content-Disposition", "arettachment; filename=" & ruta)
        Response.Flush()
      Response.TransmitFile(ruta)
   End Sub
End Class
