Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Data
Imports VisualSoft.PCSistel.Utilitarios
Imports VisualSoft.PCSistel.Producto.BE
Imports VisualSoft.PCSistel.Producto.BL
Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.PCSistel.General.BE
Imports System.Text

Partial Class BusquedaPrincipal
    Inherits System.Web.UI.UserControl
    Shared flagBorrarString As Boolean = True
#Region "propiedades"
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
    Public Property Ancho() As Integer
        Get
            Return _ancho
        End Get
        Set(value As Integer)
            _ancho = value
        End Set
    End Property
    Public Property NombreEntidad() As String
        Get
            Return _nombreentidad
        End Get
        Set(value As String)
            _nombreentidad = value
        End Set
    End Property
    Public Property TipoOrigen() As Integer
        Get
            Return _TipoOrigen
        End Get
        Set(value As Integer)
            _TipoOrigen = value
        End Set
    End Property
    Public Property vcTab() As String
        Get
            Return _vcTab
        End Get
        Set(value As String)
            _vcTab = value
        End Set
    End Property
    Public Property CodigoInterno() As String
        Get
            Return _CodigoInterno
        End Get
        Set(value As String)
            _CodigoInterno = value
        End Set
    End Property
    Public Property Codigo() As String
        Get
            Return _Codigo
        End Get
        Set(value As String)
            _Codigo = value
        End Set
    End Property
    Public Property Descripcion() As String
        Get
            Return _Descripcion
        End Get
        Set(value As String)
            _Descripcion = value
        End Set
    End Property
    Public Property CodigoValor() As String
        Get
            Return _CodigoValor
        End Get
        Set(value As String)
            _CodigoValor = value
        End Set
    End Property
    Public Property Condicion() As String
        Get
            Return _Condicion
        End Get
        Set(value As String)
            _Condicion = value
        End Set
    End Property
    Public Property VariableCondicionJQ() As String
        Get
            Return _VariableCondicionJQ
        End Get
        Set(value As String)
            _VariableCondicionJQ = value
        End Set
    End Property
    Public Property FuncionPersonalizada() As String
        Get
            Return _FuncionPersonalizada
        End Get
        Set(value As String)
            _FuncionPersonalizada = value
        End Set
    End Property


    Private _RutaRaiz As String
    Public Property RutaRaiz() As String
        Get
            Return _RutaRaiz
        End Get
        Set(value As String)
            _RutaRaiz = value
        End Set
    End Property
    Private _AltoDialog As Integer
    Public Property AltoDialog() As Integer
        Get
            Return _AltoDialog
        End Get
        Set(value As Integer)
            _AltoDialog = value
        End Set
    End Property

    Private _Contenedor As String = ""
    Public Property Contenedor() As String
        Get
            Return _Contenedor
        End Get
        Set(value As String)
            _Contenedor = value
        End Set
    End Property

    Private _EsDinamico As Boolean = False
    Public Property EsDinamico() As Boolean
        Get
            Return _EsDinamico
        End Get
        Set(value As Boolean)
            _EsDinamico = value
        End Set
    End Property

    Private _Deshabilitado As Boolean = False
    Public Property Deshabilitado() As Boolean
        Get
            Return _Deshabilitado
        End Get
        Set(value As Boolean)
            _Deshabilitado = value
        End Set
    End Property

    Private _MuestraMensajeNoDatos As Boolean = True
    Public Property MuestraMensajeNoDatos() As Boolean
        Get
            Return _MuestraMensajeNoDatos
        End Get
        Set(value As Boolean)
            _MuestraMensajeNoDatos = value
        End Set
    End Property
#End Region

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                If _vcTab Is Nothing OrElse String.IsNullOrEmpty(_vcTab) Then
                    Return
                End If

                Dim tipoCreacion As Integer = 1
                If _EsDinamico Then
                    tipoCreacion = 2
                End If
                If _ancho = 0 Then
                    _ancho = 300
                End If
                If _AltoDialog = 0 Then
                    _AltoDialog = 425
                End If
                'txtValorBusqueda.Width = New Unit(_ancho)

                'hfNombreEntidad.Value = _nombreentidad

                'ENT_SEG_Usuario oUsuario = (ENT_SEG_Usuario)Session["Usuario"];
                Dim Campo As New BL_ENT_Campo()
                Dim Entidad As New BL_ENT_Entidad()
                Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing
                Dim oEntidad As ENT_ENT_Entidad = Entidad.Mostrar(_vcTab, 1)
                ' Entidad.Dispose();

                lstCampo = Campo.Listar(_vcTab, 1, tipoCreacion)
                'Campo.Dispose();

                ConfigurarGrid(lstCampo, oEntidad)
                'ConfigurarBusqueda(lstCampo, oEntidad)

                If Not String.IsNullOrEmpty(_CodigoInterno) AndAlso Not String.IsNullOrEmpty(_Descripcion) Then
                    'ConfiguraObjetosHtml(lstCampo, _ancho)
                    ConfiguraObjetosJavaScript(lstCampo)


                End If

                'UtilitarioWeb.AgregarTema(Server, Page.Header, ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcTem);
                'UtilitarioWeb.AgregarScriptJqueryUI(Server, Page.Header, ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcTem);

            End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    'protected void Common_Controles_BusquedaPrincipal_Load(object sender, System.EventArgs e)
    '{


    '}

#Region "Genera Scripts Cliente"



    Private Sub ConfigurarGrid(lstCampo As List(Of ENT_ENT_Campo), oEntidad As ENT_ENT_Entidad)
        Dim script As String = Nothing
        Dim scriptCodigo As String = "var codigo_" + Me.ClientID + ";"
        Dim scriptDescripcion As String = "var descripcion_" + Me.ClientID + ";"
        Dim IdPrim As String = ""
        Dim Columna As String = "var columnas_" + Me.ClientID + "=["
        Dim iContador As Integer = 0
        Dim blDescripcionVacia As Boolean = False
        If String.IsNullOrEmpty(_Descripcion) Then
            blDescripcionVacia = True
        End If

        For Each oCampo As ENT_ENT_Campo In lstCampo
            iContador += 1
            If oCampo.btIdPri Then
                If Not String.IsNullOrEmpty(IdPrim) Then
                    IdPrim += ","
                End If
                IdPrim += oCampo.vcNomAlias
            End If

            Columna = (Columna & Convert.ToString("{ name: '")) + oCampo.vcNomAlias + "', index: '" + oCampo.vcNomAlias + "', width: " + oCampo.inLar.ToString() + ", label: '" + oCampo.vcDes.Replace("'", "\'") + "'"

            If oCampo.btOrd And oEntidad.btOrd Then
                Columna = Columna & Convert.ToString(", sortable: true")
            Else
                Columna = Columna & Convert.ToString(", sortable: false")
            End If

            If oCampo.btVis And oCampo.btVig Then
                Columna = Columna & Convert.ToString(", hidden: false")
            Else
                Columna = Columna & Convert.ToString(", hidden: true")
            End If

            If oCampo.btEliLog Then
                Columna = Columna & Convert.ToString(", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return 'Si'; else return 'No'; }")
                'formatter:'checkbox'"
                Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScriptKey2_" + Me.ClientID, "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" + oCampo.vcNom + "': 'Eliminado' });}", True)
            ElseIf oCampo.inTipDat = 6 Then
                'formatter:'checkbox'"
                Columna = Columna & Convert.ToString(", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return 'Si'; else return 'No'; }")
            Else
                Columna = Columna & Convert.ToString(", align: 'Left'")
            End If
            'nuevo alinear columna moneda
            If oCampo.inTipDat = 4 Or oCampo.inTipDat = 5 Then
                Columna = Columna & Convert.ToString(", align: 'Right'")
            ElseIf oCampo.inTipDat = 3 Then
                'formatter:'currency', formatoptions:{decimalSeparator:",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "$ "}
                'formatter:'date', formatoptions: {newformat: 'm/d/Y'}
                'datefmt: 'M d h:i'
                'Columna = Columna & ", formatter:'date'" ',datefmt: 'M d h:i'"
                Columna = Columna & Convert.ToString(", align: 'Right'")
            End If
            Columna = Columna & Convert.ToString(" },")

            If oCampo.btIdPri Then
                _CodigoInterno = oCampo.vcNom
            End If
            'If _Codigo = "" Then If oCampo.btIdPri Then _Codigo = oCampo.vcNom
            If blDescripcionVacia Then
                _Descripcion = oCampo.vcNom

            End If
        Next

        Columna = Columna.Substring(0, Columna.Length - 1) + "]; "

        Dim TamanoPaginaArray As String() = oEntidad.vcTamPag.Split(","c)

        If Not TamanoPaginaArray.Contains(oEntidad.inTamPag.ToString()) Then
            oEntidad.inTamPag = Integer.Parse(TamanoPaginaArray(0))
        End If

        'Dim vcVarConJQ As Dynamic = ""
        Dim vcVarConJQ As String = ""
        If String.IsNullOrEmpty(_VariableCondicionJQ.ToString()) Then
            _VariableCondicionJQ = "vcVarConJQ"
        End If
        vcVarConJQ = (Convert.ToString("var ") & _VariableCondicionJQ) + " = '';"

        script = (Convert.ToString((Convert.ToString((Convert.ToString("var MargenFiltro = 0;var MargenHeight = 48;var nuAltoFila = 23.04;var FiltroRegistro = 1;" + vcVarConJQ + "var " + Me.ClientID + "_Valor='") & _CodigoValor) + "'; validarDatosAjax_" + Me.ClientID + "=false;var buscarValor_" + Me.ClientID + "='';var cargarGrilla_" + Me.ClientID + "=0;var id_" + Me.ClientID + ";var " + Me.ClientID + "_idTabla = '") & IdPrim) + "'; ") & Columna) + "var titulo = '" + oEntidad.vcDes + "';" + "var TamanoPagina = '" + oEntidad.inTamPag.ToString() + "';" + "var TamanosPaginaSel = [" + oEntidad.vcTamPag + "];"

        Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScriptKey_" + Me.ClientID, script, True)
    End Sub

    Private Sub ConfiguraObjetosJavaScript(ListaCampos As List(Of ENT_ENT_Campo))
        Dim sbScript As New StringBuilder()



        sbScript.AppendLine("$(document).ready(function () {")
        sbScript.AppendLine("   $('.btnButton').button();")
        sbScript.AppendLine("   fnValidarDatosIniciales_" + Me.ClientID + "();")
        sbScript.AppendLine("   var inAltGrid_" + Me.ClientID + " = 235;")
        sbScript.AppendLine("   var inFilas_" + Me.ClientID + " = Math.floor(inAltGrid_" + Me.ClientID + " / nuAltoFila);")

        sbScript.Append(ObtieneScript_txtValor_Keydown())
        sbScript.Append(ObtieneScript_btnAceptar_Click())
        sbScript.Append(ObtieneScript_btnCancelar_Click())
        sbScript.Append(ObtieneScript_btnBuscar_Click())
        sbScript.Append(ObtieneScript_DefinejqGrid())
        sbScript.Append(ObtieneScript_txtValorBusqueda_Keydown())

        sbScript.Append(ObtieneScript_ValidarDeshabilitado())
        sbScript.AppendLine("});")

        If Not String.IsNullOrEmpty(_Contenedor) Then
            sbScript.Append(ObtieneHtmlControl(ListaCampos))
        End If


        sbScript.AppendLine(ObtieneScript_fnValidarFuncionalidadAdicional())
        sbScript.AppendLine(ObtieneScript_fnEstadoOK())
        sbScript.AppendLine(ObtieneScript_fnEstadoEditado())
        sbScript.AppendLine(ObtieneScript_ValidarDatosIniciales())

        Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScriptKey_ConfiguraObjetosJavaScript_" + Me.ClientID, sbScript.ToString(), True)

    End Sub

    Private Function ObtieneScript_ValidarDeshabilitado() As String
        Dim sbScript As New StringBuilder()
        If _Deshabilitado Then
            sbScript.AppendLine("$('#" + Me.ClientID + "_imgBusqueda').hide(); ")
            sbScript.AppendLine("$('#" + Me.ClientID + "_txtValorBusqueda').attr('disabled','disabled');")
            sbScript.AppendLine("$('#" + Me.ClientID + "_txtValorBusqueda').css('color','#545454');")
        End If
        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_btnAceptar_Click() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("$('#" + Me.ClientID + "_btnAceptar').live('click', function () {")
        sbScript.Append(ObtieneScript_fnSeleccionarItem())
        sbScript.AppendLine("});")
        Return sbScript.ToString()
    End Function


    Private Function ObtieneScript_txtValor_Keydown() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("$('#" + Me.ClientID + "_txtValor').keydown(function (event) {")
        sbScript.AppendLine("   if (event.keyCode == 13) {")
        sbScript.AppendLine("       $('#" + Me.ClientID + "_txtValor').val($('#" + Me.ClientID + "_txtValor').val().replace(/\\/g, ''));")
        sbScript.AppendLine("       buscarValor_" + Me.ClientID + " = $('#" + Me.ClientID + "_txtValor').val();")
        sbScript.AppendLine("       $('#" + Me.ClientID + "_grid').trigger('reloadGrid');")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("});")
        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_dvDetalleBusqueda_dialog() As String
        Dim sbScript As New StringBuilder()
        Dim vWidth As String = "540"
        If _EsDinamico Then
            vWidth = "560"
        End If
        sbScript.AppendLine("$('#" + Me.ClientID + "_dvDetalleBusqueda').dialog({")
        sbScript.AppendLine((Convert.ToString("   width: ") & vWidth) & ",")
        'sbScript.AppendLine("   height: 425,")
        sbScript.AppendLine("   height: " & _AltoDialog & ",")
        sbScript.AppendLine((Convert.ToString("   title: 'Búsqueda - ") & _nombreentidad) + "',")
        sbScript.AppendLine("   modal: true")
        sbScript.AppendLine("});")
        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_btnCancelar_Click() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("$('#" + Me.ClientID + "_btnCancelar').live('click', function () {")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_dvDetalleBusqueda').dialog('close');")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_txtValorBusqueda').focus();")
        sbScript.AppendLine("});")
        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_DefinejqGrid() As String

        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("   $('#" + Me.ClientID + "_grid').jqGrid({")
        sbScript.AppendLine("       sortable: true,")
        sbScript.AppendLine("       datatype: function () {")
        sbScript.AppendLine("           if (cargarGrilla_" + Me.ClientID + " == 0) { cargarGrilla_" + Me.ClientID + " = 1;return;}")
        sbScript.AppendLine("           var Metodo = raiz('Common/WebService/General.asmx/ListarBusquedaGeneral');")
        'sbScript.AppendLine("           var Metodo = raizX('Common/WebService/General.asmx/ListarBusquedaGeneral');");
        'sbScript.AppendLine("           var Metodo = '../../Common/WebService/General.asmx/ListarBusquedaGeneral';");
        sbScript.AppendLine("           $.ajax({")
        sbScript.AppendLine("               url: Metodo, //PageMethod")
        sbScript.AppendLine("               data: " + Chr(34) + "{'inPagTam':'" + Chr(34) + " + $('#" + Me.ClientID + "_grid').getGridParam('rowNum') + " + Chr(34) + "'," + Chr(34) + " + //Tamaño de pagina")
        sbScript.AppendLine("               " + Chr(34) + "'inPagAct':'" + Chr(34) + " + parseInt($('#" + Me.ClientID + "_grid').getGridParam('page')) + " + Chr(34) + "'," + Chr(34) + " + //Pagina actual")
        sbScript.AppendLine("               " + Chr(34) + "'vcOrdCol':'" + Chr(34) + " + $('#" + Me.ClientID + "_grid').getGridParam('sortname') + " + Chr(34) + "'," + Chr(34) + " + //Nombre de columna ordenado")
        sbScript.AppendLine("               " + Chr(34) + "'vcTipOrdCol':'" + Chr(34) + " + $('#" + Me.ClientID + "_grid').getGridParam('sortorder') + " + Chr(34) + "'," + Chr(34) + " + //Tipo de orden de columna asc, desc")
        sbScript.AppendLine((Convert.ToString("               " + Chr(34) + "'vcCam':'") & _Descripcion) + "'," + Chr(34) + " + //Campo de busqueda")
        sbScript.AppendLine((Convert.ToString("               " + Chr(34) + "'vcCamCodigo':'") & _Codigo) + "'," + Chr(34) + " + //Valor de busqueda")
        sbScript.AppendLine("               " + Chr(34) + "'vcValBus':'" + Chr(34) + " + buscarValor_" + Me.ClientID + ".replace(/'/g, '&#39') + " + Chr(34) + "'," + Chr(34) + " + //Valor de busqueda")
        sbScript.AppendLine((Convert.ToString("               " + Chr(34) + "'vcTab':'") & _vcTab) + "'," + Chr(34) + " + //Tabla")
        sbScript.AppendLine("               " + Chr(34) + "'inTipOri':'" & _TipoOrigen & "'," & Chr(34) & " + //TipoOrigen")
        sbScript.AppendLine("               " + Chr(34) + "'inTipCre':'" + (If((_EsDinamico), "2", "1")) + "'," + Chr(34) + " + //TipoCreacion")
        sbScript.AppendLine("               " + Chr(34) + "'inFilReg':'" + Chr(34) + " + FiltroRegistro + " + Chr(34) + "'," + Chr(34) + "+ //FiltroRegistro")
        sbScript.AppendLine("               " + Chr(34) + "'vcCon':'" + _Condicion.Replace("$$$", """") + "'," + Chr(34) + " + //Condicion Servidor")
        sbScript.AppendLine((Convert.ToString("               " + Chr(34) + "'vcConJQ':'" + Chr(34) + " + ") & _VariableCondicionJQ) + " + " + Chr(34) + "'}" + Chr(34) + ", //Condicion JQuery")
        sbScript.AppendLine("               dataType: 'json',")
        sbScript.AppendLine("               type: 'post',")
        sbScript.AppendLine("               contentType: 'application/json; charset=utf-8',")
        sbScript.AppendLine("               success: function (result) {")
        sbScript.AppendLine("                   $('#" + Me.ClientID + "_grid')[0].addJSONData(result.d);")
        sbScript.AppendLine("                   fnValidarFuncionalidadAdicional_" + Me.ClientID + "(result.d);")
        sbScript.AppendLine("               },")
        sbScript.AppendLine("               error: function (xhr, err, thrErr) {")
        sbScript.AppendLine("                   MostrarErrorAjax(xhr, err, thrErr);")
        sbScript.AppendLine("               }")
        sbScript.AppendLine("           });")
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
        sbScript.AppendLine("       colModel: columnas_" + Me.ClientID + ", //Columns")
        sbScript.AppendLine("       pager: '#" + Me.ClientID + "_pager', //Pager.")
        sbScript.AppendLine("       loadtext:  'Cargando datos...',")
        sbScript.AppendLine("       recordtext: '{0} - {1} de {2} elementos',")
        sbScript.AppendLine("       emptyrecords:  'No hay resultados',")
        sbScript.AppendLine("       pgtext:  'Pág: {0} de {1}', //Paging input control text format.")
        sbScript.AppendLine("       rowNum: inFilas_" + Me.ClientID + ", //TamanoPagina, //'10' PageSize.")
        'sbScript.AppendLine("       rowList: TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. ")
        sbScript.AppendLine("       viewrecords: true, //Show the RecordCount in the pager.")
        sbScript.AppendLine("       multiselect: false,")
        sbScript.AppendLine("       sortname: " + Me.ClientID + "_idTabla, //Default SortColumn")
        sbScript.AppendLine("       sortorder: 'asc', //Default SortOrder.")
        sbScript.AppendLine("       width: 510,")
        sbScript.AppendLine("       height: 235,")
        sbScript.AppendLine("       rownumbers: true,")
        sbScript.AppendLine("       //caption: titulo,")
        sbScript.AppendLine("       shrinkToFit: false,")
        sbScript.AppendLine("       //viewsortcols: true,")
        sbScript.AppendLine("       onSelectRow: function (id) {")
        sbScript.AppendLine("           id_" + Me.ClientID + " = id;")
        sbScript.AppendLine("       },")
        sbScript.AppendLine("       ondblClickRow: function (id) {")
        sbScript.AppendLine("           id_" + Me.ClientID + " = id;")
        sbScript.AppendLine("           $('#" + Me.ClientID + "_btnAceptar').click();")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       },")
        sbScript.AppendLine("       gridComplete: function () {")
        sbScript.AppendLine("           $('#" + Me.ClientID + "_grid').jqGrid('hideCol', 'cb');")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("   }).navGrid('#" + Me.ClientID + "_pager', { edit: false, add: false, search: false, del: false });")
        Return sbScript.ToString()

    End Function

    Private Function ObtieneScript_fnValidarFuncionalidadAdicional() As String
        Dim sbScript As New StringBuilder()

        sbScript.AppendLine("function fnValidarFuncionalidadAdicional_" + Me.ClientID + "(_datos){")
        'sbScript.AppendLine("   //Validar Datos...")
        sbScript.AppendLine("   if (validarDatosAjax_" + Me.ClientID + " == true){")
        sbScript.AppendLine("       validarDatosAjax_" + Me.ClientID + " = false;")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       if (_datos.Items.length == 0){")
        If MuestraMensajeNoDatos Then
            sbScript.AppendLine("           alerta('No se encontraron datos');")
        End If
        sbScript.AppendLine("           $('#" + Me.ClientID + "_txtValorBusqueda').focus().select();")
        sbScript.AppendLine("           fnEstadoEditado_" + Me.ClientID + "();")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else if (_datos.Items.length == 1){")
        sbScript.AppendLine("           var datos = $('#" + Me.ClientID + "_grid').jqGrid('getRowData', 1);")
        sbScript.AppendLine((Convert.ToString("           var id = (datos.") & _CodigoInterno) + "); ")
        sbScript.AppendLine((Convert.ToString("           var descripcion = (datos.") & _Descripcion) + ");")
        If String.IsNullOrEmpty(_Codigo) Then
            sbScript.AppendLine("           $('#" + Me.ClientID + "_txtValorBusqueda').val(descripcion);")
        Else
            sbScript.AppendLine((Convert.ToString("           var codigo = (datos.") & _Codigo) + ");")
            sbScript.AppendLine("           $('#" + Me.ClientID + "_txtValorBusqueda').val(codigo + '=' + descripcion);")
        End If
        sbScript.AppendLine("           fnEstadoOK_" + Me.ClientID + "(id);")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       else {")
        sbScript.AppendLine("           var buscarValor = $('#" + Me.ClientID + "_txtValorBusqueda').val();")
        sbScript.AppendLine("           var indiceValor = buscarValor.indexOf('=');")
        sbScript.AppendLine("           if (indiceValor>=0 ) { ")
        sbScript.AppendLine("               buscarValor = buscarValor.substring(0,indiceValor);")
        sbScript.AppendLine("           }")
        sbScript.AppendLine("           $('#" + Me.ClientID + "_txtValor').val(buscarValor);")
        sbScript.AppendLine(ObtieneScript_dvDetalleBusqueda_dialog())
        sbScript.AppendLine("       }")

        sbScript.AppendLine("   }")
        sbScript.AppendLine("}")


        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_btnBuscar_Click() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("$('#" + Me.ClientID + "_btnBuscar').live('click', function () {")
        sbScript.AppendLine((Convert.ToString("   var Titulo = 'Búsqueda - ") & _nombreentidad) + "';")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_txtValor').val('');")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_txtValor').focus();")
        sbScript.AppendLine("   buscarValor_" + Me.ClientID + " = $('#" + Me.ClientID + "_txtValor').val();")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_grid').trigger('reloadGrid');")
        sbScript.AppendLine(ObtieneScript_dvDetalleBusqueda_dialog())
        sbScript.AppendLine("});")
        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_fnSeleccionarItem() As String
        Dim sbScript As New StringBuilder()
        'Si no se envia las propiedades de Codigo y Descripción, 
        'se considera temporalmente que la segunda columna es la que contiene la descripción y el codigo se toma del campo btIdPri
        sbScript.AppendLine("var datos = $('#" + Me.ClientID + "_grid').jqGrid('getRowData', id_" + Me.ClientID + ");")
        sbScript.AppendLine("if (datos.length>1) { alerta('Seleccione un registro'); return;}")
        sbScript.AppendLine((Convert.ToString("if ('") & _CodigoInterno) + "' == '') { alerta('Se debe definir un campo como PrimaryKey'); return;}")
        sbScript.AppendLine((Convert.ToString("var descripcion = (datos.") & _Descripcion) + ");")
        If String.IsNullOrEmpty(_CodigoInterno) Then
            sbScript.AppendLine("var id = '';")
        Else
            sbScript.AppendLine((Convert.ToString("var id = (datos.") & _CodigoInterno) + ");")
        End If
        If String.IsNullOrEmpty(_Codigo) Then
            sbScript.AppendLine("var codigo = '';")
            sbScript.AppendLine("$('#" + Me.ClientID + "_txtValorBusqueda').val(descripcion);")
        Else
            sbScript.AppendLine((Convert.ToString("var codigo = (datos.") & _Codigo) + ");")
            sbScript.AppendLine("$('#" + Me.ClientID + "_txtValorBusqueda').val(codigo + '=' + descripcion);")
        End If
        sbScript.AppendLine("fnEstadoOK_" + Me.ClientID + "(id);")
        sbScript.AppendLine("$('#" + Me.ClientID + "_dvDetalleBusqueda').dialog('close');")

        Return sbScript.ToString()
    End Function


    Private Function ObtieneScript_txtValorBusqueda_Keydown() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("$('#" + Me.ClientID + "_txtValorBusqueda').keydown(function (event) {")
        sbScript.AppendLine("   if( event.keyCode!= 13 && event.keyCode!= 8 && (event.keyCode<32 || (event.keyCode>=112 && event.keyCode<=123) ||  (event.keyCode>=144 ))){return;}")
        'No considera al TAB
        sbScript.AppendLine("   if (event.keyCode == 13) {")
        sbScript.AppendLine("       $('#" + Me.ClientID + "_txtValorBusqueda').val($('#" + Me.ClientID + "_txtValorBusqueda').val().replace(/\\/g, ''));")
        'comentado jcmacho
        'sbScript.AppendLine("       $('#" + this.ClientID + "_txtValorBusqueda').val($('#" + this.ClientID + "_txtValorBusqueda').val();");
        sbScript.AppendLine("       buscarValor_" + Me.ClientID + " = $.trim($('#" + Me.ClientID + "_txtValorBusqueda').val());")
        sbScript.AppendLine("       var indiceValor = buscarValor_" + Me.ClientID + ".indexOf('=');")
        sbScript.AppendLine("       if (indiceValor>=0 ) { ")
        sbScript.AppendLine("           buscarValor_" + Me.ClientID + " = buscarValor_" + Me.ClientID + ".substring(0,indiceValor);")
        sbScript.AppendLine("       }")
        sbScript.AppendLine("       $('#" + Me.ClientID + "_txtValor').focus();")
        sbScript.AppendLine("       validarDatosAjax_" + Me.ClientID + " = true;")
        sbScript.AppendLine("       $('#" + Me.ClientID + "_grid').trigger('reloadGrid');")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("   else{")
        sbScript.AppendLine("       fnEstadoEditado_" + Me.ClientID + "();")
        sbScript.AppendLine("   }")
        sbScript.AppendLine("});")
        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_fnEstadoOK() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("function fnEstadoOK_" + Me.ClientID + "(valor){")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_txtValorBusqueda').css({'color':'#354E72'}); ")
        sbScript.AppendLine("   " + Me.ClientID + "_Valor=valor;")

        If Not String.IsNullOrEmpty(_FuncionPersonalizada) Then
            sbScript.AppendLine((Convert.ToString("   ") & _FuncionPersonalizada) + "(valor);")
        End If

        sbScript.AppendLine("}")
        Return sbScript.ToString()
    End Function


    Private Function ObtieneScript_fnEstadoEditado() As String
        Dim sbScript As New StringBuilder()
        sbScript.AppendLine("function fnEstadoEditado_" + Me.ClientID + "(){")
        sbScript.AppendLine("   $('#" + Me.ClientID + "_txtValorBusqueda').css({'color':'#BE2E25'}); ")
        sbScript.AppendLine("   " + Me.ClientID + "_Valor='';")

        If Not String.IsNullOrEmpty(_FuncionPersonalizada) Then
            sbScript.AppendLine((Convert.ToString("   ") & _FuncionPersonalizada) + "('');")
        End If

        sbScript.AppendLine("}")
        Return sbScript.ToString()
    End Function

#End Region

    Private Function ObtieneScript_ValidarDatosIniciales() As String
        Dim sbScript As New StringBuilder()
        Dim tipoCreacion As Integer = 1
        If _EsDinamico Then
            tipoCreacion = 2
        End If
        sbScript.AppendLine("function fnValidarDatosIniciales_" + Me.ClientID + "() {")
        If Not String.IsNullOrEmpty(_CodigoValor) Then
            'BL_ENT_Campo Campo = new BL_ENT_Campo(_TipoOrigen, ((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
            Dim Campo As New BL_ENT_Campo()
            'List<ENT_ENT_Campo> lstCampo = Campo.Listar(_vcTab, (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"], tipoCreacion);
            Dim lstCampo As List(Of ENT_ENT_Campo) = Campo.Listar(_vcTab, 1, tipoCreacion)
            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(1, 1, _Codigo, "asc", vcTab, lstCampo, _
             "", _CodigoInterno, "", _CodigoValor, Integer.Parse("1"), _Condicion.Replace("###", "'").Replace("|", "'"), _
             "")


            'Campo.Dispose();

            If dsDetalle.Tables.Count > 0 AndAlso dsDetalle.Tables(1).Rows.Count > 0 Then
                Dim strCodigoValor As String = ""
                If Not String.IsNullOrEmpty(_Codigo) Then
                    strCodigoValor = dsDetalle.Tables(1).Rows(0)(_Codigo).ToString()
                End If
                Dim strDescripcionValor As String = "" + dsDetalle.Tables(1).Rows(0)(_Descripcion).ToString()
                sbScript.AppendLine("   if (" + Me.ClientID + "_Valor != '') {")
                sbScript.AppendLine("       var id = " + Me.ClientID + "_Valor;")
                sbScript.AppendLine((Convert.ToString("       var descripcion ='") & strDescripcionValor) + "';")
                If String.IsNullOrEmpty(_Codigo) Then
                    sbScript.AppendLine("       $('#" + Me.ClientID + "_txtValorBusqueda').val(descripcion);")
                Else
                    sbScript.AppendLine((Convert.ToString("       var codigo ='") & strCodigoValor) + "';")
                    sbScript.AppendLine("       $('#" + Me.ClientID + "_txtValorBusqueda').val(codigo + '=' + descripcion);")
                End If
                sbScript.AppendLine("       fnEstadoOK_" + Me.ClientID + "(id);")

                sbScript.AppendLine("   }")
            End If
        End If
        sbScript.AppendLine("}")

        Return sbScript.ToString()
    End Function

    Private Function ObtieneHtmlControl(ListaCampos As List(Of ENT_ENT_Campo)) As Object
        Dim rutaImagen As String = String.Empty
        rutaImagen = _RutaRaiz & Convert.ToString("Common/Images/Mantenimiento/busqueda_generico.png")
        Dim strCont As String = String.Empty

        Dim sbScript As New StringBuilder()
        sbScript.Append("<table id='" + Me.ClientID + "_tbControles' border='0' cellpadding='0' cellspacing='0'>")
        sbScript.Append("   <tr>")
        sbScript.Append("       <td>")
        sbScript.Append("           <input id='" + Me.ClientID + "_txtValorBusqueda' type='text' style='width:" & _ancho & "px;' />")
        sbScript.Append("       </td>")
        sbScript.Append("        <td style='width: 2px;'></td>")
        sbScript.Append("        <td>")
        sbScript.Append("            <div title='Buscar (Enter)' id ='" + Me.ClientID + "_btnBuscar' style='cursor: hand; cursor: pointer;' >")
        sbScript.Append((Convert.ToString("                <img id = '" + Me.ClientID + "_imgBusqueda' width='22px' alt='Buscar (Enter)' src='") & rutaImagen) & "' /> ")
        sbScript.Append("            </div>")
        sbScript.Append("        </td>")
        sbScript.Append("    </tr>")
        sbScript.Append("</table>")

        sbScript.Append("<div id='" + Me.ClientID + "_dvDetalleBusqueda' style='display: none;'>")
        sbScript.Append("    <table>")
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
        sbScript.Append("                            <select id='" + Me.ClientID + "_ddlBusqueda' class='ddlBusqueda' style='font-weight:normal;display:none;' width='150px'>")
        For Each v_oCampo As ENT_ENT_Campo In ListaCampos
            If v_oCampo.btFil And v_oCampo.btVig Then
                sbScript.Append("                       <option value='" + v_oCampo.vcNomAlias + "'>" + v_oCampo.vcDes + "</option>")
            End If
        Next
        sbScript.Append("                            </select>")
        sbScript.Append("                            Buscar:&nbsp;")
        sbScript.Append("                        </td>")
        sbScript.Append("                        <td style='width:220px'>")
        sbScript.Append("                           <input id='" + Me.ClientID + "_txtValor' class='txtValor' type='text' style='width:448px; margin-left:5px; font-weight:normal;' />")
        sbScript.Append("                        </td>")
        sbScript.Append("                    </tr>")
        sbScript.Append("                </table>")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("        <tr>")
        sbScript.Append("            <td colspan='2'>")
        sbScript.Append("                <table id='" + Me.ClientID + "_grid' ></table>")
        sbScript.Append("                <div id='" + Me.ClientID + "_pager' ></div>")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("        <tr>")
        sbScript.Append("            <td colspan='2' align='right'>")
        sbScript.Append("                <input id='" + Me.ClientID + "_btnAceptar' class='btnButton' type='button' value='Aceptar' />")
        sbScript.Append("                &nbsp;")
        sbScript.Append("                <input id='" + Me.ClientID + "_btnCancelar' class='btnButton' type='button' value='Cancelar' />")
        sbScript.Append("            </td>")
        sbScript.Append("        </tr>")
        sbScript.Append("    </table>")
        sbScript.Append("</div>")

        strCont += (Convert.ToString("$('#") & _Contenedor) + "').append("""
        strCont += sbScript.ToString()
        strCont += """);"
        Return strCont
    End Function



End Class
