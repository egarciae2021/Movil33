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


Partial Public Class P_Movil_Facturacion_Consultar_Con_Fac_EstadoCuenta

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control hdfTipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfTipo As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfAdmin.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfAdmin As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfEmpleado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfIdUsuarioLogeado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfIdUsuarioLogeado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfRuta.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfRuta As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfFecEC.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfFecEC As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfinTipOri.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfinTipOri As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfTecnicoResponsable.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfTecnicoResponsable As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfOrganizacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfOrganizacion As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfFecServidor.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfFecServidor As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control dvContenedorTecRes.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents dvContenedorTecRes As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control bpTecnicoResponsable.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents bpTecnicoResponsable As Global.Common_Controles_BusquedaPrincipal

    '''<summary>
    '''Control TextBox1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents TextBox1 As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtPeriodo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtPeriodo As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control lblCodigoEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblCodigoEmpleado As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblNombreEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblNombreEmpleado As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblArea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblArea As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblCCosto.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblCCosto As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblMoneda.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblMoneda As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblFechaPago.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblFechaPago As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblPeriodo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPeriodo As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control eegSolicitudes.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents eegSolicitudes As Global.ExportarExcelGenerico

    '''<summary>
    '''Control Image2.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Image2 As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control lblDemonMoneda.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblDemonMoneda As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblECAnt.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblECAnt As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblPagos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPagos As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblConsumos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblConsumos As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblCuotasFinan.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblCuotasFinan As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblMontoTotal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblMontoTotal As Global.System.Web.UI.WebControls.Label
End Class
