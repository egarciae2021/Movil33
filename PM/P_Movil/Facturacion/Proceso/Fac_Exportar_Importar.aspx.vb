Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.IO

Public Class FAC_Exportar_Importar
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim FacConfiguracion As BL_MOV_FAC_Configuracion = Nothing
        Try
            oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            FacConfiguracion = New BL_MOV_FAC_Configuracion(1, oUsuario.IdCliente)
            If Not IsPostBack Then
                Dim dtConfig As DataTable
                dtConfig = FacConfiguracion.ListarConfiguracion_CobrosPagos(3, 4)

                If (dtConfig.Rows.Count > 0) Then
                    For Each dr As DataRow In dtConfig.Rows
                        If (dr("_PF_IdTipoConfiguracion") = "3") Then
                            lblRutaExportacionDeuda.Text = UtilitarioWeb.ComprobarStringNULL(dr("Ruta"), "(Desconocido)")
                            lblNombreArchivoExportacion.Text = UtilitarioWeb.ComprobarStringNULL(dr("NombreArchivo"), "(Desconocido)")
                            lblExp_RutaBackup.Text = UtilitarioWeb.ComprobarStringNULL(dr("RutaBackup"), "(Desconocido)")
                            lblExp_RutaErrores.Text = UtilitarioWeb.ComprobarStringNULL(dr("RutaErrores"), "(Desconocido)")
                            lblExp_RutaLog.Text = UtilitarioWeb.ComprobarStringNULL(dr("RutaLog"), "(Desconocido")
                        ElseIf (dr("_PF_IdTipoConfiguracion") = "4") Then
                            lblRutaImportacion.Text = UtilitarioWeb.ComprobarStringNULL(dr("Ruta"), "(Desconocido)")
                            lblNombreArchivoImportacion.Text = UtilitarioWeb.ComprobarStringNULL(dr("NombreArchivo"), "(Desconocido)")
                            lblImp_RutaBackup.Text = UtilitarioWeb.ComprobarStringNULL(dr("RutaBackup"), "(Desconocido)")
                            lblImp_RutaErrores.Text = UtilitarioWeb.ComprobarStringNULL(dr("RutaErrores"), "(Desconocido)")
                            lblImp_RutaLog.Text = UtilitarioWeb.ComprobarStringNULL(dr("RutaLog"), "(Desconocido)")
                        End If
                    Next
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(FacConfiguracion) Then FacConfiguracion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarArchivosCobros(ByVal UbicacionCobro As String, ByVal UbicacionBackup As String) As List(Of List(Of Dictionary(Of String, String)))
        Try
            Dim e_kb As Integer = 1024

            Dim lstResult As List(Of List(Of Dictionary(Of String, String))) = New List(Of List(Of Dictionary(Of String, String)))
            Dim lstArchivoUltimoCobro As List(Of Dictionary(Of String, String)) = New List(Of Dictionary(Of String, String))
            Dim lstArchivosHistoricoCobros As List(Of Dictionary(Of String, String)) = New List(Of Dictionary(Of String, String))

            Dim lstUltimoCobro As String()
            If Directory.Exists(UbicacionCobro) Then
                lstUltimoCobro = Directory.GetFiles(UbicacionCobro)

                For r = 0 To lstUltimoCobro.Length - 1
                    Dim oFileCobro As Dictionary(Of String, String) = New Dictionary(Of String, String)
                    With oFileCobro
                        .Add("Nombre", Path.GetFileNameWithoutExtension(lstUltimoCobro.ElementAt(r)))
                        .Add("NombreCompleto", Path.GetFileName(lstUltimoCobro.ElementAt(r)))
                        .Add("Extension", Path.GetExtension(lstUltimoCobro.ElementAt(r)).Replace(".", ""))
                        .Add("Ubicacion", lstUltimoCobro.ElementAt(r))
                        .Add("FechaCreacion", File.GetCreationTime(lstUltimoCobro.ElementAt(r)))
                        .Add("FechaANSI", File.GetCreationTime(lstUltimoCobro.ElementAt(r)).ToString("yyyyMMddhhmmss"))
                        .Add("Tamano", Convert.ToInt32(Math.Round(File.ReadAllBytes(lstUltimoCobro.ElementAt(r)).Length / e_kb, 0)).ToString() + " kb")
                    End With
                    lstArchivoUltimoCobro.Add(oFileCobro)

                Next

                lstArchivoUltimoCobro = (From o In lstArchivoUltimoCobro Select o Order By o("FechaANSI") Descending Take 1).ToList()
            Else

            End If
            lstResult.Add(lstArchivoUltimoCobro)

            Dim lstArchivosCobros As String()
            If Directory.Exists(UbicacionBackup) Then
                lstArchivosCobros = Directory.GetFiles(UbicacionBackup)

                For index = 0 To lstArchivosCobros.Length - 1
                    Dim oFileCobroHistorico As Dictionary(Of String, String) = New Dictionary(Of String, String)
                    With oFileCobroHistorico
                        .Add("Nombre", Path.GetFileNameWithoutExtension(lstArchivosCobros.ElementAt(index)))
                        .Add("NombreCompleto", Path.GetFileName(lstArchivosCobros.ElementAt(index)))
                        .Add("Extension", Path.GetExtension(lstArchivosCobros.ElementAt(index)).Replace(".", ""))
                        .Add("Ubicacion", lstArchivosCobros.ElementAt(index))
                        .Add("FechaCreacion", File.GetCreationTime(lstArchivosCobros.ElementAt(index)))
                        .Add("FechaANSI", File.GetCreationTime(lstArchivosCobros.ElementAt(index)).ToString("yyyyMMddhhmmss"))
                        .Add("Tamano", Convert.ToInt32(Math.Round(File.ReadAllBytes(lstArchivosCobros.ElementAt(index)).Length / e_kb, 0)).ToString() + " kb")
                    End With
                    lstArchivosHistoricoCobros.Add(oFileCobroHistorico)
                Next
                lstArchivosHistoricoCobros = (From e In lstArchivosHistoricoCobros Select e Order By e("FechaANSI") Descending Take 10).ToList()
            Else

            End If
            lstResult.Add(lstArchivosHistoricoCobros)

            Return lstResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarRutaImportacion(ByVal RutaImportacion As String) As String
        Dim result As String = String.Empty
        Try
            If Directory.Exists(RutaImportacion) Then
                Dim lstArchivosPagos As String() = Directory.GetFiles(RutaImportacion)

                If (lstArchivosPagos.Count > 0) Then
                    result = "0|Ya existe un archivo de pagos sin procesar en la ruta de importación"
                Else
                    result = "1|"
                End If
            Else
                result = "0|No existe ruta de importación"
            End If
            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CargarArchivoPagos(ByVal RutaTemporal As String, ByVal NombreArchivoPagos As String, ByVal RutaImportacion As String, ByVal Sobrescribir As Boolean) As String
        Dim result As String = String.Empty
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim FacCola As BL_MOV_FAC_Cola = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            FacCola = New BL_MOV_FAC_Cola(oUsuario.IdCliente)

            File.Copy(HttpContext.Current.Server.MapPath("~" + Path.DirectorySeparatorChar + RutaTemporal), RutaImportacion + Path.DirectorySeparatorChar + NombreArchivoPagos, Sobrescribir)

            Dim cola As ENT_MOV_FAC_Cola = New ENT_MOV_FAC_Cola()
            cola.InTipoConfiguracion = 4
            cola.IdCliente = 0
            FacCola.Insertar_Cola(cola)

            result = "1|Se ha cargado el archivo correctamente, su proceso empezará en breve, puede visualizar este proceso desde le módulo de ""Visor de Tareas"""

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(FacCola) Then FacCola.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarArchivosPagos(ByVal ubicacion As String) As List(Of List(Of Dictionary(Of String, String)))
        Try
            Dim e_kb As Integer = 1024
            Dim lstResult As List(Of List(Of Dictionary(Of String, String))) = New List(Of List(Of Dictionary(Of String, String)))
            Dim lstPago As List(Of Dictionary(Of String, String)) = New List(Of Dictionary(Of String, String))

            'archivos de pagos
            Dim lstArchivoPago As String()
            If Directory.Exists(ubicacion) Then
                lstArchivoPago = Directory.GetFiles(ubicacion)

                For r = 0 To lstArchivoPago.Length - 1
                    Dim oFile As Dictionary(Of String, String) = New Dictionary(Of String, String)
                    With oFile
                        .Add("Nombre", Path.GetFileNameWithoutExtension(lstArchivoPago.ElementAt(r)))
                        .Add("NombreCompleto", Path.GetFileName(lstArchivoPago.ElementAt(r)))
                        .Add("Extension", Path.GetExtension(lstArchivoPago.ElementAt(r)).Replace(".", ""))
                        .Add("Ubicacion", lstArchivoPago.ElementAt(r))
                        .Add("FechaCreacion", File.GetCreationTime(lstArchivoPago.ElementAt(r)))
                        .Add("FechaANSI", File.GetCreationTime(lstArchivoPago.ElementAt(r)).ToString("yyyyMMddhhmmss"))
                        .Add("Tamano", Convert.ToInt32(Math.Round(File.ReadAllBytes(lstArchivoPago.ElementAt(r)).Length / e_kb, 0)).ToString() + " kb")
                    End With
                    lstPago.Add(oFile)
                Next
                lstPago = (From p In lstPago Select p Order By p("FechaANSI") Descending Take 1).ToList()

            Else

            End If
            lstResult.Add(lstPago)

            'histórico pagos
            Dim lstDirectoriesYears As String()
            Dim lstDirectoriesMonths As String()
            Dim lstPagosHistoricos As String()
            Dim lstHistoricoPagos As List(Of Dictionary(Of String, String)) = New List(Of Dictionary(Of String, String))
            If Directory.Exists(ubicacion + Path.DirectorySeparatorChar + "Historico") Then
                lstDirectoriesYears = Directory.GetDirectories(ubicacion + Path.DirectorySeparatorChar + "Historico")

                Dim sYear As String = String.Empty, sMonth As String = String.Empty


                For i = 0 To lstDirectoriesYears.Length - 1
                    lstDirectoriesMonths = Directory.GetDirectories(lstDirectoriesYears.ElementAt(i))
                    sYear = lstDirectoriesYears.ElementAt(i).Replace(ubicacion + Path.DirectorySeparatorChar + "Historico" + Path.DirectorySeparatorChar, "")
                    For j = 0 To lstDirectoriesMonths.Length - 1
                        lstPagosHistoricos = Directory.GetFiles(lstDirectoriesMonths.ElementAt(j))
                        sMonth = lstDirectoriesMonths.ElementAt(j).Replace(lstDirectoriesYears.ElementAt(i) + Path.DirectorySeparatorChar, "")
                        For k = 0 To lstPagosHistoricos.Length - 1
                            Dim oFileHistorico As Dictionary(Of String, String) = New Dictionary(Of String, String)
                            With oFileHistorico
                                .Add("Year", sYear)
                                .Add("Month", sMonth)
                                .Add("Nombre", Path.GetFileNameWithoutExtension(lstPagosHistoricos.ElementAt(k)))
                                .Add("NombreCompleto", Path.GetFileName(lstPagosHistoricos.ElementAt(k)))
                                .Add("Extension", Path.GetExtension(lstPagosHistoricos.ElementAt(k)).Replace(".", ""))
                                .Add("Ubicacion", lstPagosHistoricos.ElementAt(k))
                                .Add("FechaCreacion", File.GetCreationTime(lstPagosHistoricos.ElementAt(k)))
                                .Add("FechaANSI", File.GetCreationTime(lstPagosHistoricos.ElementAt(k)).ToString("yyyyMMddhhmmss"))
                                .Add("Tamano", Convert.ToInt32(Math.Round(File.ReadAllBytes(lstPagosHistoricos.ElementAt(k)).Length / e_kb, 0)).ToString() + " kb")
                            End With
                            lstHistoricoPagos.Add(oFileHistorico)
                        Next
                    Next
                Next
                lstHistoricoPagos = (From h In lstHistoricoPagos Select h Order By h("FechaANSI") Descending Take 10).ToList()
            Else

            End If
            lstResult.Add(lstHistoricoPagos)

            Return lstResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function InsertarColaExportacionCobros() As Integer
        Dim FacCola As BL_MOV_FAC_Cola = Nothing
        Dim FacServicio As BL_MOV_FAC_Servicio = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim IdCola As Integer
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            FacCola = New BL_MOV_FAC_Cola(oUsuario.IdCliente)
            FacServicio = New BL_MOV_FAC_Servicio(1, oUsuario.IdCliente)

            FacServicio.GenerarCuentaCobro_Exportar("") '"D": Detallado

            Dim cola As ENT_MOV_FAC_Cola = New ENT_MOV_FAC_Cola()
            cola.InTipoConfiguracion = 3
            IdCola = FacCola.Insertar_Cola_Manual(cola)

            Return IdCola
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(FacCola) Then FacCola.Dispose()
            If Not IsNothing(FacServicio) Then FacServicio.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ConsultarEstadoCola(ByVal IdCola As Integer) As ENT_MOV_FAC_Cola
        Dim FacCola As BL_MOV_FAC_Cola = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            FacCola = New BL_MOV_FAC_Cola(oUsuario.IdCliente)

            Dim cola As ENT_MOV_FAC_Cola = New ENT_MOV_FAC_Cola()
            cola = FacCola.VisorCola_PorIdCola(IdCola)

            Return cola
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(FacCola) Then FacCola.Dispose()
        End Try
    End Function
End Class