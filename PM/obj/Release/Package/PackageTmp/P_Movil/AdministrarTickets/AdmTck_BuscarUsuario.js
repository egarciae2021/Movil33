var esLoad = true;

$(function () {

    $(".btnNormal").button();
    $("#btnBuscarUsuario").button();
    $("#btnBuscarUsuario").click(function () {
        ListarUsuarios();
    });

    $("#txtdato").focus();

    //    $('#txtBuscar').live("keypress", function (e) {
    //        if (e.keyCode == 13) {
    //            validarEspaciosEnBlancoAlInicio("txtBuscar");
    //            buscarNumeros();
    //            return false; // prevent the button click from happening
    //        }
    //        else {
    //            if ($('#radio1').is(':checked')) {
    //                return ValidarSoloNumero(e);
    //            }
    //            else {
    //                return ValidarAlfaNumericoConEspacios(e);
    //            }
    //        }
    //    });

    $('#txtdato').live("keypress", function (e) {

        switch ($("#ddlTipoBusqueda").val()) {
            case "0":
                if (e.keyCode == 13) {
                    ListarUsuarios();
                    return false;
                }

                else {
                    return ValidarAlfaNumericoConEspaciosYCaracteres(e);
                }
                break;
            case "1":
                if (e.keyCode == 13) {
                    ListarUsuarios();
                    return false;
                }

                else {
                    return ValidarAlfaNumericoConEspaciosYCaracteres(e);
                }
                break;
            case "2":
                if (e.keyCode == 13) {
                    ListarUsuarios();
                    return false;
                }

                else {
                    return ValidarSoloNumero(e);
                }
                break;
            case "3":
                if (e.keyCode == 13) {
                    ListarUsuarios();
                    return false;
                }

                else {
                    return true;
                }
                break;
        }


        if (e.keyCode == 13) {
            ListarUsuarios();
            return false;
        }
        //        else if (e.keyCode == 32) {
        //            if ($.trim($("#txtdato").val()) == "") {
        //                return false;
        //            }
        //            else {
        //                return true;
        //            }
        //            
        //        }
        else {
            return ValidarAlfaNumericoConEspaciosYCaracteres(e);
        }
    });

    fnCargarGrid();
});

function ListarUsuarios() {

    if ($("#ddlTipoBusqueda").val() == "3") {

//        if (validarEmail2($.trim($('#txtdato').val()))) {
            $("#tbUsuarios").trigger("reloadGrid");
//        }
//        else {
//            alerta("no es un correo valido");
//        }

    }
    else {
        $("#tbUsuarios").trigger("reloadGrid");
    }
    
//    var dato = $('#txtdato').val().replace(/'/g, "&#39");
//    var seleccion = $('#ddlTipoBusqueda').val();

//    if (dato == "") {
//        alerta("Ingresa dato a buscar");
//        $("#txtdato").focus();
//        return;
//    }

//    $.ajax({
//        type: "POST",
//        url: "AdmTck_BuscarUsuario.aspx/listarUsuario",
//        data: "{'pTipoOperacion': '" + seleccion + "'," +
//                           "'pDato': '" + dato + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            $("#tbUsuarios").jqGrid('clearGridData');
//            if ($(result.d).length == 0) {
//                alerta("No existen usuarios con datos ingresados")
//                $('#txtdato').focus();
//                return;
//            }
//            //alerta("empezando carga desde " + result.d[0].Dni);

//            $("#tbUsuarios")[0].addJSONData(result.d);
////            for (var i = 0; i < $(result.d).length; i++)
////                $("#tbUsuarios").jqGrid('addRowData', result.d[i].P_inCod, result.d[i]);

//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
}

function elegirUsuario() {

    var id = $("#tbUsuarios").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#tbUsuarios").jqGrid('getRowData', id);
        var usuarioElegido = datos['P_inCod'] + "-" + datos['vcNom'];
        window.parent.usuarioElegido(usuarioElegido);
        window.parent.Modal.dialog("close");
    }
    else {
        alerta("Seleccione un registro");
    }

}

function fnCargarGrid() {

    $("#tbUsuarios").jqGrid({
        datatype: function () {
            var tipoOperacion;
            var dato;

            if (esLoad) {
                esLoad = false;
                tipoOperacion = "0";
                dato = "-1";
            }
            else {

                dato = $('#txtdato').val().replace(/'/g, "&#39");
                tipoOperacion = $('#ddlTipoBusqueda').val();

                if (dato == "") {
                    alerta("Ingresa dato a buscar");
                    $("#txtdato").focus();
                    return;
                }

            }

            if ($("#hdfEsBuscarUsuario").val().toString() == "1") {

                $.ajax({
                    type: "POST",
                    url: "AdmTck_BuscarUsuario.aspx/listarUsuarioTabla_Usuario",
                    data: "{'inPagTam':'" + $('#tbUsuarios').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#tbUsuarios').getGridParam("page") + "'," + //FiltroRegistro                
                        "'pTipoOperacion': '" + tipoOperacion + "'," +
                        "'pDato': '" + dato + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        $("#tbUsuarios")[0].addJSONData(result.d);

                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
            else {

                $.ajax({
                    type: "POST",
                    url: "AdmTck_BuscarUsuario.aspx/listarUsuarioTabla",
                    data: "{'inPagTam':'" + $('#tbUsuarios').getGridParam("rowNum") + "'," + //Tamaño de pagina
                           "'inPagAct':'" + $('#tbUsuarios').getGridParam("page") + "'," + //FiltroRegistro                
                            "'pTipoOperacion': '" + tipoOperacion + "'," +
                            "'pDato': '" + dato + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        $("#tbUsuarios")[0].addJSONData(result.d);

                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }


        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        {
        root: "Items",
        page: "PaginaActual",
        total: "TotalPaginas",
        records: "TotalRegistros",
        repeatitems: true,
        cell: "Row",
        id: "P_inCod"
    },
    colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', hidden: true, sortable: false },
   		                   { name: 'vcNom', index: 'vcNom', label: 'Nombres y apellidos', sortable: false, width: "320px" },
   		                   { name: 'F_vcCodEmp', index: 'F_vcCodEmp', label: 'codEmp', hidden: true, sortable: false },
                           { name: 'correo', index: 'correo', label: 'Correo', sortable: false },
   		                   { name: 'Dni', index: 'Dni', label: 'DNI', sortable: false }
   	                      ],
    rowNum: 15,
    rowList: [5, 15, 25],
    pager: '#pager',
    sortname: "vcNom", //Default SortColumn
    sortorder: "asc", //Default SortOrder.
    width: "680",
    height: "250",
    rownumbers: true,
    caption: "Usuarios (doble clic para seleccionar)",
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    pgtext: 'Pág: {0} de {1}',
    shrinkToFit: false,
    gridview: true,
    viewrecords: true,
    emptyrecords: "No hay Usuarios que mostrar",
    ondblClickRow: function () { elegirUsuario(); }
});
    $("#tbUsuarios").jqGrid('bindKeys', { "onEnter": function () { elegirUsuario(); }, "onSpace": function () { elegirUsuario(); } });
}


