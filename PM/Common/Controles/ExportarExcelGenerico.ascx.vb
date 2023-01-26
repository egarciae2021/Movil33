﻿Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports Utilitario
Imports System.Data
Imports System.IO
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BL
Imports ClosedXML.Excel

Partial Public Class ExportarExcelGenerico
   Inherits System.Web.UI.UserControl

#Region "Propiedades"

   Private _dtDatos As DataTable
   Public Property Datos As DataTable
      Get
         Return _dtDatos
      End Get
      Set(value As DataTable)
         _dtDatos = value
      End Set
   End Property

   Private _TipoExcel As TipoExcel
   Public Property oTipoExcel As TipoExcel
      Get
         Return _TipoExcel
      End Get
      Set(value As TipoExcel)
         _TipoExcel = value
      End Set
   End Property

   Private _ExcelPredeterminado As Boolean = False
   Public Property ExcelPredeterminado As Boolean
      Get
         Return _ExcelPredeterminado
      End Get
      Set(value As Boolean)
         _ExcelPredeterminado = value
      End Set
   End Property

   Private _OcultarDiseno As Boolean = False
   Public Property OcultarDiseno As Boolean
      Get
         Return _OcultarDiseno
      End Get
      Set(value As Boolean)
         _OcultarDiseno = value
      End Set
   End Property

   Private _Criterio As ENT_MOV_IMP_Criterio
   Public Property Criterio As ENT_MOV_IMP_Criterio
      Get
         Return _Criterio
      End Get
      Set(value As ENT_MOV_IMP_Criterio)
         _Criterio = value
      End Set
   End Property

   Private _Llave As String = ""

#End Region

    Public Event ObtenerDatosAExportar(oTipoExcel As TipoExcel)
    Public Event ObtenerDatosAExportarCriterio(oTipoExcel As TipoExcel, llave As String)
    Public Event ObtenerDatosAExportarReporteExceso(oTipoExcel As TipoExcel)
   Public Enum TipoExcel
      Excel2003oInferior = 0
      Excel2007oSuperior = 1
   End Enum

   Protected Sub Common_Controles_BusquedaPrincipal_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_" & Me.ClientID, script, True)
            Else

                Dim ExportarExcelGenerico As String = Request.QueryString("eeg")
                Dim ExcelPredeterminado As String = Request.QueryString("epre")
                If ExportarExcelGenerico IsNot Nothing AndAlso ExportarExcelGenerico <> "" Then
                    If ExcelPredeterminado Is Nothing Then ExcelPredeterminado = ""
                    If ExcelPredeterminado = "1" Then _ExcelPredeterminado = True
                    If ExportarExcelGenerico = "XLS" Then
                        _TipoExcel = TipoExcel.Excel2003oInferior
                    Else
                        _TipoExcel = TipoExcel.Excel2007oSuperior
                    End If

                    If Request.QueryString("miCri") IsNot Nothing Then
                        _Llave = Request.QueryString("miCri")
                        RaiseEvent ObtenerDatosAExportarCriterio(_TipoExcel, Request.QueryString("miCri"))
                    Else
                        RaiseEvent ObtenerDatosAExportar(_TipoExcel)
                    End If
                End If

                If Not IsPostBack Then
                    ConfigurarInicio()
                    ConfiguraObjetosJavaScript()
                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                UtilitarioWeb.AgregarScriptJqueryUI(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

   End Sub

    Public Sub ExportarDatos(ByRef dtDatos As DataTable, Optional ByVal NombreHoja As String = "", Optional ByVal lstCampo As List(Of ENT_ENT_Campo) = Nothing)
        Try
            If dtDatos Is Nothing Then Exit Sub
            If NombreHoja = "" Then NombreHoja = dtDatos.TableName

            'Actualizar Valor Predeterminado...
            GuardarValorPredterminado()
            If NombreHoja = "Incidencias" Then
                If dtDatos.Columns.Contains("LeidoPorUsuario") Then
                    dtDatos.Columns.Remove("LeidoPorUsuario")
                End If
                If dtDatos.Columns.Contains("opAccion") Then
                    dtDatos.Columns.Remove("opAccion")
                End If
            End If

            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()

            If _TipoExcel = TipoExcel.Excel2003oInferior Then
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo, False, Dominio, Usuario)
            Else
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo, True, Dominio, Usuario)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub GuardarValorPredterminado()
      Dim Usuario As BL_SEG_Usuario = Nothing
      Try
         If _ExcelPredeterminado Then

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)

            Dim strExcelPredefinido As String = ""
            Dim vcTem As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem

            If _TipoExcel = TipoExcel.Excel2003oInferior Then
               strExcelPredefinido = "XLS"
            ElseIf _TipoExcel = TipoExcel.Excel2007oSuperior Then
               strExcelPredefinido = "XLSX"
            Else
               strExcelPredefinido = ""
            End If

            oUsuario.CaracteristicaUsuario.vcTem = vcTem
            Usuario.ActualizarTema(vcTem, oUsuario.P_inCod, strExcelPredefinido)

            HttpContext.Current.Session("Usuario") = oUsuario

         End If

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Usuario IsNot Nothing Then
            Usuario.Dispose()
         End If
      End Try
   End Sub

#Region "CODIGO DE LA WEB FIJA"
    'CODIGO DE LA WEB FIJA
    Public Sub ExportarDatosPersonalizados(dtDatos As DataTable, ByVal NombreHoja As String, ByVal lstCampo As List(Of VisualSoft.PCSistel.Producto.BE.ENT_ENT_Campo))
        If dtDatos Is Nothing Then
            Return
        End If
        If String.IsNullOrEmpty(NombreHoja) Then
            NombreHoja = dtDatos.TableName
        End If

        'Actualizar Valor Predeterminado...
        GuardarValorPredterminado()

        'If _TipoExcel = TipoExcel.Excel2003oInferior Then
        '    PCSistel_UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo)
        'Else
        '    PCSistel_UtilitarioWeb.ExportarExcel.ExportDataTableToExcelXLWorkbook(dtDatos, NombreHoja)
        'End If
    End Sub

    Public Sub ExportarDatos(dtDatos As DataTable, ByVal NombreHoja As String, ByVal lstCampo As List(Of VisualSoft.PCSistel.Producto.BE.ENT_ENT_Campo))
        If dtDatos Is Nothing Then
            Return
        End If
        If String.IsNullOrEmpty(NombreHoja) Then
            NombreHoja = dtDatos.TableName
        End If

        'Actualizar Valor Predeterminado...
        GuardarValorPredterminado()

        If _TipoExcel = TipoExcel.Excel2003oInferior Then
            UtilitarioWeb.ExportarExcel.ExportDataTableToExcel_Fija(dtDatos, NombreHoja, lstCampo)
        Else
            UtilitarioWeb.ExportarExcel.ExportDataTableToExcel_Fija(dtDatos, NombreHoja, lstCampo)
        End If
    End Sub

#End Region





#Region "Genera Scripts Cliente"

    Private Sub ConfigurarInicio()
        Dim script As String
        Dim strExcelPredeterminado As String = CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcExcelPorDefecto
        If (strExcelPredeterminado = "") Then
            strExcelPredeterminado = "XLSX"
        End If
        script = "var _ExcelPredeterminado = '" & strExcelPredeterminado & "';"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyInicio_" & Me.ClientID, script, True)
    End Sub

    Private Sub ConfiguraObjetosJavaScript()

        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$(document).ready(function () {")

        If _OcultarDiseno Then
            sbScript.AppendLine("   $('#" & tbExportarExcelPrincipal.ClientID & "').hide();")
        End If

        sbScript.AppendLine("   $('.btnButton').button();")
        sbScript.AppendLine("   $('input').removeClass('ui-helper-hidden-accessible'); ")
        sbScript.AppendLine("   $('label').removeClass(); ")
        sbScript.AppendLine("   $('label','.exportarexcel').unbind(); ")
        sbScript.AppendLine("   $('input','.exportarexcel').unbind(); ")
        sbScript.AppendLine("   $('span','.exportarexcel').unbind(); ")

        sbScript.Append(ObtieneScript_btnAceptar_Click)
        sbScript.Append(ObtieneScript_btnCancelar_Click)
        sbScript.AppendLine(ObtieneScript_btnExportarExcel_Click())

        If _Criterio Is Nothing Then
            sbScript.AppendLine("   $('#" + btnExportarExcel.ClientID + "').attr('criterio' , '" + _Llave + "'); ")
        Else
            sbScript.AppendLine("   $('#" + btnExportarExcel.ClientID + "').attr('criterio' , '" + _Criterio.vcNomTab.ToString + "|" + _Criterio.inNumCri.ToString + "'); ")
        End If



        sbScript.AppendLine("});")

        sbScript.AppendLine(ObtieneScript_ExportarExcelXLSX)
        sbScript.AppendLine(ObtieneScript_ExportarExcelXLS)
        sbScript.AppendLine(ObtieneScript_function_btnExportarExcel_Click())

        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_ExcelConfiguraObjetosJavaScript_" & Me.ClientID, sbScript.ToString, True)

    End Sub

    Private Function ObtieneScript_btnAceptar_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & btnAceptar.ClientID & "').live('click', function () { ")
        sbScript.AppendLine("   var XLSXSeleccionado = $('#" & optExcelXlsx.ClientID & "').is(':checked')")
        'sbScript.AppendLine("   alert(XLSXSeleccionado);")
        sbScript.AppendLine("   if (XLSXSeleccionado == true){")
        sbScript.AppendLine("       ExportarExcelXLSX_" & Me.ClientID & "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else{")
        sbScript.AppendLine("       ExportarExcelXLS_" & Me.ClientID & "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   $('#" & dvExportarExcelGenerico.ClientID & "').dialog('close');")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_ExportarExcelXLSX() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("function ExportarExcelXLSX_" & Me.ClientID & "(){")
        sbScript.AppendLine("   var blPredeterminado = $('#" & chkExcelPredeterminado.ClientID & "').is(':checked');")
        sbScript.AppendLine("   var Predeterminado=0;")
        sbScript.AppendLine("   if (blPredeterminado==true){_ExcelPredeterminado = 'XLSX';Predeterminado=1;}")
        'sbScript.AppendLine("   alert(window.location.href + '&eeg=XLSX&epre=' +Predeterminado);")
        sbScript.AppendLine("   if (window.location.href.indexOf('Con_Llamada.aspx') >= 0 || window.location.href.indexOf('Con_Sumario.aspx') >= 0 || window.location.href.indexOf('Con_Fac_Consulta.aspx') >= 0){ ")
        sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ")
        sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLSX&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else{")
        sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLSX&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else{")
        sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ")
        sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLSX&epre=' +Predeterminado;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else{")
        sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLSX&epre=' +Predeterminado;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("}")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_ExportarExcelXLS() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("function ExportarExcelXLS_" & Me.ClientID & "(){")
        sbScript.AppendLine("   var blPredeterminado = $('#" & chkExcelPredeterminado.ClientID & "').is(':checked');")
        sbScript.AppendLine("   var Predeterminado=0;")
        sbScript.AppendLine("   if (blPredeterminado==true){ _ExcelPredeterminado = 'XLS';Predeterminado=1;}")
        'sbScript.AppendLine("   alert(window.location.href + '&eeg=XLS&epre=' +Predeterminado);")
        sbScript.AppendLine("   if (window.location.href.indexOf('Con_Llamada.aspx') >= 0 || window.location.href.indexOf('Con_Sumario.aspx') >= 0){ ")
        sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ")
        sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLS&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else{")
        sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLS&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else{")
        sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ")
        sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLS&epre=' +Predeterminado;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else{")
        sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLS&epre=' +Predeterminado;")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("}")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_function_btnExportarExcel_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("function btnExportarExcel_" & Me.ClientID & "(){")
        sbScript.AppendLine("   $('#" & btnExportarExcel.ClientID & "').click();")
        sbScript.AppendLine("}")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_dvExportarExcel_dialog() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("var Titulo = 'Exportar a Excel';")
        sbScript.AppendLine("$('#" & dvExportarExcelGenerico.ClientID & "').dialog({")
        sbScript.AppendLine("   width: 450,")
        sbScript.AppendLine("   height: 210,")
        sbScript.AppendLine("   title: Titulo,")
        sbScript.AppendLine("   modal: true")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_btnCancelar_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & btnCancelar.ClientID & "').live('click', function () {")
        sbScript.AppendLine("   $('#" & dvExportarExcelGenerico.ClientID & "').dialog('close');")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_btnExportarExcel_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & btnExportarExcel.ClientID & "').live('click', function () {")
        sbScript.AppendLine("   $('input[name=" & optExcelXls.UniqueID.Split("$")(0) & "$optExportarExcel][value=optExcelXlsx]').attr('checked', 'checked');")
        sbScript.AppendLine("   $('#" & chkExcelPredeterminado.ClientID & "').attr('checked', false);")

        'Valida si esta el valor por defecto...
        sbScript.AppendLine("   if ( _ExcelPredeterminado == 'XLSX') {")
        sbScript.AppendLine("       ExportarExcelXLSX_" & Me.ClientID & "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else")
        sbScript.AppendLine("   if ( _ExcelPredeterminado == 'XLS') {")
        sbScript.AppendLine("       ExportarExcelXLS_" & Me.ClientID & "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else {")
        sbScript.AppendLine(ObtieneScript_dvExportarExcel_dialog)
        sbScript.AppendLine("   }")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

#End Region

End Class

