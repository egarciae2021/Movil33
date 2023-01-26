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


Partial Public Class P_Movil_Administrar_Adm_SolicitudActivacionServicio

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control hdfDispositivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfDispositivo As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfUbicacionImagen.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfUbicacionImagen As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfCodCuenta.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodCuenta As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfSolicitud.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfSolicitud As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfCodLinea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodLinea As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfCodCuenta2.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodCuenta2 As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfAdmin.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfAdmin As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control lblTituloSolicitud.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblTituloSolicitud As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblEmpleadoTitulo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblEmpleadoTitulo As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblEmpleado As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control txtEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtEmpleado As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control hdfCodEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodEmpleado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control lblMensaje.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblMensaje As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblEquipoTitulo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblEquipoTitulo As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control ddlDispositivo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlDispositivo As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control lblNumeroAdjuntos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblNumeroAdjuntos As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control divTabs.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents divTabs As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control tbModelos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents tbModelos As Global.VisualSoft.Comun.LibreriaJQ.TabJQ

    '''<summary>
    '''Control trNuevoServicio0.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trNuevoServicio0 As Global.System.Web.UI.HtmlControls.HtmlTableRow

    '''<summary>
    '''Control Label1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Label1 As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control ddlTipoServicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTipoServicio As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control trNuevoServicio1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trNuevoServicio1 As Global.System.Web.UI.HtmlControls.HtmlTableRow

    '''<summary>
    '''Control lblNuevoServicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblNuevoServicio As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control ddlServicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlServicio As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control trCantidad1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trCantidad1 As Global.System.Web.UI.HtmlControls.HtmlTableRow

    '''<summary>
    '''Control Label2.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Label2 As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control chkIlimitado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkIlimitado As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control trCantidad2.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents trCantidad2 As Global.System.Web.UI.HtmlControls.HtmlTableRow

    '''<summary>
    '''Control Label3.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Label3 As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblValorCatnidad.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblValorCatnidad As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control txtCatnidadSolicitada.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtCatnidadSolicitada As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtMotivoActivacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtMotivoActivacion As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control rbtTemporal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents rbtTemporal As Global.System.Web.UI.WebControls.RadioButton

    '''<summary>
    '''Control rbtPermanente.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents rbtPermanente As Global.System.Web.UI.WebControls.RadioButton

    '''<summary>
    '''Control txtFechaInicial.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaInicial As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtFechaFinal.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaFinal As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control btnSolicitar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnSolicitar As Global.System.Web.UI.HtmlControls.HtmlInputButton
End Class
