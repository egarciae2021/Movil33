var TipoGuardar = '';
var ValorInicialPicklist = '';

function CargarValoresCombo() {
    if ((typeof ValoresCombo != 'undefined') && ValoresCombo != '') {
        var mValores = ValoresCombo.split(',');
        for (var i = 0; i < mValores.length; i++) {
            $('#lstPicklist').append('<option value="' + mValores[i] + '">' + mValores[i] + '</option>');
        }
    }
}


$(function () {

    CargarValoresCombo();
    var indiceTab = window.parent.tab.tabs("option", "selected");
    var LongDat = $("#hdfTamano").val().split(',');

    //var TextoParametros = ['', 'Ej: 10,2 (Use "Coma" como separador)', 'Max', '', '', 'Ej: si,no (Use "Coma" como separador)'];
    var TextoParametros = ['Ej: bmp,png,jpg', '', '', '', 'Ej: si,no (Use "Coma" como separador)', 'Ej: 10,2 (Use "Coma" como separador)', '', '', 'Max'];

    var cont = 0;

    $(".btnNormal").button();
    VerificarTamano();

    if ($.trim($("#hdfCaracteristica").val()) == "") {
        $("#txtCampo").focus();
    }
    else {
        $("#txtDescripcion").focus().select();
    }

    ActivarCombokendo("#ddlTabla", "200");
    ActivarCombokendo("#ddlTipoDato", "200");

    function VerificarTamano() {

        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 0) {
            $("#trTamDat").hide();
            $("#txtTamanoDato").val('');
        }
        else {
            //alert(LongDat[$("#ddlTipoDato").prop('selectedIndex')]);
            $("#tdTamano").html('Tamaño');
            $("#divPicklist").hide();
            $("#lblMensajeTamano").show();
            $("#txtTamanoDato").show();
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 3) {
                //Logico
                $("#txtTamanoDato").attr('maxlength', '35');
                $("#tdTamano").html('Valores');
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2) {
                //Numero Decimal
                $("#txtTamanoDato").attr('maxlength', '4');
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 1) {
                //Texto
                $("#txtTamanoDato").attr('maxlength', '4');
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 8) {
                //Picklist
                $("#divPicklist").show();
                $("#lblMensajeTamano").hide();
                $("#txtTamanoDato").hide();
                $("#tdTamano").html('Valores');
            }
            $("#trTamDat").show();
            $("#txtTamanoDato").addClass("txtBusqueda");
            $("#txtTamanoDato").val('');
            $("#txtTamanoDato").val(TextoParametros[$("#ddlTipoDato").prop('selectedIndex')]);
            $("#lblMensajeTamano").html(TextoParametros[$("#ddlTipoDato").prop('selectedIndex')]);
        }
    }

    $("#txtTamanoDato").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $("#txtTamanoDato").val("");
        }
    });

    $("#txtTamanoDato").blur(function (i) {
        if ($("#txtTamanoDato").val() == "") {
            $(this).addClass("txtBusqueda");
            $("#txtTamanoDato").val(TextoParametros[$("#ddlTipoDato").prop('selectedIndex')]);
        }
        //        else {
        //        }
    });

    $("#txtTamanoDato").keypress(VerificaTipo);
    $("#txtCampo").keypress(ValidarNoEspacio);

    $("#txtTamanoDato").bind('paste', function (e) {
        return false;
    });

    $("#txtCampo").bind('paste', function (e) {
        return false;
    });

    function VerificaTipo(event) {
        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 1) {
            return ValidarEnteroPositivo(event, $("#txtTamanoDato"));
        }
        else if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2 && $("#ddlTipoDato").prop('selectedIndex') != 5) {
            return ValidarDecimalComaPositivo(event, $("#txtTamanoDato"));
        }
        else {
            return true;
        }
    }

    $("#txtDescripcion").focusout(function () {
        $("#txtDescripcion").val($("#txtDescripcion").val().replace(/\\/g, ""));
    });

    $("#txtTamanoDato").focusout(function () {
        $("#txtTamanoDato").val($("#txtTamanoDato").val().replace(/\\/g, ""));
    });

    $("#btnGuardar").live("click", function () {
        var Campo = $("#txtCampo").val();
        var Tabla = $('#ddlTabla').val();
        var TipoDato = $('#ddlTipoDato').val();
        var TamanoDato = $("#txtTamanoDato").val();
        var Descripcion = $.trim($("#txtDescripcion").val().replace(/\\/g, ""));

        if (Campo == "" && $("#hdfCaracteristica").val() == "") {
            alerta("El Campo es un campo obligatorio");
            $("#txtCampo").focus();
            return;
        }
        else if (Descripcion == "") {
            alerta("La Descripción es un campo obligatorio");
            $("#txtDescripcion").focus();
            return;
        }
        else if (Tabla == "-1" && $("#hdfCaracteristica").val() == "") {
            alerta("Elija una Tabla ya que es un campo obligatorio");
            $("#ddlTabla").focus();
            return;
        }
        else if (TipoDato == "-1" && $("#hdfCaracteristica").val() == "") {
            alerta("Elija un tipo de dato ya que es un campo obligatorio");
            $("#ddlTipoDato").focus();
            return;
        }
        else if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] != 8 && $("#txtTamanoDato").hasClass("txtBusqueda") && LongDat[$("#ddlTipoDato").prop('selectedIndex')] > 0 && $("#hdfCaracteristica").val() == "") {
            alerta("Ingrese el tamaño del campo que para el tipo de dato elegido es obligatorio");
            $("#txtTamanoDato").focus();
            return;
        }

        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 1) {
            if (TamanoDato > 8000) {
                alerta("Ingrese un valor de tamaño válido - No puede superar a 8000 caracteres");
                $("#txtTamanoDato").focus();
                return;
            }
        }

        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2 && (TamanoDato.indexOf(',') == -1 || TamanoDato.substring(TamanoDato.length - 1, TamanoDato.length) == ",") && $("#hdfCaracteristica").val() == "") {
            alerta("Ingrese un valor de tamaño válido");
            $("#txtTamanoDato").focus();
            return;
        }

        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2) {
            var NumeroEntero, NumeroDecimal;
            var coma = TamanoDato.indexOf(',');
            NumeroEntero = TamanoDato.substring(0, coma);
            NumeroDecimal = TamanoDato.substring(coma + 1, 4);
            if (parseInt(NumeroDecimal) > parseInt(NumeroEntero) || NumeroEntero.substring(0, 1).toString() == "0") {
                alerta("Ingrese un valor de tamaño válido");
                $("#txtTamanoDato").focus();
                return;
            }
        }


        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 3) {
            cont = 0;
            var i = 0;

            for (i = 0; i < TamanoDato.length.toString(); i++) {
                var txtExtraido = TamanoDato.substring(i, i + 1);
                if (txtExtraido == ",") {
                    cont += 1;
                    txtExtraido = "";
                }
            }
            //if (TamanoDato.indexOf(',') == -1) {
            if (cont == 0 || cont > 1) {
                alerta("Ingrese un valor de tamaño válido - debe ingresar 2 valores");
                $("#txtTamanoDato").focus();
                return;
            }
        }


        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 8) {
            //PickList
            if ($('#lstPicklist option').length == 0) {
                alert('Debe ingresar como mínimo un valor en la lista');
                $('#lstPicklist').focus();
                return;
            }

            TamanoDato = '';
            $('#lstPicklist option').each(function () {
                TamanoDato = TamanoDato + "," + $(this).val();
            });

            TamanoDato = TamanoDato.substring(1, TamanoDato.toString().length);

            if (TamanoDato > 8000) {
                alerta("Ingrese un valor de tamaño válido - No puede superar a 8000 caracteres");
                $('#lstPicklist').focus();
                return;
            }
        }

        //var btVig = 0;
        var btVig = $('#chkEstado').is(':checked');
        //jherrera 20130425 Se agrego el check de EsFormula
        //-------------------------------------------------
        var btEsFor = $('#chkFormula').is(':checked');
        //-------------------------------------------------

        var btMosReporte = $('#chkReporte').is(':checked');

        var Valores = Campo + "," + Tabla + "," + TipoDato + "," + TamanoDato + "," + Descripcion;

        Descripcion = Descripcion.replace(/'/g, "&#39");

        TamanoDato = TamanoDato.replace(/'/g, "&#39").replace(/\\/g, "");

        //jherrera 20130425 Se agrego el check de EsFormula
        //-------------------------------------------------
        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Mnt_Caracteristica.aspx/Guardar",
            data: "{'Campo': '" + Campo + "'," +
                   "'Tabla': '" + Tabla + "'," +
                   "'TipoDato': '" + TipoDato + "'," +
                   "'TamanoDato': '" + TamanoDato + "'," +
                   "'Descripcion': '" + Descripcion + "'," +
                   "'inCodCar': '" + $("#hdfCaracteristica").val() + "'," +
                   "'btVig': '" + btVig + "'," +
                   "'btEsFor': '" + btEsFor + "'," + 
                   "'btMosReporte': '" + btMosReporte + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<h1>Característica guardada</h1>", document, CerroMensaje);
                }
                else {
                    alerta("El Campo de la Caracteristica ya ha sido Registrada Anteriormente, no se Pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
        //-------------------------------------------------
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

    function CerroMensaje() {
        BloquearPagina(false);
        //debugger;
        if ($("#hdfCaracteristica").val() == "") {
            //window.location.href = 'Mnt_Caracteristica.aspx';
            $("#txtCampo").val("");
            $("select#ddlTabla").prop('selectedIndex', 0);
            $("select#ddlTipoDato").prop('selectedIndex', 0);
            $("#txtTamanoDato").val("");
            $("#txtDescripcion").val("");
            $("#trTamDat").hide();
            $("#txtCampo").focus();
            $('#chkFormula').prop('checked', false);
            $('#chkReporte').prop('checked', false);
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
    $("#ddlTipoDato").live("change", function () {
        VerificarTamano();
        VerificarEsFormula();
        VerificarCampoEnReporte();
    });

    $("#ddlTabla").live("change", function () {
        var tabla = $("#ddlTabla").data("kendoComboBox").text();
        if (tabla == "Línea" || tabla == "Dispositivo" || tabla == "Empleados") {
            if ($("#ddlTipoDato").val() == "1" || $("#ddlTipoDato").val() == "2" || $("#ddlTipoDato").val() == "3" || $("#ddlTipoDato").val() == "4" || $("#ddlTipoDato").val() == "5" || $("#ddlTipoDato").val() == "6" || $("#ddlTipoDato").val() == "8") {
                $("#chkReporte").prop('disabled', false);
            }
            else {
                $("#chkReporte").prop('disabled', true);
            }
        }
        else {
            document.getElementById("chkReporte").checked = false;
            $("#chkReporte").prop('disabled', true);
        }
    });

    function VerificarEsFormula() {
        $("#chkFormula").prop('disabled', true);
        $('input[name=chkFormula]').attr('checked', false);

        if ($("#ddlTipoDato").val() == "1" || $("#ddlTipoDato").val() == "2" || $("#ddlTipoDato").val() == "4" || $("#ddlTipoDato").val() == "5") {
            $("#chkFormula").prop('disabled', false);
        }
        else {
            $("#chkFormula").prop('disabled', true);
        }
    }

    function VerificarCampoEnReporte() {
        $("#chkReporte").prop('disabled', true);
        //$('input[name=chkReporte]').attr('checked', false);

        var tabla = $("#ddlTabla").data("kendoComboBox").text();
        if (tabla == "Línea" || tabla == "Dispositivo" || tabla == "Empleados") {
            if ($("#ddlTipoDato").val() == "1" || $("#ddlTipoDato").val() == "2" || $("#ddlTipoDato").val() == "3" || $("#ddlTipoDato").val() == "4" || $("#ddlTipoDato").val() == "5" || $("#ddlTipoDato").val() == "6" || $("#ddlTipoDato").val() == "8") {
                $("#chkReporte").prop('disabled', false);
            }
            else {
                document.getElementById("chkReporte").checked = false;
                $("#chkReporte").prop('disabled', true);
            }
        }

    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $("#btnPicklistAgregar").live("click", function () {
        fnPicklistAgregar();
    });

    $("#btnPicklistEditar").live("click", function () {
        fnPicklistEditar();
    });

    $("#btnPicklistEliminar").live("click", function () {
        fnPicklistEliminar();
    });

    $("#btnPicklistSubir").live("click", function () {
        fnPicklistSubir();
    });

    $("#btnPicklistBajar").live("click", function () {
        fnPicklistBajar();
    });



    $("#lstPicklist").live("dblclick", function () {
        fnPicklistEditar();
    });


    $("#btnGuardarPicklist").click(function (event) {
        fnGuardarPicklist();
    });

    $('#txtValorPicklist').keypress(function (event) {
        if (event.which == '13') {
            fnGuardarPicklist();
        }
    });

    $("#btnCerrarPicklist").click(function (event) {
        $('#divValorPicklist').dialog("close");
    });

    $(".btnPicklist").button();
    $(".btnPicklist").css({ "width": "80px" });
    $("#lstPicklist").css({ "height": "150px" });

    $("input[name='ddlTabla_input']").attr("disabled", "disabled");
    $("input[name='ddlTipoDato_input']").attr("disabled", "disabled");

    VerificarCampoEnReporte();
});


function fnGuardarPicklist() {
    var Valor = $("#txtValorPicklist").val();
    Valor = Valor.replace(/'/g, "&#39").replace(/\\/g, "");

    if ($.trim(Valor) == '') {
        $("#txtValorPicklist").val('');
        alert('Debe ingresar un valor');
        $("#txtValorPicklist").focus();
        return;
    }
    if (TipoGuardar == 'A') {

        if (fnValidaExisteItem(Valor) == 1) {
            alert('El valor ingresado ya existe');
            $("#txtValorPicklist").focus();
            return;
        }
        $('#lstPicklist').append('<option value="' + Valor + '">' + Valor + '</option>');
        $("#txtValorPicklist").val('');
        $("#txtValorPicklist").focus();
    }
    else {
        if (ValorInicialPicklist.toString().toLowerCase() != Valor.toString().toLowerCase()) {

            if (fnValidaExisteItem(Valor) == 1) {
                alert('El valor ingresado ya existe');
                $("#txtValorPicklist").focus();
                return;
            }

            $("#lstPicklist option[value='" + ValorInicialPicklist + "']").after('<option value="' + Valor + '">' + Valor + '</option>');
            $("#lstPicklist option[value='" + ValorInicialPicklist + "']").remove();
        }
        $('#divValorPicklist').dialog("close");
        $("#lstPicklist").focus();
    }
}

function fnPicklistEditar() {

    if ($('#lstPicklist option').length == 0) {
        return;
    }

    var list = "";
    $('#lstPicklist option:selected').each(function () {
        list += this.value + "|";
    });

    if ($('#lstPicklist option:selected').length == 0) {
        alert('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alert('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }

    var Valor = $('#lstPicklist option:selected')[0].value;
    ValorInicialPicklist = Valor;
    $("#tdTituloPicklist").html('Modificar la etiqueta de este valor de lista.');
    $("#txtValorPicklist").val(Valor);
    $("#txtValorPicklist").focus();
    TipoGuardar = 'E';
    Modal = $('#divValorPicklist').dialog({
        title: "Modificar valor de lista",
        width: 300,
        height: 135,
        modal: true,
        resizable: false
    });


}

function fnPicklistEliminar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }

    if ($('#lstPicklist option:selected').length == 0) {
        alerta('Seleccione un ítem como mínimo');
        $('#lstPicklist').focus();
        return;
    }

    if (confirm('El valor asociado con esta opción de lista se eliminará de forma permanente. Una vez eliminado del sistema el valor de lista, no se puede volver a agregar. Los registros existentes que contengan este valor se deben actualizar manualmente con otro valor de la lista.\n\nHaga clic en Aceptar para continuar.')) {
        $('#lstPicklist option:selected').remove();
    }
    else {
        return;
    }
}

function fnPicklistAgregar() {
    $("#tdTituloPicklist").html('Agregar nuevo valor a la lista.');
    $("#txtValorPicklist").val('');
    $("#txtValorPicklist").focus();
    TipoGuardar = 'A';
    Modal = $('#divValorPicklist').dialog({
        title: "Agregar valor a la lista",
        width: 300,
        height: 135,
        modal: true,
        resizable: false
    });
}

function fnPicklistSubir() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }
    if ($('#lstPicklist option:selected').length == 0) {
        alert('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alert('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }

    var Valor = $('#lstPicklist option:selected')[0].value;
    var ValorAnterior = '';
    $('#lstPicklist option').each(function () {
        if ($(this).val() == Valor) {
            return false;
        }
        ValorAnterior = $(this).val();
    });

    if (ValorAnterior != '') {
        $("#lstPicklist option[value='" + Valor + "']").insertBefore("#lstPicklist option[value='" + ValorAnterior + "']");
    }

}

function fnPicklistBajar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }
    if ($('#lstPicklist option:selected').length == 0) {
        alert('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alert('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }

    var Valor = $('#lstPicklist option:selected')[0].value;
    var ValorPosterior = '';
    var blEncontroValor = 0;
    $('#lstPicklist option').each(function () {
        if (ValorPosterior == Valor) {
            ValorPosterior = $(this).val();
            blEncontroValor = 1;
            return false;
        }
        ValorPosterior = $(this).val();
    });

    if (blEncontroValor == 1) {
        $("#lstPicklist option[value='" + Valor + "']").insertAfter("#lstPicklist option[value='" + ValorPosterior + "']");
    }

}


function fnValidaExisteItem(strNuevoValor) {
    var blExiste = 0;
    $('#lstPicklist option').each(function () {
        if ($(this).val().toLowerCase() == strNuevoValor.toString().toLowerCase()) {
            blExiste = 1;
            return false;
        }
    });
    return blExiste;
}