Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BE
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BL
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BL
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.ServiceModel.Activation
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Services
Imports System.Data
Imports UtilitarioWeb
Imports VisualSoft.Comun.Proceso.Procesos
Imports System.IO
Imports VisualSoft.Comun
Imports VisualSoft.Comun.Util
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Proceso.BL
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Auditoria

Imports System.IO.Compression
Imports VisualSoft.PCSistelMovil.ConfigDom.BL
Imports VisualSoft.PCSistelMovil.Campana.BE

Imports Utilitario
Imports VisualSoft.Suite80.DL
Imports System.Data.SqlClient
Imports VisualSoft.Seguridad

' Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class General
    Inherits System.Web.Services.WebService

    Public AUTENTICACION As Credenciales

    <WebMethod(EnableSession:=True)>
    Public Function ListarEmpleado(ByVal maxFilas As String, ByVal vcNomEmp As String, ByVal incodGrup As String, ByVal idCliente As String) As List(Of ENT_GEN_Empleado)
        Dim Empleado As BL_GEN_Empleado = Nothing
        Try
            Empleado = New BL_GEN_Empleado(idCliente)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            vcNomEmp = vcNomEmp.Replace("&#39", "''")
            Dim _return As List(Of ENT_GEN_Empleado) = Empleado.ListarPorNombrePorGrupo(vcNomEmp, Integer.Parse(incodGrup), Integer.Parse(maxFilas), vcCodInt)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarEmpleadoPorNombreTipoLinea(ByVal inMaxFil As Integer, ByVal vcNomEmp As String, ByVal inTipLin As Integer) As List(Of String)
        'OJO:......CUALQUIER CAMBIO A ESTE MÉTODO O STORE RESPECTIVO AFECTARÁ DIRECTAMENTE AL MÓDULO COMPROBANTES
        'Este método se creo para listar los empleados que podrían tener comprobantes en base al tipo de línea, como por ahora los comprobantes son sólo de tipo familia, 
        'pues se envía este parámetro fijo desde cada llamada a este método. 
        Dim Empleado As VisualSoft.Suite80.BL.BL_GEN_Empleado = Nothing
        Try
            Empleado = New VisualSoft.Suite80.BL.BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtEmp As DataTable = Empleado.ListarEmpleadoPorNombreTipoLinea(vcNomEmp.Replace("&#39", "''"), inMaxFil, "", inTipLin)
            Empleado.Dispose()
            Dim lstEmp As New List(Of String)
            For Each dr As DataRow In dtEmp.Rows
                Dim element As String
                element = dr("EMPL_P_vcCODEMP").ToString() + "-" + dr("EMPL_vcNOMEMP").ToString() + "-" + dr("EMPL_F_inCODGRUORI").ToString() + "-" + dr("dniEmp").ToString()
                lstEmp.Add(element)
            Next
            Return lstEmp
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarSucursal(ByVal maxFilas As String, ByVal vcNomSuc As String, ByVal idCliente As String) As List(Of ENT_GEN_Sucursal)
        Dim Sucursal As BL_GEN_Sucursal = Nothing
        Try
            Sucursal = New BL_GEN_Sucursal(idCliente)
            vcNomSuc = vcNomSuc.Replace("&#39", "''")
            Dim _return As List(Of ENT_GEN_Sucursal) = Sucursal.ListarSucursalPorNombre(vcNomSuc, Integer.Parse(maxFilas), False)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarSucursalPorUsuario(ByVal maxFilas As String, ByVal vcNomSuc As String, ByVal idCliente As String) As List(Of ENT_GEN_Sucursal)
        Dim Sucursal As BL_GEN_Sucursal = Nothing
        Try
            Sucursal = New BL_GEN_Sucursal(idCliente)
            vcNomSuc = vcNomSuc.Replace("&#39", "''")
            Dim _return As List(Of ENT_GEN_Sucursal) = Sucursal.ListarSucursalPorNombre(vcNomSuc, Integer.Parse(maxFilas), True)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarAreas(ByVal maxFilas As String, ByVal vcNomAre As String, ByVal idCliente As String) As List(Of ENT_GEN_Area)
        Dim Area As BL_GEN_AREA = Nothing
        Try
            Area = New BL_GEN_AREA(idCliente)
            Dim _return As List(Of ENT_GEN_Area) = Area.Listar(vcNomAre, Integer.Parse(maxFilas))
            Area.Dispose()

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Area IsNot Nothing Then Area.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarNivelOrganizacion(ByVal maxFilas As String, ByVal vcNomAre As String, ByVal idCliente As String) As List(Of ENT_GEN_NivelOrganizacion)
        Dim NivOrga As BL_GEN_NivelOrganizacion = Nothing
        Try
            NivOrga = New BL_GEN_NivelOrganizacion(idCliente)
            Dim _return As List(Of ENT_GEN_NivelOrganizacion) = NivOrga.ListarFiltro(vcNomAre, Integer.Parse(maxFilas))
            NivOrga.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If NivOrga IsNot Nothing Then NivOrga.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarDispositivosDisponible(ByVal maxFilas As String, ByVal vcNomAre As String, ByVal idCliente As String) As List(Of ENT_MOV_Dispositivo)
        Dim oDispositivos As BL_MOV_Dispositivo = Nothing
        Try
            oDispositivos = New BL_MOV_Dispositivo(idCliente)
            'Dim Dispositivos As BL_MOV_Linea = new BL_MOV_Linea(idCliente)
            Dim lstDispositivo As List(Of ENT_MOV_Dispositivo) = oDispositivos.ListarDisponible(vcNomAre, Integer.Parse(maxFilas))
            oDispositivos.Dispose()
            Return lstDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oDispositivos IsNot Nothing Then oDispositivos.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarDispositivos(ByVal maxFilas As String, ByVal vcNomAre As String, ByVal idCliente As String) As List(Of ENT_MOV_Dispositivo)
        Dim oDispositivos As New BL_MOV_Dispositivo(idCliente)
        Try
            'Dim Dispositivos As BL_MOV_Linea = new BL_MOV_Linea(idCliente)
            Dim lstDispositivo As List(Of ENT_MOV_Dispositivo) = oDispositivos.ListarTop(vcNomAre, Integer.Parse(maxFilas))
            oDispositivos.Dispose()
            Return lstDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oDispositivos IsNot Nothing Then oDispositivos.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarModeloDispositivos(ByVal maxFilas As String, ByVal vcNomAre As String, ByVal idCliente As String) As List(Of ENT_MOV_Dispositivo)
        Dim oDispositivos As New BL_MOV_Dispositivo(idCliente)
        Try
            'Dim Dispositivos As BL_MOV_Linea = new BL_MOV_Linea(idCliente)
            Dim lstDispositivo As List(Of ENT_MOV_Dispositivo) = oDispositivos.ListarFiltroModeloDis(vcNomAre, Integer.Parse(maxFilas))
            oDispositivos.Dispose()
            Return lstDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oDispositivos IsNot Nothing Then oDispositivos.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarOrganizacion(ByVal maxFilas As String, ByVal vcNomOrg As String, ByVal vcCodNiv As String, ByVal idCliente As String) As List(Of ENT_GEN_OrganizacionG)
        Dim Orga As BL_GEN_OrganizacionG = New BL_GEN_OrganizacionG(idCliente)
        Try
            Dim _return As List(Of ENT_GEN_OrganizacionG) = Orga.ListarFiltro(vcNomOrg, Integer.Parse(maxFilas), vcCodNiv)
            Orga.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Orga IsNot Nothing Then Orga.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarGrupoOrigen(ByVal maxFilas As String, ByVal vcNomGru As String, ByVal idCliente As String) As List(Of ENT_GEN_GrupoOrigen)
        Dim Grupo As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(idCliente)
        Try
            Dim _return As List(Of ENT_GEN_GrupoOrigen) = Grupo.ListarCombo(vcNomGru, Integer.Parse(maxFilas))
            Grupo.Dispose()

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Grupo IsNot Nothing Then Grupo.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarSucursalCombo(ByVal maxFilas As String, ByVal vcNomSuc As String, ByVal idCliente As String) As List(Of ENT_GEN_Sucursal)
        Dim Sucursal As BL_GEN_Sucursal = New BL_GEN_Sucursal(idCliente)
        Try
            Dim _return As List(Of ENT_GEN_Sucursal) = Sucursal.ListarCombo(vcNomSuc, Integer.Parse(maxFilas))
            Sucursal.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarCCOCombo(ByVal maxFilas As String, ByVal vcNomCCO As String, ByVal idCliente As String) As List(Of ENT_GEN_CenCosto)
        Dim CCO As BL_GEN_CentroCosto = New BL_GEN_CentroCosto(idCliente)
        Try
            Dim _return As List(Of ENT_GEN_CenCosto) = CCO.ListarCombo(vcNomCCO, Integer.Parse(maxFilas))
            CCO.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CCO IsNot Nothing Then CCO.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarPlantillaFiltrada(ByVal maxFilas As String, ByVal vcNomPlantilla As String, ByVal inCodEntidad As String, ByVal idCliente As String) As List(Of VisualSoft.PCSistelMovil.General.BE.MOV_FAC_Plantilla)
        Dim CCO As BL_GEN_CentroCosto = New BL_GEN_CentroCosto(idCliente)
        Try
            Dim _return As List(Of VisualSoft.PCSistelMovil.General.BE.MOV_FAC_Plantilla) = CCO.ListarPlantillasFiltradas(vcNomPlantilla, Integer.Parse(maxFilas), Integer.Parse(inCodEntidad))
            CCO.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CCO IsNot Nothing Then CCO.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarUsuario(ByVal maxFilas As String, ByVal vcNomUsu As String) As List(Of ENT_SEG_Usuario)
        Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim _return As List(Of ENT_SEG_Usuario) = Usuario.ListarPorNombre(vcNomUsu, Integer.Parse(maxFilas))
            Usuario.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Usuario IsNot Nothing Then Usuario.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarOperador(ByVal p_ValorDefecto As String) As List(Of ENT_GEN_Operador)
        Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim _return As List(Of ENT_GEN_Operador) = Operador.Listar(-1, p_ValorDefecto)
            Operador.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
        End Try

    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarServicio(ByVal idCliente As String) As List(Of ENT_GEN_Servicio)
        Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(idCliente)
        Try
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.Listar()
            Servicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Servicio IsNot Nothing Then Servicio.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarTipoServicio(ByVal idCliente As String) As List(Of ENT_GEN_TipoServicio)
        Dim TipoServicio As BL_GEN_TipoServicio = New BL_GEN_TipoServicio(idCliente)
        Try
            Dim _return As List(Of ENT_GEN_TipoServicio) = TipoServicio.Listar()
            TipoServicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoServicio IsNot Nothing Then TipoServicio.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarSolicitudPedidoPorTipoLinea(ByVal vcCod As String, ByVal inMaxFil As Integer, ByVal inTipLin As Integer, ByVal vcIdEmp As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
        Try
            Dim dt As DataTable = Solicitud.ListarSolicitudPedido_PorTipoLinea(vcCod, inMaxFil, inTipLin, vcIdEmp)
            Dim lstSolPed As New List(Of String)
            For Each dr As DataRow In dt.Rows
                Dim element As String
                element = dr("vcCodigo").ToString() + "|" + dr("vcCodEmp").ToString() + "|" + dr("vcNomEmp").ToString()
                lstSolPed.Add(element)
            Next
            Solicitud.Dispose()
            Return lstSolPed

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarPedidoIMEILineaPorNombre(ByVal MaxFil As Integer, ByVal TipoBusqueda As Integer, ByVal ValorBusqueda As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim Pedido As BL_MOV_CAM_CampanaPedido = New BL_MOV_CAM_CampanaPedido(oUsuario.IdCliente)
        Try
            Dim dt As DataTable = Pedido.ListarPedidoIMEILineaPorNombre(MaxFil, TipoBusqueda, ValorBusqueda).Tables(0)
            Dim lstPedidos As New List(Of String)
            For Each dr As DataRow In dt.Rows
                Dim element As String
                element = dr("IdPedido").ToString() + "|" + dr("IdNombre").ToString() + "|" + dr("Nombre").ToString()
                lstPedidos.Add(element)
            Next
            Pedido.Dispose()
            Return lstPedidos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pedido IsNot Nothing Then Pedido.Dispose()
        End Try
    End Function


    <WebMethod(EnableSession:=True)>
    Public Function Fecha() As String
        Return Now.ToShortDateString()
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function Hora() As String
        Return Now.ToShortTimeString()
    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function FechaHora() As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
            End If

        End If

        Return Now.ToString()
    End Function

    <WebMethod()>
    Public Function FechaHora_A() As String
        Return Now.ToString()
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarLinea(ByVal maxFilas As String, ByVal vcCodLin As String, ByVal inCodOpe As String, ByVal idCliente As String) As List(Of ENT_MOV_Linea)
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(idCliente)
        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Dim _return As List(Of ENT_MOV_Linea) = Linea.ListarPorLineaEmpleadoOperador(maxFilas, vcCodLin.Replace("&#39", "''"), inCodOpe, vcCodInt)
            Linea.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarLineaPorEmpleado(ByVal vcNum As String, ByVal inMaxFil As Integer, ByVal vcIdEmp As String, ByVal inTipLin As Integer) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(oUsuario.IdCliente)
        Try
            Dim dt As DataTable = Linea.ListarPorNumeroTipoLinea(vcNum, inMaxFil, inTipLin, vcIdEmp)
            Dim lstLinea As New List(Of String)
            For Each dr As DataRow In dt.Rows
                Dim element As String
                element = dr("P_vcNum").ToString() + "-" + dr("EMPL_vcNOMEMP").ToString() + "-" + dr("F_vcCodEmp").ToString()
                lstLinea.Add(element)
            Next
            Linea.Dispose()
            Return lstLinea
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarCuentas(ByVal maxFilas As String, ByVal vcCodNom As String, ByVal inCodOpe As String, ByVal idCliente As String) As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(idCliente)
        Try
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarCuentasPorOperador(maxFilas, vcCodNom, inCodOpe)
            Cuenta.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ObtenerEntidadCriterio() As ENT_MOV_IMP_Criterio
        Return New ENT_MOV_IMP_Criterio
    End Function

    ''Inicio: Agregado por Julio Carrera C. 13072013
    '<WebMethod()> _
    'Public Function ListarPais_x_Codigo_o_Nombre(ByVal vcCriterio As String, ByVal idCliente As String) As List(Of ENT_GEN_Pais)
    '    Dim Pais As BL_GEN_Pais = new BL_GEN_Pais(idCliente)
    '    'vcCriterio = vcCriterio.Replace("&#39", "''")
    '    Return Pais.ListarPorCodigo_o_Nombre(vcCriterio)
    'End Function

    'Inicio: Agregado por Julio Carrera C. 13072013
    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarPais_x_Codigo_o_Nombre(ByVal vcCriterio As String, ByVal idCliente As String, ByVal Activo As String) As List(Of ENT_GEN_Pais)
        Dim Pais As BL_GEN_Pais = New BL_GEN_Pais(idCliente)
        Try
            'vcCriterio = vcCriterio.Replace("&#39", "''")
            Dim _return As List(Of ENT_GEN_Pais)
            If Activo = "1" Then
                _return = Pais.ListarPorCodigo_o_Nombre_Activos(vcCriterio)
            Else
                _return = Pais.ListarPorCodigo_o_Nombre(vcCriterio)
            End If
            Pais.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pais IsNot Nothing Then Pais.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarModDispAutoc(ByVal maxFilas As String, ByVal vcNomAre As String, ByVal idCliente As String) As List(Of ENT_MOV_ModeloDispositivo)
        Dim oDispositivos As New BL_MOV_Dispositivo(idCliente)
        Try
            'Dim Dispositivos As BL_MOV_Linea = new BL_MOV_Linea(idCliente)
            Dim lstModeloDispositivo As List(Of ENT_MOV_ModeloDispositivo) = oDispositivos.ListarModDispAutocomplete(vcNomAre, Integer.Parse(maxFilas))
            oDispositivos.Dispose()
            Return lstModeloDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oDispositivos IsNot Nothing Then oDispositivos.Dispose()
        End Try
    End Function

    'habilitar session 2015-09-09 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function ListarPlanes(ByVal maxFilas As String, ByVal vcNomPlan As String, ByVal inTipLin As String, ByVal idCliente As String) As List(Of ENT_MOV_Plan)
        Dim Planes As New BL_MOV_Plan(idCliente)
        Try
            'Dim Dispositivos As BL_MOV_Linea = new BL_MOV_Linea(idCliente)
            Dim lstPlanes As List(Of ENT_MOV_Plan) = Planes.ListarPlanAutocompletePorNombre(vcNomPlan, Integer.Parse(maxFilas), Integer.Parse(inTipLin))
            Planes.Dispose()
            Return lstPlanes
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Planes IsNot Nothing Then Planes.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function EntidadListarSoloCampana(ByVal p_ValorDefecto As String) As List(Of ENT_ENT_Entidad)
        Dim _return As List(Of ENT_ENT_Entidad)
        Dim Entidad As BL_ENT_Entidad = New BL_ENT_Entidad(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            _return = Entidad.ListarSoloCampana(-1, p_ValorDefecto)
            Entidad.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Entidad IsNot Nothing Then Entidad.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ProductoListarPorEntidad(ByVal p_IdEntidad As String, ByVal p_ValorDefecto As String) As List(Of ENT_MOV_CAM_Producto)
        Dim Producto As BL_MOV_CAM_Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim _return As List(Of ENT_MOV_CAM_Producto) = Producto.ListarPorEntidad(Convert.ToUInt32(p_IdEntidad), -1, p_ValorDefecto)
            Producto.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then Producto.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function VerificaSesion() As String
        Dim _return As String = ""
        Try
            If HttpContext.Current.Session("Usuario") Is Nothing Then 'Perdio la variable session usuario
                _return = "Perdio sesion"
            End If
        Catch ex As Exception
            _return = ex.Message
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Catch ex1 As Exception
                _return = "error en util"
            End Try
            'Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        Return _return
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function FinSesionTemporizador() As String
        Dim _return As String = ""
        Try

            HttpContext.Current.Session("SinSesionTemp") = "1"

            _return = "Perdio sesion"
        Catch ex As Exception
            _return = ex.Message
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Catch ex1 As Exception
                _return = "error en util"
            End Try
            'Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        Return _return
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function VerificaCargaInicial() As String
        Dim _return As String = ""
        Try
            _return = "mostrar"
            'If Not esAdmin() Then
            '    If CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod.Trim = "" Then
            '        _return = "mostrar"
            '    End If
            'End If
        Catch ex As Exception
            _return = ""
        End Try
        Return _return
    End Function

    'Private Function esAdmin() As Boolean
    '    Dim resul As Boolean = False
    '    For Each oGrupo As ENT_SEG_Grupo In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Grupos
    '        If oGrupo.P_inCod = 1 Then 'Es administrador
    '            resul = True
    '        End If
    '    Next
    '    Return resul
    'End Function

    '<WebMethod()>
    'Public Shared Function ListarIdioma() As List(Of ENT_PRO_Pagina)
    '    Try
    '        Dim Pagina As BL_PRO_Pagina = BL_PRO_Pagina.Instance

    '        Return Pagina.ListarIdiomaTodasPagina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod(EnableSession:=True)>
    Public Function ActualizarChat(ByVal Estado As String) As String
        Dim _return As String = ""
        Dim oBL_SEG_Usuario As BL_SEG_Usuario = Nothing
        Try
            oBL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oBL_SEG_Usuario.ActualizarChat(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod,
                                                   IIf(Estado = "1", True, False))
            oBL_SEG_Usuario.Dispose()

        Catch ex As Exception
            _return = ""
        Finally
            If oBL_SEG_Usuario IsNot Nothing Then oBL_SEG_Usuario.Dispose()
        End Try
        Return _return
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ObtenerEstadoChat() As String
        Dim _return As String = ""
        Dim oBL_SEG_Usuario As BL_SEG_Usuario = Nothing
        Try

            oBL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim blValor As Boolean = oBL_SEG_Usuario.ObtenerEstadoChat(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
            oBL_SEG_Usuario.Dispose()
            If blValor Then
                _return = "1"
            Else
                _return = "0"
            End If
        Catch ex As Exception
            _return = ""
        Finally
            If oBL_SEG_Usuario IsNot Nothing Then oBL_SEG_Usuario.Dispose()
        End Try
        Return _return
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ComprobarConexion(ByVal Servidor As String, ByVal Autenticacion As String, ByVal Usuario As String, ByVal Password As String, ByVal BaseDatos As String) As String
        Dim connectionstring As String

        If Autenticacion = "SI" Then
            connectionstring = "Data Source=" & Servidor & ";Initial Catalog=" & BaseDatos & "; Integrated Security = True; connection timeout=10;"
        Else
            connectionstring = "Data Source=" & Servidor & ";Initial Catalog=" & BaseDatos & ";user id=" & Usuario & ";password=" & Password & ";connection timeout=10;"
        End If

        If VisualSoft.Comun.Util.ArchivoConfiguracion.VerificaConexionBD(connectionstring) Then
            Return ""
        Else
            Return "Sin conexion"
        End If
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ComprobarConexion2() As String
        If HttpContext.Current.Session("Usuario") Is Nothing Then 'Perdio la variable session usuario
            Return "Perdio sesion"
        Else
            Return ""
        End If

    End Function

    <WebMethod(EnableSession:=True)>
    Public Function GuardarConfiguracionBase(ByVal Servidor As String, ByVal Autenticacion As String,
                                                    ByVal Usuario As String, ByVal Password As String,
                                                    ByVal BD As String,
                                                    ByVal AutenticacionUsuario As String,
                                                    ByVal RutaLDAP As String) As String
        Dim FuenteBD As BL_PCS_IMP_FuenteBD = Nothing
        Try
            'Dim TipoAunteticacion As Integer
            BaseDatos.Servidor = Servidor
            BaseDatos.BD = BD
            BaseDatos.Usuario = Usuario
            BaseDatos.Contraseña = Password
            BaseDatos.TimeOut = 30
            If Autenticacion = "SI" Then
                'TipoAunteticacion = 1
                BaseDatos.SSPI = "true"
            Else
                'TipoAunteticacion = 0
                BaseDatos.SSPI = "false"
            End If
            BaseDatos.Proveedor = "SQL"

            If AutenticacionUsuario <> "2" Then RutaLDAP = ""

            If VisualSoft.Comun.Util.ArchivoConfiguracion.CambiarValorConfiguracion(HttpContext.Current.Server.MapPath("~/web.config"), "accesoSQL", VisualSoft.Comun.Utilitarios.Cryptographics.EncryptString(BaseDatos.CadenaConexion)) Then
                'Actualizar Fuente BD De BASE (comentado 21-09-2015 wapumayta - El código ya se ejecuta en "GuardarConfiguracionDatos", codigo no funciona si no se tiene una conexión a datos configurada) 
                'FuenteBD = New BL_PCS_IMP_FuenteBD(0)
                'Dim eFuenteBD As New ENT_PCS_IMP_FuenteBD
                'eFuenteBD.IdFuente = 2
                'Dim oFuenteBD As ENT_PCS_IMP_FuenteBD = FuenteBD.Listar_x_Codigo(eFuenteBD)(0)
                'oFuenteBD.Servidor = Servidor
                'oFuenteBD.BaseDatos = BD
                'oFuenteBD.Usuario = Usuario
                'oFuenteBD.Password = Password
                'FuenteBD.Actualizar(oFuenteBD)

                If VisualSoft.Comun.Util.ArchivoConfiguracion.CambiarValorAutenticacion(HttpContext.Current.Server.MapPath("~/web.config"), Integer.Parse(AutenticacionUsuario), RutaLDAP) Then
                    Return ""
                Else
                    Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
                End If
            Else
                Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
            End If
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'If VisualSoft.Comun.Util.ArchivoConfiguracion.CambiarValorConfiguracion(HttpContext.Current.Server.MapPath("~/web.config"), "accesoSQL", VisualSoft.Comun.Utilitarios.Cryptographics.EncryptString(BaseDatos.CadenaConexion)) Then
            '    If VisualSoft.Comun.Util.ArchivoConfiguracion.CambiarValorAutenticacion(HttpContext.Current.Server.MapPath("~/web.config"), Integer.Parse(AutenticacionUsuario), RutaLDAP) Then
            '        Return ""
            '    Else
            '        Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
            '    End If
            'Else
            '    Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
            'End If
            Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
        Finally
            If FuenteBD IsNot Nothing Then FuenteBD.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function CargarConfiguracionDatos() As String
        Dim Cliente As BL_GEN_Cliente = Nothing
        Try
            Cliente = New BL_GEN_Cliente(0)
            Dim _return As String = Cliente.MostrarCadena(0)
            Cliente.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function GuardarConfiguracionDatos(ByVal Servidor As String, ByVal Autenticacion As String, ByVal Usuario As String, ByVal Password As String,
                                                     ByVal BD As String) As String
        Dim FuenteBD As BL_PCS_IMP_FuenteBD = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Try
            Cliente = New BL_GEN_Cliente(0)
            Cliente.GuardaConexion(0, Servidor, Autenticacion, Usuario, Password, BD)

            'Actualizar Fuente BD De Datos
            FuenteBD = New BL_PCS_IMP_FuenteBD(0)
            Dim eFuenteBD As New ENT_PCS_IMP_FuenteBD
            eFuenteBD.IdFuente = 1
            Dim oFuenteBD As ENT_PCS_IMP_FuenteBD = FuenteBD.Listar_x_Codigo(eFuenteBD)(0)
            oFuenteBD.Servidor = Servidor
            oFuenteBD.BaseDatos = BD
            oFuenteBD.Usuario = Usuario
            oFuenteBD.Password = Password
            FuenteBD.Actualizar(oFuenteBD)

            Dim strCadenaConexion As String = VisualSoft.Comun.Util.ArchivoConfiguracion.ObtenerValorConfiguracion(HttpContext.Current.Server.MapPath("~/web.config"), "accesoSQL")
            Cliente.GuardaConexionBase(0, Servidor, Autenticacion, Usuario, Password, BD, strCadenaConexion)

            Cliente.Dispose()

            Return ""
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
        Finally
            If FuenteBD IsNot Nothing Then FuenteBD.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarDepartamento(ByVal IdPais As String) As List(Of ENT_GEN_Ciudad)
        Dim Ciudad As BL_GEN_Ciudad = Nothing
        Try
            Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Ciudad) = Ciudad.ListarPorPais(IdPais, "-1", "<Todos>")
            Ciudad.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Ciudad IsNot Nothing Then Ciudad.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarProvincia(ByVal IdDepartamento As String, ByVal IdPais As String) As List(Of ENT_GEN_CFG_Provincia)
        Dim Provincia As BL_GEN_CFG_Provincia = Nothing
        Try
            Provincia = New BL_GEN_CFG_Provincia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_CFG_Provincia) = Provincia.ListarPorDepartamento(IdPais, IdDepartamento, "-1", "<Todos>")
            Provincia.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Provincia IsNot Nothing Then Provincia.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ListarDistrito(ByVal IdProvincia As String) As List(Of ENT_GEN_CFG_Distrito)
        Dim Distrito As BL_GEN_CFG_Distrito = Nothing
        Try
            Distrito = New BL_GEN_CFG_Distrito(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_CFG_Distrito) = Distrito.ListarPorProvincia(IdProvincia, "-1", "<Todos>")
            Distrito.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Distrito IsNot Nothing Then Distrito.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function ListarBusquedaGeneral(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String,
                                          ByVal vcCam As String, ByVal vcCamCodigo As String, ByVal vcValBus As String, ByVal vcTab As String,
                                          ByVal inTipOri As String, ByVal inFilReg As String, ByVal vcCon As String, ByVal inTipCre As String,
                                          ByVal vcConJQ As String, ByVal inTipLin As String) As JQGridJsonResponse
        Dim Campo As VisualSoft.Suite80.BL.BL_ENT_Campo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campo = New VisualSoft.Suite80.BL.BL_ENT_Campo(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lstCampo As List(Of ENT_ENT_Campo) = Campo.Listar(vcTab, oUsuario, Convert.ToInt32(inTipCre))
            Dim NomId As String = ""
            inPagTam = Math.Abs(Val(inPagTam))
            vcCon = vcCon.Replace("###", "'")
            If String.IsNullOrEmpty(inTipLin) Then inTipLin = "0" 'agregado 06-01-2016 para controles sin el tipo linea definido
            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab,
                                                                           lstCampo, NomId, vcCam, vcCamCodigo,
                                                                           vcValBus, Integer.Parse(inFilReg), vcCon.Replace("|", "'"),
                                                                           vcConJQ.Replace("|", "'").Replace(Chr(34), "'"), Integer.Parse(inTipLin),
                                                                           oUsuario.P_inCod)
            Campo.Dispose()

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                          Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function VerificarPerfilAdministrador() As Boolean
        'Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Administrador As Integer = 0
        For Each Perfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
            If Perfil.P_inCod = 1 Then
                Administrador = 1
                Exit For
            End If
        Next
        Return Administrador
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function VerificarAdministrador(ByVal Usuario As String, ByVal Password As String) As Integer
        Dim oUsuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim _return As Integer = oUsuario.VerificarAdministrador(Usuario, Password)
            oUsuario.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oUsuario IsNot Nothing Then oUsuario.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function ObtenerRaizSistema() As String
        Dim _return As String = Utilitario.ObtieneRaizSistema
        If Microsoft.VisualBasic.Right(_return.Trim, 1) <> "/" Then _return &= "/"
        Return _return
    End Function

    'agreagdo 17-09-2015 wapumayta
    <WebMethod(EnableSession:=True)>
    Public Function CheckFileExists(ByVal RutaCompleta As String) As String
        Dim Respuesta = "0"
        If RutaCompleta.Substring(0, 1) <> "~" Then
            RutaCompleta = "~/" + RutaCompleta
        End If
        If File.Exists(HttpContext.Current.Server.MapPath(RutaCompleta)) Then
            Respuesta = "1"
        End If

        Return Respuesta
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function GuardarUploadUsuario(ByVal vcRuta As String) As String

        Dim Usuario As BL_SEG_Usuario = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)

            If vcRuta <> "" Then
                Dim ms As New MemoryStream()
                vcRuta = vcRuta.Replace("\\", "\")
                Dim newImage As System.Drawing.Image = System.Drawing.Image.FromFile(vcRuta)
                newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg)
                Dim arreglo As Byte() = ms.ToArray()

                oUsuario.Imagen = arreglo

                Usuario.Grabar(oUsuario)
                HttpContext.Current.Session("Usuario") = oUsuario
            End If

        Catch ex As Exception
            'Dim util As New Utilitarios
            'util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Return ex.Message & ". " & ex.StackTrace
        Finally
            If Usuario IsNot Nothing Then
                Usuario.Dispose()
            End If
        End Try
        Return "OK"

    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function ObtenerCulturaPrincipalUsuario() As ENT_GEN_Cultura
        Try
            If (Session("Cultura") IsNot Nothing) Then
                Return CType(Session("Cultura"), ENT_GEN_Cultura)
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Public Function ObtenerTipoLineaDesdePerfiles(ByVal oUsuario As ENT_SEG_Usuario)
        Dim inTipoLineaUsuario As Integer = 1
        Try
            ''For Each Perfil As ENT_SEG_Perfil In oUsuario.Perfiles
            ''    Select Case Perfil.inCodTip_General
            ''        Case 0
            ''            inTipoLineaUsuario = 0
            ''            Exit For
            ''        Case 1
            ''            If inTipoLineaUsuario = 2 Then
            ''                inTipoLineaUsuario = 0
            ''                Exit For
            ''            Else
            ''                inTipoLineaUsuario = 1
            ''            End If
            ''        Case 2
            ''            If inTipoLineaUsuario = 1 Then
            ''                inTipoLineaUsuario = 0
            ''                Exit For
            ''            Else
            ''                inTipoLineaUsuario = 2
            ''            End If
            ''    End Select
            ''Next
            Return inTipoLineaUsuario
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function CambiarEstadoSincronizacion(ByVal Tipo As String, ByVal OpcionSinc As String, ByVal IdDominio As Integer) As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else
            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If

        Dim _return As String = ""
        Dim organizacion As BL_GEN_Organizacion = Nothing

        Try
            'INSERTAMOS LA COLA LUEGO DE HABER CONCLUIDO DE SUBIR LA PLANTILLA RRHH.
            organizacion = New BL_GEN_Organizacion(0, IdDominio)
            _return = organizacion.CambiarEstadoSincronizacion(OpcionSinc, IdDominio)

        Catch ex As Exception
            _return = ex.ToString()
        Finally
            If organizacion IsNot Nothing Then organizacion.Dispose()
        End Try
        Return _return
    End Function



#Region "Excel Import"
    <WebMethod(EnableSession:=True)>
    Public Function ObtenerPlantillaExcel(ByVal ConfigOrigen As Integer, ByVal ConfigDestino As Integer, ByVal EsCondata As Boolean) As Boolean
        Dim funciones As New ProcesosFunciones()
        Return funciones.Proceso_General(ConfigOrigen, ConfigDestino)
    End Function
#End Region

#Region "Recuperarcontrasena"
    '<WebMethod(), SoapHeader("AUTENTICACION")> _
    <WebMethod()>
    Public Function enviarcorreopassword(ByVal Correo As String, ByVal Url As String, ByVal IdDominio As Integer, ByVal Dominio As String) As String
        'Public Function EnviarSolicitudReestablecerContrasena(ByVal Correo As String, ByVal URLLogin As String) As String
        Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim strResultado As String = String.Empty
        Dim strErrorCorreo As String = String.Empty
        Try
            'If AUTENTICACION Is Nothing Then
            '    Throw New Exception("No se ha autenticado")
            '    Exit Function
            'Else
            '
            '    If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
            '        Throw New Exception("Credenciales incorrectas")
            '        Exit Function
            '    End If
            'End If
            If IdDominio > 0 Then
                Try
                    Dim DomDonf As New BL_ConfigDom_Configuracion()
                    DomDonf.InstanciarConfiguracion(IdDominio)
                Catch ex As Exception
                End Try
            End If


            If IdDominio = -1 Then
                Usuario = New BL_SEG_Usuario(0)
                ServicioGeneral = New BL_GEN_Servicio_General(0)
            Else
                Usuario = New BL_SEG_Usuario(0, 0, IdDominio)
                ServicioGeneral = New BL_GEN_Servicio_General(0, IdDominio)
            End If

            Dim CodigoSolicitud As String
            Dim dtResult As New DataTable
NuevoCodigo:
            CodigoSolicitud = Guid.NewGuid().ToString().ToUpper()
            dtResult = Usuario.InsertarSolicitudRestablecimiento(CodigoSolicitud, Correo, Url, IdDominio, Dominio)

            If dtResult.Rows.Count = 0 Then
                strResultado = "Error"
            Else
                Dim inResultado As Integer, strDescripcion As String
                inResultado = CInt(dtResult(0)("Resultado"))
                strDescripcion = dtResult(0)("Descripcion").ToString()

                If inResultado = -2 Then 'generar nuevo codigo
                    GoTo NuevoCodigo
                ElseIf inResultado = 1 Then
                    'enviar correo
                    Dim cCorreo = New CompCorreo.CCorreo

                    Dim CuerpoMensaje As String = String.Empty
                    Dim Destinatario As String = Correo
                    If IdDominio <> -1 Then
                        Destinatario = UtilitarioWeb.ComprobarStringNULL(dtResult(0)("Correo"), "")
                    End If
                    Dim Asunto As String = "Restablecimiento de contraseña"

                    Dim UbicPlantilla As String = HttpContext.Current.Server.MapPath("~/") & "General\Plantillas\SolicitudCambioContrasena.htm"
                    Dim NombreUsuario As String = UtilitarioWeb.ComprobarStringNULL(dtResult(0)("NombreUsuario"), "")
                    Dim EnlaceParaCorreo As String = Url + "?c=" + CodigoSolicitud + "&d=" + IdDominio.ToString()
                    CuerpoMensaje = String.Format(UtilitarioWeb.TraeCuerpoCorreo(UbicPlantilla), NombreUsuario, EnlaceParaCorreo, EnlaceParaCorreo)

                    If Destinatario <> String.Empty And NombreUsuario <> String.Empty Then
                        Try
                            'cCorreo.Enviar(False, Destinatario, Asunto, CuerpoMensaje, Nothing, False, "")
                            ServicioGeneral.InsertarCola(1, Asunto, CuerpoMensaje, Destinatario, "", "", 0)
                        Catch ex As Exception
                            strErrorCorreo = ex.ToString()
                        End Try
                    Else
                        strResultado = "0|Error: No se detectó destinatario o correo válido para reealizar el envío."
                    End If
                    strResultado = inResultado.ToString() + "|" + EnlaceParaCorreo + "|" + Destinatario
                Else
                    strResultado = inResultado.ToString() + "|" + strDescripcion
                End If
            End If

            Return strResultado
        Catch ex As Exception
            'Dim util As New Utilitarios
            'util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw ex
        Finally
            If Not IsNothing(Usuario) Then Usuario.Dispose()
            If Not IsNothing(ServicioGeneral) Then ServicioGeneral.Dispose()
        End Try
    End Function

    Public Class Credenciales
        Inherits SoapHeader

        Public Usuario As String
        Public Password As String

    End Class

#End Region

#Region "Aprovisionamiento"
    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function GuardarCuentaQ15(ByVal objCuenta As String,
                                     ByVal vcCodCue As String,
                                     ByVal vcCamDim As String,
                                     ByVal icCuentaTemp As String,
                                     ByVal NombreUsuario As String,
                                     ByVal IdDominio As Integer) As Integer


        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If

        End If

        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim blServicioImp As BL_IMP_DAT_Servicio = Nothing
        Try
            blServicioImp = New BL_IMP_DAT_Servicio(0, IdDominio)
            Cuenta = New BL_MOV_Cuenta(0, IdDominio)

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCuenta As ENT_MOV_Cuenta = oSerializer.Deserialize(Of ENT_MOV_Cuenta)(objCuenta)

            Dim lstTipoPeriodoFacturacion As List(Of ENT_MOV_TipoPeriodoFacturacion) = Cuenta.Listar_TipoPeriodoFacturacion(-1, "<< Seleccionar >>")
            v_oCuenta.TipoPeriodoFacturacion.P_inCod = lstTipoPeriodoFacturacion(1).P_inCod
            If lstTipoPeriodoFacturacion(1).P_inCod = 1 Then
                v_oCuenta.dcPerFacIni = UtilitarioWeb.ListarDias(0)
            Else
                v_oCuenta.dcPerFacIni = "0"
                v_oCuenta.dcPerFacFin = "0"
            End If


            Dim objListAdjuntos As List(Of ENT_MOV_CuentaAdjunto) = New List(Of ENT_MOV_CuentaAdjunto)
            If v_oCuenta.Adjuntos.Length > 0 Then
                Dim mAdjuntos() As String = v_oCuenta.Adjuntos.Split(",")
                For Each strAdj As String In mAdjuntos
                    Dim objAdjunto As New ENT_MOV_CuentaAdjunto
                    objAdjunto.IdCuenta = 0
                    objAdjunto.NombreArchivo = strAdj.Split(":")(0)
                    objAdjunto.TamanoArchivo = strAdj.Split(":")(1)
                    objListAdjuntos.Add(objAdjunto)
                Next
            End If

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = Nothing
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.NombreUsuario = NombreUsuario
            oAuditoria.Opcion = "Cuentas"
            'oAuditoria.Tabla(IdDominio) = "MOV_Cuenta"


            Dim strAntes As String = ""
            vcCodCue.Replace("&#39", "'")
            v_oCuenta.P_vcCod = v_oCuenta.P_vcCod.Replace("&#39", "'")
            v_oCuenta.vcNom = v_oCuenta.vcNom.Replace("&#39", "'")
            For Each oSubCuenta As ENT_MOV_SubCuenta In v_oCuenta.SubCuentas
                oSubCuenta.vcNom = oSubCuenta.vcNom.Replace("&#39", "'")
                oSubCuenta.vcDes = oSubCuenta.vcDes.Replace("&#39", "'")
            Next
            v_oCuenta.Acuerdos = v_oCuenta.Acuerdos.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
            Dim _return As Integer
            If vcCodCue = "" Then
                _return = Cuenta.Insertar(v_oCuenta, objListAdjuntos, vcCamDim)
                If _return <> "-1" Then
                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    oAuditoria.Opcion, "Agregar", "USUARIO: " & "" & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

                    ''oAuditoria.Insertar(New String() {v_oCuenta.P_vcCod}, 1, IdDominio)
                    blServicioImp.EliminarCuentaTempxId(icCuentaTemp)
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {v_oCuenta.P_vcCod}, False, 1, IdDominio)
                Cuenta.Actualizar(v_oCuenta, objListAdjuntos, vcCamDim)

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Actualizar", "USUARIO: " & "" & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

                ''oAuditoria.DespuesActualizar(New String() {v_oCuenta.P_vcCod}, strAntes, 1, IdDominio)
                _return = 0
            End If
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, "PcSistelAprovisionamientoWeb")
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If blServicioImp IsNot Nothing Then blServicioImp.Dispose()
        End Try

    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function ProcesarImportacionQ15_Cola(idConfig As String, objProceso As String, nomArch As String, p_band As Boolean, ByVal NombreUsuario As String, ByVal IdDominio As Integer) As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If

        Dim bl_Proceso As BL_IMP_DAT_Proceso = Nothing
        Dim bl_ConfigProceso As BL_IMP_DAT_ConfigProceso = Nothing
        Try
            bl_ConfigProceso = New BL_IMP_DAT_ConfigProceso(0, IdDominio)

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oProceso As ENT_IMP_DAT_Proceso = oSerializer.Deserialize(Of ENT_IMP_DAT_Proceso)(objProceso)

            Dim codConfigProceso As Integer = Convert.ToInt32(CInt(idConfig))
            Dim dt As DataTable = bl_ConfigProceso.ObtenerConfigProcesoxId(codConfigProceso)

            Dim oConfigProceso As New ENT_IMP_DAT_ConfigProceso(), oPlantilla As New ENT_IMP_DAT_Plantilla()
            Dim oConfig_Fuente As New ENT_IMP_DAT_Config_Fuente(), oFuenteArchivo As New ENT_IMP_DAT_FuenteArchivo()
            Dim oTipoFuente As New ENT_IMP_DAT_TipoFuenteUNC()

            Dim oConfiguracion As New ENT_IMP_DAT_Configuracion()

            If dt.Rows.Count > 0 Then
                For Each dr As DataRow In dt.Rows

                    oConfigProceso.IdConfigProceso = dr("IdConfigProceso").ToString()
                    oConfigProceso.Descripcion = dr("Descripcion").ToString()
                    oConfigProceso.IdFormato = Convert.ToInt32(dr("IdFormato").ToString())
                    oConfigProceso.IdConfigFuente = Convert.ToInt32(dr("IdConfigFuente").ToString())
                    oConfigProceso.IdCliente = Convert.ToInt32(dr("IdCliente").ToString())
                    oConfigProceso.Tipo = dr("Tipo").ToString()

                    oPlantilla.IdPlantilla = Convert.ToInt32(dr("IdPlantilla").ToString())
                    oPlantilla.Nombre = dr("Nombre").ToString()
                    oPlantilla.Descripcion = dr("descPlantilla").ToString()
                    oPlantilla.F_inEntidad = Convert.ToInt32(dr("F_inEntidad").ToString())
                    oPlantilla.PosicionFila = dr("PosicionFila").ToString()
                    oPlantilla.NombreHoja = dr("NombreHoja").ToString()
                    oPlantilla.Separador = dr("Separador").ToString()

                    oConfig_Fuente.IdConfigFuente = Convert.ToInt32(dr("IdConfigFuente").ToString())
                    oConfig_Fuente.IdFuenteBD = Convert.ToInt32(dr("idFuenteBD").ToString())
                    oConfig_Fuente.IdFuenteArchivo = Convert.ToInt32(dr("idFuenteArchivoFC").ToString())
                    oConfig_Fuente.RutaErrores = dr("RutaErrores").ToString()
                    oConfig_Fuente.RutaLog = dr("RutaLog").ToString()

                    oFuenteArchivo.IdFuente = Convert.ToInt32(dr("idFuenteArchivo").ToString())
                    oFuenteArchivo.IdTipoArchivo = Convert.ToInt32(dr("IdTipoArchivo").ToString())
                    oFuenteArchivo.Password = dr("Password").ToString()
                    oFuenteArchivo.Nombre = dr("nomFuenteArchivo").ToString()
                    oFuenteArchivo.RutaBackup = dr("RutaBackup").ToString()
                    oFuenteArchivo.NombreArchivo = dr("NombreArchivo").ToString()
                    oFuenteArchivo.TipoExtracion = dr("TipoExtracion").ToString()
                    oFuenteArchivo.Extension = dr("Extension").ToString()

                    If Convert.ToInt32(dr("idFuenteArchivo").ToString()) > 0 Then
                        oTipoFuente.IdFuente = Convert.ToInt32(dr("idFuenteUNC").ToString())
                        oTipoFuente.Ruta = dr("Ruta").ToString()
                        oTipoFuente.Tipo = dr("tipoFuente").ToString()
                    End If

                Next

            End If


            Dim lstConfigProceso As List(Of ENT_IMP_DAT_ConfigProceso) = bl_ConfigProceso.ListarConfigProcesoxIdPlantilla(oPlantilla.IdPlantilla)
            For Each oConfProc As ENT_IMP_DAT_ConfigProceso In lstConfigProceso
                oConfiguracion.IdConfigProceso_Destino = oConfProc.IdConfigProceso
            Next
            oConfiguracion.IdConfigProceso_Origen = oConfigProceso.IdConfigProceso
            oConfiguracion.IdPlantilla = oPlantilla.IdPlantilla
            oConfiguracion.IdTipoArchivo = oFuenteArchivo.IdTipoArchivo

            bl_Proceso = New BL_IMP_DAT_Proceso(0, IdDominio)

            If v_oProceso.InProg = 1 Then
                v_oProceso.FechaProceso = Convert.ToDateTime(v_oProceso.FechaProceso)
            Else
                v_oProceso.FechaProceso = DateTime.Now
            End If

            ''v_oProceso.IdEmpleado = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod

            Dim objResult As String
            objResult = bl_Proceso.GuardarColaQ15(v_oProceso, oConfiguracion, p_band)

            Return objResult + "|" + oTipoFuente.Ruta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Proceso IsNot Nothing Then bl_Proceso.Dispose()
            If bl_ConfigProceso IsNot Nothing Then bl_ConfigProceso.Dispose()
        End Try
    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function ProcesarImportacionOrganizacion_Cola(ByVal pruta As String, ByVal pDia As String, ByVal pHora As String, ByVal vcNombreArchivoTemp As String, ByVal NombreUsuario As String, ByVal IdDominio As Integer) As String

        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If

        End If

        Dim organizacion As BL_GEN_Organizacion = Nothing

        Try
            'INSERTAMOS LA COLA LUEGO DE HABER CONCLUIDO DE SUBIR LA PLANTILLA RRHH.
            organizacion = New BL_GEN_Organizacion(0, IdDominio)

            Dim resultado As Integer

            Dim Adicional As String = "_" + Now.Year.ToString() + Right("0" + Now.Month.ToString(), 2) + Right("0" + Now.Day.ToString(), 2) + Right("0" + Now.Hour.ToString(), 2) + Right("0" + Now.Minute.ToString(), 2) + Right("0" + Now.Second.ToString(), 2)
            'vcNombreArchivoTemp = vcNombreArchivoTemp.Split(".")(0) + Adicional + "." + vcNombreArchivoTemp.Split(".")(1)
            'vcNombreArchivoTemp = pruta

            Dim vcRuta As String = vcNombreArchivoTemp.Substring(0, vcNombreArchivoTemp.LastIndexOf("\"))
            Dim vcArchivo As String = vcNombreArchivoTemp.Substring(vcNombreArchivoTemp.LastIndexOf("\") + 1)

            If (pDia = "") Then
                resultado = organizacion.ActualizarColaSincronizadorRRHH_Masivo("AHORA", DBNull.Value.ToString(), "00:00:00", True, vcArchivo, "movil", vcRuta)(0)(0).ToString()
            Else
                resultado = organizacion.ActualizarColaSincronizadorRRHH_Masivo("PROGRAMADO", pDia, pHora, False, vcArchivo, "movil", vcRuta)(0)(0).ToString()
            End If

            'If (pDia = "") Then
            '    resultado = organizacion.ActualizarColaSincronizadorRRHH_Masivo("AHORA", DBNull.Value.ToString(), "00:00:00", True, vcNombreArchivoTemp, "pcsistel")(0)(0).ToString()
            'Else
            '    resultado = organizacion.ActualizarColaSincronizadorRRHH_Masivo("PROGRAMADO", pDia, pHora, False, vcNombreArchivoTemp, "pcsistel")(0)(0).ToString()
            'End If

            'Enviamos el Id de la cola de organización.
            Return resultado.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If organizacion IsNot Nothing Then organizacion.Dispose()
        End Try

    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function Test_Test(numero As Integer) As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If

        Return "Test Test Test!"
    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function SubirArchivoOrganizacion(FileBinaryArray As [Byte](), NombreArchivo As String,
                                             IdDominio As String) As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else
            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If
        Dim resultado As Boolean = True
        Try
            Dim Adicional As String = "_" + Now.Year.ToString() + Right("0" + Now.Month.ToString(), 2) + Right("0" + Now.Day.ToString(), 2) + Right("0" + Now.Hour.ToString(), 2) + Right("0" + Now.Minute.ToString(), 2) + Right("0" + Now.Second.ToString(), 2)
            NombreArchivo = NombreArchivo.Split(".")(0) + Adicional + "." + NombreArchivo.Split(".")(1)

            Dim strdocPath As String
            Dim CarpetaDominioTemp As String = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "Images\Temporal", IdDominio)
            If Not Directory.Exists(CarpetaDominioTemp) Then Directory.CreateDirectory(CarpetaDominioTemp)
            strdocPath = Path.Combine(CarpetaDominioTemp, NombreArchivo)
            Dim objfilestream As New FileStream(strdocPath, FileMode.Create, FileAccess.ReadWrite)
            objfilestream.Write(FileBinaryArray, 0, FileBinaryArray.Length)
            objfilestream.Close()

            Return strdocPath
            'Return NombreArchivo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            resultado = False
        End Try
        Return resultado
    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function Obtener_EstadoActual_ColaQ15_Organizacion(ByVal IdDomino As Integer, ByVal IdColaQ15 As Integer, ByVal IdColaOrganizacion As Integer) As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else
            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If


        Dim bl_Proceso As BL_IMP_DAT_Proceso = Nothing
        Try
            bl_Proceso = New BL_IMP_DAT_Proceso(0, IdDomino)
            '
            Dim dtDatoColaActualizado As String
            dtDatoColaActualizado = bl_Proceso.ObtenerDatosCola_Actualizados(IdColaQ15, IdColaOrganizacion)
            Return dtDatoColaActualizado


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Proceso IsNot Nothing Then bl_Proceso.Dispose()
        End Try
    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function Obtener_DatosUsuario(ByVal idDominio As Integer, pIdUsuario As Integer) As String
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else
            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If
        Dim bl_Usuario As BL_SEG_Usuario = Nothing
        Try
            bl_Usuario = New BL_SEG_Usuario(0, 0, idDominio)
            Dim oUsuario As ENT_SEG_Usuario = bl_Usuario.Mostrar(pIdUsuario)
            Dim retorno As String = VisualSoft.Comun.Utilitarios.Cryptographics.EncryptString(oUsuario.vcUsu) + "|" + VisualSoft.Comun.Util.Cryptographics.EncryptString(oUsuario.vcPas)
            Return retorno
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Usuario IsNot Nothing Then bl_Usuario.Dispose()
        End Try

    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function ListarEmpleadosPorNombre(ByVal idDominio As Integer, ByVal maxFilas As String, ByVal vcNomEmp As String) As List(Of ENT_GEN_Empleado)
        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else
            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If
        Dim Empleado As BL_GEN_Empleado = Nothing
        Try
            Empleado = New BL_GEN_Empleado(0, idDominio)
            vcNomEmp = vcNomEmp.Replace("&#39", "''")
            Dim _return As List(Of ENT_GEN_Empleado) = Empleado.ListarTodosPorNombre(vcNomEmp, Integer.Parse(maxFilas))
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try

    End Function
#End Region


#Region "PCSistel Digital - Ejecución de Colas"
    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function PCSDig_ActualizarUsuario(ByVal usuario As String, ByVal clave As String,
                                             ByVal IdDominio As Integer) As String


        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If

        End If

        Try
            Dim base As DALC_Base = New DALC_Base(DALC_Base.TipoOrigen.Datos, IdDominio, IdDominio)
            Dim sql As ResultadoSQL = base.EjecutarComandoSQL("s_u_ActualizarDataUsuarioInicio",
                                            New List(Of SqlParameter) From {
                                            New SqlParameter("@usuario", usuario),
                                            New SqlParameter("@clave", CompLicencia.Cryptographics.EncryptString(clave))
            }, IdDominio)
            Return (If(sql.Estado, "1", "0")) & "¯*¯" + sql.Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, "PCSistelDigital_Colas")
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try


    End Function

    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function PCSDig_CrearCola(ByVal Data As String,
                                     ByVal IdDominio As Integer) As String


        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else

            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If

        End If

        Try
            Dim base As DALC_Base = New DALC_Base(DALC_Base.TipoOrigen.Datos, IdDominio, IdDominio)
            Dim sql As ResultadoSQL = base.EjecutarComandoSQL("s_u_EjecutarComandos",
                                            New List(Of SqlParameter) From {
                                            New SqlParameter("@idUsuario", 1),
                                            New SqlParameter("@datos", Data)
            }, IdDominio)
            Return (If(sql.Estado, "1", "0")) & "¯*¯" + sql.Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, "PCSistelDigital_Colas")
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try


    End Function


    <WebMethod(), SoapHeader("AUTENTICACION")>
    Public Function PCSDig_ObtenerCola(ByVal Data As String,
                                       ByVal IdDominio As Integer) As String

        If AUTENTICACION Is Nothing Then
            Throw New Exception("No se ha autenticado")
            Exit Function
        Else
            If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
                Throw New Exception("Credenciales incorrectas")
                Exit Function
            End If
        End If

        Try
            Dim base As DALC_Base = New DALC_Base(DALC_Base.TipoOrigen.Datos, IdDominio, IdDominio)
            Dim sql As ResultadoSQL = base.EjecutarComandoSQL("PCS_DIG_s_ObtenerColas",
                                            New List(Of SqlParameter) From {
                                            New SqlParameter("@data", Data)
            }, IdDominio)
            Return (If(sql.Estado, "1", "0")) & "¯*¯" + sql.Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, "PCSistelDigital_Colas")
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try

    End Function


#End Region





    <WebMethod()>
    Public Function RetornaUsuario_ValidarKey(ByVal name As String) As String
        Dim return_ As String = ""

        Try
            return_ = VisualSoft.Comun.Utilitarios.Cryptographics.EncryptString(name)

        Catch ex As Exception
            return_ = ""
        End Try

        Return return_
    End Function



End Class
