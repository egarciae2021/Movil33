var vcOpcCol;
var inOpcEdi = "";
var vcNomFilOpc = "";
var vcOfiMod = "";
var inModEdi = "";
var indice = 1;
var vcUsuOpe = "";
var inVenEdi = "";
var inGruAteEdi = "";
var vcGruEmp = "";
var vcDispAten = "";
var inDisEdi = "";
var inVisEdi = "";
var dll = [];
var lst = [];
var dllAct = [];
//carpeta de dominio
var CarpetaDominio = '';
var IdDominio = '-1';

function GrupoOrigen(vcCodGrup, vcNomGrup) {
    this.vcCodGrup = vcCodGrup;
    this.vcNomGrup = vcNomGrup;
}

function TipoInterfaz(vcCodInter, vcNomInter) {
    this.vcCodInter = vcCodInter;
    this.vcNomInter = vcNomInter;
}

$(function () {
    IdDominio = window.top.$("#hdfCodigoDominio").val() != '' ? window.top.$("#hdfCodigoDominio").val() : '-1';
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    //-------------------------------------------------------------------------------------------//
    //------------------------------------------INICIAL------------------------------------------//
    //-------------------------------------------------------------------------------------------// 
    //var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //var Accord = window.parent.$("#" + Nametab);

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });
    var accordion = $("#AccordionJQ1").data("accordion");

    var tabOpciones = $("#tabOpciones").tabs({});
    var tabDispensador = $("#tabDispensador").tabs({});
    var tabVisualizador = $("#tabVisualizador").tabs({});
    var tabAtenciones = $("#tabAtenciones").tabs({});

    $(".CajaTexto").keypress(function (e) {
        if (e.keyCode == 34 || e.keyCode == 39) {
            return false;
        }
    });

    $("#txtNumVentanilla").keypress(ValidarEntero);
    $("#txtPesGrupoAtencion").keypress(ValidarEntero);
    $("#txtNumOpcOpciones").keypress(ValidarEntero);
    $("#txtNumFilOpciones").keypress(ValidarEntero);
    $("#txtNumColOpciones").keypress(ValidarEntero);
    $("#txtNumAteAtenciones").keypress(ValidarEntero);
    $("#txtNumFilAtenciones").keypress(ValidarEntero);
    $("#txtNumColAtenciones").keypress(ValidarEntero);
    $("#txtTiempoEspera").keypress(ValidarEntero);
    $("#txtTiempoRetAteCan").keypress(ValidarEntero);

    $("#txtPrefijo").keypress(ValidarNoEspacio);
    $("#txtDesVentanilla").keypress(ValidarNoEspacio);
    $("#txtPreGrupoAtencion").keypress(ValidarNoEspacio);
    $("#txtCodDispensador").keypress(ValidarNoEspacio);
    $("#txtCodVisualizador").keypress(ValidarNoEspacio);

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        tabOpciones.css("width", $(window).width() - 95);
        tbOpcion.setGridWidth($(window).width() - 137);
        tbModulo.setGridWidth($(window).width() - 137);
        tbOperador.setGridWidth($(window).width() - 137);
        tbVentanilla.setGridWidth($(window).width() - 137);
        tbGrupoAtencion.setGridWidth($(window).width() - 137);

        tabDispensador.css("width", $(window).width() - 95);
        tbDispensador.setGridWidth($(window).width() - 137);
        tbVisualizador.setGridWidth($(window).width() - 137);

        tabVisualizador.css("width", $(window).width() - 95);
        tabAtenciones.css("width", $(window).width() - 95);
    }

    function inicioPagina() {
        DimPosElementos();
        fnControlesIniciales();
    }

    var vcSubCarpeta = 'Atenciones';
    if (IdDominio != '-1') {
        vcSubCarpeta = vcSubCarpeta + '\\' + IdDominio;
    }

    new AjaxUpload('#UploadButtonImagen', {
        action: '../../Common/Controladores/UploadHandler.ashx?vcSubCarpeta=' + vcSubCarpeta,
        onComplete: function (file, response) {
            if (response != "") {
                vcNomFilOpc = response.substring(response.indexOf(">") + 1, response.lastIndexOf("<"));
                //alert(response);
                $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../Common/Images/remove.png' onclick=\"DeleteFile('" + vcNomFilOpc + "')\"/>&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + vcNomFilOpc + "'>" + vcNomFilOpc + "</span></div>").appendTo('#UploadedFileImagen');
                $("#UploadButtonImagen").hide();
            } else {
                alerta("El tamaño del archivo no puede ser mayor a 10MB.");
            }
        },
        onSubmit: function (file, ext) {
            if (!(ext && /^(bmp|jpg|png)$/i.test(ext))) {
                alerta('Formato inválido');
                return false;
            }
        }
    });

    $('#colorSelector').ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onSubmit: function (hsb, hex, rgb) {
            $('#colorSelector div').css('backgroundColor', '#' + hex);
            vcOpcCol = "#" + hex;
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //------------------------------------------OPCIONES-----------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbOpcion = $("#tbOpcion").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdOpcionAtencion', Campo: 'IdOpcionAtencion', label: 'IdOpcionAtencion', hidden: true, width: 150 },
                    { name: 'IdCliente', Campo: 'IdCliente', label: 'IdCliente', hidden: true, width: 150 },
                    { name: 'Nombre', index: 'Nombre', label: 'Nombre', hidden: false, width: 150 },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', hidden: false, width: 150 },
                    { name: 'NombreImagen', index: 'NombreImagen', label: 'Imágen', hidden: false, width: 150 },
                    { name: 'Prefijo', index: 'Prefijo', label: 'Prefijo', hidden: false, width: 50, align: 'Center' },
                    { name: 'Color', index: 'Color', label: 'Color', hidden: true, width: 50, align: 'Center' },
                    { name: 'opColor', index: 'opColor', label: 'Color', hidden: false, width: 50, align: 'Center',
                        formatter: function (value, options, rData) {
                            return '<input style="width:30px; background-color:' + rData.Color + '; border-style:none;" disabled/>';
                        }
                    },
                    { name: 'IdOpcionPadre', index: 'IdOpcionPadre', label: 'IdOpcionPadre', hidden: true, width: 100 },
                    { name: 'VisualizaOpcion', index: 'VisualizaOpcion', label: 'Mostrar Opción', hidden: false, width: 100, align: 'Center' },
                    { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 100 },
                    { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', hidden: false, width: 70, align: 'Center' },
                    { name: 'btVig', index: 'btVig', label: 'Vigente', hidden: true, width: 80, align: 'Center' },
                    { name: 'inEntidad', index: 'inEntidad', label: 'inEntidad', hidden: true, width: 100 },
                    { name: 'vcEntidad', index: 'vcEntidad', label: 'Entidad', hidden: false, width: 100 }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "IdOpcionAtencion", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Opciones",
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = tbOpcion.getRowData(rowid);

            inOpcEdi = rowid;
            vcOpcCol = row.Color;

            $("#tbDatosOpciones").show();

            $("#txtDesOpcion").val(row.Descripcion);
            $("#txtPrefijo").val(row.Prefijo);
            $('#colorSelector div').css('backgroundColor', row.Color);
            $(".colorpicker_current_color").css('backgroundColor', row.Color);
            $(".colorpicker_hex input").val(row.Color.substr(1));
            $("#ddlEntidad").val(row.inEntidad);
            if (row.VisualizaOpcion == 'SI') {
                $("#chkMosOpcOpcion").attr("checked", true);
            }
            else {
                $("#chkMosOpcOpcion").attr("checked", false);
            }

            if (row.NombreImagen != "") {
                $('#UploadedFileImagen').html("");
                $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../Common/Images/remove.png' onclick=\"DeleteFile('" + row.NombreImagen + "')\"/>&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + row.NombreImagen + "'>" + row.NombreImagen + "</span></div>").appendTo('#UploadedFileImagen');
                $("#UploadButtonImagen").hide();
                vcNomFilOpc = row.NombreImagen;
            } else {
                $('#UploadedFileImagen').html("");
                $("#UploadButtonImagen").show();
            }

            $("#btnGuardarOpcion").button("option", "disabled", false);
            $("#btnCancelarOpcion").button("option", "disabled", false);
        }
    });

    var i = 0;
    for (i = 0; i < dtOpciones.length; i++) {
        tbOpcion.jqGrid('addRowData', dtOpciones[i].IdOpcionAtencion, dtOpciones[i]);
    }

    $("#btnGuardarOpcion").live("click", function () {
        if ($.trim($("#txtPrefijo").val()) == "") {
            alerta("El prefijo es requerido.");
            return;
        }
        if ($.trim($("#ddlEntidad").val()) == "-1") {
            alerta("La entidad es requerida.");
            return;
        }

        if (inOpcEdi != "") {
            var row = tbOpcion.getRowData(inOpcEdi);
            var vcMuestra = "NO";
            if ($("#chkMosOpcOpcion").is(":checked")) {
                vcMuestra = "SI";
            }

            var datos = {
                IdOpcionAtencion: row.IdOpcionAtencion,
                IdCliente: row.IdCliente,
                Nombre: row.Nombre,
                Descripcion: $.trim($("#txtDesOpcion").val()),
                NombreImagen: vcNomFilOpc,
                Prefijo: $("#txtPrefijo").val(),
                Color: vcOpcCol,
                opColor: '<input style="width:30px; background-color:' + vcOpcCol + '; border-style:none;" disabled/>',
                VisualizaOpcion: vcMuestra,
                IdEstado: row.IdEstado,
                vcNomEst: row.vcNomEst,
                btVig: row.btVig,
                inEntidad: $("#ddlEntidad").val(),
                vcEntidad: $("#ddlEntidad option:selected").text()
            };

            tbOpcion.jqGrid('setRowData', inOpcEdi, datos);
            inOpcEdi = "";
            $("#tbDatosOpciones").hide();
            fnLimpiarControlesOpcion();
        }
    });

    $("#btnCancelarOpcion").live("click", function () {
        $("#tbDatosOpciones").hide();
        fnLimpiarControlesOpcion();
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //------------------------------------------MÓDULOS------------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbModulo = $("#tbModulo").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdModulo', Campo: 'IdModulo', label: 'IdModulo', hidden: true, width: 150 },
                    { name: 'Descripcion', Campo: 'Descripcion', label: 'Descripción', hidden: false, width: 200 },
                    { name: 'IdOpcion', Campo: 'IdOpcion', label: 'inOpcion', hidden: true, width: 50 },
                    { name: 'vcOpcion', index: 'vcOpcion', label: 'Opción', hidden: false, width: 150 },
                    { name: 'IdOficina', index: 'IdOficina', label: 'inOficina', hidden: true, width: 50 },
                    { name: 'vcOficina', index: 'vcOficina', label: 'Oficina', hidden: false, width: 200 },
                    { name: 'Ubicacion', index: 'Ubicacion', label: 'Ubicación', hidden: false, width: 200, align: 'Left' },
                    { name: 'IdEstado', index: 'IdEstado', label: 'inEstado', hidden: true, width: 50, align: 'Center' },
                    { name: 'vcEstado', index: 'vcEstado', label: 'Estado', hidden: false, width: 150 },
                    { name: 'btVig', index: 'btVig', label: 'Vigente', hidden: false, width: 70, align: 'Center' }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Descripcion", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Módulos",
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = tbModulo.getRowData(rowid);
            inModEdi = rowid;

            $("#tbDatosModulos").show();

            $("#txtDesModulo").val(row.Descripcion);
            $("#ddlOpcModulo").val(row.IdOpcion);
            vcOfiMod = row.IdOficina;
            $("#bpOfiModulo_txtValorBusqueda").val(row.vcOficina);
            $("#txtUbiModulo").val(row.Ubicacion);
            $("#ddlEstModulo").val(row.IdEstado);
            if (row.btVig == 'SI') {
                $("#chkVigModulo").attr("checked", true);
            }
            else {
                $("#chkVigModulo").attr("checked", false);
            }

            fnBotonesActualizarCancelarModulo();
        }
    });

    var i = 0;
    for (i = 0; i < dtModulos.length; i++) {
        tbModulo.jqGrid('addRowData', dtModulos[i].IdModulo, dtModulos[i]);
    }

    $("#btnAgregarModulo").live("click", function () {
        if ($.trim($("#txtDesModulo").val()) == "") {
            alerta("Debe ingresar una descripción válida.");
            return;
        }
        if ($.trim($("#ddlOpcModulo").val()) == "-1") {
            alerta("La opción es requerida.");
            return;
        }
        if (vcOfiMod == "") {
            alerta("Debe elegir una oficina válida.");
            return;
        }
        if ($.trim($("#ddlEstModulo").val()) == "-1") {
            alerta("El estado es requerido.");
            return;
        }

        var lstIdMod = tbModulo.getDataIDs();
        var vcExiste = "0";
        for (i = 0; i < lstIdMod.length; i++) {
            var rowMod = tbModulo.getRowData(lstIdMod[i]);
            if (rowMod.Descripcion.toLowerCase() == $.trim($("#txtDesModulo").val().toLowerCase()) && (inModEdi == "" || tbModulo.getRowData(inModEdi).IdModulo != rowMod.IdModulo)) {
                vcExiste = "1";
            }
        }
        if (vcExiste == "1") {
            alerta("No puede haber más de un módulo con la misma descripción.");
            return;
        }

        var vcVigente = "NO";
        if ($("#chkVigModulo").is(":checked")) {
            vcVigente = "SI";
        }

        if (inModEdi == "") { //Agregar un Módulo

            var datos = {
                IdModulo: "0",
                Descripcion: $.trim($("#txtDesModulo").val()),
                IdOpcion: $("#ddlOpcModulo").val(),
                vcOpcion: $("#ddlOpcModulo option:selected").text(),
                IdOficina: vcOfiMod,
                vcOficina: $("#bpOfiModulo_txtValorBusqueda").val(),
                Ubicacion: $.trim($("#txtUbiModulo").val()),
                IdEstado: $("#ddlEstModulo").val(),
                vcEstado: $("#ddlEstModulo option:selected").text(),
                btVig: vcVigente
            };

            //Agregando en grilla
            tbModulo.jqGrid('addRowData', "_" + indice, datos);
            fnLimpiarControlesModulo();

            var id = "_" + indice;
            if (datos.IdModulo != "0") {
                id = datos.IdModulo;
            }

            //Agregando en los demás combos
            $("#ddlModVentanilla").append($('<option></option>').val(id).html(datos.Descripcion));
            fnSortDropDownListByText("ddlModVentanilla");
            $("#ddlModDispensador").append($('<option></option>').val(id).html(datos.Descripcion));
            fnSortDropDownListByText("ddlModDispensador");
            $("#ddlModVisualizador").append($('<option></option>').val(id).html(datos.Descripcion));
            fnSortDropDownListByText("ddlModVisualizador");

            indice++;

        } else { //Edita un Módulo

            var row = tbModulo.getRowData(inModEdi);

            var datos = {
                IdModulo: row.IdModulo,
                Descripcion: $("#txtDesModulo").val(),
                IdOpcion: $("#ddlOpcModulo").val(),
                vcOpcion: $("#ddlOpcModulo option:selected").text(),
                IdOficina: vcOfiMod,
                vcOficina: $("#bpOfiModulo_txtValorBusqueda").val(),
                Ubicacion: $("#txtUbiModulo").val(),
                IdEstado: $("#ddlEstModulo").val(),
                vcEstado: $("#ddlEstModulo option:selected").text(),
                btVig: vcVigente
            };

            tbModulo.jqGrid('setRowData', inModEdi, datos);
            inModEdi = "";
            fnLimpiarControlesModulo();
            fnBotonesAgregarQuitarModulo();
        }
    });

    $("#btnQuitarModulo").live("click", function () {
        var textoBoton = $("#lblQuitarModulo").text();
        if (textoBoton == "Quitar") {
            if (tbModulo.getGridParam('selrow')) {
                var vcId = tbModulo.getGridParam('selrow').toString();
                var lstId; var vcExiste = "0"; var row; var vcIdVen = "0"; var vcIdDis = "0"; var vcIdVis = "0";

                lstId = tbVentanilla.getDataIDs();
                for (i = 0; i < lstId.length; i++) {
                    row = tbVentanilla.getRowData(lstId[i]);
                    if (row.IdModulo.toString() == vcId) {
                        vcExiste = "1";
                        vcIdVen = row.IdVentanilla;
                    }
                }
                lstId = tbDispensador.getDataIDs();
                for (i = 0; i < lstId.length; i++) {
                    row = tbDispensador.getRowData(lstId[i]);
                    if (row.IdModulo.toString() == vcId) {
                        vcExiste = "1";
                        vcIdDis = row.IdDispensadorAtencion;
                    }
                }
                lstId = tbVisualizador.getDataIDs();
                for (i = 0; i < lstId.length; i++) {
                    row = tbVisualizador.getRowData(lstId[i]);
                    if (row.IdModulo.toString() == vcId) {
                        vcExiste = "1";
                        vcIdVis = row.IdVisualizador;
                    }
                }

                var datos = tbModulo.getRowData(vcId);

                if (vcExiste == "0") {
                    tbModulo.delRowData(vcId);
                    $("#ddlModVentanilla option[value='" + vcId + "']").remove();
                    $("#ddlModDispensador option[value='" + vcId + "']").remove();
                    $("#ddlModVisualizador option[value='" + vcId + "']").remove();
                } else {
                    $('#divConEliMod').dialog({
                        title: "Eliminar Módulo",
                        modal: true,
                        buttons: {
                            "Si": function () {
                                if (vcIdVen != "0") {
                                    tbVentanilla.delRowData(vcIdVen);
                                }
                                if (vcIdDis != "0") {
                                    tbDispensador.delRowData(vcIdDis);
                                }
                                if (vcIdVis != "0") {
                                    tbVisualizador.delRowData(vcIdVis);
                                }

                                tbModulo.delRowData(vcId);
                                $("#ddlModVentanilla option[value='" + vcId + "']").remove();
                                $("#ddlModDispensador option[value='" + vcId + "']").remove();
                                $("#ddlModVisualizador option[value='" + vcId + "']").remove();

                                $(this).dialog("close");
                            },
                            "Cancelar": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                }
            } else {
                alerta("Debe seleccionar un módulo.");
            }
        } else {//Cancelar
            fnLimpiarControlesModulo();
            fnBotonesAgregarQuitarModulo();
            inModEdi = "";
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //----------------------------------------OPERADORES-----------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbOperador = $("#tbOperador").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdOperador', Campo: 'IdOperador', label: 'IdOperador', hidden: true, width: 100 },
                    { name: 'IdUsuario', Campo: 'IdUsuario', label: 'IdUsuario', hidden: true, width: 100 },
                    { name: 'vcUsuario', Campo: 'vcUsuario', label: 'Usuario', hidden: false, width: 100 },
                    { name: 'vcEmpleado', Campo: 'vcEmpleado', label: 'Empleado', hidden: false, width: 400 }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "IdOperador", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Operadores"
    });

    var i = 0;
    for (i = 0; i < dtOperadores.length; i++) {
        tbOperador.jqGrid('addRowData', dtOperadores[i].IdOperador, dtOperadores[i]);
    }

    $("#btnAgregarOperador").live("click", function () {
        if (vcUsuOpe == "") {
            alerta("Debe ingresar un usuario válido");
            return;
        }

        var indexIgual = $("#bpUsuOperador_txtValorBusqueda").val().indexOf("=");

        var lstIdOpe = tbOperador.getDataIDs();
        var vcExiste = "0";
        for (i = 0; i < lstIdOpe.length; i++) {
            var rowOpe = tbOperador.getRowData(lstIdOpe[i]);
            if (rowOpe.IdUsuario == vcUsuOpe) {
                vcExiste = "1";
            }
        }
        if (vcExiste == "1") {
            alerta("El usuario elegido ya es operador.");
            return;
        }

        var datos = {
            IdOperador: "0",
            IdUsuario: vcUsuOpe,
            vcUsuario: $("#bpUsuOperador_txtValorBusqueda").val().substring(0, indexIgual),
            vcEmpleado: $("#bpUsuOperador_txtValorBusqueda").val().substr(indexIgual + 1)
        };

        //Agregando en la grilla
        tbOperador.jqGrid('addRowData', "_" + indice, datos);
        fnLimpiarControlesOperador();

        //Agregando en los demás combos
        $("#ddlOpeVentanilla").append($('<option></option>').val(datos.IdOperador).html(datos.vcUsuario + "=" + datos.vcEmpleado));
        fnSortDropDownListByText("ddlOpeVentanilla");

        indice++;
    });

    $("#btnQuitarOperador").live("click", function () {
        if (tbOperador.getGridParam('selrow')) {
            var vcId = tbOperador.getGridParam('selrow').toString();
            var lstId; var vcExiste = "0"; var row; var vcIdVen = "0";

            lstId = tbVentanilla.getDataIDs();
            for (i = 0; i < lstId.length; i++) {
                row = tbVentanilla.getRowData(lstId[i]);
                if (row.IdOperador.toString() == vcId) {
                    vcExiste = "1";
                    vcIdVen = row.IdVentanilla;
                }
            }

            if (vcExiste == "0") {
                tbOperador.delRowData(vcId);
            } else {
                alerta("Este operador no puede ser eliminado, ya que actualmente está asociado a alguna ventanilla activa.");
                return;
            }
        } else {
            alerta("Debe seleccionar un Operador.");
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //----------------------------------------VENTANILLAS----------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbVentanilla = $("#tbVentanilla").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdVentanilla', Campo: 'IdVentanilla', label: 'IdVentanilla', hidden: true, width: 150 },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Código', hidden: false, width: 50, align: 'Center' },
                    { name: 'IdModulo', Campo: 'IdModulo', label: 'IdModulo', hidden: true, width: 50 },
                    { name: 'vcModulo', Campo: 'vcModulo', label: 'Módulo', hidden: false, width: 200 },
                    { name: 'IdOpcion', index: 'IdOpcion', label: 'IdOpcion', hidden: true, width: 150 },
                    { name: 'vcOpcion', index: 'vcOpcion', label: 'Opción', hidden: false, width: 100 },
                    { name: 'Numero', index: 'Numero', label: 'Número', hidden: false, width: 50, align: 'Center' },
                    { name: 'IdOperador', index: 'IdOperador', label: 'IdOperador', hidden: true, width: 200, align: 'Left' },
                    { name: 'vcOperador', index: 'vcOperador', label: 'Operador', hidden: true, width: 270, align: 'Left' },
                    { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 70, align: 'Center' },
                    { name: 'vcEstado', index: 'vcEstado', label: 'Estado', hidden: false, width: 150, align: 'Center' },
                    { name: 'Automatico', index: 'Automatico', label: 'Automático', hidden: false, width: 70, align: 'Center' },
                    { name: 'btVig', index: 'btVig', label: 'Vigente', hidden: false, width: 70, align: 'Center' },
                    { name: 'TieneDatos', index: 'btVig', label: 'TieneDatos', hidden: true, width: 70, align: 'Center' }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "IdVentanilla", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Ventanillas",
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = tbVentanilla.getRowData(rowid);
            inVenEdi = rowid;

            $("#tbDatosVentanilla").show();

            $("#ddlModVentanilla").val(row.IdModulo);
            $("#ddlOpcVentanilla").val(row.IdOpcion);
            $("#txtNumVentanilla").val(row.Numero);
            $("#txtDesVentanilla").val(row.Descripcion);
            $("#ddlOpeVentanilla").val(row.IdOperador);
            $("#ddlEstVentanilla").val(row.IdEstado);
            if (row.Automatico == "SI") {
                $("#chkAutVentanilla").attr("checked", true);
            }
            else {
                $("#chkAutVentanilla").attr("checked", false);
            }
            if (row.btVig == 'SI') {
                $("#chkVigVentanilla").attr("checked", true);
            }
            else {
                $("#chkVigVentanilla").attr("checked", false);
            }

            fnBotonesActualizarCancelarVentanilla();
        }
    });

    var i = 0;
    for (i = 0; i < dtVentanillas.length; i++) {
        tbVentanilla.jqGrid('addRowData', dtVentanillas[i].IdVentanilla, dtVentanillas[i]);
    }

    $("#btnAgregarVentanilla").live("click", function () {
        if ($.trim($("#ddlModVentanilla").val()) == "-1") {
            alerta("El módulo es requerido.");
            return;
        }
        if ($.trim($("#ddlOpcVentanilla").val()) == "-1") {
            alerta("La opción es requerida.");
            return;
        }
        if ($.trim($("#txtNumVentanilla").val()) == "") {
            alerta("Debe ingresar un número válido.");
            return;
        }
        if ($.trim($("#txtDesVentanilla").val()) == "") {
            alerta("Debe ingresar un código válido.");
            return;
        }
        //        if ($.trim($("#ddlOpeVentanilla").val()) == "-1") {
        //            alerta("El operador es requerido.");
        //            return;
        //        }
        if ($.trim($("#ddlEstVentanilla").val()) == "-1") {
            alerta("El estado es requerido.");
            return;
        }

        var lstIdVen = tbVentanilla.getDataIDs();
        var vcExiste = "0";
        var vcExiNum = "0";
        for (i = 0; i < lstIdVen.length; i++) {
            var rowVen = tbVentanilla.getRowData(lstIdVen[i]);
            if (rowVen.Descripcion.toLowerCase() == $.trim($("#txtDesVentanilla").val().toLowerCase()) && (inVenEdi == "" || tbVentanilla.getRowData(inVenEdi).IdVentanilla != rowVen.IdVentanilla)) {
                vcExiste = "1";
            }
            if (rowVen.Numero == $.trim($("#txtNumVentanilla").val()) && (inVenEdi == "" || tbVentanilla.getRowData(inVenEdi).IdVentanilla != rowVen.IdVentanilla)) {
                vcExiNum = "1";
            }
        }
        if (vcExiste == "1") {
            alerta("No puede haber más de una ventanilla con el mismo código.");
            return;
        }
        if (vcExiNum == "1") {
            alerta("No puede haber más de una ventanilla con el mismo número.");
            return;
        }

        var vcAutomatico = "NO";
        if ($("#chkAutVentanilla").is(":checked")) {
            vcAutomatico = "SI";
        }

        var vcVigente = "NO";
        if ($("#chkVigVentanilla").is(":checked")) {
            vcVigente = "SI";
        }

        if (inVenEdi == "") { //Agregar una Ventanilla

            var datos = {
                IdVentanilla: "0",
                IdModulo: $("#ddlModVentanilla").val(),
                vcModulo: $("#ddlModVentanilla option:selected").text(),
                IdOpcion: $("#ddlOpcVentanilla").val(),
                vcOpcion: $("#ddlOpcVentanilla option:selected").text(),
                Numero: $("#txtNumVentanilla").val(),
                IdOperador: "-1", //$("#ddlOpeVentanilla").val(),
                vcOperador: "", //$("#ddlOpeVentanilla option:selected").text(),
                Descripcion: $.trim($("#txtDesVentanilla").val()),
                Automatico: vcAutomatico,
                IdEstado: $("#ddlEstVentanilla").val(),
                vcEstado: $("#ddlEstVentanilla option:selected").text(),
                btVig: vcVigente,
                TieneDatos: "0"
            };

            tbVentanilla.jqGrid('addRowData', "_" + indice, datos);
            fnLimpiarControlesVentanilla();
            indice++;

        } else { //Edita una Ventanilla

            var row = tbVentanilla.getRowData(inVenEdi);

            var datos = {
                IdVentanilla: row.IdVentanilla,
                IdModulo: $("#ddlModVentanilla").val(),
                vcModulo: $("#ddlModVentanilla option:selected").text(),
                IdOpcion: $("#ddlOpcVentanilla").val(),
                vcOpcion: $("#ddlOpcVentanilla option:selected").text(),
                Numero: $("#txtNumVentanilla").val(),
                IdOperador: row.IdOperador, //$("#ddlOpeVentanilla").val(),
                vcOperador: row.vcOperador, //$("#ddlOpeVentanilla option:selected").text(),
                Descripcion: $("#txtDesVentanilla").val(),
                Automatico: vcAutomatico,
                IdEstado: $("#ddlEstVentanilla").val(),
                vcEstado: $("#ddlEstVentanilla option:selected").text(),
                btVig: vcVigente,
                TieneDatos: row.TieneDatos
            };

            tbVentanilla.jqGrid('setRowData', inVenEdi, datos);
            inVenEdi = "";
            fnLimpiarControlesVentanilla();
            fnBotonesAgregarQuitarVentanilla();
        }
    });

    $("#btnQuitarVentanilla").live("click", function () {
        var textoBoton = $("#lblQuitarVentanilla").text();
        if (textoBoton == "Quitar") {
            var idRow = tbVentanilla.getGridParam('selrow');
            if (idRow) {
                var row = tbVentanilla.getRowData(idRow);
                if (row.TieneDatos == 0) {
                    tbVentanilla.delRowData(idRow);
                }
                else {
                    alerta("La ventanilla no puede quitarse ya que tiene atenciones relacionadas a esta.");
                }
            } else {
                alerta("Debe seleccionar una ventanilla.");
            }
        } else {//Cancelar
            fnLimpiarControlesVentanilla();
            fnBotonesAgregarQuitarVentanilla();
            inVenEdi = "";
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //------------------------------------GRUPOS DE ATENCION-------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbGrupoAtencion = $("#tbGrupoAtencion").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdGrupoAtencion', Campo: 'IdGrupoAtencion', label: 'IdGrupoAtencion', hidden: true, width: 150 },
                    { name: 'Descripcion', Campo: 'vcModulo', label: 'Descripción', hidden: false, width: 200 },
                    { name: 'Prefijo', Campo: 'Prefijo', label: 'Prefijo', hidden: false, width: 50 },
                    { name: 'Peso', index: 'Peso', label: 'Peso', hidden: false, width: 40, align: 'Center' },
                    { name: 'btVig', index: 'btVig', label: 'Vigente', hidden: false, width: 70, align: 'Center' },
                    { name: 'Grupos', index: 'Grupos', label: 'Grupos', hidden: true, width: 70, align: 'Center' }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "IdGrupoAtencion", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Grupos de Atención",
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = tbGrupoAtencion.getRowData(rowid);
            inGruAteEdi = rowid;

            $("#tbDatosGrupoAtencion").show();

            $("#txtDesGrupoAtencion").val(row.Descripcion);
            $("#txtPreGrupoAtencion").val(row.Prefijo);
            $("#txtPesGrupoAtencion").val(row.Peso);

            //            vcGruEmp = row.IdOficina;
            //            $("#bpOfiModulo_txtValorBusqueda").val(row.vcOficina);

            if (row.btVig == 'SI') {
                $("#chkVigGrupoAtencion").attr("checked", true);
            }
            else {
                $("#chkVigGrupoAtencion").attr("checked", false);
            }

            if (row.Grupos == "") {
                fnObtenerGruposAtencion(inGruAteEdi, row.Grupos);
            } else {
                fnObtenerGruposAtencion(inGruAteEdi, row.Grupos);
            }

            fnBotonesActualizarCancelarGrupoAtencion();
        }
    });

    var i = 0;
    for (i = 0; i < dtGrupoAtencion.length; i++) {
        tbGrupoAtencion.jqGrid('addRowData', dtGrupoAtencion[i].IdGrupoAtencion, dtGrupoAtencion[i]);
    }

    $("#btnAgregarGrupoAtencion").live("click", function () {
        var IdGrupoEmpleados = "";
        if ($.trim($("#txtDesGrupoAtencion").val()) == "") {
            alerta("Debe ingresar una descripción válida.");
            return;
        }

        if ($.trim($("#txtPreGrupoAtencion").val()) == "") {
            alerta("Debe ingresar un prefijo válido.");
            return;
        }

        if ($.trim($("#txtPesGrupoAtencion").val()) == "") {
            alerta("Debe ingresar un peso válido.");
            return;
        }

        $('#lstbGruposAgregados option').each(function () {
            IdGrupoEmpleados += ($.trim(IdGrupoEmpleados) == "" ? $(this).val() : ", " + $(this).val());
        });

        var lstIdGruAte = tbGrupoAtencion.getDataIDs();
        var vcExiste = "0";
        for (i = 0; i < lstIdGruAte.length; i++) {
            var rowAte = tbGrupoAtencion.getRowData(lstIdGruAte[i]);
            if (rowAte.Prefijo.toLowerCase() == $.trim($("#txtPreGrupoAtencion").val().toLowerCase()) && (inGruAteEdi == "" || tbGrupoAtencion.getRowData(inGruAteEdi).IdGrupoAtencion != rowAte.IdGrupoAtencion)) {
                vcExiste = "1";
            }
        }
        if (vcExiste == "1") {
            alerta("No puede haber más de un grupo de atención con el mismo prefijo.");
            return;
        }

        var vcVigente = "NO";
        if ($("#chkVigGrupoAtencion").is(":checked")) {
            vcVigente = "SI";
        }

        if (inGruAteEdi == "") { //Agregar un grupo de Atención
            var datos = {
                IdGrupoAtencion: "0",
                Prefijo: $.trim($("#txtPreGrupoAtencion").val()),
                Descripcion: $.trim($("#txtDesGrupoAtencion").val()),
                Peso: $("#txtPesGrupoAtencion").val(),
                Grupos: IdGrupoEmpleados,
                btVig: vcVigente
            };

            tbGrupoAtencion.jqGrid('addRowData', "_" + indice, datos);
            fnLimpiarControlesGrupoAtencion();
            indice++;

        } else { //Edita una Ventanilla

            var row = tbGrupoAtencion.getRowData(inGruAteEdi);

            var datos = {
                IdGrupoAtencion: row.IdGrupoAtencion,
                Prefijo: $("#txtPreGrupoAtencion").val(),
                Descripcion: $("#txtDesGrupoAtencion").val(),
                Peso: $("#txtPesGrupoAtencion").val(),
                Grupos: IdGrupoEmpleados,
                btVig: vcVigente
            };

            tbGrupoAtencion.jqGrid('setRowData', inGruAteEdi, datos);
            inGruAteEdi = "";
            fnLimpiarControlesGrupoAtencion();
            fnBotonesAgregarQuitarGrupoAtencion();
        }
    });

    $("#btnQuitarGrupoAtencion").live("click", function () {
        var textoBoton = $("#lblQuitarGrupoAtencion").text();
        if (textoBoton == "Quitar") {
            if (tbGrupoAtencion.getGridParam('selrow')) {
                tbGrupoAtencion.delRowData(tbGrupoAtencion.getGridParam('selrow'));
            } else {
                alerta("Debe seleccionar un grupo de atención.");
            }
        } else {//Cancelar
            fnLimpiarControlesGrupoAtencion();
            fnBotonesAgregarQuitarGrupoAtencion();
            inGruAteEdi = "";
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //--------------------------------------DISPENSADORES----------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbDispensador = $("#tbDispensador").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdDispensadorAtencion', Campo: 'IdDispensadorAtencion', label: 'IdDispensadorAtencion', hidden: true, width: 150, key: true },
                    { name: 'Codigo', index: 'Codigo', label: 'Código', hidden: false, width: 60, align: 'Center' },
                    { name: 'IdModulo', Campo: 'IdModulo', label: 'IdModulo', hidden: true, width: 50 },
                    { name: 'vcModulo', Campo: 'vcModulo', label: 'Módulo', hidden: false, width: 200 },
                    { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 70, align: 'Center' },
                    { name: 'vcEstado', index: 'vcEstado', label: 'Estado', hidden: false, width: 70, align: 'Center' },
                    { name: 'Impresora', index: 'Impresora', label: 'Impresora', hidden: false, width: 70, align: 'Center' },
                    { name: 'PantallaTactil', index: 'PantallaTactil', label: 'Pantalla Táctil', hidden: false, width: 70, align: 'Center' },
                    { name: 'inCanAte', index: 'inCanAte', label: 'inCanAte', hidden: true, width: 70 },
                    { name: 'TipoInterfaz', index: 'TipoInterfaz', label: 'TipoInterfaz', hidden: true, width: 70 }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "IdDispensadorAtencion", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Dispensadores",
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = tbDispensador.getRowData(rowid);
            inDisEdi = rowid;

            $("#ddlModDispensador").val(row.IdModulo);
            $("#txtCodDispensador").val(row.Codigo);
            //$("#ddlTipFisIdeDispensador").val(row.Peso);
            $("#ddlEstDispensador").val(row.IdEstado);
            if (row.Impresora == 'SI') {
                $("#chkImpDispensador").attr("checked", true);
            }
            else {
                $("#chkImpDispensador").attr("checked", false);
            }
            if (row.PantallaTactil == 'SI') {
                $("#chkPanTacDispensador").attr("checked", true);
            }
            else {
                $("#chkPanTacDispensador").attr("checked", false);
            }
            fnObtenerTipoInterfazDispensador(inDisEdi, row.TipoInterfaz);

            //            if (row.TipoInterfaz == "") {
            //                fnObtenerTipoInterfazDispensador(inDisEdi, row.TipoInterfaz);
            //            } else {
            //                fnObtenerTipoInterfazDispensador(inDisEdi, row.TipoInterfaz);
            //            }

            fnBotonesActualizarCancelarDispensador();
        }
    });

    var i = 0;
    for (i = 0; i < dtDispensadores.length; i++) {
        tbDispensador.jqGrid('addRowData', dtDispensadores[i].IdDispensadorAtencion, dtDispensadores[i]);
    }

    $("#btnAgregarDispensador").live("click", function () {
        var IdTipoInterfaz = "";
        if ($.trim($("#ddlModDispensador").val()) == "-1") {
            alerta("El módulo es requerido.");
            return;
        }
        if ($.trim($("#txtCodDispensador").val()) == "") {
            alerta("Debe ingresar un código válido.");
            return;
        }
        if ($.trim($("#ddlEstDispensador").val()) == "-1") {
            alerta("El estado es requerido.");
            return;
        }

        $('#lstbDispensadorAtencion option').each(function () {
            IdTipoInterfaz += ($.trim(IdTipoInterfaz) == "" ? $(this).val() : ", " + $(this).val());
        });

        if (IdTipoInterfaz == "") {
            alerta("Debe ingresar por lo menos un tipo de interfaz.");
            return;
        }

        var lstIdDis = tbDispensador.getDataIDs();
        var vcExiste = "0";
        for (i = 0; i < lstIdDis.length; i++) {
            var rowDis = tbDispensador.getRowData(lstIdDis[i]);
            if (rowDis.Codigo.toLowerCase() == $.trim($("#txtCodDispensador").val().toLowerCase()) && (inDisEdi == "" || tbDispensador.getRowData(inDisEdi).IdDispensadorAtencion != rowDis.IdDispensadorAtencion)) {
                vcExiste = "1";
            }
        }
        if (vcExiste == "1") {
            alerta("No puede haber más de un dispensador con el mismo código.");
            return;
        }

        var vcImpresora = "NO";
        if ($("#chkImpDispensador").is(":checked")) {
            vcImpresora = "SI";
        }

        var vcPantallaTactil = "NO";
        if ($("#chkPanTacDispensador").is(":checked")) {
            vcPantallaTactil = "SI";
        }

        if (inDisEdi == "") { //Agregar un Dispensador

            var datos = {
                IdDispensadorAtencion: "0",
                IdModulo: $("#ddlModDispensador").val(),
                vcModulo: $("#ddlModDispensador option:selected").text(),
                Codigo: $.trim($("#txtCodDispensador").val()),
                Impresora: vcImpresora,
                PantallaTactil: vcPantallaTactil,
                IdEstado: $("#ddlEstDispensador").val(),
                vcEstado: $("#ddlEstDispensador option:selected").text(),
                TipoInterfaz: IdTipoInterfaz,
                inCanAte: 0
            };

            tbDispensador.jqGrid('addRowData', "_" + indice, datos);
            fnLimpiarControlesDispensador();
            indice++;

        } else { //Edita un Dispensador

            var row = tbDispensador.getRowData(inDisEdi);

            var datos = {
                IdDispensadorAtencion: row.IdDispensadorAtencion,
                IdModulo: $("#ddlModDispensador").val(),
                vcModulo: $("#ddlModDispensador option:selected").text(),
                Codigo: $("#txtCodDispensador").val(),
                Impresora: vcImpresora,
                PantallaTactil: vcPantallaTactil,
                IdEstado: $("#ddlEstDispensador").val(),
                vcEstado: $("#ddlEstDispensador option:selected").text(),
                TipoInterfaz: IdTipoInterfaz,
                inCanAte: row.inCanAte
            };

            tbDispensador.jqGrid('setRowData', inDisEdi, datos);
            inDisEdi = "";
            fnLimpiarControlesDispensador();
            fnBotonesAgregarQuitarDispensador();
        }
    });

    $("#btnQuitarDispensador").live("click", function () {

        //inCanAte

        var textoBoton = $("#lblQuitarDispensador").text();
        if (textoBoton == "Quitar") {
            var idRow = tbDispensador.getGridParam('selrow');
            if (idRow) {
                var row = tbDispensador.getRowData(idRow);
                if (row.inCanAte == 0) {
                    tbDispensador.delRowData(idRow);
                }
                else {
                    alerta("El dispensador no puede quitarse ya que tiene atenciones relacionadas a este.");
                }
            } else {
                alerta("Debe seleccionar un dispensador.");
            }
        } else {//Cancelar
            fnLimpiarControlesDispensador();
            fnBotonesAgregarQuitarDispensador();
            inDisEdi = "";
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //--------------------------------------VISUALIZADORES---------------------------------------//
    //-------------------------------------------------------------------------------------------//

    var tbVisualizador = $("#tbVisualizador").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'IdVisualizador', Campo: 'IdVisualizador', label: 'IdVisualizador', hidden: true, width: 150 },
                    { name: 'Codigo', index: 'Codigo', label: 'Código', hidden: false, width: 60, align: 'Center' },
                    { name: 'IdTipoVisualizador', index: 'IdTipoVisualizador', label: 'IdTipoVisualizador', hidden: true, width: 70, align: 'Center' },
                    { name: 'vcTipoVisualizador', index: 'vcTipoVisualizador', label: 'Tipo de Visualizador', hidden: false, width: 100, align: 'left' },
                    { name: 'IdModulo', Campo: 'IdModulo', label: 'IdModulo', hidden: true, width: 50 },
                    { name: 'vcModulo', Campo: 'vcModulo', label: 'Módulo', hidden: false, width: 200 },
                    { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 70, align: 'Center' },
                    { name: 'vcEstado', index: 'vcEstado', label: 'Estado', hidden: false, width: 200, align: 'Center' },
                    { name: 'btVig', index: 'btVig', label: 'Vigente', hidden: false, width: 70, align: 'Center' }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "IdVisualizador", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Visualizadores",
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = tbVisualizador.getRowData(rowid);
            inVisEdi = rowid;

            $("#ddlModVisualizador").val(row.IdModulo);
            $("#txtCodVisualizador").val(row.Codigo);
            $("#ddlTipVisVisualizador").val(row.IdTipoVisualizador);
            $("#ddlEstVisualizador").val(row.IdEstado);
            if (row.btVig == 'SI') {
                $("#chkVigVisualizador").attr("checked", true);
            }
            else {
                $("#chkVigVisualizador").attr("checked", false);
            }

            fnBotonesActualizarCancelarVisualizador();
        }
    });

    var i = 0;
    for (i = 0; i < dtVisualizadores.length; i++) {
        tbVisualizador.jqGrid('addRowData', dtVisualizadores[i].IdVisualizador, dtVisualizadores[i]);
    }
    $("#btnAgregarVisualizador").live("click", function () {
        if ($.trim($("#ddlModVisualizador").val()) == "-1") {
            alerta("El módulo es requerido.");
            return;
        }
        if ($.trim($("#txtCodVisualizador").val()) == "") {
            alerta("Debe ingresar un código válido.");
            return;
        }
        if ($.trim($("#ddlTipVisVisualizador").val()) == "-1") {
            alerta("El tipo de visualizador es requerido.");
            return;
        }
        if ($.trim($("#ddlEstVisualizador").val()) == "-1") {
            alerta("El estado es requerido.");
            return;
        }

        var lstIdVis = tbVisualizador.getDataIDs();
        var vcExiste = "0";
        for (i = 0; i < lstIdVis.length; i++) {
            var rowVis = tbVisualizador.getRowData(lstIdVis[i]);
            if (rowVis.Codigo.toLowerCase() == $.trim($("#txtCodVisualizador").val().toLowerCase()) && (inVisEdi == "" || tbVisualizador.getRowData(inVisEdi).IdVisualizador != rowVis.IdVisualizador)) {
                vcExiste = "1";
            }
        }
        if (vcExiste == "1") {
            alerta("No puede haber más de un visualizador con el mismo código.");
            return;
        }

        var vcVigente = "NO";
        if ($("#chkVigVisualizador").is(":checked")) {
            vcVigente = "SI";
        }

        if (inVisEdi == "") { //Agregar un Visualizador

            var datos = {
                IdVisualizador: "0",
                IdModulo: $("#ddlModVisualizador").val(),
                vcModulo: $("#ddlModVisualizador option:selected").text(),
                Codigo: $("#txtCodVisualizador").val(),
                IdTipoVisualizador: $("#ddlTipVisVisualizador").val(),
                vcTipoVisualizador: $("#ddlTipVisVisualizador option:selected").text(),
                IdEstado: $("#ddlEstVisualizador").val(),
                vcEstado: $("#ddlEstVisualizador option:selected").text(),
                btVig: vcVigente
            };

            tbVisualizador.jqGrid('addRowData', "_" + indice, datos);
            fnLimpiarControlesVisualizador();
            indice++;

        } else { //Edita un Visualizador

            var row = tbVisualizador.getRowData(inVisEdi);

            var datos = {
                IdVisualizador: row.IdVisualizador,
                IdModulo: $("#ddlModVisualizador").val(),
                vcModulo: $("#ddlModVisualizador option:selected").text(),
                Codigo: $("#txtCodVisualizador").val(),
                IdTipoVisualizador: $("#ddlTipVisVisualizador").val(),
                vcTipoVisualizador: $("#ddlTipVisVisualizador option:selected").text(),
                IdEstado: $("#ddlEstVisualizador").val(),
                vcEstado: $("#ddlEstVisualizador option:selected").text(),
                btVig: vcVigente
            };

            tbVisualizador.jqGrid('setRowData', inVisEdi, datos);
            inVisEdi = "";
            fnLimpiarControlesVisualizador();
            fnBotonesAgregarQuitarVisualizador();
        }
    });

    $("#btnQuitarVisualizador").live("click", function () {
        var textoBoton = $("#lblQuitarVisualizador").text();
        if (textoBoton == "Quitar") {
            if (tbVisualizador.getGridParam('selrow')) {
                tbVisualizador.delRowData(tbVisualizador.getGridParam('selrow'));
            } else {
                alerta("Debe seleccionar un visualizador.");
            }
        } else {//Cancelar
            fnLimpiarControlesVisualizador();
            fnBotonesAgregarQuitarVisualizador();
            inVisEdi = "";
        }
    });

    //------------------------------------------------------------------------------------------->>


    //-------------------------------------------------------------------------------------------//
    //------------------------------------------GENERAL------------------------------------------//
    //-------------------------------------------------------------------------------------------//

    $(window).resize(function () {
        DimPosElementos();
    });

    inicioPagina();

    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var lstIdMod = tbModulo.getDataIDs();
        if (lstIdMod.length == 0) {
            alerta("Debe agregar por lo menos un módulo.");
            FocusAlert(0, "#tabOpciones", 1, "#btnAgregarModulo");
            return;
        }
        var lstIdOpe = tbOperador.getDataIDs();
        if (lstIdOpe.length == 0) {
            alerta("Debe agregar por lo menos un operador.");
            FocusAlert(0, "#tabOpciones", 2, "#btnAgregarOperador");
            return;
        }
        var lstIdVen = tbVentanilla.getDataIDs();
        if (lstIdVen.length == 0) {
            alerta("Debe agregar por lo menos una ventanilla.");
            FocusAlert(0, "#tabOpciones", 3, "#btnAgregarVentanilla");
            return;
        }
        var lstIdDis = tbDispensador.getDataIDs();
        if (lstIdDis.length == 0) {
            alerta("Debe agregar por lo menos un dispensador.");
            FocusAlert(1, "#tabDispensador", 0, "#btnAgregarDispensador");
            return;
        }
        if ($.trim($("#ddlTipIdeDispensador").val()) == "-1") {
            alerta("El tipo de identificación es requerido.");
            FocusAlert(1, "#tabDispensador", 1, "#ddlTipIdeDispensador");
            return;
        }
        if ($.trim($("#txtNumOpcOpciones").val()) == "") {
            alerta("Debe ingresar un número válido de opciones para la configuración del dispensador");
            FocusAlert(1, "#tabDispensador", 3, "#txtNumOpcOpciones");
            return;
        }
        if ($.trim($("#txtNumFilOpciones").val()) == "") {
            alerta("Debe ingresar un número válido de filas para la configuración del dispensador");
            FocusAlert(1, "#tabDispensador", 3, "#txtNumFilOpciones");
            return;
        }
        if ($.trim($("#txtNumColOpciones").val()) == "") {
            alerta("Debe ingresar un número válido de columnas para la configuración del dispensador");
            FocusAlert(1, "#tabDispensador", 3, "#txtNumColOpciones");
            return;
        }
        if ($.trim($("#ddlOriOpciones").val()) == "-1") {
            alerta("El tipo de orientación del dispensador es requerido.");
            FocusAlert(1, "#tabDispensador", 3, "#ddlOriOpciones");
            return;
        }
        if ($.trim($("#ddlTipLlaVisualizador").val()) == "-1") {
            alerta("El tipo de llamada es requerido.");
            FocusAlert(2, "#tabVisualizador", 1, "#ddlTipLlaVisualizador");
            return;
        }
        var lstIdVis = tbVisualizador.getDataIDs();
        if (lstIdVis.length == 0) {
            alerta("Debe agregar por lo menos un visualizador.");
            FocusAlert(2, "#tabVisualizador", 0, "#btnAgregarVisualizador");
            return;
        }

        //OPCIONES
        var XMLOpciones = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var lstIdOpc = tbOpcion.getDataIDs();
        var lstImaOpc = "";
        for (i = 0; i < lstIdOpc.length; i++) {
            var rowOpc = tbOpcion.getRowData(lstIdOpc[i]);
            var vcMuestra = "0";
            if (rowOpc.VisualizaOpcion == "SI") {
                vcMuestra = "1";
            }

            XMLOpciones += "<DATA IdOpcionAtencion=\"" + rowOpc.IdOpcionAtencion + "\" Descripcion=\"" + LimpiarDatoString(rowOpc.Descripcion) + "\" Prefijo=\"" + rowOpc.Prefijo + "\" Color=\"" + rowOpc.Color;
            XMLOpciones += "\" VisualizaOpcion=\"" + vcMuestra + "\" Entidad=\"" + rowOpc.inEntidad + "\" />";

            lstImaOpc += rowOpc.IdOpcionAtencion + "," + rowOpc.NombreImagen + ";";
        }
        XMLOpciones += "</ROOT>";
        if (lstIdOpc.length > 0) {
            lstImaOpc = lstImaOpc.substring(0, lstImaOpc.length - 1);
        }

        //MÓDULOS
        var XMLModulos = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        for (i = 0; i < lstIdMod.length; i++) {
            var rowMod = tbModulo.getRowData(lstIdMod[i]);
            var vcVig = "0";
            if (rowMod.btVig == "SI") {
                vcVig = "1";
            }

            XMLModulos += "<DATA IdModulo=\"" + rowMod.IdModulo + "\" IdOpcion=\"" + rowMod.IdOpcion + "\" IdOficina=\"" + rowMod.IdOficina + "\" Descripcion=\"" + rowMod.Descripcion;
            XMLModulos += "\" Ubicacion=\"" + rowMod.Ubicacion + "\" IdEstado=\"" + rowMod.IdEstado + "\" btVig=\"" + vcVig + "\" />";
        }
        XMLModulos += "</ROOT>";

        //OPERADORES
        var XMLOperadores = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        for (i = 0; i < lstIdOpe.length; i++) {
            var rowOpe = tbOperador.getRowData(lstIdOpe[i]);
            XMLOperadores += "<DATA IdOperador=\"" + rowOpe.IdOperador + "\" IdUsuario=\"" + rowOpe.IdUsuario + "\" />";
        }
        XMLOperadores += "</ROOT>";

        //VENTANILLAS
        var XMLVentanillas = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        for (i = 0; i < lstIdVen.length; i++) {
            var rowVen = tbVentanilla.getRowData(lstIdVen[i]);
            var vcAut = "0"; var vcVig = "0";
            if (rowVen.Automatico == "SI") {
                vcAut = "1";
            }
            if (rowVen.btVig == "SI") {
                vcVig = "1";
            }

            XMLVentanillas += "<DATA IdVentanilla=\"" + rowVen.IdVentanilla + "\" IdModulo=\"" + rowVen.IdModulo + "\" vcModulo=\"" + rowVen.vcModulo + "\" IdOpcion=\"" + rowVen.IdOpcion;
            XMLVentanillas += "\" Numero=\"" + rowVen.Numero + "\" IdOperador=\"" + rowVen.IdOperador + "\" vcOperador=\"" + rowVen.vcOperador.substring(0, rowVen.vcOperador.indexOf("="));
            XMLVentanillas += "\" Descripcion=\"" + rowVen.Descripcion + "\" Automatico=\"" + vcAut + "\" IdEstado=\"" + rowVen.IdEstado + "\" btVig=\"" + vcVig + "\" />";
        }
        XMLVentanillas += "</ROOT>";


        //GRUPOS DE ATENCIÓN
        var XMLGruposAtencion = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var XMLGrupoEmpleadoXAtencion = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var lstIdGruAte = tbGrupoAtencion.getDataIDs();
        for (i = 0; i < lstIdGruAte.length; i++) {
            var rowGruAte = tbGrupoAtencion.getRowData(lstIdGruAte[i]);
            var vcVig = "0";
            if (rowGruAte.btVig == "SI") {
                vcVig = "1";
            }

            XMLGruposAtencion += "<DATA IdGrupoAtencion=\"" + rowGruAte.IdGrupoAtencion + "\" Prefijo=\"" + rowGruAte.Prefijo + "\" Descripcion=\"" + rowGruAte.Descripcion;
            XMLGruposAtencion += "\" Peso=\"" + rowGruAte.Peso + "\" btVig=\"" + vcVig + "\" />";

            if ($.trim(rowGruAte.Grupos) != "") {
                var lstGrupoEmpl = rowGruAte.Grupos.split(",");
                $.each(lstGrupoEmpl, function () {
                    XMLGrupoEmpleadoXAtencion += "<DATA IdGrupoAtencion=\"" + rowGruAte.IdGrupoAtencion + "\" IdGrupoEmpleado=\"" + $.trim(this) + "\" Prefijo=\"" + rowGruAte.Prefijo + "\" />";
                });
            }
        }
        XMLGruposAtencion += "</ROOT>";
        XMLGrupoEmpleadoXAtencion += "</ROOT>";


        //DISPENSADORES
        var XMLDispensadores = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var XMLTipoInterfazDispensadores = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var lstIdDis = tbDispensador.getDataIDs();
        for (i = 0; i < lstIdDis.length; i++) {
            var rowDis = tbDispensador.getRowData(lstIdDis[i]);
            var vcImp = "0"; var vcPanTac = "0";
            if (rowDis.Impresora == "SI") {
                vcImp = "1";
            }
            if (rowDis.PantallaTactil == "SI") {
                vcPanTac = "1";
            }

            XMLDispensadores += "<DATA IdDispensadorAtencion=\"" + rowDis.IdDispensadorAtencion + "\" IdModulo=\"" + rowDis.IdModulo + "\" vcModulo=\"" + rowDis.vcModulo;
            XMLDispensadores += "\" Codigo=\"" + rowDis.Codigo + "\" Impresora=\"" + vcImp + "\" PantallaTactil=\"" + vcPanTac + "\" IdEstado=\"" + rowDis.IdEstado + "\" />";

            if ($.trim(rowDis.TipoInterfaz) != "") {
                var lstTipoInterf = rowDis.TipoInterfaz.split(",");
                $.each(lstTipoInterf, function () {
                    XMLTipoInterfazDispensadores += "<DATA IdDispensadorAtencion=\"" + rowDis.IdDispensadorAtencion + "\" IdTipoInterfazIdentificacion=\"" + $.trim(this) + "\" IdEstado=\"" + 1 + "\" Codigo=\"" + rowDis.Codigo + "\"  />";
                });
            }
        }
        XMLDispensadores += "</ROOT>";
        XMLTipoInterfazDispensadores += "</ROOT>";


        //CONFIGURACION DE DISPENSADORES
        var XMLDisCon = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var vcEsPon = "0"; var vcOriHor = "0";
        if ($("#rbtPonderado").is(":checked")) {
            vcEsPon = "1";
        }
        if ($("#ddlOriOpciones").val() == "horizontal") {
            vcOriHor = "1";
        }

        XMLDisCon += "<DATA IdDispensadorConfiguracion=\"1\" IdTipoIdentificacion=\"" + $("#ddlTipIdeDispensador").val() + "\" EsPonderado=\"" + vcEsPon;
        XMLDisCon += "\" NumeroOpciones=\"" + $("#txtNumOpcOpciones").val() + "\" NumeroFilas=\"" + $("#txtNumFilOpciones").val() + "\" NumeroColumnas=\"" + $("#txtNumColOpciones").val();
        XMLDisCon += "\" OrientacionHorizontal=\"" + vcOriHor + "\" MensajeInicial=\"" + $.trim($("#txtMsjIniDis").val()) + "\" MensajeOpcion=\"" + $.trim($("#txtMsjOpcDis").val());
        XMLDisCon += "\" MensajeTicket=\"" + $.trim($("#txtMsjTicDis").val()) + "\" MensajeInicialOpcional=\"" + $.trim($("#txtMsjIniOpcDis").val()) + "\" />";
        XMLDisCon += "</ROOT>";

        //VISUALIZADORES
        var XMLVisualizadores = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        for (i = 0; i < lstIdVis.length; i++) {
            var rowVis = tbVisualizador.getRowData(lstIdVis[i]);
            var vcVig = "0";
            if (rowVis.btVig == "SI") {
                vcVig = "1";
            }

            XMLVisualizadores += "<DATA IdVisualizador=\"" + rowVis.IdVisualizador + "\" IdModulo=\"" + rowVis.IdModulo + "\" vcModulo=\"" + rowVis.vcModulo + "\" Codigo=\"" + rowVis.Codigo;
            XMLVisualizadores += "\" IdTipoVisualizador=\"" + rowVis.IdTipoVisualizador + "\" IdEstado=\"" + rowVis.IdEstado + "\" btVig=\"" + vcVig + "\" />";
        }
        XMLVisualizadores += "</ROOT>";


        //CONFIGURACION DE VISUALIZADORES
        var XMLVisCon = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var vcOriHor = "0"; var vcImpTic = "0";
        if ($("#ddlOriHorVisualizador").val() == "horizontal") {
            vcOriHor = "1";
        }
        if ($("#chkImpTicVisualizador").is(":checked")) {
            vcImpTic = "1";
        }

        XMLVisCon += "<DATA IdVisualizadorConfiguracion=\"1\" NumeroAtenciones=\"" + $("#txtNumAteAtenciones").val() + "\" NumeroFilas=\"" + $("#txtNumFilAtenciones").val();
        XMLVisCon += "\" NumeroColumnas=\"" + $("#txtNumColAtenciones").val() + "\" OrientacionHorizontal=\"" + vcOriHor + "\" ImprimirTicket=\"" + vcImpTic;
        XMLVisCon += "\" IdTipoLlamadaVisualizador=\"" + $("#ddlTipLlaVisualizador").val() + "\" Mensaje=\"" + $.trim($("#txtMsjVisualizador").val());
        XMLVisCon += "\" TipoPresentacion=\"" + $("#ddlTipPreVisualizador").val() + "\" />";
        XMLVisCon += "</ROOT>";

        //CONFIGURACION DE ATENCIONES
        var XMLAteCon = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        XMLAteCon += "<DATA IdAtencionConfiguracion=\"1\" TiempoEspera=\"" + $("#txtTiempoEspera").val() + "\" TiempoEsperaUnidad=\"" + $("#ddlUnidad").val();
        XMLAteCon += "\" TiempoRetomaAtencionCanceladaMin=\"" + $("#txtTiempoRetAteCan").val() + "\" />";
        XMLAteCon += "</ROOT>";


        $.ajax({
            type: "POST",
            url: "ATE_Configuracion.aspx/Guardar",
            data: "{'XMLOpciones': '" + XMLOpciones + "'," +
                  "'lstImaOpc': '" + lstImaOpc + "'," +
                  "'XMLModulos': '" + XMLModulos + "'," +
                  "'XMLOperadores': '" + XMLOperadores + "'," +
                  "'XMLVentanillas': '" + XMLVentanillas + "'," +
                  "'XMLGruposAtencion': '" + XMLGruposAtencion + "'," +
                  "'XMLDispensadores': '" + XMLDispensadores + "'," +
                  "'XMLDisCon': '" + XMLDisCon + "'," +
                  "'XMLVisualizadores': '" + XMLVisualizadores + "'," +
                  "'XMLVisCon': '" + XMLVisCon + "'," +
                  "'XMLGrupoEmpleado': '" + XMLGrupoEmpleadoXAtencion + "'," +
                  "'XMLTipoInterfaz': '" + XMLTipoInterfazDispensadores + "'," +
                  "'XMLAteCon': '" + XMLAteCon + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                window.scrollTo(0, 0);
                Mensaje("<br/><h1>Configuración de Atenciones Guardada</h1><br/>", document, CerroMensaje);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });

    function CerroMensaje() {
        BloquearPagina(false);
        //Accord.tabs("remove", Accord.tabs("option", "selected"));
    }

    function item(Codigo, Valor) {
        this.Codigo = Codigo;
        this.Valor = Valor;
    }

    //GRUPO DE EMPLEADOS DE ATENCIONES
    $("#imgAgregarGrupo").click(function () {
        var lstVacio = false;
        var blExists = false;
        var CodigoGrupoOrigen = vcGruEmp;
        var indexIgual = $("#bpGruEmpGrupoAtencion_txtValorBusqueda").val().indexOf("=");
        var NombreGrupoOrigen = $("#bpGruEmpGrupoAtencion_txtValorBusqueda").val().substr(indexIgual + 1);

        var lstIdGruAte = tbGrupoAtencion.getDataIDs();
        var vcExiste = "0";
        for (i = 0; i < lstIdGruAte.length; i++) {
            var rowAte = tbGrupoAtencion.getRowData(lstIdGruAte[i]);
            if (rowAte.Grupos != "") {
                var vcCodigos = rowAte.Grupos.split(",");
                $.each(vcCodigos, function () {
                    if ($.trim(CodigoGrupoOrigen) == $.trim(this)) {
                        blExists = true;
                        return;
                    }
                });
            }
        }

        if (blExists) {
            alerta("El Grupo Empleado ya se encuentra seleccionado para el Grupo de Atención <b>" + $.trim(rowAte.Descripcion) + "</b>");
            $("#bpGruEmpGrupoAtencion_txtValorBusqueda").val("");
            $("#bpGruEmpGrupoAtencion_txtValorBusqueda").focus();
            return;
        }

        $('#lstbGruposAgregados option').each(function () {
            if (parseInt(CodigoGrupoOrigen) == parseInt($(this).val())) {
                lstVacio = true;
                return;
            }
        });
        if (NombreGrupoOrigen == "") {
            alerta("Debe seleccionar por lo menos un Grupo Empleado.");
            $("#bpGruEmpGrupoAtencion_txtValorBusqueda").focus();
            return;
        }

        if (!lstVacio) {
            $("#lstbGruposAgregados").append($("<option></option>").attr("value", CodigoGrupoOrigen).text(NombreGrupoOrigen));
            $("#bpGruEmpGrupoAtencion_txtValorBusqueda").val("");
            $("#bpGruEmpGrupoAtencion_txtValorBusqueda").focus();
        } else {
            //EL GRUPO YA EXISTE MENSAJE
            alerta("El Grupo Empleado ya se encuentra seleccionado");
            return;
        }
    });

    $("#imgQuitarGrupo").click(function () {
        if ($("#lstbGruposAgregados option:selected").html() != null) {
            $('#lstbGruposAgregados option:selected').remove();

            $('#lstbGruposAgregados option').each(function () {
                //alert($(this).val());
            });
        }
        else {
            alerta("Seleccione un Item a quitar");
        }
    });

    //DISPENSADOR DE ATENCIONES
    $("#imgAgregarTipoInterfazDispensador").click(function () {
        var lstVacio = false;
        var CodigoTipoInterfaz = vcDispAten;
        var indexIgual = $("#bpDispensadorAtencion_txtValorBusqueda").val().indexOf("=");
        var NombreTipoInterfaz = $("#bpDispensadorAtencion_txtValorBusqueda").val().substr(indexIgual + 1);

        $('#lstbDispensadorAtencion option').each(function () {
            if (parseInt(CodigoTipoInterfaz) == parseInt($(this).val())) {
                lstVacio = true;
                return;
            }
        });
        if (NombreTipoInterfaz == "") {
            alerta("Debe seleccionar por lo menos un Tipo de Interfaz.");
            $("#bpDispensadorAtencion_txtValorBusqueda").focus();
            return;
        }


        if (!lstVacio) {
            $("#lstbDispensadorAtencion").append($("<option></option>").attr("value", CodigoTipoInterfaz).text(NombreTipoInterfaz));
            $("#bpDispensadorAtencion_txtValorBusqueda").val("");
            $("#bpDispensadorAtencion_txtValorBusqueda").focus();
        } else {
            //EL TIPO DE INTERFAZ YA EXISTE MENSAJE
            alerta("El Tipo de Interfaz ya se encuentra seleccionado");
            $("#bpDispensadorAtencion_txtValorBusqueda").focus();
            return;
        }
    });

    $("#imgQuitarTipoInterfazDispensador").click(function () {
        if ($("#lstbDispensadorAtencion option:selected").html() != null) {
            $('#lstbDispensadorAtencion option:selected').remove();

            //            $('#lstbDispensadorAtencion option').each(function () {
            //                alert($(this).val());
            //            });
        }
        else {
            alerta("Seleccione un Item a quitar");
        }
    });











    $("#btnCerrar").click(function () {
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    function FocusAlert(IndexAccordion, NombreTab, IndexTab, Control) {
        if ($("#AccordionJQ1").accordion("option", "active").toString() == "false") {
            $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
        } else {
            if ($("#AccordionJQ1").accordion("option", "active") != IndexAccordion) {
                $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
            }
        }
        if (NombreTab != "") {
            $(NombreTab).tabs('option', 'selected', IndexTab);
        }
        if (Control != "") {
            $(Control).focus();
        }

        BloquearPagina(false);
    }

    //------------------------------------------------------------------------------------------->>
});

//-------------------------------------------------------------------------------------------//
//-------------------------------------ARCHIVOS ADJUNTOS-------------------------------------//
//-------------------------------------------------------------------------------------------//

function DeleteFile(file) {
    var vcSubCarpeta = 'Atenciones';
    if (IdDominio != '-1') {
        vcSubCarpeta = vcSubCarpeta + '\\' + IdDominio;
    }
    $.ajax({
        url: "../../Common/Controladores/UploadHandler.ashx?IdDominio=-1&vcSubCarpeta=" + vcSubCarpeta + "&file=" + file + "&accion=delete",
        type: "POST",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFileImagen').html("");
            $("#UploadButtonImagen").show();
            vcNomFilOpc = "";
        }
    });
}

function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    if (tipo == 1) {
        var filePath = "Temporal/Atenciones" + CarpetaDominio + "/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
            },
            error: function (data) {
                alerta('No se encontró el archivo a descargar.');
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcNomFilOpc = "";
            }
        });
    }
}

$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    fnDescargarArchivo(archivo, 1, null);
});

//------------------------------------------------------------------------------------------->>


//-------------------------------------------------------------------------------------------//
//-------------------------------------LIMPIAR CONTROLES-------------------------------------//
//-------------------------------------------------------------------------------------------//

function fnLimpiarControlesOpcion() {
    $("#txtDesOpcion").val("");
    $("#txtPrefijo").val("");
    $('#colorSelector div').css('backgroundColor', "#0000FF");
    $(".colorpicker_current_color").css('backgroundColor', "#0000FF");
    $(".colorpicker_hex input").val("0000FF");
    $('#ddlEntidad').prop('selectedIndex', 0);
    $("#chkMosOpcOpcion").attr("checked", false);
    $('#UploadedFileImagen').html("");
    $("#UploadButtonImagen").show();
    vcNomFilOpc = "";

    $("#btnGuardarOpcion").button("option", "disabled", true);
    $("#btnCancelarOpcion").button("option", "disabled", true);
}

function fnLimpiarControlesModulo() {
    $("#txtDesModulo").val("");
    $("#ddlOpcModulo").prop('selectedIndex', 0);
    $('#bpOfiModulo_txtValorBusqueda').val("");
    vcOfiMod = "";
    $("#txtUbiModulo").val("");
    $("#ddlEstModulo").prop('selectedIndex', 0);
    $("#chkVigModulo").attr("checked", false);
}

function fnBotonesActualizarCancelarModulo() {
    $("#imgAgregarModulo").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
    $("#lblAgregarModulo").text("Actualizar");
    $("#imgQuitarModulo").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
    $("#lblQuitarModulo").text("Cancelar");
}

function fnBotonesAgregarQuitarModulo() {
    $("#imgAgregarModulo").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
    $("#lblAgregarModulo").text("Agregar");
    $("#imgQuitarModulo").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
    $("#lblQuitarModulo").text("Quitar");
}

function fnLimpiarControlesOperador() {
    $('#bpUsuOperador_txtValorBusqueda').val("");
    vcUsuOpe = "";
}

function fnLimpiarControlesVentanilla() {
    $('#ddlModVentanilla').prop('selectedIndex', 0);
    $('#ddlOpcVentanilla').prop('selectedIndex', 0);
    $('#txtNumVentanilla').val("");
    $('#txtDesVentanilla').val("");
    $('#ddlOpeVentanilla').prop('selectedIndex', 0);
    $('#ddlEstVentanilla').prop('selectedIndex', 0);
    $('#chkAutVentanilla').attr("checked", false);
    $('#chkVigVentanilla').attr("checked", false);
}

function fnBotonesActualizarCancelarVentanilla() {
    $("#imgAgregarVentanilla").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
    $("#lblAgregarVentanilla").text("Actualizar");
    $("#imgQuitarVentanilla").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
    $("#lblQuitarVentanilla").text("Cancelar");
}

function fnBotonesAgregarQuitarVentanilla() {
    $("#imgAgregarVentanilla").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
    $("#lblAgregarVentanilla").text("Agregar");
    $("#imgQuitarVentanilla").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
    $("#lblQuitarVentanilla").text("Quitar");
}

function fnLimpiarControlesGrupoAtencion() {
    $('#txtDesGrupoAtencion').val("");
    $('#txtPreGrupoAtencion').val("");
    $('#txtPesGrupoAtencion').val("");
    $('#chkVigGrupoAtencion').attr("checked", false);
    $('#lstbGruposAgregados').html("");
    $("#bpGruEmpGrupoAtencion_txtValorBusqueda").val("");
}

function fnBotonesActualizarCancelarGrupoAtencion() {
    $("#imgAgregarGrupoAtencion").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
    $("#lblAgregarGrupoAtencion").text("Actualizar");
    $("#imgQuitarGrupoAtencion").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
    $("#lblQuitarGrupoAtencion").text("Cancelar");
}

function fnBotonesAgregarQuitarGrupoAtencion() {
    $("#imgAgregarGrupoAtencion").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
    $("#lblAgregarGrupoAtencion").text("Agregar");
    $("#imgQuitarGrupoAtencion").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
    $("#lblQuitarGrupoAtencion").text("Quitar");
}

function fnLimpiarControlesDispensador() {
    $('#ddlModDispensador').prop('selectedIndex', 0);
    $('#txtCodDispensador').val("");
    $('#ddlEstDispensador').prop('selectedIndex', 0);
    $('#chkImpDispensador').attr("checked", false);
    $('#chkPanTacDispensador').attr("checked", false);
    $('#lstbDispensadorAtencion').html("");
    $("#bpDispensadorAtencion_txtValorBusqueda").val("");
}

function fnBotonesActualizarCancelarDispensador() {
    $("#imgAgregarDispensador").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
    $("#lblAgregarDispensador").text("Actualizar");
    $("#imgQuitarDispensador").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
    $("#lblQuitarDispensador").text("Cancelar");
}

function fnBotonesAgregarQuitarDispensador() {
    $("#imgAgregarDispensador").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
    $("#lblAgregarDispensador").text("Agregar");
    $("#imgQuitarDispensador").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
    $("#lblQuitarDispensador").text("Quitar");
}

function fnLimpiarControlesVisualizador() {
    $('#ddlModVisualizador').prop('selectedIndex', 0);
    $('#txtCodVisualizador').val("");
    $('#ddlTipVisVisualizador').prop('selectedIndex', 0);
    $('#ddlEstVisualizador').prop('selectedIndex', 0);
    $('#chkVigVisualizador').attr("checked", false);
}

function fnBotonesActualizarCancelarVisualizador() {
    $("#imgAgregarVisualizador").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
    $("#lblAgregarVisualizador").text("Actualizar");
    $("#imgQuitarVisualizador").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
    $("#lblQuitarVisualizador").text("Cancelar");
}

function fnBotonesAgregarQuitarVisualizador() {
    $("#imgAgregarVisualizador").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
    $("#lblAgregarVisualizador").text("Agregar");
    $("#imgQuitarVisualizador").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
    $("#lblQuitarVisualizador").text("Quitar");
}

//------------------------------------------------------------------------------------------->>


function fn_bpOficina(valor) {
    vcOfiMod = valor;
}

function fn_bpUsuario(valor) {
    vcUsuOpe = valor;
}

function fn_bpGrupoEmpleado(valor) {
    vcGruEmp = valor;
}

function fn_bpDispensadorAtencion(valor) {
    vcDispAten = valor;
}

function fnObtenerTipoInterfazDispensador(idDispensador, vcCodTipoInter) {
    var opcion = 0;
    if (vcCodTipoInter == "") {
        opcion = 1;
    }
    else {
        opcion = 2;
    }

    $.ajax({
        type: "POST",
        url: "ATE_Configuracion.aspx/ObtenerTipoInterfazXDispensador",
        data: "{'inOpcion': '" + opcion + "'," +
              "'inIdDispensador': '" + idDispensador + "'," +
              "'strCodTipoInter': '" + vcCodTipoInter + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#lstbDispensadorAtencion").html("");
            $.each(msg.d, function (i, item) {                
                $("#lstbDispensadorAtencion").append($("<option></option>").attr("value", item.Codigo).text(item.Descripcion));
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });
}

function fnObtenerGruposAtencion(idAtencion, vcCodGrupos) {
    var opcion = 0;
    if (vcCodGrupos == "") { opcion = 1; }
    else { opcion = 2; }
    $.ajax({
        type: "POST",
        url: "ATE_Configuracion.aspx/ObtenerGrupoEmpleadoXAtencion",
        data: "{'inOpcion': '" + opcion + "'," +
              "'inIdAtencion': '" + idAtencion + "'," +
              "'strCodGrup': '" + vcCodGrupos + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#lstbGruposAgregados").html("");
            $.each(msg.d, function (i, item) {
                $("#lstbGruposAgregados").append($("<option></option>").attr("value", item.CodigoGrupo).text(item.NombreGrupo));
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });
}

function fnControlesIniciales() {
    $("#btnCancelarOpcion").button("option", "disabled", true);
    $("#btnGuardarOpcion").button("option", "disabled", true);
}

function fnSortDropDownListByText(selectId) {
    var foption = $('#' + selectId + ' option:first');
    var soptions = $('#' + selectId + ' option:not(:first)').sort(function (a, b) {
    //var soptions = $('#' + selectId + ' option').sort(function (a, b) {
        return a.text.toLowerCase() == b.text.toLowerCase() ? 0 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
    });
    $('#' + selectId).html(soptions).prepend(foption);
}