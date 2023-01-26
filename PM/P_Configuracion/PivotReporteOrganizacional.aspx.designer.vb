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


Partial Public Class PivotReporteOrganizacional

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control lblNombreReporte.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblNombreReporte As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control ASPxButton1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ASPxButton1 As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control ddlFormatoExportacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlFormatoExportacion As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ASPxButton3.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ASPxButton3 As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control btnNuevo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnNuevo As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control ASPxButton2.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ASPxButton2 As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control btnGuardarComo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnGuardarComo As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control btnAbrir.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnAbrir As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control lblDatos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblDatos As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control btnIrPlan.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnIrPlan As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control ptnIrBolsa.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ptnIrBolsa As Global.DevExpress.Web.ASPxEditors.ASPxButton

    '''<summary>
    '''Control ASPxPivotGrid1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ASPxPivotGrid1 As Global.DevExpress.Web.ASPxPivotGrid.ASPxPivotGrid

    '''<summary>
    '''Control ASPxPivotGridExporter1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ASPxPivotGridExporter1 As Global.DevExpress.Web.ASPxPivotGrid.Export.ASPxPivotGridExporter

    '''<summary>
    '''Control odsOrganizacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents odsOrganizacion As Global.System.Web.UI.WebControls.ObjectDataSource

    '''<summary>
    '''Control hydPeriodo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hydPeriodo As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hydCodEmp.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hydCodEmp As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hydwhere.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hydwhere As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hydCodInt.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hydCodInt As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control ddlRegionDesde.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlRegionDesde As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlRegionHacia.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlRegionHacia As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control lblTituloNombreReporte.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTituloNombreReporte As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control txtplantilla.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtplantilla As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control hdTipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdTipo As Global.System.Web.UI.HtmlControls.HtmlInputHidden

    '''<summary>
    '''Control hdCodReporte.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdCodReporte As Global.System.Web.UI.HtmlControls.HtmlInputHidden
End Class
