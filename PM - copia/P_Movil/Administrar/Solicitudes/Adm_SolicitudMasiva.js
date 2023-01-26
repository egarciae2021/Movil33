var colNombres;
var posColPaquete = -1;
var posColDetallePaquete = -1;
var posColLinea = -1;
var posColCodEmpleado = -1;
var posColTipoSolicitud = -1;
var posColIMEIActual = -1;
var posColModelo = -1;
var posColColor = -1;
var posColNuevoNumero = -1;
var posColSerieSIMNuevo = -1;
var posColIMEINuevo = -1;
var posColNuevoPlan = -1;
var posColNuevaCuenta = -1;
var posColSeguro = -1;
var posColPlazo = -1;
var posColBloquearIMEI = -1;

function fnRefresh_click() {
    confirmacion("Se volverá a cargar la página y los cambios no guardados se perderán. ¿Desea continuar?", function () {
        window.location.reload();
    }, null, "Confirmación");
}

function fnFullScreen_click() {
    window.top.fullScreen();
}
function fnDefaultFullScreen_click() {
    window.top.defaultScreen();
}

function fnGrabarDatos_click() {
    var filas = {};
    var filasQuitadas = {};
    var mFilasQuitadas = [];
    var columna;
    var cambios = $.fn.jexcel.defaults["my"].history; //Matriz de todos los cambios realizados.
    var historyIndex = $.fn.jexcel.defaults["my"].historyIndex; //Limite del cambio historico (si retrocede este valor cambia, lo mismo si avanza)
    var idSolicitud = '';
    var addRow = 0;
    for (var i = 0; i < cambios.length; i++) {
        if (i > historyIndex) {
            continue;
        }
        columna = "";
        //debugger;
        if (cambios[i].cellChanges) {
            for (var j = 0; j < cambios[i].cellChanges.length; j++) {
                columna = cambios[i].cellChanges[j].col;
                if (cambios[i].cellChanges[j].newValue != cambios[i].cellChanges[j].oldValue) {
                    idSolicitud = cambios[i].cellChanges[j].id;
                    //if (idSolicitud == "") {
                    //    idSolicitud = GUID();
                    //}
                    if (typeof filas["fila_" + idSolicitud] === 'undefined') {
                        filas["fila_" + idSolicitud] = { "id": idSolicitud };
                    }
                    filas["fila_" + idSolicitud][colNombres[columna]] = cambios[i].cellChanges[j].newValue;
                }
            }
        }
        if (cambios[i].action) {
            if (cambios[i].action.type == 'deleteRow') {
                for (var j = 0; j < cambios[i].action.rowData.length; j++) {
                    if (cambios[i].action.rowData[j]) {
                        idSolicitud = cambios[i].action.rowData[j][0];
                        if (typeof filasQuitadas["fila_" + idSolicitud] === 'undefined') {
                            filasQuitadas["fila_" + idSolicitud] = { "id": idSolicitud };
                            mFilasQuitadas.push(idSolicitud);
                        }
                    }
                }
            }
        }
    }

    var estilos = $('#my').jexcel('getStyle').join(',');
    var sFilas = JSON.stringify(filas);
    var sFilasQuitadas = mFilasQuitadas.join(',');
    if (sFilas == "{}" && sFilasQuitadas == "") {
        return;
    }

    var parametros = "{'estilos':'" + estilos + "','filas':'" + sFilas + "','filasQuitadas':'" + sFilasQuitadas + "'}";
    getAjax("Adm_SolicitudMasiva.aspx/grabarDatos", parametros).then(function (data) {
        alerta("Datos guardados");
        //window.location.reload();
        getAjax("Adm_SolicitudMasiva.aspx/obtenerListas", "{'os':'XXX', 'tmp':'" + data.d + "'}").then(function (data) {
            mostrarLista(data);
            mostrarGrillaExcel(data, false);
        }, function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        });

    }, function (xhr, err, thrErr) {
        MostrarErrorAjax(xhr, err, thrErr);
    });

}


function undo(instance, selectedCell) {
    //console.log("entra en undo");
    $(instance).jexcel('undo');
}

function redo(instance, selectedCell) {
    //console.log("entra en redo");
    $(instance).jexcel('redo');
}



var estilosGrilla = null;

var listaComboTipoSolicitudes = [];
var listaComboIMEI = [];
var listaComboTipoServicios = [];
var listaComboModeloDispositivo = [];
var listaComboPlan = [];
var listaComboCuenta = [];
var listaComboEstados = ['Pendiente', 'En Proceso', 'Culminada', 'Anulada'];
var listaComboTipoPlan = ['Tipo Plan 01', 'Tipo Plan 02', 'Tipo Plan 03'];
var listaComboSeguro = ['SI', 'NO'];
var listaComboRoamingTotal = [];
var listaComboRoaming = [];

function mostrarGrillaExcel(_data, _cargaPrimera) {
    colNombres = cabeceras.map(function (x) { return x.split('|')[0]; });

    posColPaquete = colNombres.indexOf("Paquete");
    posColDetallePaquete = colNombres.indexOf("DetallePaquete");
    posColLinea = colNombres.indexOf("Linea");
    posColCodEmpleado = colNombres.indexOf("CodEmpleado");
    posColTipoSolicitud = colNombres.indexOf("TipoSolicitud");
    posColIMEIActual = colNombres.indexOf("IMEIActual");
    posColModelo = colNombres.indexOf("Modelo");

    posColColor = colNombres.indexOf("Color");
    posColNuevoNumero = colNombres.indexOf("NuevoNumero");
    posColSerieSIMNuevo = colNombres.indexOf("SerieSIMNuevo");
    posColIMEINuevo = colNombres.indexOf("IMEINuevo");
    posColNuevoPlan = colNombres.indexOf("NuevoPlan");
    posColNuevaCuenta = colNombres.indexOf("NuevaCuenta");

    posColSeguro = colNombres.indexOf("Seguro");
    posColPlazo = colNombres.indexOf("Plazo");
    posColBloquearIMEI = colNombres.indexOf("BloquearIMEI");

    var colAncho = cabeceras.map(function (x) {
        if (x.indexOf("CodEmpleado") >= 0) {
            return 250; //Empleado
        }
        else if (x.indexOf("Estado") >= 0) {
            return 200; //TipoSolicitud
        }
        else if (x.indexOf("Fecha") >= 0) {
            return 110; //Estado
        }
        else if (x.indexOf("NuevaCuenta") >= 0) {
            return 350; //Observacion
        }
        else if (x.indexOf("DetallePaquete") >= 0) {
            return 200; //Modelo
        }
        else if (x.indexOf("Color") >= 0) {
            return 200; //NuevoPlan
        }
        else if (x.indexOf("NuevoPlan") >= 0) {
            return 200; //NuevaCuenta
        }
        else if (x.indexOf("NuevoNumero") >= 0) {
            return 200; //Paquete
        }
        else if (x.indexOf("Paquete") >= 0) {
            return 150; //DetallePaquete
        }
        else {
            return 100;
        }
    });


    //content: https://material.io/tools/icons/

    var alto = $(window).height() - 105;

    $('#my').jexcel({
        onchange: GrillaSolicitud.onchangeCell,
        //csvHeaders: true,
        //tableOverflow: true,
        //tableHeight: alto + 'px',
        ignoreEvents: false,
        data: matriz,
        colHeaders: colNombres,
        colWidths: colAncho,
        allowComments: false,
        allowInsertColumn: false,
        allowDeleteColumn: false,
        allowManualInsertRow: false,
        allowChangeNameColumn: false,
        columns: [
            { readOnly: true, type: 'hidden' },
            //{ type: 'calendar', options: { format: 'DD/MM/YYYY' } },
            { type: 'calendar', options: { format: 'DD/MM/YYYY' } },
            { type: 'dropdown', source: listaComboEstados },
            { type: 'autocomplete', source: listaComboTipoSolicitudes },
            { type: 'autocomplete', source: listaComboTipoServicios },
            {}, {},
            {},
            //{ type: 'autocomplete', source: [] },
            {},
            { readOnly: true },
            { readOnly: true },
            { readOnly: true },
            { type: 'autocomplete', source: listaComboRoaming },
            { type: 'autocomplete', source: [] },
            { type: 'autocomplete', source: listaComboModeloDispositivo },
            {}, {}, {},
            { type: 'autocomplete', source: listaComboPlan },
            { type: 'autocomplete', source: listaComboCuenta },
            {},
            { type: 'dropdown', source: listaComboSeguro }, {},
            { type: 'dropdown', source: listaComboSeguro }, //BloquearIMEI
            { readOnly: true, type: 'hidden' },
        ],
        toolbar: [
            {
                type: 'input', content: 'txtCantidadNuevo', method: fnAgregarFila_click,
                style: '{"width":"25px","margin-top":"2px","height":"24px","text-align":"right"}',
                maxlength: 3, defaultValue: '1', width: '25'
            },
            { type: 'i', content: 'add', method: fnAgregarFila_click },
            { type: 'i', content: 'save', method: fnGrabarDatos_click },
            { type: 'i', content: 'separador' },
            { type: 'i', content: 'undo', method: undo },
            { type: 'i', content: 'redo', method: redo },
            {
                type: 'i', content: 'save_alt', method: function (instance, selectedCell) {
                    $(instance).jexcel('download');
                }
            },
            //{ type: 'i', content: 'separador' },
            //{ type: 'i', content: 'format_bold', k: 'font-weight', v: 'bold' },
            //{ type: 'spectrum', content: 'format_color_text', k: 'color' },
            //{ type: 'spectrum', content: 'format_color_fill', k: 'background-color' },
            { type: 'i', content: 'separador' },
            { type: 'select', content: 'cboAgregarItem', v: ['(Seleccione)', 'Empleado', 'Cuenta', 'Plan', 'Línea', 'Equipo'] },
            {
                type: 'i', content: 'person_add', method: onAgregarItem
            },
            { type: 'i', content: 'separador' },
            { type: 'select', content: 'cboReporte', v: ['(Seleccione)', 'Orden de Servicio', 'Vale de Resguardo'] },
            {
                type: 'i_fa', content: 'fa fa-file', method: onReporte
            },
            { type: 'i', content: 'separador' },

            {
                type: 'input', content: 'txtBusqueda', method: null,
                style: '{"width":"100px","margin-top":"2px","height":"24px","text-align":"left"}',
                maxlength: 15, defaultValue: '', width: '100'
            },
            {
                type: 'i', content: 'find_in_page', method: onBuscarValor
            },
            { type: 'i', content: 'separador' },
            { type: 'i', content: 'fullscreen', method: fnFullScreen_click },
            { type: 'i', content: 'fullscreen_exit', method: fnDefaultFullScreen_click },
            { type: 'i', content: 'separador' },
            { type: 'i', content: 'refresh', method: fnRefresh_click },
        ],
    });
    setTimeout(function () {
        if (estilosGrilla != null) {
            $('#my').jexcel('setStyle', estilosGrilla);
        }
        if (_cargaPrimera) {
            $("#my").jexcel('setValue', $("#0-0"), GUID(), true);
            var fechaActual = window.top.moment().format('DD/MM/YYYY');
            $("#my").jexcel('setValue', $("#1-0"), fechaActual, true);
            $("#my").jexcel('setValue', $("#2-0"), "Pendiente", true);
            $('#my').jexcel('setReadOnly', "0", "2", true); //Estado no editable.
        }
        $.fn.jexcel.ignoreEvents = false;

    }, 0);


    $("#txtBusqueda").keypress(function (e) {
        if (e.keyCode == 13) {
            onBuscarValor();
        }
    });

    $("#txtCantidadNuevo").keypress(function (e) {
        if (e.keyCode == 13) {
            fnAgregarFila_click();
        }
    });

    ////Set readonly a specific column
    //$('#my').jexcel('updateSettings', {
    //    cells: function (cell, col, row) {
    //        // If the column is number 4 or 5
    //        debugger;
    //        if (row == 2 && col == 2) {
    //            $(cell).addClass('readonly');
    //        }
    //    }
    //});

}





var listas;
var lista;
var matriz;
var cabeceras = [];
var combosNombre = ["cboRequerimiento", "cboOperacion", "cboTipoRequerimiento", "cboDependencia", "cboCuenta"];
var indTextos = [4, 5, 6, 8, 9]; //2, 3
var indValores = [4, 5, 6, 8, 9]; //6, 7
var indListas = [2, 3, 4, 5, 6]; //0, 1

window.onload = function () {
    //$$.sendText("Adm_SolicitudMasiva.aspx/obtenerListas", mostrarLista, "{}");
    getAjax("Adm_SolicitudMasiva.aspx/obtenerListas", "{'os':'XXX', 'tmp':''}").then(function (data) {
        mostrarLista(data);
        mostrarGrillaExcel(data, true);
    }, function (xhr, err, thrErr) {
        MostrarErrorAjax(xhr, err, thrErr);
    });


    $(window).resize(function (x) {
        DimPosElementos();
    });
    DimPosElementos();

    $("#btnAgregar").click(function () {
        agregarFila();
    });

    $('#btnAgregarEmpleado').live("click", function (e) {
        fnEmpleado_click(null);
    });
    $('#btnAgregarCuenta').live("click", function (e) {
        btnAgregarCuenta_click(null);
    });
    $('#btnAgregarLinea').live("click", function (e) {
        btnAgregarLinea_click(null);
    });
    $('#btnAgregarDispositivo').live("click", function (e) {
        btnAgregarDispositivo_click(null);
    });
    $('#btnAgregarPlan').live("click", function (e) {
        btnAgregarPlan_click(null);
    });

    $('#btnGrabar').live("click", function (e) {
        //Mensaje("<br/><h1>Datos guardados</h1>");



    });

    $('#btnDownload').live("click", function (e) {
        Mensaje("<br/><h1>Se procede con la descarga...</h1>");
    });

    $('#btnUpload').live("click", function (e) {
        Mensaje("<br/><h1>Subiendo archivo...</h1>");
    });




}

//var $$ = {
//    get: function (url, metodo) {
//        requestServer(url, "get", "text", metodo);
//    },
//    sendText: function (url, metodo, texto) {
//        requestServer(url, "post", "json", metodo, texto);
//    }
//}

//function requestServer(url, tipoMetodo, tipoRpta, metodo, texto) {
//    var xhr = new XMLHttpRequest();
//    xhr.open(tipoMetodo, url, true);
//    xhr.responseType = tipoRpta;

//    xhr.setRequestHeader('Accept', 'application/text');
//    xhr.setRequestHeader("Content-Type", "application/json");

//    //contentType: "application/json; charset=utf-8",
//    //dataType: "json",
//    xhr.onreadystatechange = function () {
//        if (xhr.status == 200 && xhr.readyState == 4) {
//            if (tipoRpta == "" || tipoRpta == "text") {
//                metodo(xhr.responseText, true);
//            }
//            else {
//                metodo(xhr.response);
//            }
//        }
//    }
//    if (tipoMetodo == "get") xhr.send();
//    else {
//        if (texto != null && texto != "") xhr.send(texto);
//    }
//}

function mostrarLista(rpta) {
    //console.log("rpta", rpta.d);
    if (rpta != null && rpta != "" && rpta.d != null && rpta.d != "") {

        $("#dvMensajeDefault").hide();
        $("#my").show();

        listas = rpta.d.split("¬");
        cabeceras = listas[0].split(";");

        lista = listas[1].split(";");


        listaComboTipoSolicitudes = listas[3].split(";");
        listaComboTipoServicios = listas[4].split(";");
        listaComboModeloDispositivo = listas[5].split(";");
        listaComboPlan = listas[6].split(";");
        listaComboCuenta = listas[7].split(";");

        listaComboRoamingTotal = listas[8].split(";");
        listaComboRoaming = [];
        for (var i in listaComboRoamingTotal) {
            if (listaComboRoaming.indexOf(listaComboRoamingTotal[i].split('|')[0]) == -1) {
                listaComboRoaming.push(listaComboRoamingTotal[i].split('|')[0]);
            }
        }
        //listaComboRoaming = listaComboRoamingTotal.map(function (x) {
        //    if (listaComboRoaming) {
        //    }
        //    return x.split('|')[0];
        //});



        //debugger;
        if (listas[2] != null && listas[2] != '') {
            estilosGrilla = JSON.parse('[' + listas[2] + ']');
        }

        //crearTabla();
        //for (var i = 0; i < combosNombre.length; i++) {
        //    crearCombo(listas[indListas[i]].split(";"), combosNombre[i], "Todos");
        //}
        crearMatriz();
        //configurarFiltros();
    }
    else {
        $("#dvMensajeDefault").show();
        $("#my").hide();
    }
}

function crearTabla() {
    var contenido = "<table style='width:100%' cellpadding='0' cellspacing='0'><thead><tr class='FilaCabecera'>";
    var nCampos = cabeceras.length;
    var pos;
    var nCampo;
    for (var j = 0; j < nCampos; j++) {
        nCampo = cabeceras[j].split("|");
        contenido += "<th style='width: " + nCampo[1] + "px;'>";
        contenido += nCampo[0];
        contenido += "<br/>";
        pos = indTextos.indexOf(j);
        if (pos > -1) {
            contenido += "<select id='";
            contenido += combosNombre[pos];
            contenido += "' name='cabecera' class='Combo elementoCabecera' style='width: " + nCampo[1] + "px;'></select>";
        }
        else {
            contenido += "<input type='text' name='cabecera' class='Texto elementoCabecera' style='width: " + nCampo[1] + "px;' />";
        }
        contenido += "</th>";
    }
    contenido += "</tr></thead><tbody id='tbSolicitud'></tbody></table>";
    document.getElementById("divSolicitudes").innerHTML = contenido;
}

function agregarFila() {

    var nCampos = cabeceras.length;
    var campos;
    var nombreCombo;
    var contenido = "";

    //Agregar fila en la matriz..
    var i = matriz.length;
    matriz[i] = [];
    for (var j = 0; j < nCampos; j++) {
        matriz[i][j] = "";
    }
    contenido = "<tr class='FilaDatos'>";
    for (var j = 0; j < nCampos; j++) {
        contenido += "<td>";
        nCampo = cabeceras[j].split("|");
        if (j == 0) contenido += "";
        else {
            pos = indTextos.indexOf(j);
            if (pos > -1) {
                nombreCombo = combosNombre[pos] + i;
                contenido += "<select idx='";
                contenido += nombreCombo;
                contenido += "' data-val='";
                contenido += "' style='width: " + nCampo[1] + "px;' class='controlMatriz' id='elemento_" + i.toString() + "_" + j.toString() + "' x='" + i + "' y='" + j + "' ></select>";
            }
            else {
                contenido += "<input type='text' value='";
                contenido += "' data-val='";
                contenido += "' style='width: " + nCampo[1] + "px;' class='controlMatriz' id='elemento_" + i.toString() + "_" + j.toString() + "' x='" + i + "' y='" + j + "' />";
            }
        }
        contenido += "</td>";
    }
    contenido += "</tr>";

    $('#tbSolicitud tr:last').after(contenido);
    $("#elemento_" + i + "_1").focus();

    $(".controlMatriz").off("keydown");
    $(".controlMatriz").keydown(function (event) {
        Desplazamiento(event, this);
    });

    //llenar combos
    var nCombos = combosNombre.length;
    var cbo;
    var lista;
    for (var j = 0; j < nCombos; j++) {
        cbo = $("select[idx='" + (combosNombre[j] + i) + "']");
        if (cbo != null) {
            lista = listas[indListas[j]].split(";")
            crearCombo(lista, (combosNombre[j] + i), "Seleccione");
            $(cbo).val($(cbo).attr("data-val"));
        }
    }


}

function crearMatriz() {
    matriz = [];
    var nRegistros = lista.length;
    if (nRegistros > 0) {
        var nCampos;
        var campos;
        var x = 0;
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("|");
            nCampos = campos.length;
            matriz[x] = [];
            for (var j = 0; j < nCampos; j++) {
                matriz[x][j] = campos[j];
            }
            x++;
        }
    }
}

function mostrarMatriz() {
    var nCampos = cabeceras.length;
    var nRegistros = matriz.length;
    var contenido = "";
    var nCampo;
    if (nRegistros > 0) {
        var campos;
        var nombreCombo;
        for (var i = 0; i < nRegistros; i++) {
            contenido += "<tr class='FilaDatos'>";
            for (var j = 0; j < nCampos; j++) {
                contenido += "<td>";
                nCampo = cabeceras[j].split("|");
                if (j == 0) contenido += matriz[i][j];
                else {
                    pos = indTextos.indexOf(j);
                    if (pos > -1) {
                        nombreCombo = combosNombre[pos] + i;
                        contenido += "<select idx='";
                        contenido += nombreCombo;
                        contenido += "' data-val='";
                        contenido += matriz[i][indValores[pos]];
                        contenido += "' style='width: " + nCampo[1] + "px;' class='controlMatriz' id='elemento_" + i.toString() + "_" + j.toString() + "' x='" + i + "' y='" + j + "' ></select>";
                    }
                    else {
                        contenido += "<input type='text' value='";
                        contenido += matriz[i][j];
                        contenido += "' data-val='";
                        contenido += matriz[i][j];
                        contenido += "' style='width: " + nCampo[1] + "px;' class='controlMatriz' id='elemento_" + i.toString() + "_" + j.toString() + "' x='" + i + "' y='" + j + "' />";
                    }
                }
                contenido += "</td>";
            }
            contenido += "</tr>";
        }
    }
    document.getElementById("tbSolicitud").innerHTML = contenido;
    llenarCombos();

    $(".controlMatriz").off("keydown");
    $(".controlMatriz").keydown(function (event) {
        Desplazamiento(event, this);
    });


    $(".controlMatriz").change(function () {
        var x = $(this).attr("x");
        var y = $(this).attr("y");
        var valor = $(this).val();
        matriz[x][y] = valor;
    });
}

function crearCombo(lista, idCombo, primerItem) {
    var contenido = "";
    if (primerItem != null && primerItem != "") {
        contenido += "<option value=''>";
        contenido += primerItem;
        contenido += "</option>";
    }
    var nRegistros = lista.length;
    if (nRegistros > 0) {
        var campos;
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("|");
            contenido += "<option value='";
            contenido += campos[0];
            contenido += "'>";
            contenido += campos[1];
            contenido += "</option>";
        }
    }


    $("select[idx='" + idCombo + "']").html(contenido);
    var cbo = document.getElementById(idCombo);
    if (cbo != null) cbo.innerHTML = contenido;
}

function configurarFiltros() {
    var cabeceras = document.getElementsByName("cabecera");
    var nCabeceras = cabeceras.length;
    var cabecera;
    for (var i = 0; i < nCabeceras; i++) {
        cabecera = cabeceras[i];
        if (cabecera.className.indexOf("Texto") >= 0) {
            cabecera.onkeyup = function () {
                crearMatriz();
            }
        }
        else {
            cabecera.onchange = function () {
                crearMatriz();
            }
        }
    }
}

function llenarCombos() {
    var nRegistros = matriz.length;
    var nCombos = combosNombre.length;
    var cbo;
    var lista;
    if (nRegistros > 0 && nCombos > 0) {
        for (var i = 0; i < nRegistros; i++) {
            for (var j = 0; j < nCombos; j++) {
                cbo = $("select[idx='" + (combosNombre[j] + i) + "']");
                if (cbo != null) {
                    lista = listas[indListas[j]].split(";")
                    crearCombo(lista, (combosNombre[j] + i), "Seleccione");
                    $(cbo).val($(cbo).attr("data-val"));
                }
            }
        }
    }
}

function grabarProductos() {
    var contenido = "";
    var filas = document.getElementById("tbSolicitud").rows;
    var nFilas = filas.length;
    var celdas;
    var nCeldas;
    var filaCambiada = "";
    var control;
    for (var i = 0; i < nFilas; i++) {
        celdas = filas[i].cells;
        nCeldas = celdas.length;
        var tieneCambios = true;
        var contCambios = 0;
        filaCambiada = "";
        for (var j = 0; j < nCeldas; j++) {
            if (j > 0) {
                control = celdas[j].childNodes[0];
                tieneCambios = (control.value.toString() != control.getAttribute("data-val").toString());
                if (tieneCambios) contCambios++;
                filaCambiada += control.value;
            }
            else filaCambiada += celdas[j].innerHTML;
            filaCambiada += "|";
        }
        if (contCambios > 0) {
            filaCambiada = filaCambiada.substring(0, filaCambiada.length - 1);
            contenido += filaCambiada + "¬";
        }
    }
    if (contenido.length > 0) {
        contenido = contenido.substring(0, contenido.length - 1);
        $.sendText("Producto/grabar", mostrarGrabar, contenido);
    }
}

function mostrarGrabar(rpta) {
    if (rpta != "") {
        lista = rpta.split("¬");
        crearMatriz();
        alerta("Registros fueros grabados");
    }
}

function DimPosElementos() {
    var ancho = $(window).width();
    var alto = $(window).height();
    $("#divSolicitudes").width(ancho - 15);
    $("#divSolicitudes").height(alto - 60);
    $("#toolbar").css("max-width", (ancho - 40));

    //$("#my").css("width", (ancho - 10));
    //$("#my").css("height", (alto - 60));

    $(".jexcel-content").css("max-height", (alto - 105) + "px");
}

function Desplazamiento(event, othis) {
    if (event.which == 13) {
        event.preventDefault();
    }
    var mRow = $(othis).attr("id").replace("elemento_", "").split('_');
    if (event.keyCode == 38) { //Up
        mRow[0] = parseInt(mRow[0]) - 1;
        if (mRow[0] < 0)
            mRow[0] = 0;
        event.preventDefault();
    }
    if (event.keyCode == 40) { //Down
        mRow[0] = parseInt(mRow[0]) + 1;
        if (mRow[0] > matriz.length - 1)
            mRow[0] = matriz.length - 1;
        event.preventDefault();
    }

    if (event.keyCode == 37) { //Left
        mRow[1] = parseInt(mRow[1]) - 1;
        if (mRow[1] <= 0 && mRow[0] != 0) {
            mRow[0] = parseInt(mRow[0]) - 1;
            if (mRow[0] < 0)
                mRow[0] = 0;
            mRow[1] = cabeceras.length - 1;
        }
        event.preventDefault();
    }

    if (event.keyCode == 39) { //Right
        mRow[1] = parseInt(mRow[1]) + 1;
        if (mRow[1] > cabeceras.length - 1 && mRow[0] != matriz.length - 1) {
            mRow[0] = parseInt(mRow[0]) + 1;
            if (mRow[0] > matriz.length - 1)
                mRow[0] = matriz.length - 1;
            mRow[1] = 1;
        }
        event.preventDefault();
    }

    if (event.keyCode == 36) { //Inicio
        if (mRow[0] == 0) {
            mRow[1] = 1;
        }
        mRow[0] = 0;
        event.preventDefault();
    }
    if (event.keyCode == 35) { //Fin
        if (mRow[0] == matriz.length - 1) {
            mRow[1] = cabeceras.length - 1;
        }
        mRow[0] = matriz.length - 1;
        event.preventDefault();
    }
    $("#elemento_" + mRow[0] + "_" + mRow[1]).focus();

    //console.log("aquiiiii");

}



function btnAgregarCuenta_click() {
    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 520; //  480;

    Pagina = raiz('P_Movil/Administrar/Mantenimiento/Mnt_Cuenta.aspx?vcTab=MOV_Cuenta');
    Titulo = 'Nueva Cuenta';

    window.top.MostrarLoading();
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', Pagina);

    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').on('load', function () {
        window.top.OcultarLoading();
        var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
            title: Titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').off("load");
    });

    //Llamada para actualizar el listado de empleados...
    window.top.fnObtenerWindowPlantillaTab().fnRetornaFrameModalOrigen = fnRetornaModal;
}

function btnAgregarPlan_click() {
    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 720; //  480;

    Pagina = raiz('P_Movil/Administrar/Mantenimiento/Mnt_Plan.aspx?vcTab=MOV_Plan');
    Titulo = 'Nuevo Plan';

    window.top.MostrarLoading();
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', Pagina);

    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').on('load', function () {
        window.top.OcultarLoading();
        var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
            title: Titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').off("load");
    });

    //Llamada para actualizar el listado de empleados...
    window.top.fnObtenerWindowPlantillaTab().fnRetornaFrameModalOrigen = fnRetornaModal;
}

function btnAgregarLinea_click() {
    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 720; //  480;

    Pagina = raiz('P_Movil/Administrar/Mantenimiento/Mnt_Linea.aspx?vcTab=MOV_Linea');
    Titulo = 'Nueva Línea';

    window.top.MostrarLoading();
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', Pagina);

    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').on('load', function () {
        window.top.OcultarLoading();
        var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
            title: Titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').off("load");
    });

    //Llamada para actualizar el listado de empleados...
    window.top.fnObtenerWindowPlantillaTab().fnRetornaFrameModalOrigen = fnRetornaModal;
}

function btnAgregarDispositivo_click() {
    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 520; //  480;

    Pagina = raiz('P_Movil/Administrar/Mantenimiento/Mnt_Dispositivo.aspx?vcTab=MOV_Dispositivo');
    Titulo = 'Nuevo Dispositivo';

    window.top.MostrarLoading();
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', Pagina);

    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').on('load', function () {
        window.top.OcultarLoading();
        var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
            title: Titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').off("load");
    });

    //Llamada para actualizar el listado de empleados...
    window.top.fnObtenerWindowPlantillaTab().fnRetornaFrameModalOrigen = fnRetornaModal;
}


function fnEmpleado_click(objSpan) {

    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 520; //  480;

    if (objSpan != null) {
        var CodigoEmpleado = $(objSpan).attr("codigo");
        var NombreEmpleado = $(objSpan).attr("nombreempleado");
        Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Empleado.aspx?view=1&Par=EMPL_P_vcCODEMP&Cod=' + CodigoEmpleado);
        Titulo = 'Empleado - ' + NombreEmpleado;
    }
    else {
        Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Empleado.aspx?view=1&Par=EMPL_P_vcCODEMP&CodInt=');
        Titulo = 'Nuevo Empleado';
    }

    window.top.MostrarLoading();
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', Pagina);

    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').on('load', function () {
        window.top.OcultarLoading();
        var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
            title: Titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').off("load");
    });

    //Llamada para actualizar el listado de empleados...
    window.top.fnObtenerWindowPlantillaTab().fnRetornaFrameModalOrigen = fnRetornaModal;

}

function fnRetornaModal() {
    //fnBuscarEmpleados_TextBox();
}

function onReporte() {
    var valor = $("#cboReporte").val();
    switch (valor) {
        case "Orden de Servicio":
            DescargarFormatoOrdenServicio();
            break;
        case "Vale de Resguardo":
            var numero = prompt("Por favor ingrese el número de la línea", "");
            //debugger;
            if (numero != null) {
                GenerarResguardo(numero, "");
            }
            break;
        default:
            alerta("Seleccione una opción");
            break;

    }
}

function onAgregarItem() {
    var valor = $("#cboAgregarItem").val();
    switch (valor) {
        case "Empleado":
            fnEmpleado_click(null);
            break;
        case "Cuenta":
            btnAgregarCuenta_click();
            break;
        case "Plan":
            btnAgregarPlan_click();
            break;
        case "Línea":
            btnAgregarLinea_click(null);
            break;
        case "Equipo":
            btnAgregarDispositivo_click(null);
            break;
        default:
            alerta("Seleccione una opción");
            break;

    }
}

function fnAgregarFila_click() {
    if ($.trim($("#txtCantidadNuevo").val()) == "") {
        alerta("Debe ingresar una cantidad", "Validación", function () {
            $("#txtCantidadNuevo").focus();
        });
        return;
    }
    var limite = parseInt($("#txtCantidadNuevo").val());
    //var promFilasAgregadas = new Promise(function (resolve, reject) {
    //    for (var i = 0; i < limite; i++) {
    //        $('#my').jexcel('insertRow', 1, 0);
    //    }
    //    resolve();
    //});

    //alerta("Inicia envio....");

    //promFilasAgregadas.then(function () {
    //    alerta("Agregados....");
    //});

    var iContador = 0;
    var myVar = setInterval(function () {
        for (var i = 0; i < 3; i++) {
            iContador++;
            $('#my').jexcel('insertRow', 1, 0);
            if (iContador > limite - 1) {
                clearInterval(myVar);
                break;
            }
        }
    }, 1);


}
































function DescargarFormatoOrdenServicio() {

    var vcIdTipSol = '0';
    $.ajax({
        url: "Adm_ListadoSolicitudes.aspx/ObtenerDatosOS",
        data: "{'IdTipoSolicitud':'" + vcIdTipSol + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {


            $("#lblNroOrdenServicioAnterior").html("(Anterior: " + result.d[0].NroOrdenServicio + ")");
            $("#txtAdministradorContrato").val(result.d[0].AdministradorContrato);
            $("#txtCargoAdministradorContrato").val(result.d[0].AdministradorContratoCargo);

            $('#dvGenerarOS').dialog({
                title: "Generar Orden de Servicio",
                modal: true,
                width: 600,
                resizable: false,
                buttons: {
                    "Generar": function () {

                        ////Validar formato hora...
                        //var txtHoraInicioOS = $("#txtHoraInicioOS").val();
                        //txtHoraInicioOS = $.trim(txtHoraInicioOS);
                        //var re = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
                        //if (!re.test(txtHoraInicioOS)) {
                        //    alerta("Formato de hora incorrecto", "Mensaje", function () {
                        //        $("#txtHoraInicioOS").focus();
                        //    });
                        //    return;
                        //}

                        var oDialogo = this;
                        var CodigoOS = $.trim($("#txtNroOrdenServicio").val());
                        //var TipoOS = $("#ddlTipoServicio").val();
                        //var TipoMovimiento = $("#ddlTipoMovimiento").val();
                        //var Descripcion = $.trim($("#txtDescripcionOS").val());
                        //var OrigenSolicitud = $.trim($("#txtOrigenSolicitud").val());
                        //OrigenSolicitud = OrigenSolicitud.replace(/'/g, "");
                        //Descripcion = Descripcion.replace(/'/g, "");

                        //var FechaInicio = $.trim($("#txtFechaHoraInicioOS").val());
                        //if (FechaInicio != "")
                        //    FechaInicio = FechaInicio.substr(6, 4).toString() + FechaInicio.substr(3, 2).toString() + FechaInicio.substr(0, 2).toString();
                        //else {
                        //    alerta("Debe ingresar una fecha", "Mensaje", function () {
                        //        $("#txtFechaHoraInicioOS").focus();
                        //    });
                        //    return;
                        //}

                        if (CodigoOS == "") {
                            alerta("Debe ingresar un código", "Mensaje", function () {
                                $("#txtNroOrdenServicio").focus();
                            });
                        }

                        var Hora, Fecha;

                        var now = new Date();
                        now.setHours(now.getHours());
                        var time = [Right("0" + now.getHours().toString(), 2),
                                    Right("0" + now.getMinutes().toString(), 2)].join(':');

                        var dd = Right("0" + now.getDate().toString(), 2);
                        var mm = Right("0" + (now.getMonth() + 1).toString(), 2);
                        var yyyy = now.getFullYear();
                        //Fecha = dd + "/" + mm + "/" + yyyy;
                        Fecha = yyyy + "" + mm + "" + dd;

                        var OrigenSolicitud = "Solicitud generada por Sistema de Gestión Móvil - PCSistel";
                        var Descripcion = $.trim($("#txtDescripcionOS").val());

                        var AdministradorContrato = $.trim($("#txtAdministradorContrato").val());
                        var CargoAdministradorContrato = $.trim($("#txtCargoAdministradorContrato").val());

                        $.ajax({
                            url: "Adm_SolicitudMasiva.aspx/GuardarDatosOS",
                            data: "{'CodigoOS':'" + CodigoOS + "','TipoOS':'','TipoMovimiento':'','Descripcion':'" + Descripcion + "'," +
                                  "'HoraInicioOS':'" + time + "','AdministradorContrato':'" + AdministradorContrato + "','CargoAdministradorContrato':'" + CargoAdministradorContrato + "'," +
                                  "'OrigenSolicitud':'" + OrigenSolicitud + "','FechaInicio':'" + Fecha + "','IdSolicitudes':''}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                var pagina = "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=1&IdSolicitud=1&IdOrden=" + result.d + "&IdTipoSolicitud=" + vcIdTipSol;
                                $("#ifReporteFormato").attr("src", pagina);
                                $(oDialogo).dialog("close");

                                //$("#grid").jqGrid().trigger('reloadGrid');

                                //var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
                                //for (var i = 0; i < vcSel.length; i++) {
                                //    $('#grid').getGridParam('data')[i].NroOrdenServicio = CodigoOS;
                                //}

                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}






function onBuscarValor() {
    var bus = $("#txtBusqueda").val();
    if (typeof bus === "undefined") {
        bus = "";
    }
    if (bus == "") {
        return;
    }
    getAjax("Adm_SolicitudMasiva.aspx/obtenerListas", "{'os':'" + bus + "', 'tmp':''}").then(function (data) {
        mostrarLista(data);
        mostrarGrillaExcel(data, false);
    }, function (xhr, err, thrErr) {
        MostrarErrorAjax(xhr, err, thrErr);
    });
}







function GenerarResguardo(Numero, _IdSolicitudSeleccionada) {

    $.ajax({
        url: "../Cam_DespachoEmpleado.aspx/ObtenerDatosResguardo",
        data: "{'Numero':'" + Numero + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (typeof result.d[0].P_vcNum === 'undefined' || result.d[0].P_vcNum == "") {
                alerta("No se encontró el número indicado", "Mensaje", null, "warning");
                return;
            }

            $("#lblNroConsecutivoAnterior").html("(Anterior: " + result.d[0].NroConsecutivo + ")");
            try {
                $("#txtNroConsecutivo").val(parseFloat(result.d[0].NroConsecutivo) + 1);
                $("#txtObservaciones").val(result.d[0].Observaciones);
                $("#txtAdministradorContratoVale").val(result.d[0].Responsable);
                $("#txtModelo").val(result.d[0].Modelo);
                $("#txtMarca").val(result.d[0].MarcaModelo);
                $("#txtNroServicio").val(result.d[0].P_vcNum);
                $("#txtIMEI").val(result.d[0].F_vcCodIMEI);
                $("#txtSIM").val(result.d[0].SIM);
                $("#txtPIN").val(result.d[0].PIN);
                $("#txtFactura").val(result.d[0].NumeroFactura_OS);
                $("#txtCosto").val(result.d[0].dcMonto_Equipo);
                $("#ddlTipoServicio").val(result.d[0].IdTipoModeloDispositivo);

            } catch (e) {
                //some
            }
            var widthGenerarResguardo = $(window).width() - 20;
            var heightGenerarResguardo = $(window).height() - 20;
            if (widthGenerarResguardo > 900) {
                widthGenerarResguardo = 900;
            } else if (widthGenerarResguardo < 400) {
                widthGenerarResguardo = 400;
            }
            if (heightGenerarResguardo > 500) {
                heightGenerarResguardo = 500;
            } else if (heightGenerarResguardo < 200) {
                heightGenerarResguardo = 200;
            }
            $('#dvGenerarResguardo').dialog({
                title: "Generar Reporte",
                modal: true,
                width: widthGenerarResguardo,
                height: heightGenerarResguardo,
                buttons: {
                    "Generar": function () {

                        var oDialogo = this;

                        var Accesorios = "";
                        $("[id*=chkAccesorios] input:checked").each(function () {
                            Accesorios += "," + $(this).val();
                        });
                        if (Accesorios.length > 0) {
                            Accesorios = Accesorios.substr(1, Accesorios.length - 1);
                        }
                        var txtFactura = $.trim($("#txtFactura").val());
                        var txtNroConsecutivo = $.trim($("#txtNroConsecutivo").val());
                        var ddlTipoServicio = $("#ddlTipoServicio").val();
                        var txtCosto = $.trim($("#txtCosto").val());
                        var txtMarca = $.trim($("#txtMarca").val());
                        var txtModelo = $.trim($("#txtModelo").val());
                        var txtNroServicio = $.trim($("#txtNroServicio").val());
                        var txtIMEI = $.trim($("#txtIMEI").val());
                        var txtSIM = $.trim($("#txtSIM").val());
                        var txtPIN = $.trim($("#txtPIN").val());
                        var txtObservaciones = $.trim($("#txtObservaciones").val());
                        var txtResponsable = $.trim($("#txtAdministradorContratoVale").val());
                        txtFactura = txtFactura.replace(/'/g, "");
                        txtNroConsecutivo = txtNroConsecutivo.replace(/'/g, "");
                        txtCosto = txtCosto.replace(/'/g, "");
                        txtMarca = txtMarca.replace(/'/g, "");
                        txtModelo = txtModelo.replace(/'/g, "");
                        txtNroServicio = txtNroServicio.replace(/'/g, "");
                        txtIMEI = txtIMEI.replace(/'/g, "");
                        txtSIM = txtSIM.replace(/'/g, "");
                        txtPIN = txtPIN.replace(/'/g, "");
                        txtObservaciones = txtObservaciones.replace(/'/g, "");
                        txtResponsable = txtResponsable.replace(/'/g, "");

                        if (txtFactura == "") {
                            alerta("Debe ingresar un código de factura", "Mensaje", function () {
                                $("#txtFactura").focus();
                            });
                            return;
                        }
                        if (txtNroConsecutivo == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtNroConsecutivo").focus();
                            });
                            return;
                        }
                        if (txtCosto == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtCosto").focus();
                            });
                            return;
                        }
                        if (txtMarca == "") {
                            alerta("Debe ingresar una marca", "Mensaje", function () {
                                $("#txtMarca").focus();
                            });
                            return;
                        }
                        if (txtModelo == "") {
                            alerta("Debe ingresar un modelo", "Mensaje", function () {
                                $("#txtModelo").focus();
                            });
                            return;
                        }
                        if (txtNroServicio == "") {
                            alerta("Debe ingresar un número", "Mensaje", function () {
                                $("#txtNroServicio").focus();
                            });
                            return;
                        }
                        if (txtIMEI == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtIMEI").focus();
                            });
                            return;
                        }
                        ////if (txtSIM == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtSIM").focus();
                        ////    });
                        ////    return;
                        ////}
                        ////if (txtPIN == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtPIN").focus();
                        ////    });
                        ////    return;
                        ////}
                        if (txtObservaciones == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtObservaciones").focus();
                            });
                            return;
                        }
                        if (txtResponsable == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtAdministradorContratoVale").focus();
                            });
                            return;
                        }

                        $.ajax({
                            url: "../Cam_DespachoEmpleado.aspx/GuardarDatosResguardo",
                            data: "{'Factura':'" + txtFactura + "','NroConsecutivo':'" + txtNroConsecutivo + "','TipoServicio':'" + ddlTipoServicio + "'," +
                                   "'Costo':'" + txtCosto + "','Marca':'" + txtMarca + "', 'Modelo':'" + txtModelo + "'," +
                                   "'NroServicio':'" + txtNroServicio + "','IMEI':'" + txtIMEI + "', 'SIM':'" + txtSIM + "'," +
                                   "'PIN':'" + txtPIN + "','Observaciones':'" + txtObservaciones + "','Accesorios':'" + Accesorios + "','Responsable':'" + txtResponsable + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {

                                var pagina = "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=2&IdResguardo=" + result.d + "&Sol=" + _IdSolicitudSeleccionada;
                                $("#ifReporteFormato").attr("src", pagina);

                                $(oDialogo).dialog("close");


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

