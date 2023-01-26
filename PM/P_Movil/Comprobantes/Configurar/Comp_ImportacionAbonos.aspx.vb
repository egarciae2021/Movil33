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
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.PCSistel.Comprobantes.BE

Public Class Comp_ImportacionAbonos
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

                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    ConfiguracionDetalle = New BL_MOV_FAC_ConfiguracionDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim codigo As Integer = Convert.ToInt32(Request.QueryString("Cod"))
                    Dim dsDetalle = ConfiguracionDetalle.MostrarImportacionAbono(codigo)
                    hdfProceso_Origen.Value = dsDetalle.Tables(0).Rows(0)("IdConfigProceso_Origen").ToString()

                    Configuracion = New BL_MOV_FAC_C_Configuracion(oUsuario.IdCliente)
                    Dim dtConfig As DataTable = Configuracion.ListarxIdConfiguracion(codigo)
                    For Each dr As DataRow In dtConfig.Rows
                        txtCorreo.Text = dr("CorreoNotificacion").ToString()
                    Next

                    Dim ConfiguracionConcepto As BL_MOV_FAC_ConfiguracionConcepto = Nothing
                    ConfiguracionConcepto = New BL_MOV_FAC_ConfiguracionConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim lstConfiguracionConcepto As New List(Of ENT_MOV_FAC_ConfiguracionConcepto)
                    lstConfiguracionConcepto = ConfiguracionConcepto.Listar(-1, "<Seleccionar>")

                    Dim inTipOri As Integer = 1
                    Dim negocio As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(inTipOri, oUsuario.IdCliente)
                    Dim Destino As String = "-1"
                    Dim dt As New DataTable

                    dt = negocio.ObtieneProceso("MOV_FAC_Pago_Temporal", "Destino")
                    negocio.Dispose()
                    If dt.Rows.Count > 0 Then
                        Destino = dt.Rows(0)("IdConfigProceso").ToString()
                    End If
                    hdfProceso_Destino.Value = Destino
                    hdfinTipOri.Value = inTipOri

                    CrearTablas(tblEquipo, dsDetalle.Tables(1), "Eq", lstConfiguracionConcepto)
                    CrearTablas(tblServicio, dsDetalle.Tables(2), "Srv", lstConfiguracionConcepto)
                    CrearTablas(tblNotaCredito, dsDetalle.Tables(3), "Nt", lstConfiguracionConcepto)


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

    Private Sub CrearTablas(ByVal Tabla As HtmlTable, ByVal dtDatos As DataTable, ByVal Tipo As String, ByVal lstConfiguracionConcepto As List(Of ENT_MOV_FAC_ConfiguracionConcepto))

        For i As Integer = 0 To dtDatos.Rows.Count - 1

            If (dtDatos.Rows(i)("Vigente") = True) Then


                'Creando los controles para html fila y celdas

                Dim trExportacion As New HtmlTableRow
                Dim trSeparador As New HtmlTableRow
                Dim trImportacion As New HtmlTableRow
                Dim tdlabelPago As New HtmlTableCell
                Dim tdLabelCargo As New HtmlTableCell
                Dim tdDiasAntes As New HtmlTableCell
                Dim tdLabelDiasUtiles As New HtmlTableCell
                Dim tdTipoConcepto As New HtmlTableCell
                Dim tdDiaCalendario As New HtmlTableCell
                Dim tdDiaConcepto As New HtmlTableCell
                Dim tdAlas As New HtmlTableCell
                Dim tdHoraEjecucion As New HtmlTableCell
                Dim tdHHmm As New HtmlTableCell
                Dim tdVacio As New HtmlTableCell
                Dim tdLabelAbono As New HtmlTableCell
                Dim tdDiasDespues As New HtmlTableCell
                Dim tdLabelDiasGeneracion As New HtmlTableCell
                Dim tdAlas2 As New HtmlTableCell
                Dim tdHoraEjecucion2 As New HtmlTableCell
                Dim tdSeparador As New HtmlTableCell

                'Creando los Controles para utilizar
                Dim lblPago As New Label
                Dim lblCargo As New Label
                Dim lblDiasAntes As New Label
                Dim lblDiasUtiles As New Label
                Dim lblTipoConcepto As New Label
                Dim lblDiaCalendario As New Label
                Dim lbldiaConcepto As New Label
                Dim lblAlas As New Label
                Dim lblHoraEjecucion As New Label
                Dim lblHHmm As New Label
                Dim lblVacio As New Label
                Dim lblAbono As New Label
                Dim ddlDiasDespues As New DropDownList
                Dim lblDiasGeneracion As New Label
                Dim lblAlas2 As New Label
                Dim txtHoraEjecucion2 As New TextBox

                trSeparador.Style("height") = "5px"
                trSeparador.Controls.Add(tdSeparador)
                Tabla.Rows.Add(trSeparador)

                'Agregando Id a la Fila para el mantenimiento

                'Agregado Td
                tdlabelPago.Style("width") = "50px"
                lblPago.Text = "Envío " + (i + 1).ToString() + " :"
                lblPago.Style("font-weight") = "bold"
                tdlabelPago.Controls.Add(lblPago)
                trExportacion.Cells.Add(tdlabelPago)

                'Agregado Td
                tdLabelCargo.Style("width") = "350px"
                tdLabelCargo.Attributes("colspan") = "4"

                lblDiasAntes.Text = dtDatos.Rows(i)("DiasUtilesAntes").ToString() + "  "
                lblDiasAntes.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lblDiasAntes)

                lblDiasUtiles.Text = If(dtDatos.Rows(i)("DiasUtilesAntes").ToString() = "1", "día útil ", "días útiles ") + "antes "
                lblDiasUtiles.Text += If(dtDatos.Rows(i)("IdConfiguracionConcepto").ToString() <> "1", "de ", "del ") + "  "
                lblDiasUtiles.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lblDiasUtiles)

                lblTipoConcepto.Text = dtDatos.Rows(i)("TipoConcepto").ToString() + " "
                lblTipoConcepto.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lblTipoConcepto)

                lblDiaCalendario.Text = If(dtDatos.Rows(i)("EsDiaCalendario") = True, "Calendario ", "Útil ")
                lblDiaCalendario.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lblDiaCalendario)

                lbldiaConcepto.Text = dtDatos.Rows(i)("DiaConcepto").ToString() + " "

                If (dtDatos.Rows(i)("IdConfiguracionConcepto").ToString() <> "1") Then
                    lbldiaConcepto.Style("display") = "none"
                End If
                lbldiaConcepto.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lbldiaConcepto)
             
                lblAlas.Text = " a la(s) "
                lblAlas.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lblAlas)

                lblHoraEjecucion.Text = If(dtDatos.Rows(i)("HoraEjecucion").ToString() = "", "00:00", Convert.ToDateTime(dtDatos.Rows(i)("HoraEjecucion")).ToString("HH:mm"))
                lblHoraEjecucion.Style("font-weight") = "bold"
                tdLabelCargo.Controls.Add(lblHoraEjecucion)


                trExportacion.Cells.Add(tdLabelCargo)

                'Agregado Td
                'tdDiasAntes.Style("width") = "50px"
                'lblDiasAntes.Text = dtDatos.Rows(i)("DiasUtilesAntes").ToString()
                'tdDiasAntes.Controls.Add(lblDiasAntes)
                'trExportacion.Cells.Add(tdDiasAntes)
                '
                ''Agregando Td para Label lblDiasUtiles
                'tdLabelDiasUtiles.Style("width") = "160px"
                'lblDiasUtiles.Text = "días útiles antes del (la)"
                'tdLabelDiasUtiles.Controls.Add(lblDiasUtiles)
                'trExportacion.Cells.Add(tdLabelDiasUtiles)
                '
                ''Agregando Td 
                'tdTipoConcepto.Style("width") = "100px"
                'lblTipoConcepto.Text = dtDatos.Rows(i)("TipoConcepto").ToString()
                'lblTipoConcepto.Style("font-weight") = "bold"
                'lblTipoConcepto.Style("text-decoration") = "underline"
                'tdTipoConcepto.Controls.Add(lblTipoConcepto)
                'trExportacion.Cells.Add(tdTipoConcepto)
                '
                '
                ''Agregando Td 
                'tdDiaCalendario.Style("width") = "100px"
                'lblDiaCalendario.Text = If(dtDatos.Rows(i)("EsDiaCalendario") = True, "Día Calendario", "Día Útil")
                'tdDiaCalendario.Controls.Add(lblDiaCalendario)
                'trExportacion.Cells.Add(tdDiaCalendario)
                '
                ''Agregando Td 
                'tdAlas.Style("width") = "50px"
                'lblAlas.Text = "a la(s)"
                'tdAlas.Controls.Add(lblAlas)
                'trExportacion.Controls.Add(tdAlas)
                '
                ''Agregando Td 
                'tdHoraEjecucion.Style("width") = "130px"
                'lblHoraEjecucion.Text = If(dtDatos.Rows(i)("HoraEjecucion").ToString() = "", "00:00", Convert.ToDateTime(dtDatos.Rows(i)("HoraEjecucion")).ToString("HH:mm"))
                'tdHoraEjecucion.Controls.Add(lblHoraEjecucion)
                'trExportacion.Controls.Add(tdHoraEjecucion)

                Tabla.Rows.Add(trExportacion)
                '*******************Segunda Fila para datos Importación            

                '**************************************************
                trImportacion.ID = dtDatos.Rows(i)("IdConfiguracionDetalle").ToString()
                trImportacion.Attributes("class") = "tblDinamica"

                'Agregado Td
                tdLabelAbono.Style("width") = "100px"
                lblAbono.Text = "Actualización " + (i + 1).ToString() + " :"
                lblAbono.Style("font-weight") = "bold"
                tdLabelAbono.Controls.Add(lblAbono)
                trImportacion.Cells.Add(tdLabelAbono)


                'Agregado Td DiasDespues
                tdDiasDespues.Style("width") = "50px"
                ddlDiasDespues.Style("width") = "50px"
                ddlDiasDespues.ID = "ddlDiasDespues_" + Tipo + i.ToString()
                For j As Integer = 1 To 7
                    ddlDiasDespues.Items.Add(New ListItem(j.ToString(), j.ToString()))
                Next
                ddlDiasDespues.SelectedValue = dtDatos.Rows(i)("DiasDespues")
                tdDiasDespues.Controls.Add(ddlDiasDespues)
                trImportacion.Cells.Add(tdDiasDespues)

                'Agregando Td
                tdLabelDiasGeneracion.Style("width") = "260px"
                lblDiasGeneracion.Text = "Días después de la generación de archivos de cargo"
                tdLabelDiasGeneracion.Controls.Add(lblDiasGeneracion)
                trImportacion.Cells.Add(tdLabelDiasGeneracion)


                'Agregando Td 
                tdAlas2.Style("width") = "50px"
                lblAlas2.Text = "a la(s)"
                tdAlas2.Controls.Add(lblAlas2)
                trImportacion.Controls.Add(tdAlas2)

                'Agregando Td para txtHoraEjecucion y Label HHmm
                tdHoraEjecucion2.Style("width") = "130px"
                txtHoraEjecucion2.Style("width") = "60px"
                txtHoraEjecucion2.ID = "txtHoraEjecucion2_" + Tipo + i.ToString()
                txtHoraEjecucion2.Text = If(dtDatos.Rows(i)("HoraEjecucion2").ToString() = "", "00:00", Convert.ToDateTime(dtDatos.Rows(i)("HoraEjecucion2")).ToString("HH:mm"))
                txtHoraEjecucion2.CssClass = "txtHoraEJ"
                tdHoraEjecucion2.Controls.Add(txtHoraEjecucion2)
                lblHHmm.Text = "(hh:mm)"
                tdHoraEjecucion2.Controls.Add(lblHHmm)

                trImportacion.Controls.Add(tdHoraEjecucion2)








                Tabla.Rows.Add(trImportacion)

                ''tdTipoConcepto.Style("width") = "100px"
                ''ddlTipoConcepto.Style("width") = "100px"
                ''ddlTipoConcepto.ID = "ddlTipoConcepto_" + Tipo + i.ToString()
                ''ddlTipoConcepto.CssClass = "ddlTipoConcepto"
                ''UtilitarioWeb.Dataddl(ddlTipoConcepto, lstConfiguracionConcepto, "Descripcion", "IdConfiguracionConcepto")
                ''ddlTipoConcepto.SelectedValue = If(dtDatos.Rows(i)("IdConfiguracionConcepto").ToString() = "", -1, dtDatos.Rows(i)("IdConfiguracionConcepto"))
                ''
                ''tdTipoConcepto.Controls.Add(ddlTipoConcepto)
                ''trTabla.Cells.Add(tdTipoConcepto)
                ''

                ''tdDiaConcepto.Style("width") = "50px"
                ''ddlDiaConcepto.Style("width") = "50px"
                ''ddlDiaConcepto.ID = "ddlDiaConcepto_" + Tipo + i.ToString()
                ''ddlDiaConcepto.CssClass = "ddlDiaConcepto"
                ''For j As Integer = 1 To 28
                ''    ddlDiaConcepto.Items.Add(New ListItem(j.ToString(), j.ToString()))
                ''Next
                ''ddlDiaConcepto.SelectedValue = dtDatos.Rows(i)("DiaConcepto")
                ''If (dtDatos.Rows(i)("IdConfiguracionConcepto").ToString() <> "1") Then
                ''    ddlDiaConcepto.Style("display") = "none"
                ''End If
                ''tdDiaConcepto.Controls.Add(ddlDiaConcepto)
                ''trTabla.Controls.Add(tdDiaConcepto)
                ''

                ''tdDiaCalendario.Style("width") = "110px"
                ''ddlDiaCalendario.Style("width") = "100px"
                ''ddlDiaCalendario.CssClass = "ddlDiaCalendario"
                ''ddlDiaCalendario.ID = "ddlDiaCalendario_" + Tipo + i.ToString()
                ''ddlDiaCalendario.Items.Add(New ListItem("Seleccione", "-1"))
                ''ddlDiaCalendario.Items.Add(New ListItem("Día Calendario", "1"))
                ''ddlDiaCalendario.Items.Add(New ListItem("Día Útil", "0"))
                ''ddlDiaCalendario.SelectedValue = If(dtDatos.Rows(i)("EsDiaCalendario") = False, 0, 1)
                ''tdDiaCalendario.Controls.Add(ddlDiaCalendario)
                ''trTabla.Controls.Add(tdDiaCalendario)
                ''
                ''
                ''

                ''tdAlas.Style("width") = "50px"
                ''lblAlas.Text = "a la(s)"
                ''tdAlas.Controls.Add(lblAlas)
                ''trTabla.Controls.Add(tdAlas)
                ''

                ''tdHoraEjecucion.Style("width") = "130px"
                ''txtHoraEjecucion.Style("width") = "60px"
                ''txtHoraEjecucion.ID = "txtHoraEjecucion_" + Tipo + i.ToString()
                ''lblHHmm.Text = "(hh:mm)"
                ''
                ''tdHoraEjecucion.Controls.Add(txtHoraEjecucion)
                ''tdHoraEjecucion.Controls.Add(lblHHmm)
                ''txtHoraEjecucion.Text = If(dtDatos.Rows(i)("HoraEjecucion").ToString() = "", "00:00", Convert.ToDateTime(dtDatos.Rows(i)("HoraEjecucion")).ToString("HH:mm"))
                ''txtHoraEjecucion.CssClass = "txtHoraEJ"
                ''trTabla.Controls.Add(tdHoraEjecucion)
                ''

                ''
                ''tblEquipo.Rows.Add(trTabla)
            End If
        Next
    End Sub

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Configuracion(ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Configuracion)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try

            Dim Opcion As Integer = 4
            Dim lista As New List(Of ENT_MOV_FAC_Configuracion)
            lista = logica.ListarConfiguracion(Opcion)
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

    <WebMethod()> _
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
            lista = logica.Listar_PlantillaDetalle(IdConfigProceso, "Origen")
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
    Public Shared Function Insertar_ConfImportacionAbono(ByVal IdFacConfiguracion As Integer, ByVal TipoEjecucion As String, _
                                                         ByVal IdConfigProceso_Origen As Integer, ByVal IdConfigProceso_Destino As Integer, _
                                                         ByVal XML_CfgDetalle As String, CorreoNotificacion As String) As Integer
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim ConfiguracionDetalle As BL_MOV_FAC_ConfiguracionDetalle = Nothing

        Try
            ConfiguracionDetalle = New BL_MOV_FAC_ConfiguracionDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim UsuarioModificacion As String = HttpContext.Current.Session("Usuario").vcUsu.ToString()

            Return ConfiguracionDetalle.ActualizarImportacionAbono(IdFacConfiguracion, IdConfigProceso_Origen, IdConfigProceso_Destino, XML_CfgDetalle, CorreoNotificacion, UsuarioModificacion)


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function


End Class