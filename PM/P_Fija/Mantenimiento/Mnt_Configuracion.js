//#region Entidad
function MNT_Mantenimiento(IdMantenimiento, Codigo, Nombre, btVig, CantidadCampos) {
    this.IdMantenimiento = IdMantenimiento;
    this.Codigo = Codigo;
    this.Nombre = Nombre;
    this.CantidadCampos = CantidadCampos;
    this.btVig = btVig;
}

var vIndexAccordion = "";
var vIdControl = "";
var vClickControl = "";
var indiceTab = window.parent.tab.tabs("option", "selected");

//#endregion
$(function () {
    //#region Valores Iniciales
    $(".btnNormal").button({});
    var tabContenido = $("#tabContenido").tabs({});
    var EditarParametro = false;
    $("#txtLongitud").keypress(ValidarEnteroPositivo);
    $("#txtNumeroDecimales").keypress(ValidarEnteroPositivo);

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);
    var ParametroSeleccionado = 0;
    var DescripcionSeleccion = "";

    var tbCamposExtras = $("#tbCamposExtras").jqGrid({
        datatype: "local",
        colModel: [{ name: 'IdMantenimientoCampos', index: 'IdMantenimientoCampos', label: 'IdMantenimientoCampos', width: '100', hidden: true },
                   { name: 'IdMantenimiento', index: 'IdMantenimiento', label: 'IdMantenimiento', width: '100', hidden: true },
   		           { name: 'Descripcion', index: 'Descripcion', label: 'Nombre', width: '200', hidden: false },
   		           { name: 'IdTipoDato', index: 'IdTipoDato', label: 'IdTipoDato', width: '242', hidden: true },
   		           { name: 'TipoDato', index: 'TipoDato', label: 'Tipo de Dato', width: '150', hidden: false },
   		           { name: 'Parametros', index: 'Parametros', label: 'Parametros', width: '242', hidden: true },
   		           { name: 'IdCampo', index: 'IdCampo', label: 'IdCampo', width: '242', hidden: true },
   		           { name: 'Nuevo', index: 'Nuevo', label: 'Nuevo', width: '242', hidden: true },
   		           { name: 'Id', index: 'Id', label: 'Id', width: '242', hidden: true }
   	              ],
        sortname: "Descripcion",
        sortorder: "asc",
        width: 450,
        height: 8 * 23,
        viewrecords: true,
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        ondblClickRow: function (id) {
            $("#btnEditar").click();
        }
    });

    var tbParametro = $("#tbParametro").jqGrid({
        datatype: "local",
        colModel: [{ name: 'Id', index: 'Id', label: 'Id', width: '100', hidden: true },
   		           { name: 'Nombre', index: 'Nombre', label: 'Nombre', width: '200', editable: true, hidden: false }
   	              ],
        sortname: "Nombre",
        sortorder: "asc",
        width: "270",
        height: "100",
        viewrecords: true,
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        ondblClickRow: function (id) {
            $("#btnEditarParametro").click();
        },
        onSelectRow: function (id) {
            if (EditarParametro && ParametroSeleccionado != id) {
                $("#tbParametro").jqGrid('restoreRow', ParametroSeleccionado);
                EditarParametro = false;
                $("#btnEditarParametro a").html("Editar");
                $("#btnEliminarParametro a").html("Eliminar");
                $("#btnEditarParametro img").attr("src", "../../Common/Images/Mantenimiento/edit_16x16.gif");
                ParametroSeleccionado = 0;
            }
        }
    });

    Dimensionar();

    //cargar campos
    var Contador = 1;
    $(arCampos).each(function () {
        $("#tbCamposExtras").jqGrid('addRowData', Contador, {
            'IdMantenimientoCampos': this.IdMantenimientoCampos,
            'IdMantenimiento': this.IdMantenimiento,
            'Descripcion': this.Descripcion,
            'IdTipoDato': this.IdTipoDato,
            'TipoDato': this.TipoDato,
            'Parametros': this.Parametros,
            'IdCampo': this.IdCampo,
            'Nuevo': 0,
            'Id': Contador
        });
        Contador++;
    });

    //#endregion

    //#region Eventos
    $(window).resize(function () {
        Dimensionar();
    });

    $("#btnGuardar").click(function () {
        var oMantenimiento = new MNT_Mantenimiento();
        var oCamposExtras;

        oMantenimiento.IdMantenimiento = $("#hdfIdMantenimiento").val();
        oMantenimiento.Codigo = $("#txtCodigo").val();
        oMantenimiento.Nombre = $("#txtNombre").val();
        oMantenimiento.btVig = $('#chkEstado').is(':checked');


        if (oMantenimiento.Codigo == "") {
            vIndexAccordion = 0;
            vIdControl = "#txtCodigo";
            alerta("Ingrese un código", null, FocusAlert);
            return;
        }

        if (oMantenimiento.Nombre == "") {
            vIndexAccordion = 0;
            vIdControl = "#txtNombre";
            alerta("Ingrese un nombre", null, FocusAlert);
            return;
        }

        var oCamposExtras = $("#tbCamposExtras").jqGrid('getRowData');
        oMantenimiento.CantidadCampos = oCamposExtras.length;
        if (oMantenimiento.CantidadCampos == 0) {
            vIndexAccordion = 1;
            vIdControl = "#txtNombreCampo";
            vClickControl = "#btnAgregar";
            alerta("Ingrese por lo menos un campo para el mantenimiento.", null, FocusAlert);
            return;
        }

        $.each(oCamposExtras, function () {
            if (this.IdTipoDato == "8" || this.IdTipoDato == "9") {
                this.Parametros = JSON.parse(this.Parametros);
            }
        });

        BloquearPagina(true);

        $.ajax({
            type: "POST",
            url: "Mnt_Configuracion.aspx/Guardar",
            data: "{'oMantenimiento': '" + JSON.stringify(oMantenimiento) + "'," +
                   "'CamposExtras': '" + JSON.stringify(oCamposExtras) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "-1") {
                    BloquearPagina(false);
                    alerta("Ya se ha registrado un mantenimiento con el mismo nombre, los nombres no pueden repetirse");
                }
                if (result.d == "-1") {
                    BloquearPagina(false);
                    alerta("Ya se ha registrado un mantenimiento con el mismo código, los códigos no pueden repetirse");
                }
                else {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Registro guardado</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });

    $("#btnAgregar").click(function () {
        $(".ParametrosCampo").hide();

        $("#txtNombreCampo").val("");
        $("#txtNombreCampo").keypress(ValidarAlfaNumericoConEspacios);
        $("#ddlTipoDato").val("1");
        $("#tbParametro").jqGrid('clearGridData');
        $("#txtLongitud").val("");
        $("#txtNumeroDecimales").val("");
        $("#txtValorVerdadero").val("");
        $("#txtValorFalso").val("");
        $("#txtParametro").val("");
        $("#txtNombreCampo").focus();
        $("#txtNombreCampo").removeAttr("disabled");
        $("#ddlTipoDato").removeAttr("disabled");
        $("#txtLongitud").removeAttr("disabled");
        $("#txtNumeroDecimales").removeAttr("disabled");

        $("#dvCampo").dialog({
            title: "Agregar Campo",
            modal: true,
            width: 500,
            height: 320,
            resizable: false,
            closeOnEscape: false,
            buttons: {
                "Aceptar": function () {
                    var Campos = $("#tbCamposExtras").jqGrid('getRowData');
                    var Repetido = false;
                    var Parametros = "";
                    var IdNuevo = 1;

                    if ($("#txtNombreCampo").val() == "") {
                        alerta("Ingrese el nombre del campo");
                        return;
                    }
                    else if ($("#ddlTipoDato").val() == "2")//Numérico Decimal
                    {
                        if ($("#txtNumeroDecimales").val() == "") {
                            alerta("Ingrese el número de decimales");
                            $("#txtNumeroDecimales").focus();
                            return;
                        }
                        else
                            Parametros = $("#txtNumeroDecimales").val();
                    }
                    else if ($("#ddlTipoDato").val() == "3")//Texto
                    {
                        if ($("#txtLongitud").val() == "") {
                            alerta("Ingrese la longitud del campo texto");
                            $("#txtLongitud").focus();
                            return;
                        }
                        else
                            Parametros = $("#txtLongitud").val();
                    }
                    else if ($("#ddlTipoDato").val() == "6")//Lógico
                    {
                        if ($("#txtValorVerdadero").val() == "") {
                            alerta("Ingrese el valor verdadero para el campo lógico");
                            $("#txtValorVerdadero").focus();
                            return;
                        }
                        else if ($("#txtValorFalso").val() == "") {
                            alerta("Ingrese el valor falso para el campo lógico");
                            $("#txtValorFalso").focus();
                            return;
                        }
                        else
                            Parametros = $("#txtValorVerdadero").val() + "," + $("#txtValorFalso").val();
                    }
                    else if ($("#ddlTipoDato").val() == "8" || $("#ddlTipoDato").val() == "9")//Lista de Selección
                    {
                        var Parametros = $("#tbParametro").jqGrid('getRowData');
                        if ($("#tbParametro").jqGrid('getRowData').length == 0) {
                            alerta("Ingrese por lo menos un parametro");
                            return;
                        }
                        else
                            Parametros = JSON.stringify($("#tbParametro").jqGrid('getRowData'));
                    }
                    $.each(Campos, function () {
                        if ($("#txtNombreCampo").val() == this.Descripcion)
                            Repetido = true;
                        if (parseInt(this.Id) > parseInt(IdNuevo))
                            IdNuevo = this.Id;
                    });

                    if (Repetido) {
                        alerta("Ya ingreso un campo con el mismo nombre");
                        return;
                    }

                    IdNuevo = (parseInt(IdNuevo) + 1).toString();

                    $("#tbCamposExtras").jqGrid('addRowData', IdNuevo, { 'IdMantenimientoCampos': '-1', 'IdMantenimiento': $("#hdfIdMantenimiento").val(), 'Descripcion': $("#txtNombreCampo").val(),
                        'IdTipoDato': $("#ddlTipoDato").val(), 'TipoDato': $("#ddlTipoDato option:selected").text(), 'Parametros': Parametros,
                        'IdCampo': -1, 'Nuevo': 1, 'Id': IdNuevo
                    });

                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#btnEditar").click(function () {
        var id = $("#tbCamposExtras").jqGrid('getGridParam', 'selrow');

        if (id) {
            $(".ParametrosCampo").hide();
            $("#txtNombreCampo").val("");
            $("#ddlTipoDato").val("1");
            $("#tbParametro").jqGrid('clearGridData');
            $("#txtLongitud").val("");
            $("#txtNumeroDecimales").val("");
            $("#txtValorVerdadero").val("");
            $("#txtValorFalso").val("");
            $("#txtParametro").val("");
            $("#txtNombreCampo").focus();
            var Campos = $("#tbCamposExtras").jqGrid('getRowData', id);
            $("#txtNombreCampo").val(Campos.Descripcion);
            $("#ddlTipoDato").val(Campos.IdTipoDato);
            DescripcionSeleccion = Campos.Descripcion;

            if (Campos.Nuevo == "0" && $("#hdfNumeroRegistro").val() != '0') {
                $("#ddlTipoDato").attr("disabled", "disabled");
                $("#txtLongitud").attr("disabled", "disabled");
                $("#txtNumeroDecimales").attr("disabled", "disabled");
            }

            if (Campos.IdTipoDato == "2")//Numérico Decimal
            {
                $("#trParametroDecimal").show();
                $("#txtNumeroDecimales").val(Campos.Parametros);
            }
            else if (Campos.IdTipoDato == "3")//Texto
            {
                $("#trParametroTexto").show();
                $("#txtLongitud").val(Campos.Parametros);
            }
            else if (Campos.IdTipoDato == "6")//Lógico
            {
                $(".trParametroBool").show();
                $("#txtValorVerdadero").val(Campos.Parametros.split(",")[0]);
                $("#txtValorFalso").val(Campos.Parametros.split(",")[1]);
            }
            else if (Campos.IdTipoDato == "8" || Campos.IdTipoDato == "9")//Lista de Selección
            {
                $("#trParametroLista").show();
                $("#tbParametro").jqGrid('clearGridData');
                var Parametros = JSON.parse(Campos.Parametros);

                $.each(Parametros, function () {
                    $("#tbParametro").jqGrid('addRowData', this.Id, { 'Id': this.Id, 'Nombre': this.Nombre });
                });
            }

            $("#dvCampo").dialog({
                title: "Agregar Campo",
                modal: true,
                width: 500,
                height: 320,
                resizable: false,
                closeOnEscape: false,
                buttons: {
                    "Aceptar": function () {
                        var Campos = $("#tbCamposExtras").jqGrid('getRowData');
                        var Repetido = false;
                        var Parametros = "";

                        if ($("#txtNombreCampo").val() == "") {
                            alerta("Ingrese el nombre del campo");
                            return;
                        }
                        else if ($("#ddlTipoDato").val() == "2")//Numérico Decimal
                        {
                            if ($("#txtNumeroDecimales").val() == "") {
                                alerta("Ingrese el número de decimales");
                                $("#txtNumeroDecimales").focus();
                                return;
                            }
                            else
                                Parametros = $("#txtNumeroDecimales").val();
                        }
                        else if ($("#ddlTipoDato").val() == "3")//Texto
                        {
                            if ($("#txtLongitud").val() == "") {
                                alerta("Ingrese la longitud del campo texto");
                                $("#txtLongitud").focus();
                                return;
                            }
                            else
                                Parametros = $("#txtLongitud").val();
                        }
                        else if ($("#ddlTipoDato").val() == "6")//Lógico
                        {
                            if ($("#txtValorVerdadero").val() == "") {
                                alerta("Ingrese el valor verdadero para el campo lógico");
                                $("#txtValorVerdadero").focus();
                                return;
                            }
                            else if ($("#txtValorFalso").val() == "") {
                                alerta("Ingrese el valor falso para el campo lógico");
                                $("#txtValorFalso").focus();
                                return;
                            }
                            else
                                Parametros = $("#txtValorVerdadero").val() + "," + $("#txtValorFalso").val();
                        }
                        else if ($("#ddlTipoDato").val() == "8" || $("#ddlTipoDato").val() == "9")//Lista de Selección
                        {
                            var Parametros = $("#tbParametro").jqGrid('getRowData');
                            if ($("#tbParametro").jqGrid('getRowData').length == 0) {
                                alerta("Ingrese por lo menos un parametro");
                                return;
                            }
                            else
                                Parametros = JSON.stringify($("#tbParametro").jqGrid('getRowData'));
                        }
                        $.each(Campos, function () {
                            if ($("#txtNombreCampo").val() == this.Descripcion && DescripcionSeleccion != this.Descripcion)
                                Repetido = true;
                        });

                        if (Repetido) {
                            alerta("Ya ingreso un campo con el mismo nombre");
                            return;
                        }

                        $("#tbCamposExtras").jqGrid('setRowData', id, { 'Descripcion': $("#txtNombreCampo").val(), 'IdTipoDato': $("#ddlTipoDato").val(),
                            'TipoDato': $("#ddlTipoDato option:selected").text(), 'Parametros': Parametros
                        });

                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else
            alerta("Seleccione un registro");
    });

    $("#btnEliminar").click(function () {
        var id = $("#tbCamposExtras").jqGrid('getGridParam', 'selrow');
        if (id) {
            var Campos = $("#tbCamposExtras").jqGrid('getRowData', id);

            if (Campos.Nuevo == "0" && $("#hdfNumeroRegistro").val() != '0') {
                alerta("No se puede quitar este campo por que ya existen registros en el mantenimiento.");
                return;
            } else {
                confirmacion("¿Desea quitar este campo?", EliminarCampo);
            }
        }
        else
            alerta("Seleccione un registro");
    });

    $("#ddlTipoDato").change(function () {
        $(".ParametrosCampo").hide();
        $("#tbParametro").jqGrid('clearGridData');
        $("#txtLongitud").val("");
        $("#txtNumeroDecimales").val("");
        $("#txtValorVerdadero").val("");
        $("#txtValorFalso").val("");
        $("#txtParametro").val("");

        if ($(this).val() == "2")//Numérico Decimal
        {
            $("#trParametroDecimal").show();
            $("#txtNumeroDecimales").focus();
        }
        else if ($(this).val() == "3")//Texto
        {
            $("#trParametroTexto").show();
            $("#txtLongitud").focus();
        }
        else if ($(this).val() == "6")//Lógico
        {
            $(".trParametroBool").show();
            $("#txtValorVerdadero").focus();
        }
        else if ($(this).val() == "8" || $(this).val() == "9")//Lista de Selección
        {
            $("#trParametroLista").show();
        }
    });

    $("#btnAgregarParametro").click(function () {
        var Parametros = $("#tbParametro").jqGrid('getRowData');
        var IdMax = 0;
        var Repetido = false;

        if ($("#txtParametro").val() == "") {
            alerta("Ingrese un valor para el parametro");
            return;
        }

        $.each(Parametros, function () {
            if (IdMax < parseInt(this.Id))
                IdMax = parseInt(this.Id);

            if ($("#txtParametro").val() == this.Nombre)
                Repetido = true;
        });

        if (Repetido) {
            alerta("Ya ingreso un parametro con el mismo nombre");
            return;
        }

        $("#tbParametro").jqGrid('addRowData', IdMax + 1, { 'Id': IdMax + 1, 'Nombre': $("#txtParametro").val() });
        $("#txtParametro").val("");
        $("#txtParametro").focus();
    });

    $("#btnEditarParametro").click(function () {
        var id = $("#tbParametro").jqGrid('getGridParam', 'selrow');
        if (id) {
            if (!EditarParametro) {
                $("#tbParametro").jqGrid('editRow', id);
                EditarParametro = true;
                $("#btnEditarParametro a").html("Guardar");
                $("#btnEliminarParametro a").html("Cancelar");
                $("#btnEditarParametro img").attr("src", "../../Common/Images/Mantenimiento/Guardar.png");
                ParametroSeleccionado = id;
            }
            else {
                var Valor = $("#" + id + "_Nombre").val();
                $("#tbParametro").jqGrid('restoreRow', id);
                $("#tbParametro").jqGrid('setCell', id, 'Nombre', Valor);
                EditarParametro = false;
                $("#btnEditarParametro a").html("Editar");
                $("#btnEliminarParametro a").html("Eliminar");
                $("#btnEditarParametro img").attr("src", "../../Common/Images/Mantenimiento/edit_16x16.gif");
                ParametroSeleccionado = 0;
            }
        }
        else
            alerta("Seleccione un Parametro");
    });

    $("#btnEliminarParametro").click(function () {
        var id = $("#tbParametro").jqGrid('getGridParam', 'selrow');
        if (id) {
            if (!EditarParametro) {
                confirmacion("¿Desea quitar este parametro?", EliminarParametro);
            }
            else {
                $("#tbParametro").jqGrid('restoreRow', ParametroSeleccionado);
                EditarParametro = false;
                $("#btnEditarParametro a").html("Editar");
                $("#btnEliminarParametro a").html("Eliminar");
                $("#btnEditarParametro img").attr("src", "../../Common/Images/Mantenimiento/edit_16x16.gif");
                ParametroSeleccionado = 0;
            }
        }
        else
            alerta("Seleccione un Parametro");
    });

    $("#txtParametro").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#btnAgregarParametro").click();
        }
    });
    //#endregion

    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $('#tabContenido').css({ "height": Alto - 160 });
    }
});

function EliminarCampo() {
    var id = $("#tbCamposExtras").jqGrid('getGridParam', 'selrow');
    $("#tbCamposExtras").jqGrid('delRowData', id);
}

function LimpiarTodo() {
    $("#txtCodigo").val("");
    $("#txtNombre").val("");
}

function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfIdMantenimiento").val() == "") {//Nuevo
        LimpiarTodo();
    } else {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }
}

function EliminarParametro() {
    var id = $("#tbParametro").jqGrid('getGridParam', 'selrow');
    $("#tbParametro").jqGrid('delRowData', id);
}

function FocusAlert() {
    var IndexAccordion = vIndexAccordion;
    var IdControl = vIdControl;
    if ($("#AccordionJQ1").accordion("option", "active").toString() == "false") {
        $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    } else {
        if ($("#AccordionJQ1").accordion("option", "active") != IndexAccordion)
            $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    }
    if (vClickControl != "") {
        $(vClickControl).click();
        vClickControl = "";
    }
    if (IdControl != "") {
        $(IdControl).focus();
    }
}