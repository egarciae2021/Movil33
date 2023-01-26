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


Partial Public Class Common_Page_Adm_CargarArchivo
    
    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm
    
    '''<summary>
    '''Control hdfFormatos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfFormatos As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfFormatoTipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfFormatoTipo As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfNombreArchivoFisico.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfNombreArchivoFisico As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfNombreImagesFisico.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfNombreImagesFisico As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfNombreArchivoCargado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfNombreArchivoCargado As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfNombreImagesCargado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfNombreImagesCargado As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfTipoCarga.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfTipoCarga As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfRutaCarpeta.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfRutaCarpeta As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfAceptavariosArchivos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfAceptavariosArchivos As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfAdjuntarFactura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfAdjuntarFactura As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control hdfPlantillaImportacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfPlantillaImportacion As Global.System.Web.UI.WebControls.HiddenField
    
    '''<summary>
    '''Control fulArchivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents fulArchivo As Global.System.Web.UI.WebControls.FileUpload
    
    '''<summary>
    '''Control imgCargar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgCargar As Global.System.Web.UI.WebControls.Image
    
    '''<summary>
    '''Control trCheckImages.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trCheckImages As Global.System.Web.UI.HtmlControls.HtmlTableRow
    
    '''<summary>
    '''Control trUploadFileImage.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trUploadFileImage As Global.System.Web.UI.HtmlControls.HtmlTableRow
    
    '''<summary>
    '''Control fulImages.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents fulImages As Global.System.Web.UI.WebControls.FileUpload
    
    '''<summary>
    '''Control imgCargarImages.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgCargarImages As Global.System.Web.UI.WebControls.Image
    
    '''<summary>
    '''Control btnCargar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnCargar As Global.System.Web.UI.WebControls.Button
    
    '''<summary>
    '''Control btnCargarImages.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnCargarImages As Global.System.Web.UI.WebControls.Button
End Class
