
var tabOpciones;

$(function () {
    var Selecciono = false;
    var TipoPlantilla;
    ValidarNumeroEnCajaTexto("TxtColumna", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("TxtLongitud", ValidarSoloNumero);

    $(".btnNormal").button({});

    tabOpciones = $("#TabOpciones").tabs({});

    $("#ddlTipo").on("change", function () {
        var valor = $(this).val();
        if (valor == "0") {
            $("#ddlcampoldap").show();
            $("#txtvalorcomun").hide();
            $("#ddlcampoldap").prop("disabled", false);
            $("#trExtraer").show();
            var isExtraerDato = $('#chkExtraerDato').prop('checked');
            if (isExtraerDato) { $("#trExtraerDato").show(); } else { $("#trExtraerDato").hide(); }

        }
        if (valor == "1") {
            $("#ddlcampoldap").show();
            $("#txtvalorcomun").hide();
            $("#ddlcampoldap").prop("disabled", true);
            $("#trExtraer").hide();
            $("#trExtraerDato").hide();
        }
        if (valor == "2") {
            $("#ddlcampoldap").hide();
            $("#txtvalorcomun").show();
            $("#txtvalorcomun").prop("disabled", false);
            $("#trExtraer").hide();
            $("#trExtraerDato").hide();
        }


    });

    $("#chkExtraerDato").on("change", function () {
        var isExtraerDato = $('#chkExtraerDato').prop('checked');
        if (isExtraerDato) {
            $("#trExtraerDato").show();
            $("#TxtColumna").val("");
            $("#TxtLongitud").val("");
            $("#TxtColumna").focus();
        } else {
            $("#trExtraerDato").hide();
            $("#TxtColumna").val("");
            $("#TxtLongitud").val("");
        }
    });

    function inicio() {
        $("#tbDominio").jqGrid('clearGridData');
        $("#tbCamposDominio").jqGrid('clearGridData');
        $("#tbEquivalencias").jqGrid('clearGridData');

        $("#ddlTipo").append($("<option />").val("0").text("Campo Origen"));
        $("#ddlTipo").append($("<option />").val("1").text("Autogenerado"));
        $("#ddlTipo").append($("<option />").val("2").text("Valor Fijo"));



        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');

        //CARGAR DOMINIOS
        $.ajax({
            type: "POST",
            url: "PlantillaAD.aspx/CargarDominios",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                for (var i = 0; i < $(result.d).length; i++)

                    $("#tbDominio").jqGrid('addRowData', i,
                            { Servidor: result.d[i].Servidor, Dominio: result.d[i].Dominio,
                                Usuario: result.d[i].Usuario, Password: result.d[i].Password, Puerto: result.d[i].Puerto, Mascara: result.d[i].Password,
                                Autentificacion: result.d[i].Autentificacion, vcAutentificacion: result.d[i].vcAutentificacion
                            });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });

        //CARGAR CAMPOS LDAP
        $.ajax({
            type: "POST",
            url: "PlantillaAD.aspx/CargarCamposLDAP",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                for (var i = 0; i < $(result.d).length; i++)
                    $("#tbCamposDominio").jqGrid('addRowData', i,
                            { Campo: result.d[i].Campo });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });


        //CARGAR EQUIVALENCIAS
        //modificado por puribe 14/10/2015
        $.ajax({
            type: "POST",
            url: "PlantillaAD.aspx/CargarEquivalenciaCampos",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                for (var i = 0; i < $(result.d).length; i++)
                    $("#tbEquivalencias").jqGrid('addRowData', i,
                            { CampoSistel: result.d[i].CampoSistel, TipoCampo: result.d[i].TipoCampo,
                                CampoEquivale: result.d[i].CampoEquivale, Obligatorio: result.d[i].obliga,
                                Columna: result.d[i].Columna, Longitud: result.d[i].Longitud
                            });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });



    }

    function FormatoPassword(cellvalue, options, rowObject) {
        return "******";
    }

    var tbDominio = $("#tbDominio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'Servidor', index: 'Servidor', label: 'Servidor', width: '280' },
   		                   { name: 'Dominio', index: 'Dominio', label: 'Dominio', width: '280' },
   		                   { name: 'Usuario', index: 'Usuario', label: 'Usuario', width: '150' },
   		                   { name: 'Mascara', index: 'Mascara', label: 'Password', width: '100', formatter: FormatoPassword },
                           { name: 'Password', index: 'Password', label: 'Password', hidden: true },
                           { name: 'Puerto', index: 'Puerto', label: 'Puerto', width: '80' }, //agregado por puribe 17/09/2015
                            {name: 'Autentificacion', index: 'Autentificacion', label: 'Autentificación', width: '50', hidden: true },
                           { name: 'vcAutentificacion', index: 'vcAutentificacion', label: 'Autentificación', width: '160', hidden: true }
   	                      ],
        sortname: "Servidor", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        shrinkToFit: false,
        width: "1050",
        height: "80",
        rownumbers: true,
        caption: "Lista de Dominios",
        ondblClickRow: function (id) { $("#btnModificar").click(); }
    });

    var tbCamposDominio = $("#tbCamposDominio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'Campo', index: 'Campo', label: 'Campo', width: '200' }
   		                   ],
        sortname: "Campo", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        shrinkToFit: false,
        width: "270",
        height: "200",
        rowNum: "1000",
        rownumbers: true,
        caption: "Lista de Campos de Dominio"
    });

    var tbEquivalencias = $("#tbEquivalencias").jqGrid({
        datatype: "local",
        colModel: [{ name: 'CampoSistel', index: 'CampoSistel', label: 'Campo Pcsistel', width: '200', key: true },
   		                   { name: 'TipoCampo', index: 'TipoCampo', label: 'Tipo', width: '110' },
                           { name: 'CampoEquivale', index: 'CampoEquivale', label: 'Campo LDAP', width: '200' },
   		                   { name: 'Obligatorio', index: 'Obligatorio', label: 'Obligatorio', width: '80' },
                           { name: 'Columna', index: 'Columna', label: 'Posición', width: '50', hidden: false },
                           { name: 'Longitud', index: 'Longitud', label: 'Longitud', width: '50', hidden: false }
                           ],
        sortname: "Pcsistel", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        shrinkToFit: false,
        width: "770",
        height: "200",
        rownumbers: true,
        caption: "Lista de Equivalencias"
    });

    var tbprevio = $("#tbprevio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'Campo', index: 'Campo', label: 'Campo LDAP', width: '100' },
   		                   { name: 'Valor', index: 'Valor', label: 'Valor Campo', width: '300' }
   		                   ],
        pager: "#tbprevio_paginator",
        viewrecords: false,
        hidegrid: false,
        sortname: "Campo", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        shrinkToFit: true,
        width: "450",
        height: "200",
        rowNum: "1000",
        rownumbers: true,
        caption: "Datos de Campos LDAP"
    });
    var paginador = $("#tbprevio").getGridParam('pager');
    jQuery("#tbprevio").navGrid(paginador, {
        edit: false,
        add: false,
        del: false,
        search: false,
        refresh: false
    }).navButtonAdd(paginador, {
        caption: "Exportar Excel",
        buttonicon: "ui-icon-export",
        onClickButton: function () {
            $("#tbprevio").jqGrid('exportarExcelCliente', { nombre: "HOJATEST", formato: "excel" });
            //console.log($("#tb_ejemplo").jqGrid('exportarTextoCliente'));
        },
        position: "last"
    });



    $("#tbDominio").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificar").click(); }, "onSpace": function (id) { $("#btnModificar").click(); } });
    $("#tbCamposDominio").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificarC").click(); }, "onSpace": function (id) { $("#btnModificarC").click(); } });
    $("#tbEquivalencias").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificarE").click(); }, "onSpace": function (id) { $("#btnModificarE").click(); } });

    inicio();

    $("#btnAgregar").click(function () {

        var MaxPos = 0;
        var datos = $("#tbDominio").jqGrid('getRowData');
        $('#txtservidor').val('');
        $('#txtdominio').val('');
        $('#txtusuario').val('');
        $('#txtpassword').val('');
        $('#txtpuerto').val('');
        //alerta("SSSSS");
        $('#dvCamposDetalle').dialog({
            title: "Agregar Dominio",
            modal: true,
            width: 350,
            buttons: {
                "Testear": function () {

                    //var dominio = "LDAP://" + $('#txtservidor').val() + "/DC=" + $('#txtdominio').val() + ",DC=com";
                    var dominio = $('#txtdominio').val();
                    var usuario = $('#txtusuario').val();
                    var clave = $('#txtpassword').val();
                    //CARGAR DOMINIOS
                    $.ajax({
                        type: "POST",
                        url: "PlantillaAD.aspx/TestearAD",
                        data: "{'dominio': '" + dominio + "','usuario': '" + usuario + "','clave': '" + clave + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            //var rpta = $(result.d).toString();
                            var cadenarpta = result.d;
                            if (cadenarpta == "No se pudo conectar, Valide sus datos") {
                                Mensaje("<h1>" + cadenarpta + "</h1><br/>", document, CerroMensaje);
                            }
                            else {
                                Mensaje("<h1>" + cadenarpta + "</h1><br/>", document, CerroMensaje);
                            }


                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }

                    });

                },
                "Agregar": function () {
                    var Servidor = $('#txtservidor').val();
                    var Dominio = $('#txtdominio').val();
                    var Usuario = $('#txtusuario').val();
                    var Password = $('#txtpassword').val(); 
                    var Puerto = $('#txtpuerto').val();
                    var chkbtfiltroOU = $('#chkbtfiltroOU').val();
                    var Repetido = 0;

                    if (Servidor == "") {
                        alerta("Ingrese el nombre de Servidor");
                        $('#txtservidor').focus();
                        return;
                    }
                    if (Dominio == "") {
                        alerta("Ingrese el nombre de Dominio");
                        $('#txtdominio').focus();
                        return;
                    }
                    if (Puerto == "0") {
                        alerta("Ingrese el numero de Puerto");
                        $('#txtpuerto').focus();
                        return;
                    }
                    if (Usuario == "") {
                        alerta("Ingrese el nombre de Usuario");
                        $('#txtusuario').focus();
                        return;
                    }

                    if (Password == "") {
                        alerta("Ingrese el Password de Usuario");
                        $('#txtpassword').focus();
                        return;
                    }

                    var datos = $("#tbDominio").jqGrid('getRowData');

                    $(datos).each(function () {
                        if ($('#txtdominio').val() == this.Dominio && $('#txtservidor').val() == this.Servidor) {
                            Repetido = 1;
                        }
                    });

                    if (Repetido == 1) {
                        alerta("Este Dominio con Servidor ya fueron registrados");
                        $('#txtservidor').focus();
                        return;
                    }
                    var rowID = "new_row";
                    $("#tbDominio").jqGrid('addRowData', rowID, { Servidor: Servidor, Dominio: Dominio, Usuario: Usuario,
                        Password: Password, Mascara: "******", Puerto: Puerto,
                        Autentificacion: 0, vcAutentificacion: ''
                    }
                                                         );

                    //ActualizaPlantilla();


                    Mensaje("<br/><h1>Dominio agregado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje);
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#btnAgregarC").click(function () {

        var MaxPos = 0;
        var datos = $("#tbCamposDominio").jqGrid('getRowData');
        $('#txtcampo').val('');
        $('#dvCampos').dialog({
            title: "Agregar Campo LDAP",
            modal: true,
            width: 350,
            buttons: {
                "Agregar": function () {
                    var Campo = $('#txtcampo').val();
                    var Repetido = 0;

                    if (Campo == "") {
                        alerta("Ingrese el nombre del Campo");
                        $('#txtcampo').focus();
                        return;
                    }
                    var datos = $("#tbCamposDominio").jqGrid('getRowData');

                    $(datos).each(function () {
                        if ($('#txtcampo').val() == this.Campo) {
                            Repetido = 1;
                            return;
                        }

                    });

                    if (Repetido == 1) {
                        alerta("Este Campo ya fue registrado");
                        $('#txtcampo').focus();
                        return;
                    }



                    var rowID = "new_row";
                    $("#tbCamposDominio").jqGrid('addRowData', rowID, { Campo: Campo }
                                                         );
                    Mensaje("<br/><h1>Campo agregado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje1);
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#btnModificarE").click(function () {
        var PosAct;
        var id = $("#tbEquivalencias").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbEquivalencias").jqGrid('getRowData', id);
            PosAct = datos.inPos;

            $('#ddlcampopcsistel').val(datos.CampoSistel);
            $('#ddlcampoldap').val(datos.CampoEquivale);
            if (datos.TipoCampo == "CAMPOLDAP") {
                $('#ddlTipo').val(0);
            } else if (datos.TipoCampo == "AUTOGENERADO") {
                $('#ddlTipo').val(1);
            } else if (datos.TipoCampo == "VALORFIJO") {
                $('#ddlTipo').val(2);
            }
            if (datos.Obligatorio == "Falso") {
                $('#chkobligatorio').prop("checked", false);
            } else {
                $('#chkobligatorio').prop("checked", true);
            }

            $('#dvEquivalencias').dialog({
                title: "Editar Equivalencia",
                modal: true,
                width: 350,
                buttons: {
                    "Modificar": function () {
                        $(this).dialog("close");

                    },
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });


        }
    });

    $("#btnAgregarE").click(function () {
        var MaxPos = 0;
        var datos = $("#tbEquivalencias").jqGrid('getRowData');

        $('#ddlcampopcsistel').val(0);
        $('#ddlcampoldap').val(0);
        $('#ddlTipo').val(0);
        $("#chkobligatorio").prop("checked", false);
        $("#chkExtraerDato").prop("checked", false);
        $("#trExtraerDato").hide();
        $("#ddlTipo").change();

        $('#dvEquivalencias').dialog({
            title: "Agregar Equivalencia",
            modal: true,
            width: 350,
            position: ['center'],
            buttons: {
                "Agregar": function () {
                    var CampoPcsistel = $('#ddlcampopcsistel').val();
                    var CampoLdap = $('#ddlcampoldap').val();
                    var TipoCampo = $('#ddlTipo').val();
                    var Obligatorio = $('#chkobligatorio').prop('checked');
                    var ValorCampo = "CAMPOLDAP";
                    var isExtraerDato = $('#chkExtraerDato').prop('checked');
                    var inColumna = ($('#TxtColumna').val() == "" ? 0 : $('#TxtColumna').val());
                    var inLongitud = ($('#TxtLongitud').val() == "" ? 0 : $('#TxtLongitud').val());
                    var Repetido = 0;
                    var validaarea = 0;


                    if (Obligatorio == true) {
                        Obligatorio = "Verdadero";
                    }
                    else {
                        Obligatorio = "Falso";
                    }

                    if (TipoCampo == "1") {
                        CampoLdap = "AUTOGENERADO";
                        var ValorCampo = CampoLdap;
                    }

                    if (TipoCampo == "2") {
                        CampoLdap = $('#txtvalorcomun').val();
                        ValorCampo = "VALORFIJO";
                    }

                    if (CampoPcsistel == "") {
                        alerta("Ingrese el nombre del Campo Pcsistel");
                        $('#ddlcampopcsistel').focus();
                        return;
                    }

                    if (CampoLdap == "" && TipoCampo == "0") {
                        alerta("Ingrese el nombre del Campo LDAP");
                        $('#ddlcampoldap').focus();
                        return;
                    }
                    if (CampoLdap == "" && TipoCampo == "2") {
                        alerta("Ingrese el valor del Campo");
                        $('#txtvalorcomun').focus();
                        return;
                    }

                    if (isExtraerDato == true) {
                        if (inColumna == "" || inColumna <= 0) {
                            alerta("Ingrese el digito de la columna");
                            $('#TxtColumna').focus();
                            return;
                        }

                        if (inLongitud == "" || inLongitud <= 0) {
                            alerta("Ingrese el digito de la longitud");
                            $('#TxtLongitud').focus();
                            return;
                        }
                    }

                    var datos = $("#tbEquivalencias").jqGrid('getRowData');
                    var campo_ingresar = $('#ddlcampoldap').val();
                    var campogrilla = "";
                    // campo_ingresar = campo_ingresar.toString().toUpper();


                    $(datos).each(function () {
                        if (CampoPcsistel == this.CampoSistel) {
                            Repetido = 1;
                        }
                        campogrilla = this.CampoSistel;
                        if (CampoPcsistel.indexOf("Nivel") != 0) {

                            if (campogrilla.indexOf("AreaDirecta") != 0) {
                                validaarea = 1;
                                return;
                            }
                        }

                        if (CampoPcsistel.indexOf("AreaDirecta") != 0) {

                            if (campogrilla.indexOf("Nivel") != 0) {
                                validaarea = 1;
                                return;
                            }
                        }

                    });

                    validaarea = 0;

                    if (Repetido == 1) {
                        alerta("Este Campo ya fue registrado");
                        $('#ddlcampopcsistel').focus();
                        return;
                    }

                    if (validaarea == 1) {
                        alerta("No puede configurar Area Directa y Area por Niveles al mismo tiempo");
                        $('#txtcampo').focus();
                        return;
                    }


                    var rowID = "new_row";
                    $("#tbEquivalencias").jqGrid('addRowData', rowID, { CampoSistel: CampoPcsistel, TipoCampo: ValorCampo, CampoEquivale: CampoLdap, Obligatorio: Obligatorio, Columna: inColumna, Longitud: inLongitud });
                    Mensaje("<br/><h1>Campo agregado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje2);
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    function CerroMensaje() {
        $('#txtServidor').val('');
    }

    function CerroMensaje1() {
        $('#txtcampo').val('');
    }

    function CerroMensaje2() {
        $('#ddlcampopcsistel').val(0);
        $('#TxtColumna').val("");
        $('#TxtLongitud').val("");
    }
    $("#btnModificar").click(function () {
        var PosAct;
        var id = $("#tbDominio").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbDominio").jqGrid('getRowData', id);
            PosAct = datos.inPos;
            $('#txtservidor').val(datos.Servidor);
            $('#txtdominio').val(datos.Dominio);
            $('#txtusuario').val(datos.Usuario);
            $('#txtpassword').val(datos.Password);
            $('#txtpuerto').val(datos.Puerto);
            $('#ddlTipoAutentificacion').val(0);

            $('#dvCamposDetalle').dialog({
                title: "Editar Configuracion Dominio",
                modal: true,
                buttons: {
                    "Testear": function () {

                        //var dominio = "LDAP://" + $('#txtservidor').val() + "/DC=" + $('#txtdominio').val() + ",DC=com";
                        var dominio = $('#txtdominio').val();
                        var usuario = $('#txtusuario').val();
                        var clave = $('#txtpassword').val();
                        var autentificacion = $('#ddlTipoAutentificacion').val();
                        //CARGAR DOMINIOS
                        $.ajax({
                            type: "POST",
                            url: "PlantillaAD.aspx/TestearAD",
                            data: "{'dominio': '" + dominio + "','usuario': '" + usuario + "','clave': '" + clave + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {

                                //var rpta = $(result.d).toString();
                                var cadenarpta = result.d;
                                if (cadenarpta == "No se pudo conectar, Valide sus datos") {
                                    Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/remove.png\" /><br/><h1>" + cadenarpta + "</h1><br/>", document, CerroMensaje);
                                }
                                else {
                                    Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/todo.png\" /><br/><h1>" + cadenarpta + "</h1><br/>", document, CerroMensaje);
                                }


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }

                        });


                    },
                    "Modificar": function () {
                        var Servidor = $('#txtservidor').val();
                        var Dominio = $('#txtdominio').val();
                        var Usuario = $('#txtusuario').val();
                        var Password = $('#txtpassword').val();
                        var Puerto = $('#txtpuerto').val();

                        var Autentificacion = $('#ddlTipoAutentificacion').val();
                        var vcAutentificacion = $("#ddlTipoAutentificacion option:selected").text();

                        var Repetido = 0;

                        if (Servidor == "") {
                            alerta("Ingrese el nombre de Servidor");
                            $('#txtservidor').focus();
                            return;
                        }
                        if (Dominio == "") {
                            alerta("Ingrese el nombre de Dominio");
                            $('#txtdominio').focus();
                            return;
                        }
                        if (Puerto == "0") {
                            alerta("Ingrese el numero de Puerto");
                            $('#txtpuerto').focus();
                            return;
                        }
                        if (Usuario == "") {
                            alerta("Ingrese el nombre de Usuario");
                            $('#txtusuario').focus();
                            return;
                        }

                        if (Password == "") {
                            alerta("Ingrese el Password de Usuario");
                            $('#txtpassword').focus();
                            return;
                        }

                        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');
                        $(datos).each(function () {
                            if ($('#txtdominio').val() == this.Dominio && $('#txtservidor').val() == this.Servidor) {
                                Repetido = 1;
                            }
                        });

                        if (Repetido == 1) {
                            alerta("Este Dominio con Servidor ya fueron registrados");
                            $('#txtservidor').focus();
                            return;
                        }

                        $("#tbDominio").jqGrid('setRowData', id, { 'Servidor': Servidor, 'Dominio': Dominio,
                            'Usuario': Usuario, 'Password': Password, 'Puerto': Puerto, 'Autentificacion': Autentificacion, 'vcAutentificacion': vcAutentificacion
                        });
                        //ActualizaPlantilla();
                        Mensaje("<br/><h1>Dominio actualizado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje);
                        $(this).dialog("close");

                    },
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    });


    $("#btntraerldap").click(function () {
        var id = $("#tbDominio").jqGrid('getGridParam', 'selrow');
        if (id) {

            $('#divConfirmaUpdateLdap').dialog({
                title: "Traer campos de LDAP",
                modal: true,
                buttons: {
                    "Si": function () {

                        var datos = $("#tbDominio").jqGrid('getRowData', id);
                        PosAct = datos.inPos;
                        var servidor = datos.Servidor;
                        var dominio = datos.Dominio;
                        var usuario = datos.Usuario;
                        var clave = datos.Password;
                        var puerto = datos.Puerto;
                        var autentificacion = datos.Autentificacion;

                        //CARGAR CAMPOS LDAP CON CONEXION
                        $.ajax({
                            type: "POST",
                            url: "PlantillaAD.aspx/TraerCamposLDAP",
                            data: "{'dominio': '" + dominio + "','usuario': '" + usuario + "','autentificacion': '" + autentificacion + "','clave': '" + clave + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#tbCamposDominio").jqGrid('clearGridData');
                                $("#tbEquivalencias").jqGrid('clearGridData');
                                for (var i = 0; i < $(result.d).length; i++)
                                    $("#tbCamposDominio").jqGrid('addRowData', i,
                                                { Campo: result.d[i].Campo });
                                Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/todo.png\" /><br/><h1>Datos reemplazados temporalmente</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje2);
                                //$(this).dialog("close");


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }

                        });
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }

                }
            });
        }
        else {
            alerta("Seleccione un registro de la grilla de Dominio para su lectura");
        }

    });

    $("#btnQuitar").click(function () {
        var id = $("#tbDominio").jqGrid('getGridParam', 'selrow');
        if (id) {
            $('#divMsgConfirmacion').dialog({
                title: "Quitar Dominio",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#tbDominio").jqGrid('delRowData', id);
                        var Datos = $("#tbDominio").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            var Dominio = this.Dominio;
                            var Servidor = this.Servidor;
                            var Existe = false;

                            $(Datos).each(function () {
                                if (this.Dominio == Dominio && this.Servidor == Servidor) {
                                    Existe = true;
                                }
                            });

                        });

                        Mensaje("<br/><h1>Dominio eliminado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    });

    $("#btnQuitarC").click(function () {
        var id = $("#tbCamposDominio").jqGrid('getGridParam', 'selrow');
        if (id) {
            $('#divMsgConfirmacion').dialog({
                title: "Quitar Campo",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#tbCamposDominio").jqGrid('delRowData', id);
                        var Datos = $("#tbCamposDominio").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            var Campo = this.Campo;
                            var Existe = false;

                            $(Datos).each(function () {
                                if (this.Campo == Campo) {
                                    Existe = true;
                                }
                            });

                        });

                        Mensaje("<br/><h1>Campo eliminado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje1);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    });


    $("#btnQuitarE").click(function () {
        var id = $("#tbEquivalencias").jqGrid('getGridParam', 'selrow');
        if (id) {
            $('#divMsgConfirmacion').dialog({
                title: "Quitar Equivalencia",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#tbEquivalencias").jqGrid('delRowData', id);
                        var Datos = $("#tbEquivalencias").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            var CampoPcsistel = this.CampoPcsistel;
                            var CampoLdap = this.CampoLdap;
                            var Existe = false;

                            $(Datos).each(function () {
                                if (this.CampoSistel == CampoPcsistel && this.CampoEquivale == CampoLdap) {
                                    Existe = true;
                                }
                            });

                        });

                        Mensaje("<br/><h1>Equivalencia eliminada</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje2);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    });

    $("#btnGrabarDominio").click(function () {

        var gridData = jQuery("#tbDominio").getRowData();
        var postData = JSON.stringify(gridData);

        $.ajax({
            type: "POST",
            url: "PlantillaAD.aspx/GrabarDominios",
            data: "{'oDominio': '" + postData + "'}",
            contentType: "application/json; charset=iso-8859-1",
            dataType: "json",
            success: function (result) {
                Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Configuración Guardada</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });

    $("#btnGrabarCampos").click(function () {

        var gridData = jQuery("#tbCamposDominio").getRowData();
        var postData = JSON.stringify(gridData);

        $.ajax({
            type: "POST",
            url: "PlantillaAD.aspx/GrabarCamposLDAP",
            data: "{'oDominio': '" + postData + "'}",
            contentType: "application/json; charset=iso-8859-1",
            dataType: "json",
            success: function (result) {
                Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Campos Guardados</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });

    //puribe
    $("#btnGrabarEquivalencia").click(function () {
        var equivalencia = [];
        function ENTEquivalenciaCampos(CampoSistel, TipoCampo, CampoEquivale, obligatorio, obliga, Columna, Longitud) {
            this.CampoSistel = CampoSistel;
            this.TipoCampo = TipoCampo;
            this.CampoEquivale = CampoEquivale;
            this.obligatorio = obligatorio;
            this.obliga = obliga;
            this.Columna = Columna;
            this.Longitud = Longitud;
        }

        var gridData = jQuery("#tbEquivalencias").getRowData();

        $(gridData).each(function () {
            var equivalenciacampo = new ENTEquivalenciaCampos();
            equivalenciacampo.CampoSistel = this.CampoSistel;
            equivalenciacampo.TipoCampo = this.TipoCampo;
            equivalenciacampo.CampoEquivale = this.CampoEquivale;
            equivalenciacampo.obliga = this.Obligatorio;
            equivalenciacampo.Columna = (this.Columna == undefined || this.Columna == "" ? 0 : this.Columna);
            equivalenciacampo.Longitud = (this.Longitud == undefined || this.Longitud == "" ? 0 : this.Longitud);
            equivalencia.push(equivalenciacampo);
        });

        //var arIds = $('#tbEquivalencias').jqGrid().getDataIDs();
        //
        //for (var i = 0; i < arIds.length; i++) {
        //    var equivalenciacampo = new ENTEquivalenciaCampos();
        //    var drRegistro = $('#tbEquivalencias').jqGrid('getRowData', arIds[i]);
        //    equivalenciacampo.CampoSistel = drRegistro.CampoSistel;
        //    equivalenciacampo.TipoCampo = drRegistro.TipoCampo;
        //    equivalenciacampo.CampoEquivale = drRegistro.CampoEquivale;
        //    equivalenciacampo.obliga = drRegistro.Obligatorio;
        //    equivalencia.push(equivalenciacampo);
        //
        //}

        // return;
        var postData = JSON.stringify(gridData);

        $.ajax({
            type: "POST",
            url: "PlantillaAD.aspx/GrabarEquivalencia",
            //  data: "{'oDominio': '" + postData + "'}",
            data: "{'oDominio': '" + JSON.stringify(equivalencia) + "'}",
            contentType: "application/json; charset=iso-8859-1",
            dataType: "json",
            success: function (result) {
                Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Equivalencias Guardadas</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });


    $("#txtcampopcsistel").focusout(function () {
        if (!Selecciono) {
            $.ajax({
                type: "POST",
                url: "PlantillaAD.aspx/Listarcampopcsistel",
                data: "{'maxFilas': '" + 200 + "'," +
                           "'valor': '" + $("#txtcampopcsistel").val().replace(/'/g, "&#39") +
                           "','tipo': 'P'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length == 1) {
                        $("#hdfcampopcsistel").val(result.d[0].valor);
                        Selecciono = true;
                    }
                    else {
                        $("#hdfcampopcsistel").val("");
                        Selecciono = false;
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    //if ($('#txtcampopcsistel').is(':visible')) {
    $("#txtcampopcsistel").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "PlantillaAD.aspx/Listarcampopcsistel",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'valor': '" + $("#txtcampopcsistel").val().replace(/'/g, "&#39") +
                               "','tipo': 'P'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.valor
                        }
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtcampopcsistel").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtcampopcsistel").val(ui.item.label);
            $("#hdfcampopcsistel").val(ui.item.label);
            //$("#lblCentroCosto").html(ui.item.vcCodCenCos + " - " + ui.item.vcNomCenCos);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfcampopcsistel").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
             .data("autocomplete")._renderItem = function (ul, item) {
                 return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.label + "=" + item.label + "</a>")
			    .appendTo(ul);
             };
    //}

    $("#btnvolver").click(function () {

        window.location = "Sin_Configura.aspx";

    });

    $("#btnprevio").click(function () {
        var id = $("#tbDominio").jqGrid('getGridParam', 'selrow');
        if (id) {

            $('#dvPrevio').dialog({
                title: "Traer campos de LDAP",
                width: 500,
                modal: true,
                buttons: {
                    "Traer Usuarios": function () {

                        var datos = $("#tbDominio").jqGrid('getRowData', id);
                        PosAct = datos.inPos;
                        var servidor = datos.Servidor;
                        var dominio = datos.Dominio;
                        var usuario = datos.Usuario;
                        var clave = datos.Password;
                        var puerto = datos.Puerto;
                        var autentificacion = datos.Autentificacion;
                        var nombre = $("#txtbuscar").val();
                        if (nombre == "") {
                            // Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/proceso.png\" /><br/><h3>No ingreso dato, se usarán los datos del usuario configurado</h3><br/>", document, CerroMensaje);
                            nombre = usuario;
                        }

                        //CARGAR CAMPOS LDAP CON CONEXION
                        $.ajax({
                            type: "POST",
                            url: "PlantillaAD.aspx/TestearAD",
                            data: "{'dominio': '" + dominio + "','usuario': '" + usuario + "','clave': '" + clave + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {

                                //var rpta = $(result.d).toString();
                                var cadenarpta = result.d;
                                if (cadenarpta == "No se pudo conectar, Valide sus datos") {
                                    Mensaje("<br/><img src=\"../Common/Images/Mantenimiento/remove.png\" /><br/><h1>" + cadenarpta + "</h1><br/>", document, CerroMensaje);
                                }
                                else {

                                    //TRAER USUARIOS
                                    $.ajax({
                                        type: "POST",
                                        url: "PlantillaAD.aspx/TraeUsuarios",
                                        data: "{'servidor': '" + servidor + "','dominio': '" + dominio + "','usuario': '" + usuario + "','autenticacion': '" + autentificacion + "','clave': '" + clave + "','puerto': '" + puerto + "','nombre' : '" + nombre + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {
                                            var select = $("#drpusuarios");
                                            select.children().remove();
                                            for (var i = 0; i < result.d.length; i++) {
                                                $("#drpusuarios").append($("<option></option>").attr("value", result.d[i].Value).text(result.d[i].Display));
                                            }
                                            nombre = $("#drpusuarios").val();
                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                        }

                                    });





                                    //CARGAR DATOS USUARIOS
                                    $("#tbprevio").jqGrid('clearGridData');
                                    $.ajax({
                                        type: "POST",
                                        url: "PlantillaAD.aspx/TraeDataUsuarios",
                                        data: "{'servidor': '" + servidor + "','dominio': '" + dominio + "','usuario': '" + usuario + "','clave': '" + clave + "','autenticacion': '" + autentificacion + "','puerto': '" + puerto + "','nombre' : '" + nombre + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {

                                            for (var i = 0; i < $(result.d).length; i++)
                                                $("#tbprevio").jqGrid('addRowData', i,
                                                { Campo: result.d[i].Campo, Valor: result.d[i].Valor
                                                });
                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                        }

                                    });


                                }


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }


                        });
                        // $(this).dialog("close");
                    },
                    "Consultar Usuario Seleccionado": function () {


                        var datos = $("#tbDominio").jqGrid('getRowData', id);
                        PosAct = datos.inPos;
                        var servidor = datos.Servidor;
                        var dominio = datos.Dominio;
                        var usuario = datos.Usuario;
                        var clave = datos.Password;
                        var puerto = datos.Puerto;
                        var autentificacion = datos.Autentificacion;
                        //CARGAR DATOS USUARIO SELECCIONADO
                        var usuarionuevo = $("#drpusuarios").val();
                        if (usuarionuevo == "" || usuarionuevo == null) {
                            alerta("Seleccione un Usuario de la lista");
                            return;

                        }
                        $("#tbprevio").jqGrid('clearGridData');
                        $.ajax({
                            type: "POST",
                            url: "PlantillaAD.aspx/TraeDataUsuarios",
                            data: "{'servidor': '" + servidor + "','dominio': '" + dominio + "','usuario': '" + usuario + "','clave': '" + clave + "','autenticacion': '" + autentificacion + "','puerto': '" + puerto + "','nombre' : '" + usuarionuevo + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {

                                for (var i = 0; i < $(result.d).length; i++)
                                    $("#tbprevio").jqGrid('addRowData', i,
                                                { Campo: result.d[i].Campo, Valor: result.d[i].Valor
                                                });
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
        }
        else {
            alerta("Seleccione un registro de la grilla de Dominio para su lectura");
        }

    });

    (function ($) {
        $.jgrid.extend({
            exportarExcelCliente: function (o) {
                var archivoExporta, hojaExcel;
                archivoExporta = {
                    worksheets: [
                    []
                ],
                    creator: "Arcmop",
                    created: new Date(),
                    lastModifiedBy: "Arcmop",
                    modified: new Date(),
                    activeWorksheet: 0
                };
                hojaExcel = archivoExporta.worksheets[0];
                hojaExcel.name = o.nombre;

                var arrayCabeceras = new Array();
                arrayCabeceras = $(this).getDataIDs();
                var dataFilaGrid = $(this).getRowData(arrayCabeceras[0]);
                var nombreColumnas = new Array();
                var ii = 0;
                for (var i in dataFilaGrid) {
                    nombreColumnas[ii++] = i;
                }
                hojaExcel.push(nombreColumnas);
                var dataFilaArchivo;
                for (i = 0; i < arrayCabeceras.length; i++) {
                    dataFilaGrid = $(this).getRowData(arrayCabeceras[i]);
                    dataFilaArchivo = new Array();
                    for (j = 0; j < nombreColumnas.length; j++) {
                        dataFilaArchivo.push(dataFilaGrid[nombreColumnas[j]]);
                    }
                    hojaExcel.push(dataFilaArchivo);
                }
                return window.location = xlsx(archivoExporta).href();
            },
            exportarTextoCliente: function (o) {
                var arrayCabeceras = new Array();
                arrayCabeceras = $(this).getDataIDs();
                var dataFilaGrid = $(this).getRowData(arrayCabeceras[0]);
                var nombreColumnas = new Array();
                var ii = 0;
                var textoRpta = "";
                for (var i in dataFilaGrid) {
                    nombreColumnas[ii++] = i;
                    textoRpta = textoRpta + i + "\t";
                }
                textoRpta = textoRpta + "\n";
                for (i = 0; i < arrayCabeceras.length; i++) {
                    dataFilaGrid = $(this).getRowData(arrayCabeceras[i]);
                    for (j = 0; j < nombreColumnas.length; j++) {
                        textoRpta = textoRpta + dataFilaGrid[nombreColumnas[j]] + "\t";
                    }
                    textoRpta = textoRpta + "\n";
                }
                textoRpta = textoRpta + "\n";
                return textoRpta;
            }
        });
    })(jQuery);



});



