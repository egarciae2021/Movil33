Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports Utilitario
Imports System.Data
Imports System.IO
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BL

Partial Class Common_Controles_BusquedaPrincipal
    Inherits System.Web.UI.UserControl

    Shared flagBorrarString As Boolean = True


#Region "Propiedades"


    ''''<summary>
    ''''Control txtValorBusqueda.
    ''''</summary>
    ''''<remarks>
    ''''Campo generado automáticamente.
    ''''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    ''''</remarks>
    'Public WithEvents txtValorBusqueda As Global.System.Web.UI.WebControls.TextBox

    Private _ancho As Integer = 0
    Private _TipoOrigen As Integer = 0
    Private _nombreentidad As String = ""
    Private _vcTab As String = ""
    Private _Codigo As String = ""
    Private _Descripcion As String = ""
    Private _CodigoValor As String = ""
    Private _CodigoInterno As String = ""
    Private _Condicion As String = ""
    Private _VariableCondicionJQ As String = ""
    Private _FuncionPersonalizada As String = ""
    Private _TipoLinea As String = ""
    Private _ListaCamposEntidad As List(Of CamposEntidad) = New List(Of CamposEntidad)

    Private _SolicitudTerminada As Integer = 0
    Private _IdCampoEntidad As String = ""
    Private _IdCampoAlias As String = ""
    Private _NomCampoDescripcion As String = ""
    Private _IdDescripcion As String = ""
    Private _IdCamPK As String = ""

    Public Property IdCampoAlias As String
        Get
            Return _IdCampoAlias
        End Get
        Set(value As String)
            _IdCampoAlias = value
        End Set
    End Property

    Public Property NomCampoDescripcion As String
        Get
            Return _NomCampoDescripcion
        End Get
        Set(value As String)
            _NomCampoDescripcion = value
        End Set
    End Property
    Public Property IdDescripcion As String
        Get
            Return _IdDescripcion
        End Get
        Set(value As String)
            _IdDescripcion = value
        End Set
    End Property

    Public Property IdCamPK As String
        Get
            Return _IdCamPK
        End Get
        Set(value As String)
            _IdCamPK = value
        End Set
    End Property

    Public Property SolicitudTerminada As Integer
        Get
            Return _SolicitudTerminada
        End Get
        Set(value As Integer)
            _SolicitudTerminada = value
        End Set
    End Property
    Public Property ListaCamposEntidad As List(Of CamposEntidad)
        Get
            Return _ListaCamposEntidad
        End Get
        Set(ByVal value As List(Of CamposEntidad))
            _ListaCamposEntidad = value
        End Set
    End Property

    Public Property IdCampoEntidad As String
        Get
            Return _IdCampoEntidad
        End Get
        Set(value As String)
            _IdCampoEntidad = value
        End Set
    End Property

    Public Property Ancho As Integer
        Get
            Return _ancho
        End Get
        Set(value As Integer)
            _ancho = value
        End Set
    End Property
    Public Property NombreEntidad As String
        Get
            Return _nombreentidad
        End Get
        Set(value As String)
            _nombreentidad = value
        End Set
    End Property
    Public Property TipoOrigen As Integer
        Get
            Return _TipoOrigen
        End Get
        Set(value As Integer)
            _TipoOrigen = value
        End Set
    End Property
    Public Property vcTab As String
        Get
            Return _vcTab
        End Get
        Set(value As String)
            _vcTab = value
        End Set
    End Property
    Public Property CodigoInterno As String
        Get
            Return _CodigoInterno
        End Get
        Set(value As String)
            _CodigoInterno = value
        End Set
    End Property
    Public Property Codigo As String
        Get
            Return _Codigo
        End Get
        Set(value As String)
            _Codigo = value
        End Set
    End Property
    Public Property Descripcion As String
        Get
            Return _Descripcion
        End Get
        Set(value As String)
            _Descripcion = value
        End Set
    End Property
    Public Property CodigoValor As String
        Get
            Return _CodigoValor
        End Get
        Set(value As String)
            _CodigoValor = value
        End Set
    End Property
    Public Property Condicion As String
        Get
            Return _Condicion
        End Get
        Set(value As String)
            _Condicion = value
        End Set
    End Property
    Public Property VariableCondicionJQ As String
        Get
            Return _VariableCondicionJQ
        End Get
        Set(value As String)
            _VariableCondicionJQ = value
        End Set
    End Property
    Public Property FuncionPersonalizada As String
        Get
            Return _FuncionPersonalizada
        End Get
        Set(value As String)
            _FuncionPersonalizada = value
        End Set
    End Property
    Public Property TipoLinea As String
        Get
            Return _TipoLinea
        End Get
        Set(value As String)
            _TipoLinea = value
        End Set
    End Property

    Private _RutaRaiz As String
    Public Property RutaRaiz As String
        Get
            Return _RutaRaiz
        End Get
        Set(value As String)
            _RutaRaiz = value
        End Set
    End Property
    Private _AltoDialog As Integer
    Public Property AltoDialog As Integer
        Get
            Return _AltoDialog
        End Get
        Set(value As Integer)
            _AltoDialog = value
        End Set
    End Property

    Private _Contenedor As String = ""
    Public Property Contenedor As String
        Get
            Return _Contenedor
        End Get
        Set(value As String)
            _Contenedor = value
        End Set
    End Property

    Private _EsDinamico As Boolean = False
    Public Property EsDinamico As Boolean
        Get
            Return _EsDinamico
        End Get
        Set(value As Boolean)
            _EsDinamico = value
        End Set
    End Property

    Private _Deshabilitado As Boolean = False
    Public Property Deshabilitado As Boolean
        Get
            Return _Deshabilitado
        End Get
        Set(value As Boolean)
            _Deshabilitado = value
        End Set
    End Property

    Private _MuestraMensajeNoDatos As Boolean = True
    Public Property MuestraMensajeNoDatos As Boolean
        Get
            Return _MuestraMensajeNoDatos
        End Get
        Set(value As Boolean)
            _MuestraMensajeNoDatos = value
        End Set
    End Property

    Private _Selector As String = ""
    Public Property Selector As String
        Get
            Return _Selector
        End Get
        Set(value As String)
            _Selector = value
        End Set
    End Property

    Private _MostrarModalEnLoad As Boolean = False
    Public Property MostrarModalEnLoad As Boolean
        Get
            Return _MostrarModalEnLoad
        End Get
        Set(value As Boolean)
            _MostrarModalEnLoad = value
        End Set
    End Property

    Private _ListaCamposOcultos As New List(Of String)
    Public Property ListaCamposOcultos As List(Of String)
        Get
            Return _ListaCamposOcultos
        End Get
        Set(value As List(Of String))
            _ListaCamposOcultos = value
        End Set
    End Property

    Private _TraerDatosFila As Boolean = False
    Public Property TraerDatosFila As Boolean
        Get
            Return _TraerDatosFila
        End Get
        Set(value As Boolean)
            _TraerDatosFila = value
        End Set
    End Property

    Private _PermiteAdicionar As Boolean = False
    Public Property PermiteAdicionar As Boolean
        Get
            Return _PermiteAdicionar
        End Get
        Set(value As Boolean)
            _PermiteAdicionar = value
        End Set
    End Property

#End Region

    Protected Sub Common_Controles_BusquedaPrincipal_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Campo As BL_ENT_Campo = Nothing
        Dim Entidad As BL_ENT_Entidad = Nothing
        Try
            If Not IsPostBack Then
                If _vcTab Is Nothing OrElse _vcTab = "" Then
                    Return
                End If
                'If txtValorBusqueda Is Nothing Then txtValorBusqueda = New TextBox
                'If hfNombreEntidad Is Nothing Then hfNombreEntidad = New HtmlInputHidden
                'If ddlBusqueda Is Nothing Then ddlBusqueda = New DropDownList
                'If txtValor Is Nothing Then txtValor = New TextBox
                'If btnAceptar Is Nothing Then btnAceptar = New HtmlInputButton
                'If grid Is Nothing Then grid = New HtmlTable
                'If dvDetalleBusqueda Is Nothing Then dvDetalleBusqueda = New HtmlGenericControl
                'If btnCancelar Is Nothing Then btnCancelar = New HtmlInputButton
                'If btnBuscar Is Nothing Then btnBuscar = New HtmlGenericControl
                'If pager Is Nothing Then pager = New HtmlGenericControl

                Dim tipoCreacion As Integer = 1
                If _EsDinamico Then tipoCreacion = 2
                If _ancho = 0 Then _ancho = 300
                If _AltoDialog = 0 Then _AltoDialog = 440
                'txtValorBusqueda.Width = New Unit(_ancho)

                'hfNombreEntidad.Value = _nombreentidad

                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Campo = New BL_ENT_Campo(_TipoOrigen, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Entidad = New BL_ENT_Entidad(_TipoOrigen, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstCampo As List(Of ENT_ENT_Campo)
                Dim oEntidad As ENT_ENT_Entidad = Entidad.Mostrar(_vcTab, oUsuario.P_inCod)
                Entidad.Dispose()

                lstCampo = Campo.Listar(_vcTab, oUsuario, tipoCreacion)
                Campo.Dispose()

                ConfigurarGrid(lstCampo, oEntidad)
                'ConfigurarBusqueda(lstCampo, oEntidad)

                If _CodigoInterno <> "" AndAlso _Descripcion <> "" Then
                    'ConfiguraObjetosHtml(lstCampo, _ancho)
                    ConfiguraObjetosJavaScript(lstCampo)
                End If


            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            UtilitarioWeb.AgregarScriptJqueryUI(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            'Dim sbScript As New StringBuilder
            'sbScript.AppendLine("var ")
            'Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "busquedaprincipal", sbScript.ToString, True)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If Entidad IsNot Nothing Then Entidad.Dispose()
        End Try

    End Sub

    'Private Sub ConfiguraObjetosHtml(ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal ancho As Integer)
    '    Dim rutaImagen As String = String.Empty
    '    rutaImagen = _RutaRaiz & "Common/Images/Mantenimiento/busqueda_generico.png"
    '
    '    Dim sbScript As New StringBuilder
    '    sbScript.AppendLine("<table id='" & Me.ClientID & "_tbControles' border='0' cellpadding='0' cellspacing='0'>")
    '    sbScript.AppendLine("   <tr>")
    '    sbScript.AppendLine("       <td>")
    '    sbScript.AppendLine("           <input id='" & Me.ClientID & "_txtValorBusqueda' type='text' width='" & ancho & "px' />")
    '    sbScript.AppendLine("       </td>")
    '    sbScript.AppendLine("        <td style='width: 2px;'></td>")
    '    sbScript.AppendLine("        <td>")
    '    sbScript.AppendLine("            <div title='Buscar (Enter)' id ='" & Me.ClientID & "_btnBuscar' style='cursor: hand; cursor: pointer;' >")
    '    sbScript.AppendLine("                <img id = '" & Me.ClientID & "_imgBusqueda' width='22px' alt='Buscar (Enter)' src='" & rutaImagen & "' /> ")
    '    sbScript.AppendLine("            </div>")
    '    sbScript.AppendLine("        </td>")
    '    sbScript.AppendLine("    </tr>")
    '    sbScript.AppendLine("</table>")
    '
    '    sbScript.AppendLine("<div id='" & Me.ClientID & "_dvDetalleBusqueda' style='display: none;'>")
    '    sbScript.AppendLine("    <table>")
    '    sbScript.AppendLine("        <tr>")
    '    sbScript.AppendLine("            <td colspan='2'>")
    '    sbScript.AppendLine("                <span style='font-size:11px;'>Seleccione el registro que desee y haga clic en Aceptar</span>")
    '    sbScript.AppendLine("            </td>")
    '    sbScript.AppendLine("        </tr>")
    '    sbScript.AppendLine("        <tr>")
    '    sbScript.AppendLine("            <td colspan='2'>")
    '    sbScript.AppendLine("                <table border='0'>")
    '    sbScript.AppendLine("                    <tr>")
    '    sbScript.AppendLine("                        <td align='left' >")
    '    sbScript.AppendLine("                            <select id='" & Me.ClientID & "_ddlBusqueda' class='ddlBusqueda' style='font-weight:normal;display:none;' width='150px'>")
    '    For Each v_oCampo As ENT_ENT_Campo In lstCampo
    '        If v_oCampo.btFil And v_oCampo.btVig Then
    '            sbScript.AppendLine("                       <option value='" & v_oCampo.vcNomAlias & "'>" & v_oCampo.vcDes & "</option>")
    '        End If
    '    Next
    '    sbScript.AppendLine("                            </select>")
    '    sbScript.AppendLine("                            Buscar:&nbsp;")
    '    sbScript.AppendLine("                        </td>")
    '    sbScript.AppendLine("                        <td style='width:220px'>")
    '    sbScript.AppendLine("                           <input id='" & Me.ClientID & "_txtValor' width='445px' class='txtValor' type='text' style='margin-left:5px; font-weight:normal;' />")
    '    sbScript.AppendLine("                        </td>")
    '    sbScript.AppendLine("                    </tr>")
    '    sbScript.AppendLine("                </table>")
    '    sbScript.AppendLine("            </td>")
    '    sbScript.AppendLine("        </tr>")
    '    sbScript.AppendLine("        <tr>")
    '    sbScript.AppendLine("            <td colspan='2'>")
    '    sbScript.AppendLine("                <table id='" & Me.ClientID & "_grid' ></table>")
    '    sbScript.AppendLine("                <div id='" & Me.ClientID & "_pager' ></div>")
    '    sbScript.AppendLine("            </td>")
    '    sbScript.AppendLine("        </tr>")
    '    sbScript.AppendLine("        <tr>")
    '    sbScript.AppendLine("            <td colspan='2' align='right'>")
    '    sbScript.AppendLine("                <input id='" & Me.ClientID & "_btnAceptar' class='btnButton' type='button' value='Aceptar' />")
    '    sbScript.AppendLine("                &nbsp;")
    '    sbScript.AppendLine("                <input id='" & Me.ClientID & "_btnCancelar' class='btnButton' type='button' value='Cancelar' />")
    '    sbScript.AppendLine("            </td>")
    '    sbScript.AppendLine("        </tr>")
    '    sbScript.AppendLine("    </table>")
    '    sbScript.AppendLine("</div>")
    '
    '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyHtml_" & Me.ClientID, sbScript.ToString, False)
    '
    'End Sub

    'Private Sub ConfigurarBusqueda(ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal oEntidad As ENT_ENT_Entidad)
    '    Dim selval As String = ""
    '    ddlBusqueda.Items.Clear()
    '    For Each v_oCampo As ENT_ENT_Campo In lstCampo
    '        If v_oCampo.btFil And v_oCampo.btVig Then
    '            Dim li As New ListItem
    '            li.Text = v_oCampo.vcDes
    '            li.Value = v_oCampo.vcNomAlias
    '            ddlBusqueda.Items.Add(li)
    '            If v_oCampo.btBusq Then
    '                selval = v_oCampo.vcNomAlias
    '            End If
    '        End If
    '    Next
    '    If ddlBusqueda.Items.Count = 0 Or Not oEntidad.btBus Then
    '    End If
    '    If (selval <> "") Then
    '        ddlBusqueda.SelectedValue = selval
    '    End If
    'End Sub

#Region "Genera Scripts Cliente"

    Private Sub ConfigurarGrid(ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal oEntidad As ENT_ENT_Entidad)
        Dim script As String
        Dim scriptCodigo As String = "var codigo_" & Me.ClientID & ";"
        Dim scriptDescripcion As String = "var descripcion_" & Me.ClientID & ";"
        Dim IdPrim As String = ""
        Dim Columna As String = "var columnas_" & Me.ClientID & "=["
        Dim iContador As Integer = 0
        Dim blDescripcionVacia As Boolean = False
        If _Descripcion = "" Then blDescripcionVacia = True
        Dim blHidden = False

        Dim hdfActivo As String = "Activo"
        Dim hdfDesactivo As String = "Baja"

        For Each oCampo As ENT_ENT_Campo In lstCampo
            iContador += 1
            If oCampo.btIdPri Then
                If IdPrim <> "" Then
                    IdPrim &= ","
                End If
                IdPrim &= oCampo.vcNomAlias
            End If

            'JHERRERA 20150824: Hidden desde propiedad del control (se utiliza principalmente para referencia)
            If ListaCamposOcultos.Contains(oCampo.vcNomAlias) Then blHidden = True Else blHidden = False

            Columna = Columna & "{ name: '" & oCampo.vcNomAlias & "', index: '" & oCampo.vcNomAlias & "', width: " & oCampo.inLar.ToString & ", label: '" & oCampo.vcDes.Replace("'", "\'") & "'"

            If oCampo.btOrd And oEntidad.btOrd Then
                Columna = Columna & ", sortable: true"
            Else
                Columna = Columna & ", sortable: false"
            End If

            If oCampo.btVis And oCampo.btVig And Not blHidden Then
                Columna = Columna & ", hidden: false"
            Else
                Columna = Columna & ", hidden: true"
            End If

            If oCampo.btEliLog Then
                ''Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return 'Si'; else return 'No'; }" 'formatter:'checkbox'"
                Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo & "'; else return '" & hdfDesactivo & "'; }"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey2_" & Me.ClientID, "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" & oCampo.vcNom & "': 'Eliminado' });}", True)
            ElseIf oCampo.inTipDat = 6 Then
                Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return 'Si'; else return 'No'; }" 'formatter:'checkbox'"
            Else
                Columna = Columna & ", align: 'Left'"
            End If
            'nuevo alinear columna moneda
            If oCampo.inTipDat = 4 Or oCampo.inTipDat = 5 Then
                Columna = Columna & ", align: 'Right'"
            ElseIf oCampo.inTipDat = 3 Then
                Columna = Columna & ", align: 'Right'"
                'formatter:'currency', formatoptions:{decimalSeparator:",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "$ "}
                'formatter:'date', formatoptions: {newformat: 'm/d/Y'}
                'datefmt: 'M d h:i'
                'Columna = Columna & ", formatter:'date'" ',datefmt: 'M d h:i'"
            End If
            Columna = Columna & " },"

            If oCampo.btIdPri Then _CodigoInterno = oCampo.vcNom
            'If _Codigo = "" Then If oCampo.btIdPri Then _Codigo = oCampo.vcNom
            If blDescripcionVacia Then
                _Descripcion = oCampo.vcNom
                _IdCampoAlias = oCampo.vcNomAlias
            End If
        Next

        Columna = Columna.Substring(0, Columna.Length - 1) & "]; "

        Dim TamanoPaginaArray As String() = oEntidad.vcTamPag.Split(",")

        If Not TamanoPaginaArray.Contains(oEntidad.inTamPag.ToString()) Then
            oEntidad.inTamPag = Integer.Parse(TamanoPaginaArray(0))
        End If

        Dim vcVarConJQ = ""
        If _VariableCondicionJQ.ToString() = "" Then
            _VariableCondicionJQ = "vcVarConJQ"
        End If
        vcVarConJQ = "var " + _VariableCondicionJQ + " = '';"

        script = "var MargenFiltro = 0;var MargenHeight = 48;var nuAltoFila = 23.04;var " & Me.ClientID & "_FiltroRegistro = " + _FiltroRegistro + ";" + vcVarConJQ + "var " & Me.ClientID & "_Valor='" & _CodigoValor & "'; validarDatosAjax_" & Me.ClientID & "=false;var buscarValor_" & Me.ClientID & "='';var cargarGrilla_" & Me.ClientID & "=0;var id_" & Me.ClientID & ";var idTabla = '" & IdPrim & "'; " & Columna & "var titulo = '" & oEntidad.vcDes & "';" & "var TamanoPagina = '" & oEntidad.inTamPag.ToString() & "';" & "var TamanosPaginaSel = [" & oEntidad.vcTamPag & "];" & "var HayDefaultValueEnLoad_" & Me.ClientID & "='0';" & " var CargaInicial_" & Me.ClientID & " = 0;"

        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_" & Me.ClientID, script, True)
    End Sub

    Private _FiltroRegistro As String = "1"
    Public Property FiltroRegistro As String
        Get
            Return _FiltroRegistro
        End Get
        Set(value As String)
            _FiltroRegistro = value
        End Set
    End Property

    Private Sub ConfiguraObjetosJavaScript(ByVal ListaCampos As List(Of ENT_ENT_Campo))

        Dim sbScript As New StringBuilder


        sbScript.AppendLine("$(document).ready(function () {")
        'sbScript.AppendLine("   debugger;")
        sbScript.AppendLine("   $('.btnButton').button();")
        sbScript.AppendLine("   fnValidarDatosIniciales_" & Me.ClientID & "();")
        'sbScript.AppendLine("   var inAltGrid_" & Me.ClientID & " = 235;")
        sbScript.AppendLine("   var inAltGrid_" & Me.ClientID & " = $(parent.window).height() - 160 - 160 - 50 - 30;")
        'sbScript.AppendLine("   if (inAltGrid_" & Me.ClientID & " < 200){ inAltGrid_" & Me.ClientID & " = 235; }") 'falta probar
        sbScript.AppendLine("   var inFilas_" & Me.ClientID & " = Math.floor(inAltGrid_" & Me.ClientID & " / nuAltoFila);")
        If (Not Me.Visible) Then
            sbScript.AppendLine("   $('#" & Me.ClientID & "_tbControles').parent().parent().parent().hide();")
        End If
        sbScript.Append(ObtieneScript_txtValor_Keydown)
        sbScript.Append(ObtieneScript_btnAceptar_Click)
        sbScript.Append(ObtieneScript_btnCancelar_Click)
        sbScript.Append(ObtieneScript_btnBuscar_Click)
        sbScript.Append(ObtieneScript_btnAgregar_Click)
        sbScript.Append(ObtieneScript_DefinejqGrid)
        sbScript.Append(ObtieneScript_txtValorBusqueda_Keydown)

        sbScript.Append(ObtieneScript_ValidarDeshabilitado)

        sbScript.AppendLine("});")

        If _Contenedor <> "" Then
            sbScript.Append(ObtieneHtmlControl(ListaCampos))
        End If

        sbScript.AppendLine(ObtieneScript_fnValidarFuncionalidadAdicional(ListaCampos))
        sbScript.AppendLine(ObtieneScript_fnEstadoOK)
        sbScript.AppendLine(ObtieneScript_fnEstadoEditado)
        sbScript.AppendLine(ObtieneScript_ValidarDatosIniciales(ListaCampos))
        sbScript.AppendLine(ObtieneScript_fnBuscarDesdeTxtValorBusqueda)


        'Buscar valores predeterminados...
        sbScript.AppendLine(ObtieneScript_ValorPredeterminado)


        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_ConfiguraObjetosJavaScript_" & Me.ClientID, sbScript.ToString, True)

    End Sub

    Private Function ObtieneScript_ValorPredeterminado() As String
        Dim sbScript As New StringBuilder
        'ObtieneScript_txtValorBusqueda_Keydown
        sbScript.AppendLine(" var " & Me.ClientID & "_TienePredeterminado = $('#" & Me.ClientID & "_txtValorBusqueda').attr('value-default');")
        sbScript.AppendLine(" if (" & Me.ClientID & "_TienePredeterminado != null && " & Me.ClientID & "_TienePredeterminado != '') {")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValorBusqueda').val(" & Me.ClientID & "_TienePredeterminado);")
        sbScript.AppendLine(" }")

        If (Me.ClientID.Contains("bp_MOV_Linea") And Me.IdCampoAlias = "P_vcNum") Then
            'sbScript.AppendLine("   debugger;")
            sbScript.AppendLine("   var NumeroLineaIngresado = window.parent.$('#hdfNumeroIngresado').val();")
            sbScript.AppendLine("   if(NumeroLineaIngresado != undefined && NumeroLineaIngresado != ''){")
            sbScript.AppendLine("       $('#" & Me.ClientID & "_txtValorBusqueda').val(NumeroLineaIngresado);")
            sbScript.AppendLine("       fnBuscarDesdeTxtValorBusqueda_" & Me.ClientID & "();")
            sbScript.AppendLine("       $('#" & Me.ClientID & "_grid').trigger('reloadGrid');")
            sbScript.AppendLine("   }")
        End If

        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_ValidarDeshabilitado() As String
        Dim sbScript As New StringBuilder
        If _Deshabilitado Then
            sbScript.AppendLine("$('#" & Me.ClientID & "_imgBusqueda').hide(); ")
            sbScript.AppendLine("$('#" & Me.ClientID & "_txtValorBusqueda').attr('disabled','disabled');")
            sbScript.AppendLine("$('#" & Me.ClientID & "_txtValorBusqueda').css('color','#545454');")
        End If
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_btnAceptar_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_btnAceptar').live('click', function () {")
        sbScript.Append(ObtieneScript_fnSeleccionarItem)
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_txtValor_Keydown() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_txtValor').keydown(function (event) {")
        sbScript.AppendLine("   if (event.keyCode == 13) {")
        'sbScript.AppendLine("       debugger;")
        sbScript.AppendLine("       $('#" & Me.ClientID & "_txtValor').val($('#" & Me.ClientID & "_txtValor').val().replace(/\\/g, ''));")
        sbScript.AppendLine("       buscarValor_" & Me.ClientID & " = $('#" & Me.ClientID & "_txtValor').val();")
        sbScript.AppendLine("       $('#" & Me.ClientID & "_grid').trigger('reloadGrid');")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_dvDetalleBusqueda_dialog() As String
        Dim sbScript As New StringBuilder
        Dim vWidth As String = "560"
        If _EsDinamico Then
            vWidth = "570"
        End If
        If _nombreentidad = "Línea" Then vWidth = "910"

        sbScript.AppendLine("       if (HayDefaultValueEnLoad_" & Me.ClientID & " == '0' || (HayDefaultValueEnLoad_" & Me.ClientID & " == '1' && '" & _MostrarModalEnLoad.ToString() & "' == 'True') ) {")
        sbScript.AppendLine("          $('#" & Me.ClientID & "_dvDetalleBusqueda').dialog({")
        sbScript.AppendLine("              width: 'auto',")
        'sbScript.AppendLine("              height: " & _AltoDialog & ",")
        sbScript.AppendLine("              height: $(parent.window).height() - 160,")

        If (_nombreentidad = "Empleado") Then
            sbScript.AppendLine("              title: 'Búsqueda - " & _nombreentidad & " - Línea',")
        Else
            sbScript.AppendLine("              title: 'Búsqueda - " & _nombreentidad & "',")
        End If

        sbScript.AppendLine("              modal: true,")
        sbScript.AppendLine("              resizable: false")
        sbScript.AppendLine("          });")
        sbScript.AppendLine("       }")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_btnCancelar_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_btnCancelar').live('click', function () {")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_dvDetalleBusqueda').dialog('close');")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValorBusqueda').focus();")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    'Private Function ObtieneScript_AjaxLista_Click(_resultado As String) As String
    '    Dim sbScript As New StringBuilder
    '    sbScript.AppendLine("           var Metodo = raiz('Common/WebService/General.asmx/ListarBusquedaGeneral');")
    '    sbScript.AppendLine("           $.ajax({")
    '    sbScript.AppendLine("               url: Metodo, //PageMethod")
    '    sbScript.AppendLine("               data: " & Chr(34) & "{'inPagTam':'" & Chr(34) & " + $('#" & grid.ClientID & "').getGridParam('rowNum') + " & Chr(34) & "'," & Chr(34) & " + //Tamaño de pagina")
    '    sbScript.AppendLine("               " & Chr(34) & "'inPagAct':'" & Chr(34) & " + parseInt($('#" & grid.ClientID & "').getGridParam('page')) + " & Chr(34) & "'," & Chr(34) & " + //Pagina actual")
    '    sbScript.AppendLine("               " & Chr(34) & "'vcOrdCol':'" & Chr(34) & " + $('#" & grid.ClientID & "').getGridParam('sortname') + " & Chr(34) & "'," & Chr(34) & " + //Nombre de columna ordenado")
    '    sbScript.AppendLine("               " & Chr(34) & "'vcTipOrdCol':'" & Chr(34) & " + $('#" & grid.ClientID & "').getGridParam('sortorder') + " & Chr(34) & "'," & Chr(34) & " + //Tipo de orden de columna asc, desc")
    '    sbScript.AppendLine("               " & Chr(34) & "'vcCam':'" & Chr(34) & " + $('#" & ddlBusqueda.ClientID & "').val() + " & Chr(34) & "'," & Chr(34) & " + //Campo de busqueda")
    '    sbScript.AppendLine("               " & Chr(34) & "'vcCamCodigo':'" & _Codigo & "'," & Chr(34) & " + //Valor de busqueda")
    '    sbScript.AppendLine("               " & Chr(34) & "'vcValBus':'" & Chr(34) & " + $('#" & txtValorBusqueda.ClientID & "').val().replace(/'/g, '&#39') + " & Chr(34) & "'," & Chr(34) & " + //Valor de busqueda")
    '    sbScript.AppendLine("               " & Chr(34) & "'vcTab':'" & _vcTab & "'," & Chr(34) & " + //Tabla")
    '    sbScript.AppendLine("               " & Chr(34) & "'inTipOri':'" & _TipoOrigen & "'," & Chr(34) & " + //TipoOrigen")
    '    sbScript.AppendLine("               " & Chr(34) & "'inFilReg':'" & Chr(34) & " + FiltroRegistro + " & Chr(34) & "'}" & Chr(34) & ", //FiltroRegistro")
    '    sbScript.AppendLine("               dataType: 'json',")
    '    sbScript.AppendLine("               type: 'post',")
    '    sbScript.AppendLine("               contentType: 'application/json; charset=utf-8',")
    '    sbScript.AppendLine("               success: function (result) {")
    '    sbScript.AppendLine(_resultado)
    '    sbScript.AppendLine("               },")
    '    sbScript.AppendLine("               error: function (xhr, err, thrErr) {")
    '    sbScript.AppendLine("                   MostrarErrorAjax(xhr, err, thrErr);")
    '    sbScript.AppendLine("               }")
    '    sbScript.AppendLine("           });")
    '    Return sbScript.ToString
    'End Function

    Private Function ObtieneScript_DefinejqGrid() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("   $('#" & Me.ClientID & "_grid').jqGrid({")
        sbScript.AppendLine("       sortable: true,")
        sbScript.AppendLine("       async: false,")
        sbScript.AppendLine("       datatype: function () {")
        sbScript.AppendLine("           if (cargarGrilla_" & Me.ClientID & " == 0) { cargarGrilla_" & Me.ClientID & " = 1;return;}")
        sbScript.AppendLine("           var Metodo = raiz('Common/WebService/General.asmx/ListarBusquedaGeneral');")
        'sbScript.AppendLine("           debugger;")
        If (_Condicion.Contains("MOV_Linea.P_vcNum")) Then
            'sbScript.AppendLine("           debugger;")
            'sbScript.AppendLine("           let valorCampoLinea = $('#" & Me.ClientID & "_txtValorBusqueda').val();")
            'sbScript.AppendLine("           let valorCampoLinea = $('#" & Me.Condicion.Substring(Me.Condicion.IndexOf("bp_MOV_Linea"), (Me.Condicion.Length - Me.Condicion.IndexOf("bp_MOV_Linea")) - (Me.Condicion.Length - Me.Condicion.IndexOf("val()")) - 3) & "').val();")
            sbScript.AppendLine("           let valorCampoLinea = $('#" & Me.Condicion.Substring(Me.Condicion.IndexOf("bp_MOV_Linea")).Split("'")(0) & "').val();")
            sbScript.AppendLine("           let valorCampoLineaLimpio = valorCampoLinea;")
            sbScript.AppendLine("           if (valorCampoLinea.indexOf('(') > -1){")
            sbScript.AppendLine("               valorCampoLineaLimpio = valorCampoLinea.substr(0, valorCampoLinea.indexOf('('))")
            sbScript.AppendLine("           }")
            sbScript.AppendLine("           let valorCondicion = """ + _Condicion.Replace("$$$", """") + """;")
            sbScript.AppendLine("           valorCondicion = valorCondicion.replace(valorCampoLinea, valorCampoLineaLimpio);")
        Else
            sbScript.AppendLine("           let valorCondicion = """ + _Condicion.Replace("$$$", """") + """;")
        End If
        sbScript.AppendLine("           if(!(valorCondicion.indexOf('undefined') > -1)){")

        If (_VariableCondicionJQ = "CondicionJQuery_SeleccionLineaTipoServicioPlan") Then
            sbScript.AppendLine("               if((CondicionJQuery_SeleccionLineaTipoServicioPlan.indexOf('undefined') > -1)){")
            sbScript.AppendLine("                   if (CargaInicial_" & Me.ClientID & " == 0){")
            sbScript.AppendLine("                       CargaInicial_" & Me.ClientID & " = 1;")
            sbScript.AppendLine("                       return;")
            sbScript.AppendLine("                   }")
            sbScript.AppendLine("                   alerta('Debe seleccionar primero la línea.');")
            sbScript.AppendLine("                   return;")
            sbScript.AppendLine("               }")
        End If

        sbScript.AppendLine("           $.ajax({")
        sbScript.AppendLine("               url: Metodo, //PageMethod")
        sbScript.AppendLine("               data: " & Chr(34) & "{'inPagTam':'" & Chr(34) & " + $('#" & Me.ClientID & "_grid').getGridParam('rowNum') + " & Chr(34) & "'," & Chr(34) & " + //Tamaño de pagina")
        sbScript.AppendLine("               " & Chr(34) & "'inPagAct':'" & Chr(34) & " + parseInt($('#" & Me.ClientID & "_grid').getGridParam('page')) + " & Chr(34) & "'," & Chr(34) & " + //Pagina actual")
        sbScript.AppendLine("               " & Chr(34) & "'vcOrdCol':'" & Chr(34) & " + $('#" & Me.ClientID & "_grid').getGridParam('sortname') + " & Chr(34) & "'," & Chr(34) & " + //Nombre de columna ordenado")
        sbScript.AppendLine("               " & Chr(34) & "'vcTipOrdCol':'" & Chr(34) & " + $('#" & Me.ClientID & "_grid').getGridParam('sortorder') + " & Chr(34) & "'," & Chr(34) & " + //Tipo de orden de columna asc, desc")
        sbScript.AppendLine("               " & Chr(34) & "'vcCam':'" & _Descripcion & "'," & Chr(34) & " + //Campo de busqueda")
        sbScript.AppendLine("               " & Chr(34) & "'vcCamCodigo':'" & _Codigo & "'," & Chr(34) & " + //Valor de busqueda")
        sbScript.AppendLine("               " & Chr(34) & "'vcValBus':'" & Chr(34) & " + buscarValor_" & Me.ClientID & ".replace(/'/g, '&#39') + " & Chr(34) & "'," & Chr(34) & " + //Valor de busqueda")
        sbScript.AppendLine("               " & Chr(34) & "'vcTab':'" & _vcTab & "'," & Chr(34) & " + //Tabla")
        sbScript.AppendLine("               " & Chr(34) & "'inTipOri':'" & _TipoOrigen & "'," & Chr(34) & " + //TipoOrigen")
        sbScript.AppendLine("               " & Chr(34) & "'inTipCre':'" & If(_EsDinamico, "2", "1") & "'," & Chr(34) & " + //TipoCreacion")
        sbScript.AppendLine("               " & Chr(34) & "'inFilReg':'" & Chr(34) & " + " & Me.ClientID & "_FiltroRegistro + " & Chr(34) & "'," & Chr(34) & "+ //FiltroRegistro")
        sbScript.AppendLine("               " & Chr(34) & "'vcCon':'" & Chr(34) & " + valorCondicion + " & Chr(34) & "'," & Chr(34) & " + //Condicion Servidor")
        sbScript.AppendLine("               " & Chr(34) & "'inTipLin':'" & _TipoLinea & "'," & Chr(34) & " + //TipoOrigen")
        sbScript.AppendLine("               " & Chr(34) & "'vcConJQ':'" & Chr(34) & " + " + _VariableCondicionJQ + " + " & Chr(34) & "'}" & Chr(34) & ", //Condicion JQuery")
        sbScript.AppendLine("               dataType: 'json',")
        sbScript.AppendLine("               type: 'post',")
        sbScript.AppendLine("               async: false,")
        sbScript.AppendLine("               contentType: 'application/json; charset=utf-8',")
        sbScript.AppendLine("               success: function (result) {")
        'sbScript.AppendLine("               debugger;")
        sbScript.AppendLine("                   $('#" & Me.ClientID & "_grid')[0].addJSONData(result.d);")
        sbScript.AppendLine("                   fnValidarFuncionalidadAdicional_" & Me.ClientID & "(result.d);")
        sbScript.AppendLine("               },")
        sbScript.AppendLine("               error: function (xhr, err, thrErr) {")
        sbScript.AppendLine("                   MostrarErrorAjax(xhr, err, thrErr);")
        sbScript.AppendLine("               }")
        sbScript.AppendLine("           });")
        sbScript.AppendLine("           }")
        sbScript.AppendLine("       },")
        sbScript.AppendLine("       jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.")
        sbScript.AppendLine("       {")
        sbScript.AppendLine("           root: 'Items',")
        sbScript.AppendLine("           page: 'PaginaActual',")
        sbScript.AppendLine("           total: 'TotalPaginas',")
        sbScript.AppendLine("           records: 'TotalRegistros',")
        sbScript.AppendLine("           repeatitems: true,")
        sbScript.AppendLine("           cell: 'Row',")
        sbScript.AppendLine("           id: 'ID'")
        sbScript.AppendLine("       },")
        sbScript.AppendLine("       colModel: columnas_" & Me.ClientID & ", //Columns")
        sbScript.AppendLine("       pager: '#" & Me.ClientID & "_pager', //Pager.")
        sbScript.AppendLine("       loadtext:  'Cargando datos...',")
        sbScript.AppendLine("       recordtext: '{0} - {1} de {2} elementos',")
        sbScript.AppendLine("       emptyrecords:  'No hay resultados',")
        sbScript.AppendLine("       pgtext:  'Pág: {0} de {1}', //Paging input control text format.")
        sbScript.AppendLine("       rowNum: inFilas_" & Me.ClientID & ", //TamanoPagina, //'10' PageSize.")
        'sbScript.AppendLine("       rowList: TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. ")
        sbScript.AppendLine("       viewrecords: true, //Show the RecordCount in the pager.")
        sbScript.AppendLine("       multiselect: false,")
        sbScript.AppendLine("       sortname: idTabla, //Default SortColumn")
        sbScript.AppendLine("       sortorder: 'asc', //Default SortOrder.")
        If _nombreentidad = "Línea" Then
            sbScript.AppendLine("       width: 665,")
        Else
            sbScript.AppendLine("       width: 640,")
        End If
        sbScript.AppendLine("       height: $(parent.window).height() - 160 - 160 - 50,")
        'sbScript.AppendLine("       height: 235,")
        sbScript.AppendLine("       rownumbers: true,")
        sbScript.AppendLine("       //caption: titulo,")
        sbScript.AppendLine("       shrinkToFit: false,")
        sbScript.AppendLine("       //viewsortcols: true,")
        sbScript.AppendLine("       onSelectRow: function (id) {")
        sbScript.AppendLine("           id_" & Me.ClientID & " = id;")
        sbScript.AppendLine("       },")
        sbScript.AppendLine("       ondblClickRow: function (id) {")
        sbScript.AppendLine("           id_" & Me.ClientID & " = id;")
        sbScript.AppendLine("           $('#" & Me.ClientID & "_btnAceptar').click();")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       },")
        sbScript.AppendLine("       gridComplete: function () {")
        sbScript.AppendLine("           $('#" & Me.ClientID & "_grid').jqGrid('hideCol', 'cb');")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("   }).navGrid('#" & Me.ClientID & "_pager', { edit: false, add: false, search: false, del: false });")
        Return sbScript.ToString

    End Function

    Private Function ObtieneScript_fnValidarFuncionalidadAdicional(ByVal ListaCampos As List(Of ENT_ENT_Campo)) As String
        Dim sbScript As New StringBuilder

        sbScript.AppendLine("function fnValidarFuncionalidadAdicional_" & Me.ClientID & "(_datos){")
        'sbScript.AppendLine("   debugger;")
        'sbScript.AppendLine("   //Validar Datos...")
        sbScript.AppendLine("   if (validarDatosAjax_" & Me.ClientID & " == true){")
        sbScript.AppendLine("       validarDatosAjax_" & Me.ClientID & " = false;")
        sbScript.AppendLine("       ")
        'sbScript.AppendLine("           debugger;")
        sbScript.AppendLine("       if (_datos.Items.length == 0){")
        If MuestraMensajeNoDatos Then
            sbScript.AppendLine("       if (HayDefaultValueEnLoad_" & Me.ClientID & " == '0' || (HayDefaultValueEnLoad_" & Me.ClientID & " == '1' && '" & _MostrarModalEnLoad.ToString() & "' == 'True') ) {")
            sbScript.AppendLine("           alerta('No se encontraron datos');")
            sbScript.AppendLine("       }")
        End If
        sbScript.AppendLine("           $('#" & Me.ClientID & "_txtValorBusqueda').focus().select();")
        'sbScript.AppendLine("           if(inNoVolverAPasar == 0){")
        sbScript.AppendLine("               fnEstadoEditado_" & Me.ClientID & "();")
        'sbScript.AppendLine("           }")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else if (_datos.Items.length == 1){")
        sbScript.AppendLine("           var datos = $('#" & Me.ClientID & "_grid').jqGrid('getRowData', 1);")
        sbScript.AppendLine("           var id = (datos." & _CodigoInterno & "); ")
        If (_IdCampoAlias = "") Then
            If (Me.ClientID.Contains("MOV_Linea") And Me.Descripcion = "P_vcNum") Then
                sbScript.AppendLine("           var descripcion = (datos." & _Descripcion & " + '(' + datos.vcNomEst + ')');")
            Else
                sbScript.AppendLine("           var descripcion = (datos." & _Descripcion & ");")
            End If
        Else
            If (Me.ClientID.Contains("MOV_Linea") And Me.IdCampoAlias = "P_vcNum") Then
                sbScript.AppendLine("           var descripcion = (datos." & _IdCampoAlias & " + '(' + datos.vcNomEst + ')');")
            Else
                sbScript.AppendLine("           var descripcion = (datos." & _IdCampoAlias & ");")
            End If
        End If
        If _Codigo = "" Then
            sbScript.AppendLine("           $('#" & Me.ClientID & "_txtValorBusqueda').val(descripcion);")
        Else
            sbScript.AppendLine("           var codigo = (datos." & _Codigo & ");")
            sbScript.AppendLine("           if (codigo != undefined)")
            sbScript.AppendLine("               $('#" & Me.ClientID & "_txtValorBusqueda').val(codigo + '=' + descripcion);")
        End If

        If _TraerDatosFila Then
            sbScript.AppendLine("           fnEstadoOK_" & Me.ClientID & "(datos);")

            'For Each CampoEntidad In Me.ListaCamposEntidad
            '    If (Me.Condicion.IndexOf("bp_") = -1) Then
            '        If (Me.FiltroRegistro = 1) Then
            '            If (Me.ClientID <> CampoEntidad.Entidad) Then
            '                sbScript.AppendLine("           inNoVolverAPasar++;")
            '                sbScript.AppendLine("           fnEstadoOK_" & CampoEntidad.Entidad & "(datos);")
            '            End If
            '        End If
            '    End If
            'Next
        Else
            sbScript.AppendLine("           fnEstadoOK_" & Me.ClientID & "(id);")
        End If

        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else {")
        sbScript.AppendLine("           var buscarValor = $('#" & Me.ClientID & "_txtValorBusqueda').val();")
        sbScript.AppendLine("           var indiceValor = buscarValor.indexOf('=');")
        sbScript.AppendLine("           if (indiceValor>=0 ) { ")
        sbScript.AppendLine("               buscarValor = buscarValor.substring(0,indiceValor);")
        sbScript.AppendLine("           }")
        sbScript.AppendLine("           $('#" & Me.ClientID & "_txtValor').val(buscarValor);")
        sbScript.AppendLine(ObtieneScript_dvDetalleBusqueda_dialog)
        sbScript.AppendLine("       }")
        sbScript.AppendLine("")
        sbScript.AppendLine("       HayDefaultValueEnLoad_" & Me.ClientID & " = '0';")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("}")


        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_btnAgregar_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_btnAgregar').live('click', function () {")
        sbScript.AppendLine("   var Titulo = 'Agregar - " & _nombreentidad & "';")
        sbScript.AppendLine("   AbrirModalCreacion_Entidad('" + Me.ClientID + "', '" + _vcTab + "', Titulo);")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_btnBuscar_Click() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_btnBuscar').live('click', function () {")

        If (_nombreentidad = "Empleado") Then
            sbScript.AppendLine("   var Titulo = 'Búsqueda - " & _nombreentidad & "';")
        Else
            sbScript.AppendLine("   var Titulo = 'Búsqueda - " & _nombreentidad & " - Línea';")
        End If

        sbScript.AppendLine("   var Titulo = 'Búsqueda - " & _nombreentidad & "';")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValor').val('');")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValor').focus();")
        sbScript.AppendLine("   id_" & Me.ClientID & " = undefined;")
        sbScript.AppendLine("   buscarValor_" & Me.ClientID & " = $('#" & Me.ClientID & "_txtValor').val();")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_grid').trigger('reloadGrid');")
        sbScript.AppendLine(ObtieneScript_dvDetalleBusqueda_dialog)
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_fnSeleccionarItem(Optional ByVal bDatosGrilla As Boolean = False) As String
        Dim sbScript As New StringBuilder
        'Si no se envia las propiedades de Codigo y Descripción, 
        'se considera temporalmente que la segunda columna es la que contiene la descripción y el codigo se toma del campo btIdPri
        sbScript.AppendLine("if ($('#" & Me.ClientID & "_grid').getGridParam('reccount') == 1) {")
        'sbScript.AppendLine("debugger;")
        sbScript.AppendLine("   id_" & Me.ClientID & " = $('#" & Me.ClientID & "_grid').jqGrid('getDataIDs')[0];")
        sbScript.AppendLine("}")
        sbScript.AppendLine("var datos = $('#" & Me.ClientID & "_grid').jqGrid('getRowData', id_" & Me.ClientID & ");")
        'sbScript.AppendLine("var datos = $('#" & Me.ClientID & "_grid').jqGrid('getRowData');")

        If bDatosGrilla Then
            sbScript.AppendLine("if (datos.length == 0 || datos.length > 1) { return;}")
        Else
            sbScript.AppendLine("if (datos.length == 0 || datos.length > 1) { alerta('Seleccione un registro'); return;}")
        End If

        sbScript.AppendLine("if ('" & _CodigoInterno & "' == '') { alerta('Se debe definir un campo como PrimaryKey'); return;}")
        'sbScript.AppendLine("debugger;")

        If Me.ListaCamposEntidad.Count > 0 Then
            Dim contador As Int32 = 1
            For Each campoEntidad In Me.ListaCamposEntidad

                If (Me.IdCampoEntidad = campoEntidad.IdCampo OrElse ValidaCampoListaString(Me.IdCampoEntidad, campoEntidad.IdCampoTipSol)) Then
                    If (campoEntidad.Campo = "vcNomMarca" OrElse campoEntidad.Entidad.ToLower.Contains("marca")) Then
                        sbScript.AppendLine("var descripcion" & contador.ToString() & " = (datos.vcNomMarca);")
                    Else
                        If (campoEntidad.Entidad.Contains("MOV_Linea") And campoEntidad.Campo = "P_vcNum") Then
                            sbScript.AppendLine("var descripcion" & contador.ToString() & " = (datos." & campoEntidad.AliasCampo & " + '(' + datos.vcNomEst + ')');")
                        Else
                            sbScript.AppendLine("var descripcion" & contador.ToString() & " = (datos." & campoEntidad.AliasCampo & ");")
                        End If


                    End If

                    If _CodigoInterno = "" Then
                        sbScript.AppendLine("var id" & contador.ToString() & " = '';")
                    Else
                        If (campoEntidad.Campo = "vcNomMarca" OrElse campoEntidad.Entidad.ToLower.Contains("marca")) Then
                            sbScript.AppendLine("var id" & contador.ToString() & " = (datos.vcCodMarca);") 'siempre registrará con este nombre para este componente y con este codigo porque viene de BD en tabla entidad.(solucion para solicitudes)
                        Else
                            sbScript.AppendLine("var id" & contador.ToString() & " = (datos." & _CodigoInterno & ");")
                        End If
                    End If
                    If _Codigo = "" Then
                        sbScript.AppendLine("var codigo" & contador.ToString() & " = '';")
                        sbScript.AppendLine("$('#" & campoEntidad.Entidad & "_txtValorBusqueda').val(descripcion" & contador.ToString() & ");")
                    Else
                        sbScript.AppendLine("var codigo" & contador.ToString() & " = (datos." & _Codigo & ");")
                        sbScript.AppendLine("if (codigo" & contador.ToString() & " != undefined)")
                        sbScript.AppendLine("   $('#" & campoEntidad.Entidad & "_txtValorBusqueda').val(codigo" & contador.ToString() & " + '=' + descripcion" & contador.ToString() & ");")
                    End If

                    'SE COMENTA PERO SE AGREGA TRYCATCH
                    'If (Me.ClientID = campoEntidad.Entidad) Then
                    '    If _TraerDatosFila Then 'retorna un objeto
                    '        sbScript.AppendLine("fnEstadoOK_" & campoEntidad.Entidad & "(datos);")
                    '    Else
                    '        sbScript.AppendLine("fnEstadoOK_" & campoEntidad.Entidad & "(id" & contador.ToString() & ");")
                    '    End If
                    'End If
                    If _TraerDatosFila Then 'retorna un objeto
                        sbScript.AppendLine("try{")
                        sbScript.AppendLine("fnEstadoOK_" & campoEntidad.Entidad & "(datos);")
                        sbScript.AppendLine("} catch(e){}")
                    Else
                        sbScript.AppendLine("try{")
                        sbScript.AppendLine("fnEstadoOK_" & campoEntidad.Entidad & "(id" & contador.ToString() & ");")
                        sbScript.AppendLine("} catch(e){}")
                    End If

                    If (campoEntidad.Campo = "vcNomMarca") Then 'siempre registrará con este nombre para este componente y con este codigo porque viene de BD en tabla entidad.(solucion para solicitudes)
                        If _TraerDatosFila Then 'retorna un objeto
                            sbScript.AppendLine("fnEstadoOK_" & campoEntidad.Entidad & "(datos);")
                        Else
                            sbScript.AppendLine("fnEstadoOK_" & campoEntidad.Entidad & "(id" & contador.ToString() & ");")
                        End If
                    End If
                End If

                contador += 1
            Next

            'sbScript.AppendLine("var descripcion = (datos." & _Descripcion & ");")
        Else
            sbScript.AppendLine("var descripcion = (datos." & _Descripcion & ");")

            If _CodigoInterno = "" Then
                sbScript.AppendLine("var id = '';")
            Else
                sbScript.AppendLine("var id = (datos." & _CodigoInterno & ");")
            End If
            If _Codigo = "" Then
                sbScript.AppendLine("var codigo = '';")
                sbScript.AppendLine("$('#" & Me.ClientID & "_txtValorBusqueda').val(descripcion);")
            Else
                sbScript.AppendLine("var codigo = (datos." & _Codigo & ");")
                sbScript.AppendLine("if (codigo != undefined)")
                sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValorBusqueda').val(codigo + '=' + descripcion);")
            End If

            If _TraerDatosFila Then 'retorna un objeto
                sbScript.AppendLine("fnEstadoOK_" & Me.ClientID & "(datos);")
            Else
                sbScript.AppendLine("fnEstadoOK_" & Me.ClientID & "(id);")
            End If
        End If


        sbScript.AppendLine("$('#" & Me.ClientID & "_dvDetalleBusqueda').dialog('close');")

        Return sbScript.ToString
    End Function

    Private Function ValidaCampoListaString(ByRef campo As String, ByRef lst As List(Of String)) As Boolean
        Dim result As Boolean = False
        Try
            For Each valor As String In lst
                If (campo = valor) Then
                    result = True
                    Exit For
                End If
            Next

        Catch ex As Exception
            result = False
        End Try
        Return result

    End Function

    Private Function ObtieneScript_txtValorBusqueda_Keydown() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_txtValorBusqueda').keydown(function (event) {")
        sbScript.AppendLine("   if( event.keyCode!= 13 && event.keyCode!= 8 && (event.keyCode<32 || (event.keyCode>=112 && event.keyCode<=123) ||  (event.keyCode>=144 ))){return;}") 'No considera al TAB
        sbScript.AppendLine("   if (event.keyCode == 13) {")
        sbScript.AppendLine("       fnBuscarDesdeTxtValorBusqueda_" & Me.ClientID & "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else{")
        sbScript.AppendLine("       fnEstadoEditado_" & Me.ClientID & "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("});")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_fnBuscarDesdeTxtValorBusqueda() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("function fnBuscarDesdeTxtValorBusqueda_" & Me.ClientID & "(_datos){")
        'sbScript.AppendLine("       console.log('revisar', $('#" & Me.ClientID & "_txtValorBusqueda').val());")
        sbScript.AppendLine("       $('#" & Me.ClientID & "_txtValorBusqueda').val($('#" & Me.ClientID & "_txtValorBusqueda').val().replace(/\\/g, ''));")
        If (Me.ClientID = "bpEmpleado") Then
            'sbScript.AppendLine("       debugger;")
            sbScript.AppendLine("       let valorNumIngresado = $('#" & Me.ClientID & "_txtValorBusqueda').val().replace(/\\/g, '');")
            sbScript.AppendLine("       if(valorNumIngresado.length > 7 && !isNaN(valorNumIngresado)){")
            sbScript.AppendLine("           $('#hdfNumeroIngresado').val(valorNumIngresado);")
            sbScript.AppendLine("       }")
        End If
        sbScript.AppendLine("       buscarValor_" & Me.ClientID & " = $.trim($('#" & Me.ClientID & "_txtValorBusqueda').val());")
        If (Me.ClientID.Contains("bp_MOV_Linea") And Me.IdCampoAlias = "P_vcNum") Then
            sbScript.AppendLine("       var indiceValorLinea = buscarValor_" & Me.ClientID & ".indexOf('(');")
            sbScript.AppendLine("       if (indiceValorLinea >= 0 ) { ")
            sbScript.AppendLine("           buscarValor_" & Me.ClientID & " = buscarValor_" & Me.ClientID & ".substring(0,indiceValorLinea); ")
            sbScript.AppendLine("       }")
        End If

        sbScript.AppendLine("       var indiceValor = buscarValor_" & Me.ClientID & ".indexOf('=');")
        sbScript.AppendLine("       if (indiceValor >= 0 ) { ")
        sbScript.AppendLine("           buscarValor_" & Me.ClientID & " = buscarValor_" & Me.ClientID & ".substring(0,indiceValor);")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       $('#" & Me.ClientID & "_txtValor').focus();")
        sbScript.AppendLine("       validarDatosAjax_" & Me.ClientID & " = true;")
        sbScript.AppendLine("       $('#" & Me.ClientID & "_grid').trigger('reloadGrid');")
        'sbScript.AppendLine("       debugger;")
        sbScript.AppendLine(ObtieneScript_fnSeleccionarItem(True))

        sbScript.AppendLine("}")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_fnEstadoOK() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("function fnEstadoOK_" & Me.ClientID & "(valor){")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValorBusqueda').css({'color':'#354E72'}); ")

        If _TraerDatosFila Then
            'sbScript.AppendLine("   var datos = $('#" & Me.ClientID & "_grid').jqGrid('getRowData', id_" & Me.ClientID & ");")
            'sbScript.AppendLine("   var id = (datos[0]." & _CodigoInterno & "); ")
            sbScript.AppendLine("   " & Me.ClientID & "_Valor=valor." & _CodigoInterno & ";")
            If _FuncionPersonalizada <> "" Then
                sbScript.AppendLine("   " & _FuncionPersonalizada & "(valor);")
            End If
        Else
            sbScript.AppendLine("   " & Me.ClientID & "_Valor=valor;")
            If _FuncionPersonalizada <> "" Then
                sbScript.AppendLine("   " & _FuncionPersonalizada & "(valor);")
            End If
        End If


        sbScript.AppendLine("}")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_fnEstadoEditado() As String
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("function fnEstadoEditado_" & Me.ClientID & "(){ try { ")
        sbScript.AppendLine("   $('#" & Me.ClientID & "_txtValorBusqueda').css({'color':'#BE2E25'}); ")
        sbScript.AppendLine("   " & Me.ClientID & "_Valor='';")

        If _FuncionPersonalizada <> "" Then
            sbScript.AppendLine("   " & _FuncionPersonalizada & "('');")
        End If

        sbScript.AppendLine("}")
        sbScript.AppendLine("catch(err){")
        sbScript.AppendLine("   console.log('error', err)}")

        sbScript.AppendLine("}")
        Return sbScript.ToString
    End Function

    Private Function ObtieneScript_ValidarDatosIniciales(ByVal lstCampos As List(Of ENT_ENT_Campo)) As String
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            Dim sbScript As New StringBuilder
            Dim tipoCreacion As Integer = 1
            If _EsDinamico Then tipoCreacion = 2
            sbScript.AppendLine("function fnValidarDatosIniciales_" & Me.ClientID & "() {")
            'sbScript.AppendLine("   debugger;")
            If _CodigoValor <> "" Then
                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Campo = New BL_ENT_Campo(_TipoOrigen, oUsuario.IdCliente)
                Dim lstCampo As List(Of ENT_ENT_Campo) = Campo.Listar(_vcTab, oUsuario, tipoCreacion)

                'Edgar Garcia 19022023 estaba comentado lo descomente
                If (Me.Descripcion = "vcNomMarca") Then
                    _CodigoInterno = "vcCodMarca"
                End If




                Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(1, 1, _Codigo, "asc", vcTab, lstCampo, "",
                                                                               _CodigoInterno, "", _CodigoValor, Integer.Parse(_FiltroRegistro), "", "", 0, 0, _SolicitudTerminada) '_Condicion.Replace("###", "'").Replace("|", "'")
                    Campo.Dispose()
                    If dsDetalle.Tables.Count > 0 AndAlso dsDetalle.Tables(1).Rows.Count > 0 Then

                        Dim strCodigoValor As String = ""
                        If _Codigo <> "" Then strCodigoValor = dsDetalle.Tables(1).Rows(0)(_Codigo)
                        Dim strDescripcionValor As String = "" & dsDetalle.Tables(1).Rows(0)(_Descripcion)
                        sbScript.AppendLine("   if (" & Me.ClientID & "_Valor != '') {")
                        sbScript.AppendLine("       var id = " & Me.ClientID & "_Valor;")
                        sbScript.AppendLine("       var descripcion ='" & strDescripcionValor & "';")
                        sbScript.AppendLine("       var valorIdDescripcion = '';")
                        sbScript.AppendLine("       var valorIdDescripcion_Texto = '';")
                        If (Me.IdDescripcion <> "") Then
                            sbScript.AppendLine("       try{")
                            sbScript.AppendLine("           valorIdDescripcion = " & Me.IdDescripcion)
                            sbScript.AppendLine("           valorIdDescripcion_Texto = valorIdDescripcion.split('|')[1]; ")
                            sbScript.AppendLine("       } catch (e){")
                            sbScript.AppendLine("           valorIdDescripcion_Texto = '';")
                            sbScript.AppendLine("       }")
                        End If
                        If _Codigo = "" Then
                            sbScript.AppendLine("       $('#" & Me.ClientID & "_txtValorBusqueda').val(descripcion);")
                        Else
                            sbScript.AppendLine("       var codigo ='" & strCodigoValor & "';")
                            sbScript.AppendLine("       if (codigo != undefined)")
                            sbScript.AppendLine("           $('#" & Me.ClientID & "_txtValorBusqueda').val(codigo + '=' + descripcion);")
                        End If

                        If _TraerDatosFila Then
                            'sbScript.AppendLine("       var datos = $('#" & Me.ClientID & "_grid').jqGrid('getRowData', 1);")
                            'dsDetalle.Tables(1).Rows(0)
                            sbScript.AppendLine("       fnEstadoOK_" & Me.ClientID & "(" + ObtieneFilaString(dsDetalle.Tables(1).Rows(0), lstCampos) + ");")
                        Else
                            sbScript.AppendLine("       fnEstadoOK_" & Me.ClientID & "(id);")
                        End If
                        sbScript.AppendLine("      if (valorIdDescripcion_Texto != '' && valorIdDescripcion_Texto != undefined) { ")
                        sbScript.AppendLine("         $('#" & Me.ClientID & "_txtValorBusqueda').val(valorIdDescripcion_Texto);")
                        sbScript.AppendLine("      }")
                        sbScript.AppendLine("   }")

                    ElseIf (_CodigoValor <> "") Then
                        Dim strCodigoValor As String = ""
                        If _Codigo <> "" Then strCodigoValor = _CodigoValor
                        Dim strDescripcionValor As String = "" & _CodigoValor
                        sbScript.AppendLine("   if (" & Me.ClientID & "_Valor != '') {")
                        sbScript.AppendLine("       var id = " & Me.ClientID & "_Valor;")
                        sbScript.AppendLine("       var descripcion ='" & strDescripcionValor & "';")
                        sbScript.AppendLine("       var valorIdDescripcion = '';")
                        sbScript.AppendLine("       var valorIdDescripcion_Texto = '';")
                        If (Me.IdDescripcion <> "") Then
                            sbScript.AppendLine("       try{")
                            sbScript.AppendLine("           valorIdDescripcion = " & Me.IdDescripcion)
                            sbScript.AppendLine("           valorIdDescripcion_Texto = valorIdDescripcion.split('|')[1]; ")
                            sbScript.AppendLine("       } catch (e){")
                            sbScript.AppendLine("           valorIdDescripcion_Texto = '';")
                            sbScript.AppendLine("       }")
                        End If
                        If _Codigo = "" Then
                            sbScript.AppendLine("       $('#" & Me.ClientID & "_txtValorBusqueda').val(descripcion);")
                        Else
                            sbScript.AppendLine("       var codigo ='" & strCodigoValor & "';")
                            sbScript.AppendLine("       if (codigo != undefined)")
                            sbScript.AppendLine("           $('#" & Me.ClientID & "_txtValorBusqueda').val(codigo + '=' + descripcion);")
                        End If

                        sbScript.AppendLine("       fnEstadoOK_" & Me.ClientID & "(id);")
                        sbScript.AppendLine("      if (valorIdDescripcion_Texto != '' && valorIdDescripcion_Texto != undefined) { ")
                        sbScript.AppendLine("         $('#" & Me.ClientID & "_txtValorBusqueda').val(valorIdDescripcion_Texto);")
                        sbScript.AppendLine("      }")
                        sbScript.AppendLine("   }")
                    End If
                End If
                sbScript.AppendLine("}")

            Return sbScript.ToString
        Catch ex As Exception
            Throw ex
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

#End Region

    Private Function ObtieneFilaString(ByVal rowFila As DataRow, ByVal lstCampos As List(Of ENT_ENT_Campo))
        Dim strFila As String = "{ "
        For Each oCampo As ENT_ENT_Campo In lstCampos
            strFila += oCampo.vcNomAlias & ": '" & rowFila(oCampo.vcNomAlias) & "',"
        Next
        strFila = strFila.Substring(0, strFila.Length - 1)
        strFila += "}"

        Return strFila
    End Function

    Private Function ObtieneHtmlControl(ByVal ListaCampos As List(Of ENT_ENT_Campo))
        Dim rutaImagen As String = String.Empty
        Dim rutaImagenAgregar As String = String.Empty
        rutaImagen = _RutaRaiz & "Common/Images/Mantenimiento/busqueda_generico.png"
        rutaImagenAgregar = _RutaRaiz & "Common/Images/Mantenimiento/add_16x16.gif"
        Dim strCont As String = String.Empty

        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim sbScript As New StringBuilder
        sbScript.Append("<table id='" & Me.ClientID & "_tbControles' border='0' cellpadding='0' cellspacing='0'>")
        If (Me.Visible = False) Then
            sbScript.Append("   <tr style='display: none;'>")
        Else
            sbScript.Append("   <tr>")
        End If
        sbScript.Append("       <td>")

        Dim nomTab As String = IIf(String.IsNullOrEmpty(Me.Attributes("nomTab")), "", Me.Attributes("nomTab"))

        If (Me.NomCampoDescripcion <> "" And Me.NomCampoDescripcion IsNot Nothing) Then
            If (Me.Deshabilitado = True) Then
                sbScript.Append("           <input id='" & Me.ClientID & "_txtValorBusqueda'  type='text' style='width:" & _ancho & "px; heigth: 25px; display: block; ' class='" & _Selector & "' autocomplete='off'  nomTab='" & nomTab.ToString() & "'/>")
            Else
                If (Me.NomCampoDescripcion.ToLower() = "empleado") Then
                    sbScript.Append("           <input id='" & Me.ClientID & "_txtValorBusqueda'  type='text' style='width:" & _ancho & "px; heigth: 25px; display: block; ' class='" & _Selector & "' placeholder='Buscar por " & Me.NomCampoDescripcion.ToLower() & " o línea' autocomplete='off  nomTab='" & nomTab.ToString() & "''/>")
                ElseIf (Me.NomCampoDescripcion.ToLower() = "contacto un") AndAlso
                        (From p In oUsuario.Perfiles Where p.CodigoPerfil = "JEFE" Select p).ToArray().Length > 0 Then
                    'Validar si tiene el perfil Jefe
                    sbScript.Append("           <input id='" & Me.ClientID & "_txtValorBusqueda' value-default='" & oUsuario.vcNom & "' type='text' style='width:" & _ancho & "px; heigth: 25px; display: block; ' class='" & _Selector & "' placeholder='Buscar por Contacto UN' autocomplete='off  nomTab='" & nomTab.ToString() & "''/>")
                Else
                    sbScript.Append("           <input id='" & Me.ClientID & "_txtValorBusqueda'  type='text' style='width:" & _ancho & "px; heigth: 25px; display: block; ' class='" & _Selector & "' placeholder='Buscar por " & Me.NomCampoDescripcion.ToLower() & "' autocomplete='off' nomTab='" & nomTab.ToString() & "' />")
                End If
            End If
        Else
            If (Me.ClientID = "bpEmpleado") Then
                sbScript.Append("           <input id='" & Me.ClientID & "_txtValorBusqueda'  type='text' style='width:" & _ancho & "px; heigth: 25px; display: block; ' class='" & _Selector & "' placeholder='Buscar por " & Me.ClientID.Substring(2).ToLower() & " o línea' autocomplete='off' nomTab='" & nomTab.ToString() & "' />")
            Else
                sbScript.Append("           <input id='" & Me.ClientID & "_txtValorBusqueda'  type='text' style='width:" & _ancho & "px; heigth: 25px; display: block; ' class='" & _Selector & "' autocomplete='off' nomTab='" & nomTab & "'/>")
            End If
        End If
        sbScript.Append("       </td>")
        sbScript.Append("        <td style='width: 2px;'></td>")
        sbScript.Append("        <td>")
        sbScript.Append("            <div title='Buscar (Enter)' id ='" & Me.ClientID & "_btnBuscar' style='cursor: hand; cursor: pointer;' >")
        sbScript.Append("                <img id = '" & Me.ClientID & "_imgBusqueda' width='22px' alt='Buscar (Enter)' src='" & rutaImagen & "' /> ")
        sbScript.Append("            </div>")
        sbScript.Append("        </td>")
        If _PermiteAdicionar And Not (_Deshabilitado) Then
            sbScript.Append("        <td style='width: 2px;'></td>")
            sbScript.Append("        <td>")
            sbScript.Append("            <div title='Agregar' id ='" & Me.ClientID & "_btnAgregar' style='cursor: hand; cursor: pointer;' >")
            sbScript.Append("                <img id = '" & Me.ClientID & "_imgAgregar' width='18px' alt='Buscar (Enter)' src='" & rutaImagenAgregar & "' /> ")
            sbScript.Append("            </div>")
            sbScript.Append("        </td>")
        End If
        sbScript.Append("    </tr>")
        sbScript.Append("</table>")

        sbScript.Append("<div id='" & Me.ClientID & "_dvDetalleBusqueda' style='display: none;'>")
        sbScript.Append("    <table border='0'>")
        sbScript.Append("        <tr>")
        sbScript.Append("            <td colspan='2'>")
        sbScript.Append("                <span style='font-size:11px;'>Seleccione el registro que desee y haga clic en Aceptar</span>")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("        <tr>")
        sbScript.Append("            <td colspan='2'>")
        sbScript.Append("                <table border='0'>")
        sbScript.Append("                    <tr>")
        sbScript.Append("                        <td align='left' >")
        sbScript.Append("                            <select id='" & Me.ClientID & "_ddlBusqueda' class='ddlBusqueda' style='font-weight:normal;display:none;' width='150px'>")
        For Each v_oCampo As ENT_ENT_Campo In ListaCampos
            If v_oCampo.btFil And v_oCampo.btVig Then
                sbScript.Append("                       <option value='" & v_oCampo.vcNomAlias & "'>" & v_oCampo.vcDes & "</option>")
            End If
        Next
        sbScript.Append("                            </select>")
        sbScript.Append("                            Buscar:&nbsp;")
        sbScript.Append("                        </td>")
        sbScript.Append("                        <td style='width:220px'>")
        If _nombreentidad = "Línea" Then
            sbScript.Append("                           <input id='" & Me.ClientID & "_txtValor' class='txtValor' type='text' style='width:600px; margin-left:5px; font-weight:normal;' />")
        Else
            sbScript.Append("                           <input id='" & Me.ClientID & "_txtValor' class='txtValor' type='text' style='width:576px; margin-left:5px; font-weight:normal;' />")
        End If
        sbScript.Append("                        </td>")
        sbScript.Append("                    </tr>")
        sbScript.Append("                </table>")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("        <tr>")
        sbScript.Append("            <td colspan='2'>")
        sbScript.Append("                <table id='" & Me.ClientID & "_grid' ></table>")
        sbScript.Append("                <div id='" & Me.ClientID & "_pager' ></div>")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("        <tr>")
        sbScript.Append("            <td colspan='2' align='right'>")
        sbScript.Append("                <input id='" & Me.ClientID & "_btnAceptar' style='height: 24px;' class='btnButton' type='button' value='Aceptar' />")
        sbScript.Append("                &nbsp;")
        sbScript.Append("                <input id='" & Me.ClientID & "_btnCancelar' style='height: 24px;' class='btnButton' type='button' value='Cancelar' />")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("    </table>")
        sbScript.Append("</div>")

        strCont += "$('#" & _Contenedor & "').append("""
        strCont += sbScript.ToString()
        strCont += """);"
        Return strCont

    End Function

End Class
