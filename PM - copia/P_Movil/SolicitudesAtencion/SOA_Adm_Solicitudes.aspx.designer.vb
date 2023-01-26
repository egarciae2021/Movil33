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


Partial Public Class P_Movil_SolicitudesAtencion_SOA_Adm_Solicitudes

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control hdfAdmin.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfAdmin As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfIdUsuarioLogeado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfIdUsuarioLogeado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfEmpleado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfIdTecnico.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfIdTecnico As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfEsUsuario.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfEsUsuario As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfMostrarMsjPrivado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfMostrarMsjPrivado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control filtroTec.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents filtroTec As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control ddlTecnicos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTecnicos As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlNivel.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlNivel As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlBolsa.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlBolsa As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlEstado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlEstado As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlTipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTipo As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlTipificacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTipificacion As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlTipoFiltro.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTipoFiltro As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control txtCodigoTicket.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtCodigoTicket As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtFechaInicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaInicio As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtFechaFin.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaFin As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control Div1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Div1 As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control eegExcel.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents eegExcel As Global.ExportarExcelGenerico

    '''<summary>
    '''Control Image1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Image1 As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control Image2.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Image2 As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control Image3.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Image3 As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control chkFiltro.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkFiltro As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control txtConclucion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtConclucion As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control ddlBolsasEscalables.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlBolsasEscalables As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control txtDeescripcionEscalamiento.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtDeescripcionEscalamiento As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control ddlOrigen.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlOrigen As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control txtNotaEnviar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtNotaEnviar As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control chkEnviarCorreo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkEnviarCorreo As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control chkMostrarOnlyMsjSupervi.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkMostrarOnlyMsjSupervi As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control chkEnvioSupervisor.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkEnvioSupervisor As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control imgGuardarServicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgGuardarServicio As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgCerrarServicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgCerrarServicio As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control ddlTiposExternos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTiposExternos As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control ddlTipificacionExterna.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTipificacionExterna As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control txtDscExerno.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtDscExerno As Global.System.Web.UI.WebControls.TextBox
End Class
