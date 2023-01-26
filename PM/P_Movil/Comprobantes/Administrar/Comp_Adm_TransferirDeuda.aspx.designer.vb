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


Partial Public Class Comp_Adm_TransferirDeuda

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control hdfNombre.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfNombre As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfEmpleado As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfTransferirA.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfTransferirA As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control ddlTipoLinea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlTipoLinea As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control rbtPedido.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents rbtPedido As Global.System.Web.UI.WebControls.RadioButton

    '''<summary>
    '''Control rbtLinea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents rbtLinea As Global.System.Web.UI.WebControls.RadioButton

    '''<summary>
    '''Control rbtIMEI.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents rbtIMEI As Global.System.Web.UI.WebControls.RadioButton

    '''<summary>
    '''Control lblNombre.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblNombre As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control txtNombre.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtNombre As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control btnVerPedido.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnVerPedido As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgBuscar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgBuscar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control tabDatos.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents tabDatos As Global.VisualSoft.Comun.LibreriaJQ.TabJQ

    '''<summary>
    '''Control tbGrilla.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents tbGrilla As Global.VisualSoft.Comun.LibreriaJQ.ContenedorTabJQ

    '''<summary>
    '''Control tbInformacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents tbInformacion As Global.VisualSoft.Comun.LibreriaJQ.ContenedorTabJQ

    '''<summary>
    '''Control lblEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblEmpleado As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblCampana.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblCampana As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblCodigoPedido.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblCodigoPedido As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblFechaPedido.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblFechaPedido As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control div_bpEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents div_bpEmpleado As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control bpEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents bpEmpleado As Global.Common_Controles_BusquedaPrincipal

    '''<summary>
    '''Control lblPropietarioActual_Equipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPropietarioActual_Equipo As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblPropietarioNuevo_Equipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPropietarioNuevo_Equipo As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lstCuoProAct_Equipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lstCuoProAct_Equipo As Global.System.Web.UI.WebControls.ListBox

    '''<summary>
    '''Control lstCuoProNue_Equipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lstCuoProNue_Equipo As Global.System.Web.UI.WebControls.ListBox

    '''<summary>
    '''Control chkTransferirEquipo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkTransferirEquipo As Global.System.Web.UI.WebControls.CheckBox

    '''<summary>
    '''Control lblPropietarioActual_Servicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPropietarioActual_Servicio As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lblPropietarioNuevo_Servicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblPropietarioNuevo_Servicio As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control lstCuoProAct_Servicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lstCuoProAct_Servicio As Global.System.Web.UI.WebControls.ListBox

    '''<summary>
    '''Control lstCuoProNue_Servicio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lstCuoProNue_Servicio As Global.System.Web.UI.WebControls.ListBox

    '''<summary>
    '''Control chkTransferirLinea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents chkTransferirLinea As Global.System.Web.UI.WebControls.CheckBox

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

    '''<summary>
    '''Control lblMsjConfirmar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblMsjConfirmar As Global.System.Web.UI.WebControls.Label
End Class
