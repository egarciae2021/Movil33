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


Partial Public Class Sin_Mnt_Abreviatura

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control hdfCodAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodAbreviatura As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfEstado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfEstado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control tblAccionesAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents tblAccionesAbreviatura As Global.System.Web.UI.HtmlControls.HtmlTable

    '''<summary>
    '''Control btnAgregarAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnAgregarAbreviatura As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgAgregarC.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgAgregarC As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control btnEditarAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnEditarAbreviatura As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgEditarC.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgEditarC As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control btnEliminarAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnEliminarAbreviatura As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgEliminar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgEliminar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control btnExportarCodigo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnExportarCodigo As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control eeListado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents eeListado As Global.ExportarExcelGenerico

    '''<summary>
    '''Control btnCambiarCodigo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnCambiarCodigo As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control ImgCambiar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ImgCambiar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control txtBusquedaAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtBusquedaAbreviatura As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control btnBuscarAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnBuscarAbreviatura As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgBuscarCodigo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgBuscarCodigo As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control trCodigo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trCodigo As Global.System.Web.UI.HtmlControls.HtmlTableRow

    '''<summary>
    '''Control txtCodigo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtCodigo As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtDescripcion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtDescripcion As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtAbreviatura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtAbreviatura As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control trEstado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trEstado As Global.System.Web.UI.HtmlControls.HtmlTableRow

    '''<summary>
    '''Control tdEstado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents tdEstado As Global.System.Web.UI.HtmlControls.HtmlTableCell

    '''<summary>
    '''Control chActivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chActivo As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control imgGuardar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgGuardar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgCerrar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgCerrar As Global.System.Web.UI.WebControls.Image
End Class
