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


Partial Public Class P_Movil_Administrar_Adm_IngresarFactura

    '''<summary>
    '''Control form1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents form1 As Global.System.Web.UI.HtmlControls.HtmlForm

    '''<summary>
    '''Control hdfCodFact.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodFact As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfMoneda.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfMoneda As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfTipoCambio.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfTipoCambio As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfIGV.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfIGV As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfMonedaLiteral.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfMonedaLiteral As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfMonedaSimbolo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfMonedaSimbolo As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfA.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfA As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control SplitterJQ1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents SplitterJQ1 As Global.VisualSoft.Comun.LibreriaJQ.SplitterJQ

    '''<summary>
    '''Control BarraNavegacionJQ1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents BarraNavegacionJQ1 As Global.VisualSoft.Comun.LibreriaJQ.BarraNavegacionJQ

    '''<summary>
    '''Control pbnAcciones.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents pbnAcciones As Global.VisualSoft.Comun.LibreriaJQ.PanelBarraNavegacion

    '''<summary>
    '''Control ibnAgregar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnAgregar As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control ibnEditar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnEditar As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control ibnEliminar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnEliminar As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control ibnSalir.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnSalir As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control ibnOperacionesFrecuentes.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnOperacionesFrecuentes As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control pbnAvanzada.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents pbnAvanzada As Global.VisualSoft.Comun.LibreriaJQ.PanelBarraNavegacion

    '''<summary>
    '''Control ibnImprimir.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnImprimir As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control ibnVistaPrevia.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnVistaPrevia As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control ibnEnviarCorreo.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ibnEnviarCorreo As Global.VisualSoft.Comun.LibreriaJQ.ItemBarraNavegacion

    '''<summary>
    '''Control dvEdicionFactura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents dvEdicionFactura As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control Div1.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents Div1 As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control lblFactura.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblFactura As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtFechaFacturacion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaFacturacion As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control ddlOperador.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlOperador As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control imgAgregarEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgAgregarEmpleado As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgEliminarEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgEliminarEmpleado As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgImportar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgImportar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgAgregar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgAgregar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgModificar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgModificar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgEliminarItem.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgEliminarItem As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control btnOpcionesFrecuentes.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnOpcionesFrecuentes As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgAgregarFrecuentes.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgAgregarFrecuentes As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control btnGuardar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents btnGuardar As Global.System.Web.UI.HtmlControls.HtmlGenericControl

    '''<summary>
    '''Control imgGuardar.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgGuardar As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control ddlConceptoMovil.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlConceptoMovil As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control lblConceptoMovil.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents lblConceptoMovil As Global.System.Web.UI.WebControls.Label

    '''<summary>
    '''Control txtDescripcion.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtDescripcion As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtMonto.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtMonto As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtCantidad.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtCantidad As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control imgAgregarDialog.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgAgregarDialog As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgCerrarDialog.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgCerrarDialog As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control txtLinea.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtLinea As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control hdfCodLin.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfCodLin As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control hdfNomEmp.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents hdfNomEmp As Global.System.Web.UI.WebControls.HiddenField

    '''<summary>
    '''Control imgAgregarDialogEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgAgregarDialogEmpleado As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control imgCerrarDialogEmpleado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents imgCerrarDialogEmpleado As Global.System.Web.UI.WebControls.Image

    '''<summary>
    '''Control txtCodigoBusqueda.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtCodigoBusqueda As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control ddlOperadorBusqueda.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlOperadorBusqueda As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control txtFechaPeriodoI.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaPeriodoI As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtFechaCreacionI.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaCreacionI As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtEmpleadoBusqueda.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtEmpleadoBusqueda As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control ddlEstado.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents ddlEstado As Global.System.Web.UI.WebControls.DropDownList

    '''<summary>
    '''Control txtFechaPeriodoF.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaPeriodoF As Global.System.Web.UI.WebControls.TextBox

    '''<summary>
    '''Control txtFechaCreacionF.
    '''</summary>
    '''<remarks>
    '''Campo generado automáticamente.
    '''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    '''</remarks>
    Protected WithEvents txtFechaCreacionF As Global.System.Web.UI.WebControls.TextBox
End Class
