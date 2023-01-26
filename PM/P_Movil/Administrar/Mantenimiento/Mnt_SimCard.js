var oCulturaUsuario;

function simcard(P_vcSimCard, Nombre, Observacion, btVig) {
    this.P_vcSimCard = P_vcSimCard;
    this.Nombre = Nombre;
    this.Observacion = Observacion;
    this.btVig = btVig;
    this.Organizacion = new organizacion();
}
function organizacion(vcCodInt) {
    this.vcCodInt = vcCodInt;
}

$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

    var indiceTab = 0;
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    } catch (e) {
    }

    var pagina = "";
    var Titulo = "";

    Mantenimiento_Mostrar_VARBINARY("", "../../../");

    IniciarPagina();



    ActivarCombokendo("#ddlCuenta", "200");

    //if ($("#hdfTotalLineas").val() > 0) {
    //    $("#ddlOperador").data("kendoComboBox").enable(false);
    //    $("#dvInfoOpe").show();
    //} else {
    //    $("#ddlOperador").data("kendoComboBox").enable();
    //    $("#dvInfoOpe").hide();
    //}

    function IniciarPagina() {
        $("#txtCodigo").focus();
        $(".tdEtiqueta").css("width", "80px");
        if ($("#hdfSimCard").val() != "") {
            $("#txtCodigo").prop("disabled", true);
        } else {
            $("#txtCodigo").prop("disabled", false);
        }
    }

    $(".btnNormal").button();

    $(".VARCHAR").keypress(ValidarCadena);
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);

    $(".DATETIME").AnyTime_picker({
        format: "%d/%m/%Y %H:%i:%s",
        labelTitle: "Fecha-Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true
    });

    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    $("#txtCodigo").focusout(function () {
        $("#txtCodigo").val($("#txtCodigo").val().replace(/\\/g, ""));
    });

    $("#btnGuardar").click(function (event) {
        debugger;
        var i = 0;
        var SimCard = new simcard();

        if ($("#hdfSimCard").val() == "") {
            SimCard.P_vcSimCard = "";
        }
        else {
            SimCard.P_vcSimCard = $("#hdfSimCard").val();
        }
        SimCard.Nombre = $("#txtCodigo").val().replace(/'/g, "").replace(/"/g, "&#34").replace(/\\/g, "");
        SimCard.Observacion = $("#txtObservacion").data("kendoEditor").value().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        SimCard.Organizacion.vcCodInt = $("#cbeOrganizacion_hdControl").val();
        SimCard.btVig = false;

        if ($('#chkEstado').is(':checked')) {
            SimCard.btVig = true;
        }

        if (SimCard.Nombre == "") {
            //window.top.alerta("El nombre del plan es un campo obligatorio");
            alerta("El numero de simcard es un campo obligatorio");
            $("#txtCodigo").focus();
            return;
        }

        if (SimCard.Organizacion.vcCodInt == "") {
            //window.top.alerta("El nombre del plan es un campo obligatorio");
            alerta("La selección de organización es un campo obligatorio");
            return;
        }

        if (SimCard.Observacion == "") {
            //window.top.alerta("El nombre del plan es un campo obligatorio");
            alerta("La descripción del simcard es un campo obligatorio");
            $("#txtObservacion").focus();
            return;
        }

        if (SimCard.Observacion.length > 500) {
            //window.top.alerta("Se exedío la cantidad de caracteres en la Descripción");
            alerta("Se exedío la cantidad de caracteres en la Descripción");
            var editor = $("#txtObservacion").data("kendoEditor");
            editor.focus();
            //$("#txtDescripcion").focus();
            return;
        }

        //if (Plan.F_inCodOpe == "-1") {
        //    //window.top.alerta("Seleccione un operador, es un campo obligatorio");
        //    alerta("Seleccione un operador, es un campo obligatorio");
        //    $("#ddlOperadorPlan").focus();
        //    return;
        //}


        i = 0;

        var oSimcard = JSON.stringify(SimCard);
        var CamposDinamicos = "";

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Mnt_SimCard.aspx/Guardar",
            data: "{'oSimCard': '" + oSimcard + "', " +
                "'vcCamDim': '" + CamposDinamicos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == -1) {
                    //window.top.alerta("El nombre del Plan ya ha sido registrada anteriormente, no se pudo grabar el registro");
                    alerta("El nombre del Plan ya ha sido registrada anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                } else {
                    try {
                        window.parent.ActualizarGrilla();
                    } catch (e) {
                    }
                    try {
                        window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
                    } catch (e) {
                    }
                    Mensaje("<br/><h1>Simcard guardado</h1><br/><h2>" + SimCard.P_vcSimCard + "</h2>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $("#btnCerrar").click(function (event) {
        try {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        } catch (e) {
        }
        try {
            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
        } catch (e) {
        }
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfSimCard").val() == "") {//Nuevo
            window.location.reload();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }

    }

    //DESCRIPCION
    $("#txtObservacion").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
            "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
            "insertUnorderedList", "insertOrderedList",
            "indent", "outdent"],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)"
        }
    });

    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnQuitarOrganizacion").click(function () {
        $("#cbeOrganizacion_spControl").html("");
        $("#cbeOrganizacion_hdControl").val("");
    });

    //$("input[name='ddlOperador_input']").attr("disabled", true);
    $("#txtCodigo").focus();


});

function IngresarAreaUnico(area) {//Carga el area seleccionada
    $("#cbeOrganizacion_spControl").html(area.vcNomOrg.split("=")[1]);
    $("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
}
