Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports VisualSoft.PCSistel.Utilitarios
Imports VisualSoft.PCSistel.Producto.BE
Imports VisualSoft.PCSistel.Producto.BL
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services
Imports VisualSoft.PCSistel.General.BE
Imports VisualSoft.PCSistel.BL
Imports System.IO

''' <summary>
''' Descripción breve de General
''' </summary>
' Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
' [System.Web.Script.Services.ScriptService]
<ScriptService()> _
<WebService([Namespace]:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<System.ComponentModel.ToolboxItem(False)> _
Public Class GeneralFija
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function HelloWorld() As String
        Return "Hello World"
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function ListarEmpleado(maxFilas As String, vcNomEmp As String, incodGrup As String, idCliente As String) As List(Of ENT_GEN_Empleado)
        Dim Empleado As New BL_GEN_Empleado()
        'string vcCodInt = ((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).F_vcCodInt;

        vcNomEmp = vcNomEmp.Replace("&#39", "''")
        'List<ENT_GEN_Empleado> _return = Empleado.ListarPorNombrePorGrupo(vcNomEmp, int.Parse(incodGrup), int.Parse(maxFilas), vcCodInt);
        Dim _return As List(Of ENT_GEN_Empleado) = Empleado.ListarPorNombrePorGrupo(vcNomEmp, Integer.Parse(incodGrup), Integer.Parse(maxFilas), Nothing)

        ' Empleado.Dispose();
        Return _return
        'return null;
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function ComprobarSession() As String
        Dim resultado As String = "1"

        If (HttpContext.Current.Session("datos") Is Nothing) Then
            resultado = "0"
        End If
        Return resultado
    End Function



    <WebMethod()> _
    Public Function ListarSucursal(maxFilas As String, vcNomSuc As String, idCliente As String) As List(Of ENT_GEN_Sucursal)
        'BL_GEN_Sucursal Sucursal = new BL_GEN_Sucursal(idCliente);
        Dim Sucursal As New BL_GEN_Sucursal()
        vcNomSuc = vcNomSuc.Replace("&#39", "''")
        Dim _return As List(Of ENT_GEN_Sucursal) = Sucursal.ListarSucursalPorNombre(vcNomSuc, Integer.Parse(maxFilas), False)
        'Sucursal.Dispose();
        Return _return
    End Function

    <WebMethod()> _
    Public Function ListarSucursalCombo(maxFilas As String, vcNomSuc As String, idCliente As String) As List(Of ENT_GEN_Sucursal)
        'BL_GEN_Sucursal Sucursal = new BL_GEN_Sucursal(idCliente);
        Dim Sucursal As New BL_GEN_Sucursal()
        Dim _return As List(Of ENT_GEN_Sucursal) = Sucursal.ListarSensitivo(vcNomSuc, Integer.Parse(maxFilas))
        'Sucursal.Dispose();
        Return _return
    End Function


    <WebMethod()> _
    Public Function ListarPais_x_Codigo_o_Nombre(vcCriterio As String, Activo As String) As List(Of ENT_GEN_Pais)
        'BL_GEN_Pais Pais = new BL_GEN_Pais(idCliente);
        Dim Pais As New BL_GEN_Pais()
        'vcCriterio = vcCriterio.Replace("&#39", "''")
        Dim _return As List(Of ENT_GEN_Pais) = Nothing
        If Activo = "1" Then
            _return = Pais.ListarPorCodigo_o_Nombre_Activos(vcCriterio)
        Else
            _return = Pais.ListarPorCodigo_o_Nombre(vcCriterio)
        End If
        'Pais.Dispose();
        Return _return
    End Function

    <WebMethod()> _
    Public Function ListarCCOCombo(maxFilas As String, vcNomCCO As String, idCliente As String) As List(Of ENT_GEN_CenCosto)
        Dim CCO As New BL_GEN_CentroCosto()
        Dim _return As List(Of ENT_GEN_CenCosto) = CCO.ListarCombo(vcNomCCO, Integer.Parse(maxFilas))
        'CCO.Dispose();
        Return _return
    End Function

    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function ObtenerCulturaPrincipalUsuario() As ENT_GEN_Cultura
        Try
            If (Session("dtCultura") IsNot Nothing) Then
                Return DirectCast(Session("dtCultura"), ENT_GEN_Cultura)
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function ListarBusquedaGeneral(inPagTam As String, inPagAct As String, vcOrdCol As String, vcTipOrdCol As String, vcCam As String, vcCamCodigo As String, _
   vcValBus As String, vcTab As String, inTipOri As String, inFilReg As String, vcCon As String, inTipCre As String, _
   vcConJQ As String) As UtilitarioWeb.JQGridJsonResponse
        Try
            Dim Campo As New BL_ENT_Campo()
            Dim lstCampo As List(Of ENT_ENT_Campo) = Campo.Listar(vcTab, 1, 2)
            Dim NomId As String = ""
            inPagTam = Math.Abs(Convert.ToDecimal((inPagTam))).ToString()
            vcCon = vcCon.Replace("###", "'")
            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, _
             NomId, vcCam, vcCamCodigo, vcValBus, Integer.Parse(inFilReg), vcCon.Replace("|", "'"), _
             vcConJQ.Replace("|", "'"))
            'Campo.Dispose();

            Dim campos As DataTable = dsDetalle.Tables(1)


            Return New UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)


        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function ListarBusquedaGeneralOrganizacion(inPagTam As String, inPagAct As String, vcOrdCol As String, vcTipOrdCol As String, vcCam As String, vcCamCodigo As String, _
   vcValBus As String, vcTab As String, inTipOri As String, inFilReg As String, vcCon As String, inTipCre As String, _
   vcConJQ As String) As UtilitarioWeb.JQGridJsonResponse
        Try
            Dim Campo As New BL_ENT_Campo()
            Dim lstCampo As List(Of ENT_ENT_Campo) = Campo.Listar(vcTab, 1, 0)
            Dim NomId As String = ""
            inPagTam = Math.Abs(Convert.ToDecimal((inPagTam))).ToString()
            vcCon = vcCon.Replace("###", "'")
            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, _
             NomId, vcCam, vcCamCodigo, vcValBus, Integer.Parse(inFilReg), vcCon.Replace("|", "'"), _
             vcConJQ.Replace("|", "'"))
            'Campo.Dispose();

            Dim campos As DataTable = dsDetalle.Tables(1)


            Return New UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)


        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function ObtenerRaizSistema() As String
        Dim _return As String = UtilitarioWeb.ObtieneRaizSistema()
        'if (Strings.Right(_return.Trim(), 1) != "/")
        If _return.Substring(_return.Length - 1, 1) <> "/" Then
            _return += "/"
        End If
        Return _return
    End Function
End Class
