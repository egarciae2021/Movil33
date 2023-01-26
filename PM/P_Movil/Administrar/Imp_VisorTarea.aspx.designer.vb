'------------------------------------------------------------------------------
' <generado automáticamente>
'     Este código fue generado por una herramienta.
'
'     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
'     se vuelve a generar el código. 
' </generado automáticamente>
'------------------------------------------------------------------------------

Option Strict On
Option Explicit On


Partial Public Class P_Movil_Administrar_Imp_VisorTarea
    
    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm
    
    '''<summary>
    '''Control ddlOperador.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlOperador As Global.System.Web.UI.WebControls.DropDownList
    
    '''<summary>
    '''Control ddlEstado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlEstado As Global.System.Web.UI.WebControls.DropDownList
    
    '''<summary>
    '''Control ddlTarea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTarea As Global.System.Web.UI.WebControls.DropDownList
    
    '''<summary>
    '''Control hdfinCodCol.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfinCodCol As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control lblFechaCreacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblFechaCreacion As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblTituloArchivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTituloArchivo As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblFechaEjecucion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblFechaEjecucion As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lstArchivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lstArchivo As Global.System.Web.UI.WebControls.ListBox
    
    '''<summary>
    '''Control lblFechaFinalizacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblFechaFinalizacion As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblProcesado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblProcesado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblArchivoProcesado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArchivoProcesado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control LblNoValidado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents LblNoValidado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control LblArchivoNoValidado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents LblArchivoNoValidado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblErrado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblErrado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblArchivoErrado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArchivoErrado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control ttgInfoSeleccion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ttgInfoSeleccion As Global.ToolTipGenerico
    
    '''<summary>
    '''Control ttgInfoDescargarImportacionPlantilla.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ttgInfoDescargarImportacionPlantilla As Global.ToolTipGenerico
    
    '''<summary>
    '''Control ttgInfoDescargar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ttgInfoDescargar As Global.ToolTipGenerico
    
    '''<summary>
    '''Control lblDuplicado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblDuplicado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblArchivoDuplicado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArchivoDuplicado As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblLineasNoRegistradas.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblLineasNoRegistradas As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblExcluidos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblExcluidos As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblRestante.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblRestante As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblArchivoRestante.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArchivoRestante As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblTotal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTotal As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblArchivoTotal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArchivoTotal As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblOperador.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblOperador As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblPeriodo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPeriodo As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblObservacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblObservacion As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblArchivoObservacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArchivoObservacion As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control imgDetalle.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgDetalle As Global.System.Web.UI.WebControls.Image
    
    '''<summary>
    '''Control rbProgramacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents rbProgramacion As Global.System.Web.UI.WebControls.RadioButtonList
    
    '''<summary>
    '''Control txtFechaProgramacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaProgramacion As Global.System.Web.UI.WebControls.TextBox
    
    '''<summary>
    '''Control lblTareaOriginal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTareaOriginal As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblProgramacionOriginal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblProgramacionOriginal As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblTipoArchivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTipoArchivo As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblNumeroPlantilla.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblNumeroPlantilla As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblExtensionArchivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblExtensionArchivo As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblTipoTelefonia.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTipoTelefonia As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblUnirBitsEnvRec.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblUnirBitsEnvRec As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblEmpleadoDefecto.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblEmpleadoDefecto As Global.System.Web.UI.WebControls.Label
    
    '''<summary>
    '''Control lblTipoCambio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTipoCambio As Global.System.Web.UI.WebControls.Label
End Class
