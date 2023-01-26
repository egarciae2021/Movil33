Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports System.Collections.Generic
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.IO
Imports System.Web.Script.Services

Public Class Comp_ExportacionRegistrosVentas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim ConfiguracionDetalle As BL_MOV_FAC_ConfiguracionDetalle = Nothing
        Dim Configuracion As BL_MOV_FAC_C_Configuracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                If Not IsPostBack Then

                    ttgInfoCorreo.Mensaje = "Ud. puede ingresar más de un email separados por ';'"

                    ttgInfoTipos.Mensaje = "Texto a mostrar"
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    ConfiguracionDetalle = New BL_MOV_FAC_ConfiguracionDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim inTipOri As Integer = 1
                    Dim Origen As String = "-1"
                    Dim dt As New DataTable
                    Dim logica As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(inTipOri, oUsuario.IdCliente)

                    dt = logica.ObtieneProceso("MOV_FAC_CuentaCobro_Exportar", "Origen")
                    logica.Dispose()
                    If dt.Rows.Count > 0 Then
                        Origen = dt.Rows(0)("IdConfigProceso").ToString()
                    End If
                    hdfProceso_Origen.Value = Origen
                    hdfinTipOri.Value = inTipOri

                    Dim codigo As Integer = Convert.ToInt32(Request.QueryString("Cod"))
                    Dim dsDetalle = ConfiguracionDetalle.MostrarExportacionRegistro(codigo)
                    hdfProceso_Destino.Value = dsDetalle.Tables(0).Rows(0)("IdConfigProceso_Destino").ToString()

                    Configuracion = New BL_MOV_FAC_C_Configuracion(oUsuario.IdCliente)
                    Dim dtConfig As DataTable = Configuracion.ListarxIdConfiguracion(codigo)
                    For Each dr As DataRow In dtConfig.Rows
                        txtCorreo.Text = dr("CorreoNotificacion").ToString()
                    Next

                    Dim ConfiguracionConcepto As BL_MOV_FAC_ConfiguracionConcepto = Nothing
                    ConfiguracionConcepto = New BL_MOV_FAC_ConfiguracionConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim lstConfiguracionConcepto As New List(Of ENT_MOV_FAC_ConfiguracionConcepto)
                    lstConfiguracionConcepto = ConfiguracionConcepto.Listar(-1, "<Seleccionar>")

                    CrearTablas(tblEquipo, dsDetalle.Tables(1), "Eq", lstConfiguracionConcepto)

                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try
    End Sub

    Private Sub CrearTablas(ByVal Tabla As HtmlTable, ByVal dtDatos As DataTable, ByVal Tipo As String, ByRef lstConfiguracionConcepto As List(Of ENT_MOV_FAC_ConfiguracionConcepto))

        For i As Integer = 0 To dtDatos.Rows.Count - 1

            If (dtDatos.Rows(i)("Vigente") = True) Then


                'Creando los controles para html fila y celdas
                Dim trTabla As New HtmlTableRow
                Dim tdLabelCobro As New HtmlTableCell
                Dim tdDiasAntes As New HtmlTableCell
                Dim tdLabelDiasUtiles As New HtmlTableCell
                Dim tdTipoConcepto As New HtmlTableCell
                Dim tdDiaCalendario As New HtmlTableCell
                Dim tdDiaConcepto As New HtmlTableCell
                Dim tdAlas As New HtmlTableCell
                Dim tdHoraEjecucion As New HtmlTableCell
                Dim tdHHmm As New HtmlTableCell

                'Creando los Controles para utilizar
                Dim lblCobro As New Label
                Dim ddlDiasAntes As New DropDownList
                Dim lblDiasUtiles As New Label
                Dim ddlTipoConcepto As New DropDownList
                Dim ddlDiaCalendario As New DropDownList
                Dim ddlDiaConcepto As New DropDownList
                Dim lblAlas As New Label
                Dim txtHoraEjecucion As New TextBox
                Dim lblHHmm As New Label

                'Agregando Id a la Fila para el mantenimiento
                trTabla.ID = dtDatos.Rows(i)("IdConfiguracionDetalle").ToString()

                'Agregado Td label Cobro
                tdLabelCobro.Style("width") = "50px"
                lblCobro.Text = "Envío " + (i + 1).ToString() + " :"
                tdLabelCobro.Style("font-weight") = "bold"
                tdLabelCobro.Controls.Add(lblCobro)
                trTabla.Cells.Add(tdLabelCobro)

                'Agregado Td ddlDiasAntes
                tdDiasAntes.Style("width") = "50px"
                ddlDiasAntes.Style("width") = "50px"
                ddlDiasAntes.ID = "ddlDiasAntes_" + Tipo + i.ToString()
                For j As Integer = 0 To 6
                    ddlDiasAntes.Items.Add(New ListItem(j.ToString(), j.ToString()))
                Next
                ddlDiasAntes.SelectedValue = dtDatos.Rows(i)("DiasUtilesAntes")
                tdDiasAntes.Controls.Add(ddlDiasAntes)
                trTabla.Cells.Add(tdDiasAntes)

                'Agregando Td para Label lblDiasUtiles
                tdLabelDiasUtiles.Style("width") = "150px"
                tdLabelDiasUtiles.Style("width") = "150px"
                tdLabelDiasUtiles.Style("text-align") = "center"
                lblDiasUtiles.Text = "días útiles antes de"
                tdLabelDiasUtiles.Controls.Add(lblDiasUtiles)
                trTabla.Cells.Add(tdLabelDiasUtiles)

                'Agregando Td para ddlTipoConcepto
                tdTipoConcepto.Style("width") = "105px"
                ddlTipoConcepto.Style("width") = "105px"
                ddlTipoConcepto.ID = "ddlTipoConcepto_" + Tipo + i.ToString()
                ddlTipoConcepto.CssClass = "ddlTipoConcepto"
                UtilitarioWeb.Dataddl(ddlTipoConcepto, lstConfiguracionConcepto, "Descripcion", "IdConfiguracionConcepto")
                ddlTipoConcepto.SelectedValue = If(dtDatos.Rows(i)("IdConfiguracionConcepto").ToString() = "", -1, dtDatos.Rows(i)("IdConfiguracionConcepto"))

                tdTipoConcepto.Controls.Add(ddlTipoConcepto)
                trTabla.Cells.Add(tdTipoConcepto)

                'Agregando Td para ddlDiaConcepto
                tdDiaConcepto.Style("width") = "50px"
                ddlDiaConcepto.Style("width") = "50px"
                ddlDiaConcepto.ID = "ddlDiaConcepto_" + Tipo + i.ToString()
                ddlDiaConcepto.CssClass = "ddlDiaConcepto"
                For j As Integer = 1 To 28
                    ddlDiaConcepto.Items.Add(New ListItem(j.ToString(), j.ToString()))
                Next
                ddlDiaConcepto.SelectedValue = dtDatos.Rows(i)("DiaConcepto")
                If (dtDatos.Rows(i)("IdConfiguracionConcepto").ToString() <> "1") Then
                    ddlDiaConcepto.Style("display") = "none"
                End If
                tdDiaConcepto.Controls.Add(ddlDiaConcepto)
                trTabla.Controls.Add(tdDiaConcepto)

                'Agregando Td ddlDiaCalendario
                tdDiaCalendario.Style("width") = "110px"
                ddlDiaCalendario.Style("width") = "100px"
                ddlDiaCalendario.CssClass = "ddlDiaCalendario"
                ddlDiaCalendario.ID = "ddlDiaCalendario_" + Tipo + i.ToString()
                ddlDiaCalendario.Items.Add(New ListItem("<Seleccionar>", "-1"))
                ddlDiaCalendario.Items.Add(New ListItem("Día Calendario", "1"))
                ddlDiaCalendario.Items.Add(New ListItem("Día Útil", "0"))
                ddlDiaCalendario.SelectedValue = If(dtDatos.Rows(i)("EsDiaCalendario") = False, 0, 1)
                tdDiaCalendario.Controls.Add(ddlDiaCalendario)
                trTabla.Controls.Add(tdDiaCalendario)



                'Agregando Td para lblAlas
                tdAlas.Style("width") = "50px"
                lblAlas.Text = "a la(s)"
                tdAlas.Controls.Add(lblAlas)
                trTabla.Controls.Add(tdAlas)

                'Agregando Td para txtHoraEjecucion y Label HHmm
                tdHoraEjecucion.Style("width") = "130px"
                txtHoraEjecucion.Style("width") = "60px"
                txtHoraEjecucion.ID = "txtHoraEjecucion_" + Tipo + i.ToString()
                txtHoraEjecucion.Text = If(dtDatos.Rows(i)("HoraEjecucion").ToString() = "", "00:00", Convert.ToDateTime(dtDatos.Rows(i)("HoraEjecucion")).ToString("HH:mm"))
                txtHoraEjecucion.CssClass = "txtHoraEJ"
                tdHoraEjecucion.Controls.Add(txtHoraEjecucion)
                lblHHmm.Text = "(hh:mm)"
                tdHoraEjecucion.Controls.Add(lblHHmm)
                trTabla.Controls.Add(tdHoraEjecucion)

                Tabla.Rows.Add(trTabla)

                'tblEquipo.Rows.Add(trTabla)
            End If
        Next
    End Sub

    <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Configuracion(ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Configuracion)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try

            Dim Opcion As Integer = 3 '3 = Exportacion de Cobros
            Dim lista As New List(Of ENT_MOV_FAC_Configuracion)
            lista = logica.ListarConfiguracion(Opcion)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Configuracion_Origen(ByVal IdConfigProceso As String, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Config_Proceso)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try

            Dim lista As New List(Of ENT_PCS_IMP_Config_Proceso)


            If (IdConfigProceso = "" Or IdConfigProceso = "0") Then
                Return lista
            Else
                lista = logica.ListarConfiguracionImportExport(IdConfigProceso)
                logica.Dispose()
                Return lista
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try

    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Ubicacion_ddl(ByVal IdTipoFuente As String, ByVal Tipo As String, ByVal inTipOri As String) As List(Of ENT_UbicacionImportacion)

        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_ImportacionConfiguracion = New BL_MOV_FAC_ImportacionConfiguracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try
            Dim lista As New List(Of ENT_UbicacionImportacion)
            lista = logica.getListar_Ubicacion_ddl(IdTipoFuente, Tipo)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_DetalleUbicacion(ByVal IdConfigProceso As String, ByVal medio As String, ByVal inTipOri As String) As List(Of ENT_UbicacionImportacion)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_ImportacionConfiguracion = New BL_MOV_FAC_ImportacionConfiguracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try

            Dim lista As New List(Of ENT_UbicacionImportacion)
            lista = logica.getListar_DetalleUbicacion(IdConfigProceso, medio)
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
  <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Plantilla_ddl(ByVal IdConfigProceso As String, ByVal Tipo As String, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Plantilla)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_PCS_IMP_Plantilla = New BL_PCS_IMP_Plantilla(Integer.Parse(inTipOri), oUsuario.IdCliente)

        Try
            Dim lista As New List(Of ENT_PCS_IMP_Plantilla)
            lista = logica.Listar_Plantilla_ddl2(IdConfigProceso, Tipo)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar_PlantillaDetalle(ByVal IdConfigProceso As Integer, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Plantilla)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_PCS_IMP_Plantilla = New BL_PCS_IMP_Plantilla(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try
            Dim lista As New List(Of ENT_PCS_IMP_Plantilla)
            lista = logica.Listar_PlantillaDetalle(IdConfigProceso, "Destino")
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Insertar_ConfRegistroVentas(ByVal IdFacConfiguracion As Integer, ByVal TipoEjecucion As String, ByVal IdConfigProceso_Origen As Integer, ByVal IdConfigProceso_Destino As Integer, ByVal XML_CfgDetalle As String, CorreoNotificacion As String) As Integer
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim ConfiguracionDetalle As BL_MOV_FAC_ConfiguracionDetalle = Nothing

        Try
            ConfiguracionDetalle = New BL_MOV_FAC_ConfiguracionDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'ConfiguracionDetalle.Actualizar(IdFacConfiguracion, IdConfigProceso_Origen, IdConfigProceso_Destino, XML_CfgDetalle)

            Dim UsuarioModificacion As String = HttpContext.Current.Session("Usuario").vcUsu.ToString()

            Return ConfiguracionDetalle.ActualizarExportacionRegistroVenta(IdFacConfiguracion, IdConfigProceso_Origen, IdConfigProceso_Destino, XML_CfgDetalle, CorreoNotificacion, UsuarioModificacion)


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

End Class