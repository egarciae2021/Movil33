Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports Ionic.Zip
Imports System.Net

Public Class Comp_Adm_VisorComprobantes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim bl_tipoDocumento As BL_MOV_FAC_TipoDocumento = Nothing
        Dim bl_estadoCobro As BL_MOV_FAC_EstadoCobro = Nothing
        Dim bl_tipoProceso As BL_MOV_FAC_TipoProceso = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            If Not IsPostBack Then
                bl_tipoDocumento = New BL_MOV_FAC_TipoDocumento(oUsuario.IdCliente)
                UtilitarioWeb.Dataddl(dwTipoComp, bl_tipoDocumento.Listar(-1, "<Todos>"), "Descripcion", "IdTipoDocumento")
                bl_estadoCobro = New BL_MOV_FAC_EstadoCobro(oUsuario.IdCliente)
                UtilitarioWeb.Dataddl(dwEstado, bl_estadoCobro.Listar(-1, "<Todos>"), "Descripcion", "IdEstadoCobro")
                bl_tipoProceso = New BL_MOV_FAC_TipoProceso(oUsuario.IdCliente)
                UtilitarioWeb.Dataddl(dwTipoProceso, bl_tipoProceso.Listar(-1, "<Todos>"), "Descripcion", "IdTipoProceso")

                hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod

                Dim perfil As String = ""
                For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                    If entSegPerfil.CodigoPerfil = "SUPADM" OrElse entSegPerfil.CodigoPerfil = "ADMIN" OrElse entSegPerfil.P_inCod = 39 Then
                        hdfCodEmpleado.Value = ""
                        perfil = 1
                        Exit For
                    End If
                Next

                Dim script As String = "var perfil = '" + perfil + "';"

                hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/Temporal/Comprobantes/")

                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_tipoDocumento IsNot Nothing Then bl_tipoDocumento.Dispose()
            If bl_estadoCobro IsNot Nothing Then bl_estadoCobro.Dispose()
            If bl_tipoProceso IsNot Nothing Then bl_tipoProceso.Dispose()
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Buscar(ByVal inPagTam As String, ByVal inPagAct As String, vcOrdCol As String, vcTipOrdCol As String, p_periodo As String, _
                                  p_idEmpleado As String, p_tipoDocumento As Integer, p_idTipoProceso As Integer, p_idEstado As Integer) As Object
        Dim bl_Comprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_Comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
            p_periodo = p_periodo.Substring(3, 4) & p_periodo.Substring(0, 2) & "01"
            Dim dt As DataTable = bl_Comprobante.ListarComprobantes(p_periodo, p_idEmpleado, p_idTipoProceso, p_tipoDocumento, p_idEstado)
            If dt.Rows.Count > 0 Then

                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    If vcOrdCol <> "" Then
                        Dim dvData As New DataView(dt)
                        dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                        dt = dvData.ToTable
                    End If

                    Dim TotalPaginas As Integer
                    Dim TotalRegistros As Integer
                    Dim inResto As Integer
                    TotalRegistros = dt.Rows.Count
                    TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                    If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                    Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
                Else
                    Return Nothing
                End If
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Comprobante IsNot Nothing Then bl_Comprobante.Dispose()
        End Try
        Return Nothing
    End Function

    'Public Shared Function ExportarPdf(ByVal p_periodo As String, p_idEmpleado As String, p_nroComprobante As String) As String
    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function ExportarPdf(ByVal lista As String, p_periodo As String) As String
        Dim comprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim lst_Generar As List(Of ENT_MOV_FAC_Comprobante) = oSerializer.Deserialize(Of List(Of ENT_MOV_FAC_Comprobante))(lista)

            Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//Temporal//Comprobantes//"

            If lst_Generar.Count > 1 Then
                Dim rutaZipAux As String = vcRuta + "Comprobantes_" + p_periodo + "//"
                Dim rutaZip As String = "Comprobantes_" + p_periodo + "//"
                vcRuta = vcRuta + "Comprobantes_" + p_periodo + "//"

                If Not File.Exists(vcRuta) Then
                    Directory.CreateDirectory(vcRuta)
                End If

                For Each file In Directory.GetFiles(vcRuta)
                    IO.File.Delete(file)
                Next

                comprobante.Listar_ComprobantePdf(lst_Generar, vcRuta, p_periodo)

                Using zip As New ZipFile
                    vcRuta = rutaZipAux & "Comprobantes_" & p_periodo & ".zip"
                    'zip.AddDirectory(rutaZip)
                    zip.AddDirectory(rutaZipAux)
                    zip.Save(vcRuta)
                End Using
                vcRuta = rutaZip + "Comprobantes_" + p_periodo + ".zip"
            Else
                For Each entMovFacComprobante As ENT_MOV_FAC_Comprobante In lst_Generar
                    vcRuta = comprobante.Listar_ComprobantePdf(entMovFacComprobante, vcRuta)
                Next
            End If

            Return vcRuta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If comprobante IsNot Nothing Then comprobante.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ComprobarPerfil() As Boolean
        Dim resultado As Boolean = False
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                If entSegPerfil.CodigoPerfil = "SUPADM" OrElse entSegPerfil.CodigoPerfil = "ADMIN" Then
                    resultado = True
                    'hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                End If
            Next
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEstadoCobroxIdTipoDoc(idTipoDocumento As Integer) As List(Of ENT_MOV_FAC_EstadoCobro)
        Dim Estado As BL_MOV_FAC_EstadoCobro = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Estado = New BL_MOV_FAC_EstadoCobro(oUsuario.IdCliente)

            dim lstEstados as List(Of ENT_MOV_FAC_EstadoCobro) = Estado.ListarxIdTipoDocumento(idTipoDocumento, -1, "<< Todos >>")

            Return lstEstados
        Catch ex As Exception
            If Estado IsNot Nothing Then Estado.Dispose()
        End Try
        Return New List(Of ENT_MOV_FAC_EstadoCobro)
    End Function

    <WebMethod()>
    Public Shared Function ListarEmpleados(ByVal vcNomEmp As String, ByVal inMaxFil As Integer, ByVal inTipLin As Integer) As List(Of String)
        Try
            Dim Empleado As VisualSoft.Suite80.BL.BL_GEN_Empleado = New VisualSoft.Suite80.BL.BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim vcCodInt As String = oUsuario.F_vcCodInt
            'Dim vcCodInt As String = oUsuario.CodIntResp
            Dim dtEmp As DataTable = Empleado.ListarPorNombrePorTipoLineaGruOri(vcNomEmp, inMaxFil, vcCodInt, inTipLin)
            Empleado.Dispose()
            Dim lstEmp As New List(Of String)
            For Each dr As DataRow In dtEmp.Rows
                Dim element As String
                element = dr("EMPL_P_vcCODEMP").ToString() + "-" + dr("EMPL_vcNOMEMP").ToString() + "-" + dr("dniEmp").ToString()
                lstEmp.Add(element)
            Next
            Return lstEmp
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class